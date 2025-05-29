
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
      content: "Hello! Main MindMate hun, aapka caring AI companion. Main yahan aapki baat sunne aur support karne ke liye hun. Aaj aap kaisa feel kar rahe hain?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "Mera din kaisa gaya",
        "Main anxious feel kar raha hun",
        "Mujhe encouragement chahiye",
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
    console.log('User message received:', userMessage);
    
    const lowerMessage = userMessage.toLowerCase();
    
    // More personalized responses based on what user actually says
    let responseText = "";
    let suggestions: string[] = [];

    if (lowerMessage.includes('anxious') || lowerMessage.includes('pareshan') || lowerMessage.includes('worried')) {
      responseText = `Main samajh sakta hun ki aap anxious feel kar rahe hain. "${userMessage}" - ye jo aapne share kiya hai, bahut brave hai. Anxiety overwhelming lag sakti hai, lekin aap akele nahi hain. Kya aap mujhe batana chahenge ki specifically kya aapko anxious bana rha hai?`;
      suggestions = ["Kya breathing exercise kar sakte hain?", "Mujhe aur detail mein batao", "Koi solution suggest karo", "Kaise calm down karun?"];
    } 
    else if (lowerMessage.includes('sad') || lowerMessage.includes('udaas') || lowerMessage.includes('depressed')) {
      responseText = `Aapne kaha "${userMessage}" - main dekh sakta hun ki aap difficult time se guzar rahe hain. Sadness feel karna bilkul normal hai, aur aapke feelings valid hain. Kya aap mujhe bata sakte hain ki ye sadness kab se hai aur kya trigger kar rha hai?`;
      suggestions = ["Kya main kisi se baat karun?", "Mood better kaise banayein?", "Koi activity suggest karo", "Main kya karun?"];
    }
    else if (lowerMessage.includes('happy') || lowerMessage.includes('khush') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
      responseText = `Wow! Sunke bahut accha laga ki aap "${userMessage}" feel kar rahe hain! Ye positive energy beautiful hai. Main chahta hun ki aap is feeling ko celebrate karein. Kya aap mujhe bata sakte hain ki aaj kya special hua jo aapko itna khush bana rha hai?`;
      suggestions = ["Aur batao kya hua", "Ye feeling kaise maintain karun?", "Gratitude practice karein?", "Koi activity suggest karo"];
    }
    else if (lowerMessage.includes('work') || lowerMessage.includes('kaam') || lowerMessage.includes('job')) {
      responseText = `Work ke baare mein aapne kaha "${userMessage}". Office ya work stress bahut common hai aajkal. Main samajh sakta hun ki professional life challenging ho sakti hai. Kya aap specific bata sakte hain ki work mein kya problem aa rahi hai?`;
      suggestions = ["Work-life balance kaise banayein?", "Stress manage kaise karun?", "Boss se kaise deal karun?", "Career advice chahiye"];
    }
    else if (lowerMessage.includes('family') || lowerMessage.includes('ghar') || lowerMessage.includes('parents')) {
      responseText = `Family ke baare mein jo aapne share kiya "${userMessage}", main samajh sakta hun. Family relationships complex hote hain, kabhi supporting lagti hai kabhi challenging. Aap chahen to detail mein bata sakte hain ki family ke saath kya situation hai?`;
      suggestions = ["Family se communication kaise better karun?", "Conflicts kaise resolve karun?", "Boundaries kaise set karun?", "Understanding kaise badhayein?"];
    }
    else if (lowerMessage.includes('friend') || lowerMessage.includes('dost') || lowerMessage.includes('relationship')) {
      responseText = `Relationships ke baare mein aapne jo kaha "${userMessage}", ye important topic hai. Friendships aur relationships hamare mental health ke liye bahut crucial hain. Kya aap mujhe bata sakte hain ki is relationship mein specifically kya ho rha hai?`;
      suggestions = ["Friendship kaise improve karun?", "Trust issues kaise handle karun?", "Communication better kaise karun?", "Conflicts resolve kaise karun?"];
    }
    else {
      // Default response that acknowledges what user actually said
      responseText = `Aapne jo share kiya hai: "${userMessage}" - main appreciate karta hun ki aapne mujhe trust kiya. Har feeling aur thought important hai. Kya aap mujhe thoda aur detail mein bata sakte hain taaki main better understand kar sakun aur aapki help kar sakun?`;
      suggestions = ["Aur detail mein batao", "Kya main kisi professional se baat karun?", "Coping strategies batao", "Daily routine improve karne ke tips"];
    }

    return {
      id: Date.now().toString(),
      content: responseText,
      sender: 'ai',
      timestamp: new Date(),
      suggestions: suggestions
    };
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    console.log('Sending message:', content);

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Save to localStorage for mood tracking
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    chatHistory.push({
      message: content,
      timestamp: new Date().toISOString(),
      type: 'user_message'
    });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

    // Simulate realistic AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Save AI response to history
      const updatedHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
      updatedHistory.push({
        message: aiResponse.content,
        timestamp: new Date().toISOString(),
        type: 'ai_response'
      });
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
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
                <p className="text-sm text-gray-600">Aapka caring AI companion</p>
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
                  <span className="text-sm text-gray-600">MindMate soch raha hai...</span>
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
              placeholder="Apne thoughts share kariye..."
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
