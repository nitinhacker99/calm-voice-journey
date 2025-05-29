
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MessageCircle, Heart, Calendar } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: string;
  score: number;
  activities: string[];
}

interface ChatActivity {
  message: string;
  timestamp: string;
  type: 'user_message' | 'ai_response';
}

const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [chatActivities, setChatActivities] = useState<ChatActivity[]>([]);
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    // Load real data from localStorage
    const loadData = () => {
      const moodData = JSON.parse(localStorage.getItem('moodEntries') || '[]');
      const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
      
      setMoodEntries(moodData);
      setChatActivities(chatHistory);
      
      // Calculate real progress based on user activity
      calculateProgress(moodData, chatHistory);
    };

    loadData();
    
    // Update data every 5 seconds to show real-time changes
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const calculateProgress = (moods: MoodEntry[], chats: ChatActivity[]) => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Calculate weekly progress based on activities
    const recentChats = chats.filter(chat => 
      new Date(chat.timestamp) > weekAgo && chat.type === 'user_message'
    );
    const recentMoods = moods.filter(mood => 
      new Date(mood.date) > weekAgo
    );
    
    // Progress calculation: chat messages + mood entries
    const chatProgress = Math.min(recentChats.length * 10, 50); // Max 50% from chats
    const moodProgress = Math.min(recentMoods.length * 25, 50); // Max 50% from mood entries
    
    setWeeklyProgress(Math.min(chatProgress + moodProgress, 100));
    
    // Calculate streak
    let streak = 0;
    const allActivities = [
      ...recentChats.map(c => c.timestamp),
      ...recentMoods.map(m => m.date)
    ].sort().reverse();
    
    const uniqueDays = new Set(allActivities.map(date => 
      new Date(date).toDateString()
    ));
    
    setCurrentStreak(uniqueDays.size);
  };

  const addMoodEntry = (mood: string, score: number) => {
    const newEntry: MoodEntry = {
      date: new Date().toISOString(),
      mood,
      score,
      activities: ['manual_entry']
    };
    
    const updatedEntries = [...moodEntries, newEntry];
    setMoodEntries(updatedEntries);
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
  };

  const getRecentMoodTrend = () => {
    if (moodEntries.length < 2) return 'neutral';
    
    const recent = moodEntries.slice(-3);
    const avgScore = recent.reduce((sum, entry) => sum + entry.score, 0) / recent.length;
    
    if (avgScore > 7) return 'positive';
    if (avgScore < 4) return 'negative';
    return 'neutral';
  };

  const moodOptions = [
    { emoji: '😊', label: 'Happy', score: 8, color: 'bg-yellow-100 text-yellow-800' },
    { emoji: '😌', label: 'Calm', score: 7, color: 'bg-green-100 text-green-800' },
    { emoji: '😐', label: 'Okay', score: 5, color: 'bg-gray-100 text-gray-800' },
    { emoji: '😔', label: 'Sad', score: 3, color: 'bg-blue-100 text-blue-800' },
    { emoji: '😰', label: 'Anxious', score: 2, color: 'bg-purple-100 text-purple-800' },
    { emoji: '😡', label: 'Angry', score: 2, color: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Mood Entry */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-teal-600" />
            <span>Abhi kaise feel kar rahe hain?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {moodOptions.map((mood) => (
              <button
                key={mood.label}
                onClick={() => addMoodEntry(mood.label, mood.score)}
                className={`p-3 rounded-lg border-2 hover:scale-105 transition-transform ${mood.color} border-transparent hover:border-teal-300`}
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <div className="text-sm font-medium">{mood.label}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Weekly Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={weeklyProgress} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{weeklyProgress}% Complete</span>
              <span>{chatActivities.filter(c => c.type === 'user_message').length} Messages</span>
            </div>
            <p className="text-sm text-gray-600">
              Chat messages aur mood entries ke basis par calculated
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <span>Activity Streak</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-green-600">
              {currentStreak} days
            </div>
            <p className="text-sm text-gray-600">
              Continuous engagement with MindMate
            </p>
            <Badge variant="secondary" className="text-xs">
              <MessageCircle className="h-3 w-3 mr-1" />
              {chatActivities.filter(c => c.type === 'user_message').length} Total Chats
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {moodEntries.length === 0 && chatActivities.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Abhi tak koi activity nahi hai. Chat ya mood entry kar ke start kariye!
            </p>
          ) : (
            <div className="space-y-3">
              {moodEntries.slice(-3).reverse().map((entry, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg">
                    {moodOptions.find(m => m.label === entry.mood)?.emoji || '😐'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{entry.mood} feeling</p>
                    <p className="text-sm text-gray-600">
                      {new Date(entry.date).toLocaleDateString('en-IN')} at {new Date(entry.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <Badge variant="outline">Score: {entry.score}/10</Badge>
                </div>
              ))}
              
              {chatActivities.filter(c => c.type === 'user_message').slice(-2).reverse().map((chat, index) => (
                <div key={`chat-${index}`} className="flex items-center space-x-3 p-3 bg-teal-50 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-teal-600" />
                  <div className="flex-1">
                    <p className="font-medium">Chat message</p>
                    <p className="text-sm text-gray-600 truncate">
                      {chat.message.substring(0, 50)}...
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(chat.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
