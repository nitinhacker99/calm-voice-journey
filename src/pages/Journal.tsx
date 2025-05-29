
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowLeft, Calendar, Heart, Save, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  date: Date;
  aiReflection?: string;
}

const Journal = () => {
  const navigate = useNavigate();
  const [currentEntry, setCurrentEntry] = useState({ title: '', content: '' });
  const [isListening, setIsListening] = useState(false);
  const [entries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Morning Reflections',
      content: 'Today I woke up feeling grateful for the small things in life. The sunshine through my window reminded me that each day is a new opportunity.',
      mood: 'grateful',
      date: new Date(2024, 4, 28),
      aiReflection: 'I notice a beautiful sense of gratitude and mindfulness in your writing. Recognizing small joys like sunshine shows emotional awareness and resilience.'
    },
    {
      id: '2',
      title: 'Challenging Day',
      content: 'Work was overwhelming today. Multiple deadlines and difficult conversations left me feeling drained. I need to remember to take breaks.',
      mood: 'stressed',
      date: new Date(2024, 4, 27),
      aiReflection: 'It sounds like you had a demanding day. Your awareness of needing breaks shows self-compassion. Remember that feeling overwhelmed is temporary.'
    }
  ]);

  const prompts = [
    "What am I grateful for today?",
    "What challenged me today and how did I handle it?",
    "What made me smile recently?",
    "What do I want to let go of?",
    "How am I growing as a person?",
    "What does my ideal day look like?"
  ];

  const handleSave = () => {
    if (currentEntry.content.trim()) {
      toast({
        title: "Journal entry saved",
        description: "Your thoughts have been safely recorded.",
      });
      // In real app, this would save to database
      setCurrentEntry({ title: '', content: '' });
    }
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // Simulate voice input for demo
    setTimeout(() => {
      setIsListening(false);
      setCurrentEntry({
        ...currentEntry,
        content: currentEntry.content + " Today I had some interesting insights about my relationships and how I communicate with others."
      });
      toast({
        title: "Voice recorded",
        description: "Your voice has been transcribed and added to your journal.",
      });
    }, 2000);
  };

  const generateAIReflection = (content: string): string => {
    // Simple AI reflection simulation - in real app, this would call GPT-4 API
    const reflections = [
      "Your writing shows remarkable self-awareness and emotional intelligence.",
      "I appreciate how honestly you're exploring your feelings. This kind of reflection is valuable for growth.",
      "There's a lot of strength in how you're processing these experiences.",
      "Your ability to articulate your thoughts shows great emotional maturity."
    ];
    return reflections[Math.floor(Math.random() * reflections.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-teal-50 to-sage-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-lavender-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="text-gray-600">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-800">Journal</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Writing Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* New Entry Card */}
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-purple-600" />
                  <span>New Journal Entry</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Give your entry a title..."
                  value={currentEntry.title}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                  className="border-lavender-200 focus:border-purple-400 focus:ring-purple-400"
                />
                <Textarea
                  placeholder="What's on your mind today? Share your thoughts, feelings, experiences, or anything you'd like to reflect on..."
                  value={currentEntry.content}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                  className="min-h-64 resize-none border-lavender-200 focus:border-purple-400 focus:ring-purple-400"
                />
                <div className="flex space-x-3">
                  <Button
                    onClick={startVoiceInput}
                    variant="outline"
                    disabled={isListening}
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <Mic className={`h-4 w-4 mr-2 ${isListening ? 'animate-pulse text-red-500' : ''}`} />
                    {isListening ? 'Recording...' : 'Voice to Text'}
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={!currentEntry.content.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Entry
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Entries</h2>
              {entries.map((entry) => (
                <Card key={entry.id} className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{entry.date.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-3">{entry.content}</p>
                    <Badge variant="secondary" className={`mb-3 ${
                      entry.mood === 'grateful' ? 'bg-green-100 text-green-800' :
                      entry.mood === 'stressed' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {entry.mood}
                    </Badge>
                    {entry.aiReflection && (
                      <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded-r-lg">
                        <div className="flex items-start space-x-2">
                          <Heart className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-teal-800 mb-1">MindMate's Reflection</p>
                            <p className="text-sm text-teal-700">{entry.aiReflection}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Journal Prompts */}
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Writing Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {prompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => setCurrentEntry({ ...currentEntry, content: prompt + '\n\n' })}
                    className="w-full text-left justify-start h-auto p-3 text-sm border-lavender-200 hover:bg-lavender-50"
                  >
                    {prompt}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 bg-gradient-to-br from-teal-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Journaling Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <Heart className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <p>Write without judgment - let your thoughts flow freely</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Heart className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <p>Focus on how you feel, not just what happened</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Heart className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p>Try to write consistently, even if just a few sentences</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Heart className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p>Review past entries to see your growth over time</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
