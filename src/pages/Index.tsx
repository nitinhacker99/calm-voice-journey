
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, BookOpen, BarChart3, Users, Mic } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [moodText, setMoodText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const quickMoodButtons = [
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 text-yellow-800' },
    { emoji: '😔', label: 'Sad', color: 'bg-blue-100 text-blue-800' },
    { emoji: '😰', label: 'Anxious', color: 'bg-purple-100 text-purple-800' },
    { emoji: '😴', label: 'Tired', color: 'bg-gray-100 text-gray-800' },
    { emoji: '😡', label: 'Angry', color: 'bg-red-100 text-red-800' },
    { emoji: '🤗', label: 'Grateful', color: 'bg-green-100 text-green-800' },
  ];

  const handleMoodSubmit = () => {
    if (moodText.trim()) {
      toast({
        title: "Mood recorded",
        description: "Thank you for sharing. Let's explore this together.",
      });
      navigate('/chat');
    }
  };

  const handleQuickMood = (mood: string) => {
    setMoodText(`I'm feeling ${mood.toLowerCase()} today.`);
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // Simulate voice input for demo
    setTimeout(() => {
      setIsListening(false);
      setMoodText("I've been feeling a bit overwhelmed lately with work and personal commitments.");
      toast({
        title: "Voice recorded",
        description: "Your message has been transcribed.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-teal-50 to-sage-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-lavender-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-teal-600" />
              <span className="text-2xl font-bold text-gray-800">MindMate</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <Button variant="ghost" onClick={() => navigate('/chat')} className="text-gray-700 hover:text-teal-600">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </Button>
              <Button variant="ghost" onClick={() => navigate('/journal')} className="text-gray-700 hover:text-teal-600">
                <BookOpen className="h-4 w-4 mr-2" />
                Journal
              </Button>
              <Button variant="ghost" onClick={() => navigate('/mood-history')} className="text-gray-700 hover:text-teal-600">
                <BarChart3 className="h-4 w-4 mr-2" />
                Mood History
              </Button>
              <Button variant="ghost" onClick={() => navigate('/emergency')} className="text-gray-700 hover:text-teal-600">
                <Users className="h-4 w-4 mr-2" />
                Emergency
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Your Mental Health
            <span className="text-teal-600"> Companion</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A safe space to share your thoughts, track your mood, and receive caring support whenever you need it.
          </p>
        </div>

        {/* Mood Check-in Card */}
        <Card className="mb-8 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-center">
              <Heart className="h-6 w-6 mr-2 text-teal-600" />
              How are you feeling today?
            </CardTitle>
            <CardDescription className="text-gray-600">
              Share your thoughts with text or voice - I'm here to listen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quick Mood Buttons */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {quickMoodButtons.map((mood) => (
                <Button
                  key={mood.label}
                  variant="outline"
                  onClick={() => handleQuickMood(mood.label)}
                  className={`h-auto p-4 flex flex-col items-center space-y-2 ${mood.color} border-0 hover:scale-105 transition-transform`}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-sm font-medium">{mood.label}</span>
                </Button>
              ))}
            </div>

            {/* Text Input */}
            <div className="space-y-4">
              <Textarea
                placeholder="Tell me about your day, your feelings, or what's on your mind..."
                value={moodText}
                onChange={(e) => setMoodText(e.target.value)}
                className="min-h-32 resize-none border-lavender-200 focus:border-teal-400 focus:ring-teal-400 text-gray-700"
              />
              <div className="flex space-x-3">
                <Button
                  onClick={startVoiceInput}
                  variant="outline"
                  disabled={isListening}
                  className="flex-1 border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  <Mic className={`h-4 w-4 mr-2 ${isListening ? 'animate-pulse text-red-500' : ''}`} />
                  {isListening ? 'Listening...' : 'Voice Input'}
                </Button>
                <Button
                  onClick={handleMoodSubmit}
                  disabled={!moodText.trim()}
                  className="flex-2 bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Share with MindMate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm group hover:scale-105 transform transition-transform">
            <CardContent className="p-6">
              <MessageCircle className="h-12 w-12 text-teal-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-800 mb-2">AI Chat Support</h3>
              <p className="text-sm text-gray-600">Empathetic conversations with your AI companion</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm group hover:scale-105 transform transition-transform">
            <CardContent className="p-6">
              <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-800 mb-2">Digital Journal</h3>
              <p className="text-sm text-gray-600">Reflect and process your thoughts safely</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm group hover:scale-105 transform transition-transform">
            <CardContent className="p-6">
              <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-800 mb-2">Mood Tracking</h3>
              <p className="text-sm text-gray-600">Visualize your emotional journey over time</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm group hover:scale-105 transform transition-transform">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-800 mb-2">Crisis Support</h3>
              <p className="text-sm text-gray-600">Immediate help when you need it most</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
