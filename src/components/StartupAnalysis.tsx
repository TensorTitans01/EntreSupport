import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Loader2, ChevronDown, ChevronUp, TrendingUp, Users, Target, BarChart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription } from './ui/alert';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';
import type { Message } from '@/types/analysis';

const dummyAnalysis = {
  marketResearch: {
    marketSize: {
      value: "$12.5B",
      year: 2024,
      cagr: "8.2%"
    },
    competitors: [
      {
        name: "PawFresh Meals",
        description: "Direct competitor offering fresh cat food delivery",
        strengths: ["Established brand", "Wide delivery network", "Premium packaging"]
      },
      {
        name: "Kitty's Kitchen",
        description: "Local cat food preparation service",
        strengths: ["Personal touch", "Local ingredients", "Custom recipes"]
      }
    ],
    trends: [
      "Growing pet humanization trend",
      "Increasing focus on pet health and nutrition",
      "Rising demand for natural and organic pet food",
      "Subscription-based pet food services gaining popularity"
    ],
    sources: [
      "Pet Food Industry Report 2024",
      "Global Market Insights",
      "Consumer Pet Trends Survey"
    ]
  },
  teamResources: [
    {
      role: "Head Chef / Recipe Developer",
      description: "Responsible for creating nutritionally balanced cat food recipes",
      keySkills: ["Pet nutrition expertise", "Food safety certification", "Recipe development"],
      estimatedSalary: "$65,000 - $85,000",
      priority: "High"
    },
    {
      role: "Operations Manager",
      description: "Manages kitchen operations and delivery logistics",
      keySkills: ["Food service management", "Supply chain", "Team leadership"],
      estimatedSalary: "$55,000 - $75,000",
      priority: "High"
    },
    {
      role: "Veterinary Consultant",
      description: "Ensures recipes meet feline nutritional requirements",
      keySkills: ["Veterinary license", "Feline nutrition", "Food safety"],
      estimatedSalary: "$40,000 - $60,000 (Part-time)",
      priority: "Medium"
    }
  ],
  swotAnalysis: {
    strengths: [
      "Personalized approach to cat nutrition",
      "Fresh, human-grade ingredients",
      "Transparent recipe formulation",
      "Home delivery convenience"
    ],
    weaknesses: [
      "Higher cost compared to commercial cat food",
      "Limited shelf life of fresh products",
      "Initial kitchen setup costs",
      "Need for specialized storage and delivery"
    ],
    opportunities: [
      "Growing pet food market",
      "Increasing pet parent spending",
      "Expansion to multiple cities",
      "Partnership with veterinarians"
    ],
    threats: [
      "Strict food safety regulations",
      "Competition from large pet food companies",
      "Rising ingredient costs",
      "Customer retention challenges"
    ]
  }
};

