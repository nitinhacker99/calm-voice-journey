
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Phone, ArrowLeft, AlertTriangle, Heart, MessageCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Emergency = () => {
  const navigate = useNavigate();

  const emergencyContacts = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 free and confidential support for people in distress',
      available: '24/7'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free, 24/7 support for those in crisis',
      available: '24/7'
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-HELP (4357)',
      description: 'Treatment referral and information service',
      available: '24/7'
    },
    {
      name: 'Emergency Services',
      number: '911',
      description: 'For immediate medical emergencies',
      available: '24/7'
    }
  ];

  const copingStrategies = [
    {
      title: 'Breathing Exercise',
      icon: '🫁',
      description: 'Breathe in for 4, hold for 4, exhale for 6',
      action: 'Start breathing exercise'
    },
    {
      title: 'Grounding Technique',
      icon: '🌱',
      description: '5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste',
      action: 'Begin grounding'
    },
    {
      title: 'Talk to MindMate',
      icon: '💬',
      description: 'Get immediate support from your AI companion',
      action: 'Open chat'
    },
    {
      title: 'Call a Friend',
      icon: '📞',
      description: 'Reach out to someone you trust',
      action: 'View contacts'
    }
  ];

  const handleEmergencyCall = (number: string) => {
    if (number === '911' || number === '988') {
      window.open(`tel:${number}`);
    } else if (number.includes('741741')) {
      toast({
        title: "Text HOME to 741741",
        description: "Opening your default messaging app...",
      });
    } else {
      window.open(`tel:${number}`);
    }
  };

  const handleCopingAction = (action: string) => {
    switch (action) {
      case 'Start breathing exercise':
        navigate('/breathing');
        break;
      case 'Open chat':
        navigate('/chat');
        break;
      default:
        toast({
          title: "Coping strategy activated",
          description: "Take your time with this technique.",
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-red-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="text-gray-600">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h1 className="text-2xl font-bold text-gray-800">Emergency Support</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Crisis Alert */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>If you're in immediate danger or having thoughts of self-harm, please call 911 or 988 right away.</strong>
            <br />
            You are not alone, and help is available 24/7.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-700">
                  <Phone className="h-5 w-5" />
                  <span>Emergency Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {contact.available}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{contact.description}</p>
                    <Button
                      onClick={() => handleEmergencyCall(contact.number)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      size="lg"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {contact.number}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Immediate Coping Strategies */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-700">
                  <Heart className="h-5 w-5" />
                  <span>Immediate Coping Strategies</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {copingStrategies.map((strategy, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border border-blue-100">
                    <div className="flex items-start space-x-3 mb-3">
                      <span className="text-2xl">{strategy.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{strategy.title}</h3>
                        <p className="text-sm text-gray-600">{strategy.description}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleCopingAction(strategy.action)}
                      variant="outline"
                      className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      {strategy.action}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Safety Plan */}
            <Card className="border-0 bg-gradient-to-br from-green-50 to-teal-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Users className="h-5 w-5" />
                  <span>Your Safety Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start space-x-2">
                    <Heart className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p>Remember: This crisis will pass</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Heart className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <p>You have survived difficult times before</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Heart className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p>There are people who care about you</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Heart className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <p>Professional help is always available</p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate('/chat')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Talk to MindMate Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Resources */}
        <Card className="mt-8 border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Important Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">If you're feeling suicidal:</h4>
                <ul className="space-y-1">
                  <li>• Call 988 or 911 immediately</li>
                  <li>• Stay with someone you trust</li>
                  <li>• Remove means of self-harm</li>
                  <li>• Go to your nearest emergency room</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">For ongoing support:</h4>
                <ul className="space-y-1">
                  <li>• Reach out to a mental health professional</li>
                  <li>• Join a support group</li>
                  <li>• Use mental health apps like MindMate</li>
                  <li>• Talk to trusted friends and family</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;
