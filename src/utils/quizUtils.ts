
import { QuizQuestion, QuizMode, KnowledgeNode } from "@/types/quiz";

export const filterQuestionsByMode = (questions: QuizQuestion[], mode: QuizMode): QuizQuestion[] => {
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
  
  // Shuffle and take required number of questions
  return shuffleArray([...filteredQuestions]).slice(0, mode.questionCount);
};

export const calculateStreakBonus = (streakCount: number): number => {
  if (streakCount >= 5) return 20;
  if (streakCount >= 3) return 10;
  return 0;
};

// Fisher-Yates shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Get related questions based on category, knowledge points and relations
export const getRelatedQuestions = (
  currentQuestion: QuizQuestion,
  allQuestions: QuizQuestion[],
  limit: number = 3
): QuizQuestion[] => {
  // Start with directly related questions if available
  let relatedQuestions: QuizQuestion[] = [];
  
  if (currentQuestion.relatedQuestions && currentQuestion.relatedQuestions.length > 0) {
    const directlyRelated = allQuestions.filter(q => 
      currentQuestion.relatedQuestions?.includes(q.id) && q.id !== currentQuestion.id
    );
    relatedQuestions = [...relatedQuestions, ...directlyRelated];
  }
  
  // If we don't have enough, add questions from same category
  if (relatedQuestions.length < limit) {
    const categoryRelated = allQuestions.filter(q => 
      q.category === currentQuestion.category && 
      q.id !== currentQuestion.id &&
      !relatedQuestions.some(rq => rq.id === q.id)
    );
    relatedQuestions = [...relatedQuestions, ...shuffleArray(categoryRelated)];
  }
  
  // If we still don't have enough, add questions with shared knowledge points
  if (relatedQuestions.length < limit && currentQuestion.knowledgePoints) {
    const knowledgePointsRelated = allQuestions.filter(q => 
      q.knowledgePoints?.some(kp => currentQuestion.knowledgePoints?.includes(kp)) &&
      q.id !== currentQuestion.id &&
      !relatedQuestions.some(rq => rq.id === q.id)
    );
    relatedQuestions = [...relatedQuestions, ...shuffleArray(knowledgePointsRelated)];
  }
  
  // Return limited number of related questions
  return relatedQuestions.slice(0, limit);
};

// Analyze user's knowledge gaps based on answered questions
export const analyzeKnowledgeGaps = (
  answeredQuestions: { question: QuizQuestion, correct: boolean }[],
  allCategories: string[]
): string[] => {
  // Count incorrect answers per category
  const categoryErrors: Record<string, number> = {};
  const categoryAttempts: Record<string, number> = {};
  
  answeredQuestions.forEach(({question, correct}) => {
    const category = question.category;
    categoryAttempts[category] = (categoryAttempts[category] || 0) + 1;
    if (!correct) {
      categoryErrors[category] = (categoryErrors[category] || 0) + 1;
    }
  });
  
  // Calculate error rate per category
  const weakCategories = allCategories
    .filter(category => categoryAttempts[category] >= 3) // Only consider categories with enough attempts
    .map(category => ({
      category,
      errorRate: categoryErrors[category] / categoryAttempts[category] || 0
    }))
    .filter(item => item.errorRate > 0.4) // Consider categories with >40% error rate as weak
    .map(item => item.category);
  
  return weakCategories;
};

// Generate a visual knowledge map structure
export const generateKnowledgeMap = (
  knowledgeNodes: KnowledgeNode[], 
  centerId: string
): { nodes: any[], links: any[] } => {
  // Find the center node
  const centerNode = knowledgeNodes.find(node => node.id === centerId);
  if (!centerNode) {
    return { nodes: [], links: [] };
  }
  
  // Create a map structure with the center node and its direct connections
  const includedNodeIds = new Set([centerId]);
  const directConnections = knowledgeNodes.filter(node => 
    centerNode.connections.includes(node.id)
  );
  
  directConnections.forEach(node => includedNodeIds.add(node.id));
  
  // Add secondary connections for a richer graph
  const secondaryConnections = knowledgeNodes.filter(node => 
    !includedNodeIds.has(node.id) && 
    directConnections.some(dc => dc.connections.includes(node.id))
  ).slice(0, 5); // Limit secondary connections
  
  secondaryConnections.forEach(node => includedNodeIds.add(node.id));
  
  // Create the nodes and links arrays for visualization
  const nodes = [
    { id: centerNode.id, label: centerNode.title, category: centerNode.category, level: 0 },
    ...directConnections.map(node => ({
      id: node.id,
      label: node.title,
      category: node.category,
      level: 1,
    })),
    ...secondaryConnections.map(node => ({
      id: node.id,
      label: node.title,
      category: node.category,
      level: 2,
    })),
  ];
  
  const links = [
    // Links from center to direct connections
    ...directConnections.map(node => ({
      source: centerNode.id,
      target: node.id,
      value: 2,
    })),
    // Links between direct connections and secondary connections
    ...secondaryConnections.flatMap(sc => {
      return directConnections
        .filter(dc => dc.connections.includes(sc.id))
        .map(dc => ({
          source: dc.id,
          target: sc.id,
          value: 1,
        }));
    }),
  ];
  
  return { nodes, links };
};
