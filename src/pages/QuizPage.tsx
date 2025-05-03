import { useState, useEffect } from "react";
import { Check, X, ChevronRight, Award, Clock3, Loader2, Share2, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
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
  const { toast } = useToast();
  
  // Sample quiz questions
  const questions: QuizQuestion[] = [
    {
      id: "q1",
      question: "中国剪纸被列入联合国教科文组织的哪一项名录？",
      options: ["世界文化遗产", "人类非物质文化遗产代表作名录", "濒危语言名录", "世界记忆名录"],
      correctAnswer: 1,
      explanation: "中国剪纸于2009年被列入联合国教科文组织\"人类非物质文化遗产代表作名录\"。"
    },
    {
      id: "q2",
      question: "下列哪个不是京剧的\"四大名旦\"之一？",
      options: ["梅兰芳", "程砚秋", "尚小云", "李玉茹"],
      correctAnswer: 3,
      explanation: "京剧四大名旦是指梅兰芳、荀慧生、程砚秋和尚小云。李玉茹不在其中。"
    },
    {
      id: "q3",
      question: "中国古代\"四大发明\"不包括以下哪一项？",
      options: ["指南针", "火药", "造纸术", "丝绸"],
      correctAnswer: 3,
      explanation: "中国古代四大发明是指造纸术、印刷术、火药和指南针，不包括丝绸。"
    },
    {
      id: "q4",
      question: "苏州园林与北京园林的主要风格差异是什么？",
      options: ["大小不同", "南方讲究精致雅致，北方讲究宏伟气势", "建筑材料不同", "历史长短不同"],
      correctAnswer: 1,
      explanation: "苏州园林属于江南园林，讲究精致雅致；北京园林属于北方园林，讲究宏伟气势。"
    },
    {
      id: "q5",
      question: "昆曲被称为什么？",
      options: ["百戏之祖", "戏曲之花", "国粹", "东方芭蕾"],
      correctAnswer: 0,
      explanation: "昆曲被誉为\"百戏之祖\"，是中国最古老的戏曲剧种之一。"
    }
  ];
  
  useEffect(() => {
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
  
  const startQuiz = () => {
    setIsLoading(true);
    setTimeout(() => {
      setQuizStarted(true);
      setQuizFinished(false);
      setCurrentQuestionIndex(0);
      setScore(0);
      setTimeLeft(30);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleAnswer = (optionIndex: number | null) => {
    setIsAnswered(true);
    setSelectedOption(optionIndex);
    
    if (optionIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      setTimeLeft(30);
    } else {
      setQuizFinished(true);
    }
  };
  
  const restartQuiz = () => {
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
  
  const renderQuizContent = () => {
    if (!quizStarted) {
      return (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-heritage-red rounded-full flex items-center justify-center text-white mx-auto">
              <Award size={30} />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2 font-song">非遗知识竞答</h2>
          <p className="text-sm text-gray-600 mb-6">测试你对中国传统文化的了解程度</p>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">题目数量</span>
              <span className="text-sm">{questions.length}题</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">题目类型</span>
              <span className="text-sm">单选题</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">每题时间</span>
              <span className="text-sm">30秒</span>
            </div>
          </div>
          
          <Button 
            onClick={startQuiz} 
            disabled={isLoading}
            className="w-full bg-heritage-red hover:bg-heritage-red/90"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                准备中...
              </>
            ) : "开始竞答"}
          </Button>
        </div>
      );
    }
    
    if (quizFinished) {
      const percentage = Math.round((score / questions.length) * 100);
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
          <h2 className="text-xl font-bold mb-2 text-center">竞答结果</h2>
          
          <div className="my-6 text-center">
            <div className="w-24 h-24 rounded-full border-4 border-heritage-teal flex items-center justify-center mx-auto mb-3 text-heritage-teal">
              <span className="text-3xl font-bold">{percentage}%</span>
            </div>
            <p className="font-medium">{resultMessage}</p>
            <p className="text-sm text-gray-500 mt-2">得分：{score}/{questions.length}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button 
              variant="outline" 
              className="border-heritage-gold/30"
              onClick={restartQuiz}
            >
              重新开始
            </Button>
            <Button 
              className="bg-heritage-teal hover:bg-heritage-teal/90"
              onClick={shareResult}
            >
              <Share2 size={16} className="mr-2" />
              分享成绩
            </Button>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-3">知识点回顾</h3>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={q.id} className="bg-heritage-paper/50 p-3 rounded-lg">
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
    const currentQuestion = questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium">
            问题 {currentQuestionIndex + 1}/{questions.length}
          </p>
          <div className="flex items-center">
            <Clock3 size={16} className="mr-1" />
            <span className={`text-sm font-medium ${timeLeft <= 5 ? 'text-heritage-red' : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
        
        <Progress value={progressPercentage} className="mb-6 h-2 bg-heritage-gold/20" />
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !isAnswered && handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full text-left p-3 rounded-lg border ${
                  isAnswered
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-500'
                      : selectedOption === index
                        ? 'bg-red-50 border-red-500'
                        : 'border-gray-200'
                    : selectedOption === index
                      ? 'bg-heritage-paper border-heritage-gold'
                      : 'border-gray-200 hover:border-heritage-gold/50'
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
            className="w-full bg-heritage-teal hover:bg-heritage-teal/90"
          >
            {currentQuestionIndex < questions.length - 1 ? '下一题' : '查看结果'}
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
      
      <div className="mx-auto max-w-lg px-4 py-6">
        {renderQuizContent()}
        
        {!quizStarted && (
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <h3 className="font-medium mb-3 flex items-center">
              <ChevronRight size={18} className="mr-1 text-heritage-red" />
              竞答排行榜
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-heritage-gold flex items-center justify-center text-white mr-2">
                    <span className="text-xs">1</span>
                  </div>
                  <span className="font-medium">文化小达人</span>
                </div>
                <span className="text-heritage-red">98分</span>
              </div>
              <div className="flex items-center justify-between p-2 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-heritage-teal/80 flex items-center justify-center text-white mr-2">
                    <span className="text-xs">2</span>
                  </div>
                  <span className="font-medium">非遗爱好者</span>
                </div>
                <span className="text-heritage-red">92分</span>
              </div>
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-heritage-teal/50 flex items-center justify-center text-white mr-2">
                    <span className="text-xs">3</span>
                  </div>
                  <span className="font-medium">文化保护者</span>
                </div>
                <span className="text-heritage-red">85分</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Navigation />
    </div>
  );
};

export default QuizPage;
