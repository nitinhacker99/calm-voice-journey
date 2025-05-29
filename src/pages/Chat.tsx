
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, Send, ArrowLeft, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm MindMate, your caring AI companion. I'm here to listen and support you. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "Tell me about your day",
        "I'm feeling anxious",
        "I need some encouragement",
        "Help me relax"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    // Simple AI response simulation - in real app, this would call GPT-4 API
    const responses = {
      anxious: "I understand that anxiety can feel overwhelming. Let's take this one step at a time. Would you like to try a simple breathing exercise with me? Take a deep breath in for 4 counts, hold for 4, and exhale for 6. You're not alone in this.",
      sad: "I hear that you're going through a difficult time, and I want you to know that your feelings are completely valid. Sometimes sadness is our heart's way of processing important experiences. Would you like to talk about what's contributing to these feelings?",
      happy: "It's wonderful to hear that you're feeling positive! These moments of joy are precious. What's contributing to this good feeling today? Sometimes reflecting on positive experiences can help us appreciate them even more.",
      default: "Thank you for sharing that with me. I'm here to listen and support you. Your feelings matter, and it takes courage to reach out. How can I best help you right now?"
    };

    let responseText = responses.default;
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('nervous')) {
      responseText = responses.anxious;
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      responseText = responses.sad;
    } else if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
      responseText = responses.happy;
    }

    return {
      id: Date.now().toString(),
      content: responseText,
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "Tell me more about this",
        "What can help me feel better?",
        "I'd like some coping strategies",
        "Can you suggest an activity?"
      ]
    };
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-teal-50 to-sage-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-lavender-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="text-gray-600">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <Avatar className="bg-teal-100">
                <AvatarFallback className="text-teal-600">
                  <Heart className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold text-gray-800">MindMate</h1>
                <p className="text-sm text-gray-600">Your caring AI companion</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto px-4 py-6 pb-32">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                {message.sender === 'ai' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="w-8 h-8 bg-teal-100">
                      <AvatarFallback className="text-teal-600 text-xs">
                        <Heart className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">MindMate</span>
                  </div>
                )}
                <Card className={`${
                  message.sender === 'user' 
                    ? 'bg-teal-600 text-white border-0' 
                    : 'bg-white/70 backdrop-blur-sm border-lavender-200'
                } shadow-sm`}>
                  <CardContent className="p-4">
                    <p className={`text-sm ${message.sender === 'user' ? 'text-white' : 'text-gray-700'}`}>
                      {message.content}
                    </p>
                  </CardContent>
                </Card>
                
                {/* AI Suggestions */}
                {message.sender === 'ai' && message.suggestions && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Lightbulb className="h-3 w-3" />
                      <span>Suggestions:</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs text-teal-700 border-teal-200 hover:bg-teal-50 justify-start"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="w-8 h-8 bg-teal-100">
                    <AvatarFallback className="text-teal-600 text-xs">
                      <Heart className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">MindMate is typing...</span>
                </div>
                <Card className="bg-white/70 backdrop-blur-sm border-lavender-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-lavender-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Share your thoughts..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
              className="flex-1 border-lavender-200 focus:border-teal-400 focus:ring-teal-400"
            />
            <Button 
              onClick={() => sendMessage(inputMessage)}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
