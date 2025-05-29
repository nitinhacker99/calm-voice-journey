
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, ArrowLeft, Calendar, TrendingUp, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MoodHistory = () => {
  const navigate = useNavigate();
  
  // Sample mood data - in real app, this would come from database
  const moodData = [
    { date: '2024-05-22', mood: 'Happy', score: 8, activities: ['Exercise', 'Friends'] },
    { date: '2024-05-23', mood: 'Anxious', score: 4, activities: ['Work', 'Deadlines'] },
    { date: '2024-05-24', mood: 'Content', score: 7, activities: ['Reading', 'Relaxation'] },
    { date: '2024-05-25', mood: 'Excited', score: 9, activities: ['Plans', 'Creativity'] },
    { date: '2024-05-26', mood: 'Tired', score: 5, activities: ['Long day', 'Sleep'] },
    { date: '2024-05-27', mood: 'Grateful', score: 8, activities: ['Family', 'Nature'] },
    { date: '2024-05-28', mood: 'Motivated', score: 8, activities: ['Goals', 'Progress'] },
  ];

  const chartData = moodData.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: item.score,
    mood: item.mood
  }));

  const moodFrequency = moodData.reduce((acc, item) => {
    acc[item.mood] = (acc[item.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const moodFrequencyData = Object.entries(moodFrequency).map(([mood, count]) => ({
    mood,
    count,
    color: getMoodColor(mood)
  }));

  function getMoodColor(mood: string) {
    const colors: Record<string, string> = {
      'Happy': '#10B981',
      'Excited': '#F59E0B',
      'Content': '#3B82F6',
      'Grateful': '#8B5CF6',
      'Motivated': '#EF4444',
      'Anxious': '#F97316',
      'Tired': '#6B7280',
      'Sad': '#1F2937'
    };
    return colors[mood] || '#6B7280';
  }

  const averageScore = (moodData.reduce((sum, item) => sum + item.score, 0) / moodData.length).toFixed(1);
  const trendDirection = moodData[moodData.length - 1].score > moodData[0].score ? 'up' : 'down';

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
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">Mood History</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-700 mb-2">{averageScore}</div>
              <div className="text-sm text-blue-600">Average Mood Score</div>
              <div className="text-xs text-blue-500 mt-1">Out of 10</div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">{moodData.length}</div>
              <div className="text-sm text-green-600">Days Tracked</div>
              <div className="text-xs text-green-500 mt-1">This week</div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className={`h-6 w-6 ${trendDirection === 'up' ? 'text-green-600' : 'text-orange-600'}`} />
                <span className="text-2xl font-bold text-purple-700">
                  {trendDirection === 'up' ? '↗️' : '↘️'}
                </span>
              </div>
              <div className="text-sm text-purple-600">Weekly Trend</div>
              <div className="text-xs text-purple-500 mt-1">
                {trendDirection === 'up' ? 'Improving' : 'Declining'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mood Trend Chart */}
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>Mood Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis domain={[0, 10]} stroke="#6b7280" />
                  <Tooltip 
                    labelFormatter={(label) => `Date: ${label}`}
                    formatter={(value, name) => [value, 'Mood Score']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Mood Frequency */}
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span>Mood Frequency</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={moodFrequencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="mood" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value) => [value, 'Frequency']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed History */}
        <Card className="mt-8 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-teal-600" />
              <span>Daily Entries</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moodData.slice().reverse().map((entry, index) => (
                <div key={entry.date} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString('en-US', { 
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                    <div>
                      <Badge 
                        className="mb-2"
                        style={{ 
                          backgroundColor: `${getMoodColor(entry.mood)}20`,
                          color: getMoodColor(entry.mood),
                          border: `1px solid ${getMoodColor(entry.mood)}40`
                        }}
                      >
                        {entry.mood}
                      </Badge>
                      <div className="flex flex-wrap gap-1">
                        {entry.activities.map((activity, actIndex) => (
                          <span key={actIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: getMoodColor(entry.mood) }}>
                      {entry.score}
                    </div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="mt-8 border-0 bg-gradient-to-br from-teal-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-teal-600" />
              <span>Weekly Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/60 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Positive Patterns</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Exercise and social activities boost your mood</li>
                  <li>• Nature and family time create lasting happiness</li>
                  <li>• Creative activities enhance your well-being</li>
                </ul>
              </div>
              <div className="p-4 bg-white/60 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Areas for Growth</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Work stress impacts your mood significantly</li>
                  <li>• Consider stress management techniques</li>
                  <li>• Prioritize sleep and rest when feeling tired</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoodHistory;
