
import React, { useState } from "react";
import { QuizQuestion } from "@/types/quiz";
import { getRelatedQuestions } from "@/utils/quizUtils";
import { Award, BookOpen, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AIRecommendationsProps {
  currentQuestion: QuizQuestion;
  allQuestions: QuizQuestion[];
  onQuestionSelect: (questionId: string) => void;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  currentQuestion,
  allQuestions,
  onQuestionSelect,
}) => {
  const [expanded, setExpanded] = useState(false);
  const relatedQuestions = getRelatedQuestions(currentQuestion, allQuestions);
  
  return (
    <div className="bg-heritage-paper rounded-xl mt-4 mb-6 overflow-hidden transition-all duration-300 ease-in-out border border-heritage-gold/20">
      <div 
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-heritage-gold/10 transition-colors duration-200"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <div className="rounded-full bg-heritage-teal/10 p-2 mr-3">
            <Lightbulb size={18} className="text-heritage-teal" />
          </div>
          <span className="font-medium">AI推荐学习</span>
        </div>
        <div className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="#3E2E20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4">
          <div className="mb-4">
            <h4 className="text-sm font-medium flex items-center mb-2">
              <BookOpen size={16} className="mr-2 text-heritage-red" />
              相关知识点
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentQuestion.knowledgePoints?.map((point, index) => (
                <Badge 
                  key={index}
                  className="bg-heritage-red/10 text-heritage-red border-none hover:bg-heritage-red/20 transition-all transform hover:scale-105"
                >
                  {point}
                </Badge>
              ))}
              {!currentQuestion.knowledgePoints?.length && (
                <span className="text-sm text-gray-500">暂无相关知识点</span>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium flex items-center mb-2">
              <Award size={16} className="mr-2 text-heritage-gold" />
              相关问题
            </h4>
            <div className="space-y-2">
              {relatedQuestions.map(question => (
                <div 
                  key={question.id}
                  onClick={() => onQuestionSelect(question.id)}
                  className="p-2 rounded-lg bg-white hover:bg-heritage-gold/5 cursor-pointer transition-all duration-200 transform hover:translate-x-1"
                >
                  <p className="text-sm">{question.question}</p>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-heritage-paper border-none text-xs text-heritage-text/70">
                      {question.category === "traditional" && "传统文化"}
                      {question.category === "opera" && "戏曲"}
                      {question.category === "crafts" && "传统工艺"}
                      {question.category === "festival" && "传统节日"}
                      {question.category === "general" && "通用知识"}
                    </Badge>
                  </div>
                </div>
              ))}
              {relatedQuestions.length === 0 && (
                <span className="text-sm text-gray-500">暂无相关问题</span>
              )}
            </div>
          </div>
          
          {currentQuestion.learningResources && currentQuestion.learningResources.length > 0 && (
            <div>
              <h4 className="text-sm font-medium flex items-center mb-2">
                <BookOpen size={16} className="mr-2 text-heritage-teal" />
                延伸阅读
              </h4>
              <div className="space-y-2">
                {currentQuestion.learningResources.map((resource, index) => (
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    key={index}
                    className="flex items-center p-2 rounded-lg bg-white hover:bg-heritage-teal/5 transition-all duration-200 transform hover:translate-x-1"
                  >
                    <div className="w-8 h-8 rounded bg-heritage-teal/10 flex items-center justify-center mr-3">
                      {resource.type === "article" && <BookOpen size={16} className="text-heritage-teal" />}
                      {resource.type === "video" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 10L18.2929 7.70711C18.6834 7.31658 19 6.5 19 6V6C19 4.89543 18.1046 4 17 4H7C5.89543 4 5 4.89543 5 6V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V18C19 17.5 18.6834 16.6834 18.2929 16.2929L16 14" stroke="#2C8E91" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 12L10 15V9L14 12Z" stroke="#2C8E91" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>}
                      {resource.type === "image" && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="4" width="16" height="16" rx="2" stroke="#2C8E91" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="8.5" cy="8.5" r="1.5" stroke="#2C8E91" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 20L10.5 13L13.5 16.5L18 11L20 13" stroke="#2C8E91" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{resource.title}</p>
                      <p className="text-xs text-gray-500">
                        {resource.type === "article" && "文章"}
                        {resource.type === "video" && "视频"}
                        {resource.type === "image" && "图片"}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