interface AnalysisSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const StartupAnalysis = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const researchSteps = [
    "Gathering market data...",
    "Analyzing competitors...",
    "Identifying market trends...",
    "Evaluating team requirements...",
    "Performing SWOT analysis...",
    "Compiling final insights..."
  ];

  const renderMarketSection = (analysis: typeof dummyAnalysis) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Market Overview</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          Market Size: {analysis.marketResearch.marketSize.value}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-medium mb-2">Market Trends</h4>
          <ul className="space-y-2">
            {analysis.marketResearch.trends.map((trend, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-primary" />
                {trend}
              </motion.li>
            ))}
          </ul>
        </Card>
        <Card className="p-4">
          <h4 className="font-medium mb-2">Competitors</h4>
          {analysis.marketResearch.competitors.map((comp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="mb-4 last:mb-0"
            >
              <div className="font-medium text-primary">{comp.name}</div>
              <p className="text-sm text-muted-foreground">{comp.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {comp.strengths.map((strength, j) => (
                  <span key={j} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {strength}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </Card>
      </div>
    </div>
  );

  const renderTeamSection = (analysis: typeof dummyAnalysis) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Required Team</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {analysis.teamResources.map((role, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{role.role}</h4>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  role.priority === "High" ? "bg-red-100 text-red-600" :
                  role.priority === "Medium" ? "bg-yellow-100 text-yellow-600" :
                  "bg-green-100 text-green-600"
                )}>
                  {role.priority} Priority
                </span>
              </div>
              <div className="mt-4">
                <div className="text-sm font-medium">Required Skills:</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {role.keySkills.map((skill, j) => (
                    <span key={j} className="text-xs bg-secondary px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Estimated Salary: {role.estimatedSalary}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSwotSection = (analysis: typeof dummyAnalysis) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">SWOT Analysis</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="p-4 border-l-4 border-l-green-500">
            <h4 className="font-medium text-green-600 mb-2">Strengths</h4>
            <ul className="space-y-2">
              {analysis.swotAnalysis.strengths.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm"
                >
                  • {item}
                </motion.li>
              ))}
            </ul>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="p-4 border-l-4 border-l-red-500">
            <h4 className="font-medium text-red-600 mb-2">Weaknesses</h4>
            <ul className="space-y-2">
              {analysis.swotAnalysis.weaknesses.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm"
                >
                  • {item}
                </motion.li>
              ))}
            </ul>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="p-4 border-l-4 border-l-blue-500">
            <h4 className="font-medium text-blue-600 mb-2">Opportunities</h4>
            <ul className="space-y-2">
              {analysis.swotAnalysis.opportunities.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm"
                >
                  • {item}
                </motion.li>
              ))}
            </ul>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="p-4 border-l-4 border-l-yellow-500">
            <h4 className="font-medium text-yellow-600 mb-2">Threats</h4>
            <ul className="space-y-2">
              {analysis.swotAnalysis.threats.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm"
                >
                  • {item}
                </motion.li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      status: 'complete'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStep(0);

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'system',
      content: researchSteps[0],
      timestamp: new Date(),
      status: 'loading'
    };
    setMessages(prev => [...prev, loadingMessage]);

    // Progress animation
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + 1;
        
        // Update research step based on progress
        const stepIndex = Math.floor((newProgress / 100) * researchSteps.length);
        if (stepIndex < researchSteps.length && stepIndex !== currentStep) {
          setCurrentStep(stepIndex);
          setMessages(prev => prev.map(msg => 
            msg.id === loadingMessage.id 
              ? { ...msg, content: researchSteps[stepIndex] }
              : msg
          ));
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 100); // 100ms interval for smooth progress

    setTimeout(() => {
      clearInterval(progressInterval);
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));
      
      const analysisMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'agent',
        content: (
          <div className="space-y-6">
            <div className="text-sm text-muted-foreground">
              Based on comprehensive market research and AI-powered analysis, here's what I found about your startup idea:
            </div>
            
            {renderMarketSection(dummyAnalysis)}
            {renderTeamSection(dummyAnalysis)}
            {renderSwotSection(dummyAnalysis)}

            <Card className="p-4 mt-4">
              <h4 className="font-medium mb-2">Research Sources</h4>
              <ul className="text-sm text-muted-foreground">
                {dummyAnalysis.marketResearch.sources.map((source, i) => (
                  <li key={i}>• {source}</li>
                ))}
              </ul>
            </Card>
          </div>
        ),
        timestamp: new Date(),
        status: 'complete'
      };
      
      setMessages(prev => [...prev, analysisMessage]);
      setIsAnalyzing(false);
      setAnalysisProgress(100);
      setCurrentStep(0);
    }, 10000); // Increased to 10 seconds
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
      <Card className="mb-8 p-4 text-center bg-primary/5">
        <div className="flex items-center justify-center gap-2 text-primary">
          <BarChart className="h-5 w-5" />
          <h2 className="text-lg font-semibold">AI-Powered Market Research</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Advanced startup analysis using machine learning and real-time market data
        </p>
      </Card>

      <ScrollArea className="h-[600px] rounded-lg border p-4 mb-4">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "flex gap-3 p-4 rounded-lg",
                  message.type === 'user' && "bg-primary/5 ml-auto max-w-[80%]",
                  message.type === 'system' && "bg-muted",
                  message.type === 'agent' && "bg-card max-w-full",
                  message.type === 'error' && "bg-destructive/10"
                )}
              >
                {message.type === 'agent' && (
                  <BarChart className="h-6 w-6 flex-shrink-0 text-primary" />
                )}
                
                <div className="flex-1 overflow-hidden">
                  <div className="prose prose-sm dark:prose-invert">
                    {message.content}
                    {message.status === 'loading' && (
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">
                            {researchSteps[currentStep]}
                          </span>
                        </div>
                        <Progress value={analysisProgress} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's your startup idea? I'll analyze its market potential..."
          disabled={isAnalyzing}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={isAnalyzing || !input.trim()}
          className="gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing
            </>
          ) : (
            <>
              <BarChart className="h-4 w-4" />
              Analyze Market
            </>
          )}
        </Button>
      </form>

      {messages.length === 0 && (
        <Alert className="mt-4">
          <AlertDescription className="text-center text-sm text-muted-foreground">
            Enter your startup concept for in-depth market analysis and viability assessment
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default StartupAnalysis; 