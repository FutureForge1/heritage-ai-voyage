
import { useState, useEffect } from "react";
import { Check, X, ChevronRight, Award, Clock3, Loader2, Share2, ArrowRight, Trophy, Medal, Star, Users } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  category: "traditional" | "opera" | "crafts" | "festival" | "general";
}

interface QuizMode {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  questionCount: number;
  timeLimit: number;
  difficulty: "easy" | "medium" | "hard" | "mixed";
  rewards: {
    points: number;
    badges?: string[];
    special?: string;
  };
}

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar?: string;
  score: number;
  badges: string[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  unlocked: boolean;
}

const QuizPage = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQuizMode, setSelectedQuizMode] = useState<QuizMode | null>(null);
  const [streakCount, setStreakCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("daily");
  
  const { toast } = useToast();
  
  // Sample quiz questions
  const questions: QuizQuestion[] = [
    {
      id: "q1",
      question: "中国剪纸被列入联合国教科文组织的哪一项名录？",
      options: ["世界文化遗产", "人类非物质文化遗产代表作名录", "濒危语言名录", "世界记忆名录"],
      correctAnswer: 1,
      explanation: "中国剪纸于2009年被列入联合国教科文组织\"人类非物质文化遗产代表作名录\"。",
      difficulty: "easy",
      category: "crafts"
    },
    {
      id: "q2",
      question: "下列哪个不是京剧的\"四大名旦\"之一？",
      options: ["梅兰芳", "程砚秋", "尚小云", "李玉茹"],
      correctAnswer: 3,
      explanation: "京剧四大名旦是指梅兰芳、荀慧生、程砚秋和尚小云。李玉茹不在其中。",
      difficulty: "medium",
      category: "opera"
    },
    {
      id: "q3",
      question: "中国古代\"四大发明\"不包括以下哪一项？",
      options: ["指南针", "火药", "造纸术", "丝绸"],
      correctAnswer: 3,
      explanation: "中国古代四大发明是指造纸术、印刷术、火药和指南针，不包括丝绸。",
      difficulty: "easy",
      category: "general"
    },
    {
      id: "q4",
      question: "苏州园林与北京园林的主要风格差异是什么？",
      options: ["大小不同", "南方讲究精致雅致，北方讲究宏伟气势", "建筑材料不同", "历史长短不同"],
      correctAnswer: 1,
      explanation: "苏州园林属于江南园林，讲究精致雅致；北京园林属于北方园林，讲究宏伟气势。",
      difficulty: "medium",
      category: "traditional"
    },
    {
      id: "q5",
      question: "昆曲被称为什么？",
      options: ["百戏之祖", "戏曲之花", "国粹", "东方芭蕾"],
      correctAnswer: 0,
      explanation: "昆曲被誉为\"百戏之祖\"，是中国最古老的戏曲剧种之一。",
      difficulty: "medium",
      category: "opera"
    },
    {
      id: "q6",
      question: "端午节最初是为了纪念哪位历史人物？",
      options: ["孔子", "屈原", "岳飞", "关羽"],
      correctAnswer: 1,
      explanation: "端午节最初是为了纪念战国时期楚国诗人屈原。",
      difficulty: "easy",
      category: "festival"
    },
    {
      id: "q7",
      question: "中国四大名绣不包括以下哪一种？",
      options: ["苏绣", "湘绣", "粤绣", "蜀绣"],
      correctAnswer: 2,
      explanation: "中国四大名绣是指苏绣（江苏）、湘绣（湖南）、蜀绣（四川）和京绣（北京），不包括粤绣。",
      difficulty: "hard",
      category: "crafts"
    },
    {
      id: "q8",
      question: "五代十国时期的南唐后主是谁？",
      options: ["李煜", "李白", "李清照", "李世民"],
      correctAnswer: 0,
      explanation: "李煜是五代十国时期南唐的后主，也是著名的词人。",
      difficulty: "hard",
      category: "general"
    },
    {
      id: "q9",
      question: "中国传统乐器二胡的共鸣箱通常使用什么材料制作？",
      options: ["木材", "竹子", "蟒蛇皮", "牛角"],
      correctAnswer: 2,
      explanation: "传统二胡的共鸣箱通常使用蟒蛇皮蒙面，这赋予了二胡特有的音色。",
      difficulty: "medium",
      category: "traditional"
    },
    {
      id: "q10",
      question: "\"梁祝\"是哪种乐器的代表性曲目？",
      options: ["古筝", "二胡", "笛子", "琵琶"],
      correctAnswer: 1,
      explanation: "\"梁祝\"小提琴协奏曲是由中国作曲家何占豪、陈钢根据民间传说《梁山伯与祝英台》创作的，是二胡的代表性曲目之一。",
      difficulty: "medium",
      category: "traditional"
    }
  ];

  // Quiz modes
  const quizModes: QuizMode[] = [
    {
      id: "daily",
      name: "每日挑战",
      description: "每天5题，测试你的非遗知识",
      icon: Award,
      questionCount: 5,
      timeLimit: 30,
      difficulty: "mixed",
      rewards: {
        points: 100,
        badges: ["日常学习者"]
      }
    },
    {
      id: "quick",
      name: "闪电问答",
      description: "10题快速回答，时间有限",
      icon: Clock3,
      questionCount: 10,
      timeLimit: 15,
      difficulty: "easy",
      rewards: {
        points: 150,
        badges: ["反应迅速"]
      }
    },
    {
      id: "master",
      name: "非遗大师赛",
      description: "15道高难度题目，考验专业知识",
      icon: Trophy,
      questionCount: 15,
      timeLimit: 45,
      difficulty: "hard",
      rewards: {
        points: 300,
        badges: ["非遗专家"],
        special: "大师徽章"
      }
    },
    {
      id: "season",
      name: "文化之星季赛",
      description: "参与季度挑战，争夺文化之星称号",
      icon: Star,
      questionCount: 20,
      timeLimit: 30,
      difficulty: "mixed",
      rewards: {
        points: 500,
        special: "季度奖杯"
      }
    }
  ];

  const leaderboard: LeaderboardUser[] = [
    {
      rank: 1,
      name: "文化小达人",
      avatar: "/lovable-uploads/e6dab9a5-cae6-4e3b-ba66-e09d7f040f5b.png",
      score: 980,
      badges: ["非遗达人", "知识王", "传统音乐"]
    },
    {
      rank: 2,
      name: "非遗爱好者",
      avatar: "/lovable-uploads/872d313c-206d-42ef-9521-8793ba6f5366.png",
      score: 920,
      badges: ["戏曲专家", "书法大师"]
    },
    {
      rank: 3,
      name: "文化保护者",
      avatar: "/lovable-uploads/b2ecc6f9-f820-4bf5-866e-07ea8f1f90a5.png",
      score: 850,
      badges: ["季度冠军"]
    },
    {
      rank: 4,
      name: "剪纸艺术家",
      score: 780,
      badges: ["工艺达人"]
    },
    {
      rank: 5,
      name: "戏曲爱好者",
      score: 750,
      badges: ["京剧迷"]
    }
  ];

  const achievements: Achievement[] = [
    {
      id: "ach1",
      name: "初学者",
      description: "完成第一次竞答",
      icon: "🌱",
      progress: 1,
      total: 1,
      unlocked: true
    },
    {
      id: "ach2",
      name: "知识积累者",
      description: "完成10次竞答",
      icon: "📚",
      progress: 4,
      total: 10,
      unlocked: false
    },
    {
      id: "ach3",
      name: "连胜达人",
      description: "获得5题连续正确",
      icon: "🔥",
      progress: 3,
      total: 5,
      unlocked: false
    },
    {
      id: "ach4",
      name: "非遗专家",
      description: "在大师赛中获得90%以上的正确率",
      icon: "🏆",
      progress: 0,
      total: 1,
      unlocked: false
    },
    {
      id: "ach5",
      name: "全能文化大使",
      description: "在所有类别中至少完成一次满分",
      icon: "👑",
      progress: 2,
      total: 5,
      unlocked: false
    }
  ];
  
  useEffect(() => {
    // Load user data from session storage
    const storedPoints = sessionStorage.getItem("quizPoints");
    const storedAchievements = sessionStorage.getItem("quizAchievements");
    
    if (storedPoints) {
      setTotalPoints(parseInt(storedPoints));
    }
    
    if (storedAchievements) {
      setUnlockedAchievements(JSON.parse(storedAchievements));
    }
    
    let timer: number;
    if (quizStarted && !quizFinished && !isAnswered && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      
      if (timeLeft === 0) {
        handleAnswer(null);
      }
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [quizStarted, quizFinished, isAnswered, timeLeft]);
  
  const selectQuizMode = (mode: QuizMode) => {
    setSelectedQuizMode(mode);
  };
  
  const startQuiz = () => {
    if (!selectedQuizMode) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setQuizStarted(true);
      setQuizFinished(false);
      setCurrentQuestionIndex(0);
      setScore(0);
      setStreakCount(0);
      setTimeLeft(selectedQuizMode.timeLimit);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleAnswer = (optionIndex: number | null) => {
    setIsAnswered(true);
    setSelectedOption(optionIndex);
    
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    
    if (optionIndex === correctAnswer) {
      // Correct answer
      setScore(prev => prev + 1);
      setStreakCount(prev => prev + 1);
      
      // Award bonus points for streaks
      const streakBonus = streakCount >= 5 ? 20 : streakCount >= 3 ? 10 : 0;
      const questionPoints = 20 + streakBonus;
      
      // Update total points
      setTotalPoints(prev => prev + questionPoints);
      
      // Show toast for streak
      if (streakCount + 1 >= 3) {
        toast({
          title: `${streakCount + 1}连胜！`,
          description: `额外奖励 ${streakBonus} 点积分`,
        });
      }
    } else {
      // Reset streak on wrong answer
      setStreakCount(0);
    }
  };
  
  const nextQuestion = () => {
    if (!selectedQuizMode) return;
    
    if (currentQuestionIndex < selectedQuizMode.questionCount - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      setTimeLeft(selectedQuizMode.timeLimit);
    } else {
      finishQuiz();
    }
  };
  
  const finishQuiz = () => {
    setQuizFinished(true);
    
    // Calculate percentage
    if (!selectedQuizMode) return;
    
    const percentage = Math.round((score / selectedQuizMode.questionCount) * 100);
    
    // Add quiz mode rewards
    if (percentage >= 80) {
      setTotalPoints(prev => prev + selectedQuizMode.rewards.points);
      
      // Check for achievements
      if (percentage >= 90 && selectedQuizMode.id === "master") {
        if (!unlockedAchievements.includes("ach4")) {
          setUnlockedAchievements(prev => [...prev, "ach4"]);
          toast({
            title: "成就解锁！",
            description: "非遗专家：在大师赛中获得90%以上的正确率",
          });
        }
      }
      
      // Save to session storage
      sessionStorage.setItem("quizPoints", totalPoints.toString());
      sessionStorage.setItem("quizAchievements", JSON.stringify(unlockedAchievements));
    }
  };
  
  const restartQuiz = () => {
    setSelectedQuizMode(null);
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
  };
  
  const shareResult = () => {
    toast({
      title: "分享成功",
      description: "你的竞答成绩已分享到社区"
    });
  };
  
  const filterQuestions = (mode: QuizMode) => {
    // Filter questions based on difficulty
    let filteredQuestions = questions;
    
    if (mode.difficulty !== "mixed") {
      filteredQuestions = questions.filter(q => q.difficulty === mode.difficulty);
    }
    
    // If not enough questions, add from other difficulties
    if (filteredQuestions.length < mode.questionCount) {
      const additionalQuestions = questions.filter(q => q.difficulty !== mode.difficulty);
      filteredQuestions = [...filteredQuestions, ...additionalQuestions];
    }
    
    // Take required number of questions
    return filteredQuestions.slice(0, mode.questionCount);
  };
  
  const renderQuizContent = () => {
    if (!quizStarted && !selectedQuizMode) {
      return (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-2">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                {quizModes.map(mode => (
                  <TabsTrigger 
                    key={mode.id} 
                    value={mode.id}
                    className="data-[state=active]:bg-heritage-red data-[state=active]:text-white transition-all"
                  >
                    {mode.id === "daily" && <span className="inline-block animate-ping absolute h-2 w-2 rounded-full bg-heritage-gold opacity-75"></span>}
                    {mode.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {quizModes.map(mode => (
                <TabsContent key={mode.id} value={mode.id} className="focus-visible:outline-none">
                  <div 
                    className="border-2 border-heritage-gold/30 rounded-xl p-4 transform transition-all hover:shadow-md cursor-pointer hover:scale-[1.02] hover:border-heritage-gold"
                    onClick={() => selectQuizMode(mode)}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-heritage-red flex items-center justify-center text-white">
                        <mode.icon size={24} />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-bold text-lg font-song">{mode.name}</h3>
                        <p className="text-sm text-gray-600">{mode.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="bg-heritage-paper p-2 rounded">
                        <p className="font-medium text-heritage-red">{mode.questionCount}题</p>
                        <p className="text-xs text-gray-500">题目数量</p>
                      </div>
                      <div className="bg-heritage-paper p-2 rounded">
                        <p className="font-medium text-heritage-red">{mode.timeLimit}秒</p>
                        <p className="text-xs text-gray-500">每题时间</p>
                      </div>
                      <div className="bg-heritage-paper p-2 rounded">
                        <p className="font-medium text-heritage-red">{mode.rewards.points}</p>
                        <p className="text-xs text-gray-500">积分奖励</p>
                      </div>
                    </div>
                    
                    {mode.rewards.badges && (
                      <div className="flex gap-1 mt-3 flex-wrap">
                        {mode.rewards.badges.map((badge, index) => (
                          <Badge key={index} className="bg-heritage-gold/20 text-heritage-gold border-none">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {mode.rewards.special && (
                      <div className="mt-2">
                        <span className="text-xs bg-heritage-red/10 text-heritage-red px-2 py-1 rounded-full">
                          特别奖励: {mode.rewards.special}
                        </span>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium mb-3 flex items-center">
              <Trophy size={18} className="mr-1 text-heritage-gold" />
              竞答排行榜
            </h3>
            
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank} 
                  className="flex items-center justify-between p-2 border-b border-gray-100 last:border-none transform transition-all hover:-translate-x-1 duration-200"
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white mr-2 ${
                      user.rank === 1 ? "bg-heritage-gold" : 
                      user.rank === 2 ? "bg-heritage-teal/80" : 
                      "bg-heritage-teal/50"
                    }`}>
                      <span className="text-xs">{user.rank}</span>
                    </div>
                    <div className="flex items-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover mr-2" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-heritage-paper flex items-center justify-center mr-2">
                          <span className="text-xs text-heritage-text">{user.name.charAt(0)}</span>
                        </div>
                      )}
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-heritage-red font-medium">{user.score}</span>
                    
                    {user.rank <= 3 && (
                      <span className="ml-2 text-xs">
                        {user.rank === 1 && "🏆"}
                        {user.rank === 2 && "🥈"}
                        {user.rank === 3 && "🥉"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    if (!quizStarted && selectedQuizMode) {
      return (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-heritage-red rounded-full flex items-center justify-center text-white mx-auto">
              <selectedQuizMode.icon size={30} />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2 font-song">{selectedQuizMode.name}</h2>
          <p className="text-sm text-gray-600 mb-6">{selectedQuizMode.description}</p>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">题目数量</span>
              <span className="text-sm">{selectedQuizMode.questionCount}题</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">题目类型</span>
              <span className="text-sm">单选题</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">每题时间</span>
              <span className="text-sm">{selectedQuizMode.timeLimit}秒</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => setSelectedQuizMode(null)} 
              variant="outline"
              className="flex-1 border-heritage-gold/30"
            >
              返回
            </Button>
            
            <Button 
              onClick={startQuiz} 
              disabled={isLoading}
              className="flex-1 bg-heritage-red hover:bg-heritage-red/90 transition-transform hover:scale-105 duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  准备中...
                </>
              ) : "开始竞答"}
            </Button>
          </div>
        </div>
      );
    }
    
    if (quizFinished && selectedQuizMode) {
      const percentage = Math.round((score / selectedQuizMode.questionCount) * 100);
      let resultMessage = "";
      
      if (percentage >= 80) {
        resultMessage = "太厉害了！你是非遗文化达人！";
      } else if (percentage >= 60) {
        resultMessage = "不错的成绩，继续努力！";
      } else {
        resultMessage = "再接再厉，多了解非遗知识吧！";
      }
      
      return (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-2 text-center">{selectedQuizMode.name} 竞答结果</h2>
          
          <div className="my-6 text-center">
            <div className="w-24 h-24 rounded-full border-4 border-heritage-teal flex items-center justify-center mx-auto mb-3 text-heritage-teal relative animate-pulse">
              <span className="text-3xl font-bold">{percentage}%</span>
              {percentage >= 80 && (
                <span className="absolute -top-2 -right-2 text-xl">🏆</span>
              )}
            </div>
            <p className="font-medium">{resultMessage}</p>
            <p className="text-sm text-gray-500 mt-2">得分：{score}/{selectedQuizMode.questionCount}</p>
            
            {percentage >= 80 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-heritage-gold">
                  恭喜获得 {selectedQuizMode.rewards.points} 积分奖励！
                </p>
                
                {selectedQuizMode.rewards.badges && (
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {selectedQuizMode.rewards.badges.map((badge, index) => (
                      <Badge 
                        key={index} 
                        className="bg-heritage-gold text-white border-none transform transition-all hover:scale-110"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {selectedQuizMode.rewards.special && (
                  <div className="mt-3 transform transition-all hover:scale-110 inline-block">
                    <Badge className="bg-heritage-red text-white border-none px-3 py-1">
                      特别奖励: {selectedQuizMode.rewards.special}
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button 
              variant="outline" 
              className="border-heritage-gold/30 hover:bg-heritage-gold/10 transition-all"
              onClick={restartQuiz}
            >
              重新开始
            </Button>
            <Button 
              className="bg-heritage-teal hover:bg-heritage-teal/90 transition-transform hover:scale-105"
              onClick={shareResult}
            >
              <Share2 size={16} className="mr-2" />
              分享成绩
            </Button>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-3">知识点回顾</h3>
            <div className="space-y-4">
              {filterQuestions(selectedQuizMode).slice(0, score + 3).map((q, index) => (
                <div 
                  key={q.id} 
                  className="bg-heritage-paper/50 p-3 rounded-lg hover:bg-heritage-paper transition-all"
                >
                  <p className="font-medium text-sm mb-1">问题 {index + 1}：{q.question}</p>
                  <p className="text-xs text-heritage-text/80 mb-1">正确答案：{q.options[q.correctAnswer]}</p>
                  <p className="text-xs italic">{q.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    // Quiz in progress
    if (!selectedQuizMode) return null;
    
    const filteredQuestions = filterQuestions(selectedQuizMode);
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / selectedQuizMode.questionCount) * 100;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium flex items-center">
            <span className="bg-heritage-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
              {currentQuestionIndex + 1}
            </span>
            / {selectedQuizMode.questionCount}
          </p>
          
          <div className="flex items-center">
            <Clock3 size={16} className="mr-1" />
            <span className={`text-sm font-medium ${timeLeft <= 5 ? 'text-heritage-red animate-pulse' : ''}`}>
              {timeLeft}s
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm">得分: </span>
            <span className="text-heritage-red font-medium ml-1">{score}</span>
          </div>
        </div>
        
        <Progress 
          value={progressPercentage} 
          className="mb-6 h-2 bg-heritage-gold/20"
          indicatorClassName="bg-heritage-red transition-all duration-500" 
        />
        
        {streakCount >= 3 && (
          <div className="mb-4 bg-heritage-gold/10 p-2 rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium text-heritage-gold flex items-center">
              <span className="mr-1">🔥</span> {streakCount} 连胜
            </span>
            <Badge className="bg-heritage-gold border-none">
              +{streakCount >= 5 ? 20 : 10} 积分
            </Badge>
          </div>
        )}
        
        <div className="mb-6">
          <div className="mb-4 flex items-center">
            <Badge className="bg-heritage-paper border-heritage-gold/20 text-heritage-text mr-2">
              {currentQuestion.category === "traditional" && "传统文化"}
              {currentQuestion.category === "opera" && "戏曲"}
              {currentQuestion.category === "crafts" && "传统工艺"}
              {currentQuestion.category === "festival" && "传统节日"}
              {currentQuestion.category === "general" && "通用知识"}
            </Badge>
            <Badge className="bg-heritage-paper border-heritage-gold/20 text-heritage-text">
              {currentQuestion.difficulty === "easy" && "简单"}
              {currentQuestion.difficulty === "medium" && "中等"}
              {currentQuestion.difficulty === "hard" && "困难"}
            </Badge>
          </div>
          
          <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !isAnswered && handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 transform ${
                  isAnswered
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-500 scale-[1.02]'
                      : selectedOption === index
                        ? 'bg-red-50 border-red-500'
                        : 'border-gray-200'
                    : selectedOption === index
                      ? 'bg-heritage-paper border-heritage-gold scale-[1.02]'
                      : 'border-gray-200 hover:border-heritage-gold/50 hover:-translate-y-1 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isAnswered && (
                    index === currentQuestion.correctAnswer ? (
                      <Check size={18} className="text-green-500" />
                    ) : selectedOption === index ? (
                      <X size={18} className="text-red-500" />
                    ) : null
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {isAnswered && (
          <div className="mb-6">
            <div className={`p-3 rounded-lg ${
              selectedOption === currentQuestion.correctAnswer
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className="text-sm font-medium mb-1">
                {selectedOption === currentQuestion.correctAnswer ? '回答正确！' : '回答错误！'}
              </p>
              <p className="text-xs">{currentQuestion.explanation}</p>
            </div>
          </div>
        )}
        
        {isAnswered && (
          <Button 
            onClick={nextQuestion}
            className="w-full bg-heritage-teal hover:bg-heritage-teal/90 transition-transform hover:scale-105 duration-200"
          >
            {currentQuestionIndex < selectedQuizMode.questionCount - 1 ? '下一题' : '查看结果'}
            <ArrowRight size={16} className="ml-2" />
          </Button>
        )}
      </div>
    );
  };
  
  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <Header 
        title="非遗知识竞答" 
        subtitle="测试你的非遗知识水平"
        showBack={true}
        showNotification={false}
      />
      
      <div className="mx-auto max-w-lg px-4 py-4">
        {/* User stats */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">您的竞答积分</h3>
              <p className="text-2xl font-bold text-heritage-gold">{totalPoints}</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-600">等级</p>
              <div className="flex items-center">
                <Medal className="text-heritage-red mr-1" size={16} />
                <span className="font-medium">
                  {totalPoints < 300 ? "初学者" : 
                   totalPoints < 1000 ? "学习者" : 
                   totalPoints < 3000 ? "文化爱好者" : 
                   totalPoints < 7000 ? "文化达人" : "非遗专家"}
                </span>
              </div>
            </div>
          </div>
          
          {achievements.slice(0, 2).map(achievement => (
            <div key={achievement.id} className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm flex items-center">
                  <span className="mr-1">{achievement.icon}</span>
                  {achievement.name}
                </span>
                <span className="text-xs text-gray-500">{achievement.progress}/{achievement.total}</span>
              </div>
              <Progress 
                value={(achievement.progress / achievement.total) * 100}
                className="h-1.5 bg-heritage-gold/10"
                indicatorClassName="bg-heritage-gold"
              />
            </div>
          ))}
        </div>
        
        {/* Quiz content */}
        {renderQuizContent()}
      </div>
      
      <Navigation />
    </div>
  );
};

export default QuizPage;
