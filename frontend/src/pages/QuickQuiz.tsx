import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Timer as TimerIcon, Trophy, User, Zap, Star, ArrowRight, Check, X, RotateCcw, Heart, Target, Award } from 'lucide-react';

// Complete question bank with 50+ questions for daily rotation
const questionBank = [
  {
    id: 1,
    question: "What does 'こんにちは' mean?",
    options: ["Good morning", "Good afternoon", "Good evening", "Goodbye"],
    correct: 1,
    explanation: "こんにちは (konnichiwa) means 'Good afternoon' or 'Hello' during the day."
  },
  {
    id: 2,
    question: "Which of these means 'water'?",
    options: ["火 (hi)", "水 (mizu)", "土 (tsuchi)", "空 (sora)"],
    correct: 1,
    explanation: "水 (mizu) means 'water' in Japanese."
  },
  {
    id: 3,
    question: "What is the Japanese word for 'thank you'?",
    options: ["すみません (sumimasen)", "ありがとう (arigatou)", "おはよう (ohayou)", "さようなら (sayounara)"],
    correct: 1,
    explanation: "ありがとう (arigatou) means 'thank you' in Japanese."
  },
  {
    id: 4,
    question: "Which number is '三'?",
    options: ["1", "2", "3", "4"],
    correct: 2,
    explanation: "三 (san) means 'three' in Japanese."
  },
  {
    id: 5,
    question: "What does 'おはようございます' mean?",
    options: ["Good night", "Good morning", "Good afternoon", "See you later"],
    correct: 1,
    explanation: "おはようございます (ohayou gozaimasu) is a formal way to say 'Good morning'."
  },
  {
    id: 6,
    question: "Which color is '赤'?",
    options: ["Blue", "Red", "Green", "Yellow"],
    correct: 1,
    explanation: "赤 (aka) means 'red' in Japanese."
  },
  {
    id: 7,
    question: "What is '食べる' in English?",
    options: ["To drink", "To eat", "To sleep", "To walk"],
    correct: 1,
    explanation: "食べる (taberu) means 'to eat' in Japanese."
  },
  {
    id: 8,
    question: "Which is the correct way to say 'I am'?",
    options: ["私は (watashi wa)", "あなたは (anata wa)", "彼は (kare wa)", "彼女は (kanojo wa)"],
    correct: 0,
    explanation: "私は (watashi wa) means 'I am' in Japanese."
  },
  {
    id: 9,
    question: "What does '大きい' mean?",
    options: ["Small", "Big", "New", "Old"],
    correct: 1,
    explanation: "大きい (ookii) means 'big' or 'large' in Japanese."
  },
  {
    id: 10,
    question: "Which word means 'family'?",
    options: ["友達 (tomodachi)", "家族 (kazoku)", "先生 (sensei)", "学生 (gakusei)"],
    correct: 1,
    explanation: "家族 (kazoku) means 'family' in Japanese."
  },
  {
    id: 11,
    question: "What does 'ありがとうございます' mean?",
    options: ["Thank you very much", "You're welcome", "Goodbye", "Hello"],
    correct: 0,
    explanation: "ありがとうございます (arigatou gozaimasu) is a formal way to say 'thank you very much'."
  },
  {
    id: 12,
    question: "Which number is '五'?",
    options: ["3", "4", "5", "6"],
    correct: 2,
    explanation: "五 (go) means 'five' in Japanese."
  },
  {
    id: 13,
    question: "What is '飲む' in English?",
    options: ["To eat", "To drink", "To sleep", "To walk"],
    correct: 1,
    explanation: "飲む (nomu) means 'to drink' in Japanese."
  },
  {
    id: 14,
    question: "Which color is '青'?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correct: 1,
    explanation: "青 (ao) means 'blue' in Japanese."
  },
  {
    id: 15,
    question: "What does '小さい' mean?",
    options: ["Big", "Small", "New", "Old"],
    correct: 1,
    explanation: "小さい (chiisai) means 'small' in Japanese."
  },
  {
    id: 16,
    question: "Which word means 'friend'?",
    options: ["家族 (kazoku)", "友達 (tomodachi)", "先生 (sensei)", "学生 (gakusei)"],
    correct: 1,
    explanation: "友達 (tomodachi) means 'friend' in Japanese."
  },
  {
    id: 17,
    question: "What does 'さようなら' mean?",
    options: ["Hello", "Thank you", "Goodbye", "Good morning"],
    correct: 2,
    explanation: "さようなら (sayounara) means 'goodbye' in Japanese."
  },
  {
    id: 18,
    question: "Which number is '一'?",
    options: ["0", "1", "2", "3"],
    correct: 1,
    explanation: "一 (ichi) means 'one' in Japanese."
  },
  {
    id: 19,
    question: "What is '行く' in English?",
    options: ["To come", "To go", "To stay", "To leave"],
    correct: 1,
    explanation: "行く (iku) means 'to go' in Japanese."
  },
  {
    id: 20,
    question: "Which color is '緑'?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correct: 2,
    explanation: "緑 (midori) means 'green' in Japanese."
  },
  {
    id: 21,
    question: "What does '新しい' mean?",
    options: ["Old", "New", "Big", "Small"],
    correct: 1,
    explanation: "新しい (atarashii) means 'new' in Japanese."
  },
  {
    id: 22,
    question: "Which word means 'teacher'?",
    options: ["学生 (gakusei)", "先生 (sensei)", "友達 (tomodachi)", "家族 (kazoku)"],
    correct: 1,
    explanation: "先生 (sensei) means 'teacher' in Japanese."
  },
  {
    id: 23,
    question: "What does 'おやすみなさい' mean?",
    options: ["Good morning", "Good afternoon", "Good evening", "Good night"],
    correct: 3,
    explanation: "おやすみなさい (oyasuminasai) means 'good night' in Japanese."
  },
  {
    id: 24,
    question: "Which number is '二'?",
    options: ["1", "2", "3", "4"],
    correct: 1,
    explanation: "二 (ni) means 'two' in Japanese."
  },
  {
    id: 25,
    question: "What is '来る' in English?",
    options: ["To go", "To come", "To stay", "To leave"],
    correct: 1,
    explanation: "来る (kuru) means 'to come' in Japanese."
  },
  {
    id: 26,
    question: "Which color is '黄色'?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correct: 3,
    explanation: "黄色 (kiiro) means 'yellow' in Japanese."
  },
  {
    id: 27,
    question: "What does '古い' mean?",
    options: ["New", "Old", "Big", "Small"],
    correct: 1,
    explanation: "古い (furui) means 'old' in Japanese."
  },
  {
    id: 28,
    question: "Which word means 'student'?",
    options: ["先生 (sensei)", "学生 (gakusei)", "友達 (tomodachi)", "家族 (kazoku)"],
    correct: 1,
    explanation: "学生 (gakusei) means 'student' in Japanese."
  },
  {
    id: 29,
    question: "What does 'こんばんは' mean?",
    options: ["Good morning", "Good afternoon", "Good evening", "Good night"],
    correct: 2,
    explanation: "こんばんは (konbanwa) means 'good evening' in Japanese."
  },
  {
    id: 30,
    question: "Which number is '四'?",
    options: ["2", "3", "4", "5"],
    correct: 2,
    explanation: "四 (yon/shi) means 'four' in Japanese."
  },
  {
    id: 31,
    question: "What is '見る' in English?",
    options: ["To hear", "To see", "To feel", "To touch"],
    correct: 1,
    explanation: "見る (miru) means 'to see' or 'to look' in Japanese."
  },
  {
    id: 32,
    question: "Which color is '白'?",
    options: ["Black", "White", "Gray", "Brown"],
    correct: 1,
    explanation: "白 (shiro) means 'white' in Japanese."
  },
  {
    id: 33,
    question: "What does '美しい' mean?",
    options: ["Ugly", "Beautiful", "Big", "Small"],
    correct: 1,
    explanation: "美しい (utsukushii) means 'beautiful' in Japanese."
  },
  {
    id: 34,
    question: "Which word means 'mother'?",
    options: ["父 (chichi)", "母 (haha)", "兄 (ani)", "姉 (ane)"],
    correct: 1,
    explanation: "母 (haha) means 'mother' in Japanese."
  },
  {
    id: 35,
    question: "What does 'いただきます' mean?",
    options: ["Thank you", "You're welcome", "Let's eat", "Goodbye"],
    correct: 2,
    explanation: "いただきます (itadakimasu) is said before eating, meaning 'let's eat' or 'thank you for the food'."
  },
  {
    id: 36,
    question: "Which number is '六'?",
    options: ["4", "5", "6", "7"],
    correct: 2,
    explanation: "六 (roku) means 'six' in Japanese."
  },
  {
    id: 37,
    question: "What is '聞く' in English?",
    options: ["To speak", "To hear", "To listen", "To talk"],
    correct: 2,
    explanation: "聞く (kiku) means 'to listen' or 'to hear' in Japanese."
  },
  {
    id: 38,
    question: "Which color is '黒'?",
    options: ["White", "Black", "Gray", "Brown"],
    correct: 1,
    explanation: "黒 (kuro) means 'black' in Japanese."
  },
  {
    id: 39,
    question: "What does '強い' mean?",
    options: ["Weak", "Strong", "Big", "Small"],
    correct: 1,
    explanation: "強い (tsuyoi) means 'strong' in Japanese."
  },
  {
    id: 40,
    question: "Which word means 'father'?",
    options: ["母 (haha)", "父 (chichi)", "兄 (ani)", "姉 (ane)"],
    correct: 1,
    explanation: "父 (chichi) means 'father' in Japanese."
  },
  {
    id: 41,
    question: "What does 'ごちそうさまでした' mean?",
    options: ["Thank you", "You're welcome", "Thank you for the meal", "Goodbye"],
    correct: 2,
    explanation: "ごちそうさまでした (gochisousama deshita) is said after eating, meaning 'thank you for the meal'."
  },
  {
    id: 42,
    question: "Which number is '七'?",
    options: ["5", "6", "7", "8"],
    correct: 2,
    explanation: "七 (nana/shichi) means 'seven' in Japanese."
  },
  {
    id: 43,
    question: "What is '話す' in English?",
    options: ["To listen", "To speak", "To hear", "To talk"],
    correct: 1,
    explanation: "話す (hanasu) means 'to speak' or 'to talk' in Japanese."
  },
  {
    id: 44,
    question: "Which color is '茶色'?",
    options: ["Black", "White", "Brown", "Gray"],
    correct: 2,
    explanation: "茶色 (chairo) means 'brown' in Japanese."
  },
  {
    id: 45,
    question: "What does '弱い' mean?",
    options: ["Strong", "Weak", "Big", "Small"],
    correct: 1,
    explanation: "弱い (yowai) means 'weak' in Japanese."
  },
  {
    id: 46,
    question: "Which word means 'older brother'?",
    options: ["姉 (ane)", "兄 (ani)", "弟 (otouto)", "妹 (imouto)"],
    correct: 1,
    explanation: "兄 (ani) means 'older brother' in Japanese."
  },
  {
    id: 47,
    question: "What does 'すみません' mean?",
    options: ["Thank you", "You're welcome", "Excuse me", "Goodbye"],
    correct: 2,
    explanation: "すみません (sumimasen) means 'excuse me' or 'sorry' in Japanese."
  },
  {
    id: 48,
    question: "Which number is '八'?",
    options: ["6", "7", "8", "9"],
    correct: 2,
    explanation: "八 (hachi) means 'eight' in Japanese."
  },
  {
    id: 49,
    question: "What is '書く' in English?",
    options: ["To read", "To write", "To speak", "To listen"],
    correct: 1,
    explanation: "書く (kaku) means 'to write' in Japanese."
  },
  {
    id: 50,
    question: "Which color is '灰色'?",
    options: ["Black", "White", "Gray", "Brown"],
    correct: 2,
    explanation: "灰色 (haiiro) means 'gray' in Japanese."
  }
];

// Function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to get daily questions (30 questions per day, shuffled)
const getDailyQuestions = (): typeof questionBank => {
  const today = new Date().toDateString();
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Use seed to get consistent questions for the day
  const shuffled = shuffleArray(questionBank);
  return shuffled.slice(0, 30);
};

// Animated background using CSS
const AnimatedBackground: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="w-full h-full bg-gradient-to-br from-purple-700 via-blue-600 to-pink-500 animate-gradient-x opacity-80"></div>
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {/* Sparkle particles */}
      {[...Array(30)].map((_, i) => (
        <span
          key={i}
          className={`absolute block w-2 h-2 rounded-full bg-white opacity-30 animate-sparkle${i % 5}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  </div>
);

// Timer component with animated countdown
const Timer: React.FC<{ timeLeft: number; totalTime: number }> = ({ timeLeft, totalTime }) => {
  const percentage = (timeLeft / totalTime) * 100;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative">
      <svg className="w-32 h-32 transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
          <div className="text-sm text-white/80">Time Left</div>
        </div>
      </div>
    </div>
  );
};

// Progress bar component
const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Power-ups component
const PowerUps: React.FC<{ 
  onFiftyFifty: () => void; 
  onHint: () => void; 
  onSkip: () => void;
  fiftyFiftyUsed: boolean;
  hintUsed: boolean;
  skipUsed: boolean;
}> = ({ onFiftyFifty, onHint, onSkip, fiftyFiftyUsed, hintUsed, skipUsed }) => (
  <div className="flex space-x-4 mb-6">
    <button
      onClick={onFiftyFifty}
      disabled={fiftyFiftyUsed}
      className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
        fiftyFiftyUsed 
          ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
          : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
      }`}
    >
      <Target className="w-4 h-4 mr-2" />
      50/50
    </button>
    <button
      onClick={onHint}
      disabled={hintUsed}
      className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
        hintUsed 
          ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
          : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105'
      }`}
    >
      <Heart className="w-4 h-4 mr-2" />
      Hint
    </button>
    <button
      onClick={onSkip}
      disabled={skipUsed}
      className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
        skipUsed 
          ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
          : 'bg-purple-500 text-white hover:bg-purple-600 hover:scale-105'
      }`}
    >
      <RotateCcw className="w-4 h-4 mr-2" />
      Skip
    </button>
  </div>
);

// Confetti effect component
const Confetti: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            backgroundColor: ['#fbbf24', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

const QuickQuiz: React.FC = () => {
  const [quizState, setQuizState] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [powerUpsUsed, setPowerUpsUsed] = useState({
    fiftyFifty: false,
    hint: false,
    skip: false
  });
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [dailyQuestions, setDailyQuestions] = useState(getDailyQuestions());
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (quizState === 'quiz' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Time's up - move to next question or end quiz
            if (currentQuestion < dailyQuestions.length - 1) {
              nextQuestion();
            } else {
              endQuiz();
            }
            return 30; // Reset timer for next question
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, quizState, currentQuestion, dailyQuestions.length]);

  const startQuiz = () => {
    setQuizState('quiz');
    setTimeLeft(30);
    setScore(0);
    setStreak(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setPowerUpsUsed({ fiftyFifty: false, hint: false, skip: false });
    setEliminatedOptions([]);
    setShowHint(false);
    // Get fresh daily questions
    setDailyQuestions(getDailyQuestions());
  };

  const endQuiz = () => {
    setQuizState('results');
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    const isCorrect = answerIndex === dailyQuestions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(prev => prev + 10 + (streak * 2)); // Bonus points for streaks
      setStreak(prev => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setStreak(0);
    }
    
    setTimeout(() => {
      if (currentQuestion < dailyQuestions.length - 1) {
        nextQuestion();
      } else {
        endQuiz();
      }
    }, 1500);
  };

  const nextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
    setSelectedAnswer(null);
    setAnswered(false);
    setEliminatedOptions([]);
    setShowHint(false);
    setTimeLeft(30); // Reset timer for next question
  };

  const useFiftyFifty = () => {
    if (powerUpsUsed.fiftyFifty) return;
    
    const correctAnswer = dailyQuestions[currentQuestion].correct;
    const wrongOptions = [0, 1, 2, 3].filter(i => i !== correctAnswer);
    const eliminated = wrongOptions.slice(0, 2);
    
    setEliminatedOptions(eliminated);
    setPowerUpsUsed(prev => ({ ...prev, fiftyFifty: true }));
  };

  const useHint = () => {
    if (powerUpsUsed.hint) return;
    
    setShowHint(true);
    setPowerUpsUsed(prev => ({ ...prev, hint: true }));
  };

  const useSkip = () => {
    if (powerUpsUsed.skip) return;
    
    setPowerUpsUsed(prev => ({ ...prev, skip: true }));
    nextQuestion();
  };

  const restartQuiz = () => {
    setQuizState('intro');
  };

  if (quizState === 'intro') {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <Confetti show={showConfetti} />
        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-16 flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 text-yellow-400 animate-bounce mr-2" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
              Quick Quiz
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-8 animate-fade-in">
            30 questions <span className="mx-2">•</span> 30 seconds each <span className="mx-2">•</span> <span className="text-yellow-300 font-bold">Level Up Instantly!</span>
          </p>
          <div className="flex flex-col items-center space-y-4 mb-10">
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 text-white text-lg font-semibold shadow-lg backdrop-blur-md">
                <TimerIcon className="w-6 h-6 mr-2 text-blue-300 animate-pulse" />
                <span>Beat the clock</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 text-white text-lg font-semibold shadow-lg backdrop-blur-md">
                <Trophy className="w-6 h-6 mr-2 text-yellow-300 animate-bounce" />
                <span>Win trophies</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 text-white text-lg font-semibold shadow-lg backdrop-blur-md">
                <Zap className="w-6 h-6 mr-2 text-pink-300 animate-spin-slow" />
                <span>Power-ups</span>
              </div>
            </div>
          </div>
          <button
            onClick={startQuiz}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:scale-105 hover:from-yellow-300 hover:to-purple-700 transition-all duration-300 flex items-center group"
          >
            Start Quick Quiz
            <ArrowRight className="w-8 h-8 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    );
  }

  if (quizState === 'quiz') {
    const question = dailyQuestions[currentQuestion];
    
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-purple-700 via-blue-600 to-pink-500">
        <Confetti show={showConfetti} />
        <div className="container mx-auto px-6 py-8">
          {/* Header with timer and progress */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
                          <div className="text-white">
              <div className="text-2xl font-bold">Question {currentQuestion + 1}/30</div>
              <div className="text-sm opacity-80">Score: {score} | Streak: {streak}</div>
            </div>
            </div>
            <Timer timeLeft={timeLeft} totalTime={30} />
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <ProgressBar current={currentQuestion + 1} total={30} />
          </div>

          {/* Power-ups */}
          <PowerUps
            onFiftyFifty={useFiftyFifty}
            onHint={useHint}
            onSkip={useSkip}
            fiftyFiftyUsed={powerUpsUsed.fiftyFifty}
            hintUsed={powerUpsUsed.hint}
            skipUsed={powerUpsUsed.skip}
          />

          {/* Question card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed">
              {question.question}
            </h2>
            
            {showHint && (
              <div className="mb-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
                <div className="text-yellow-300 font-semibold mb-2">💡 Hint:</div>
                <div className="text-white/90">{question.explanation}</div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option: string, index: number) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correct;
                const isEliminated = eliminatedOptions.includes(index);
                const showResult = answered && (isSelected || isCorrect);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={answered || isEliminated}
                    className={`p-4 rounded-xl text-left transition-all duration-300 font-medium ${
                      isEliminated
                        ? 'bg-gray-500/30 text-gray-400 cursor-not-allowed'
                        : isSelected
                        ? isCorrect
                          ? 'bg-green-500/80 text-white shadow-lg scale-105'
                          : 'bg-red-500/80 text-white shadow-lg scale-105'
                        : showResult && isCorrect
                        ? 'bg-green-500/60 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                    } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center">
                      {showResult && (
                        <div className="mr-3">
                          {isCorrect ? (
                            <Check className="w-6 h-6 text-green-300" />
                          ) : isSelected ? (
                            <X className="w-6 h-6 text-red-300" />
                          ) : null}
                        </div>
                      )}
                      <span className="text-lg">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'results') {
    const percentage = (score / 100) * 100;
    const isPerfect = score === 100;
    const isExcellent = score >= 80;
    const isGood = score >= 60;
    
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-purple-700 via-blue-600 to-pink-500 flex items-center justify-center">
        <Confetti show={isPerfect || isExcellent} />
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-2xl mx-6 text-center border border-white/20">
          <div className="mb-8">
            {isPerfect ? (
              <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-bounce" />
            ) : isExcellent ? (
              <Star className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-pulse" />
            ) : isGood ? (
              <Award className="w-20 h-20 text-blue-400 mx-auto mb-4" />
            ) : (
              <Heart className="w-20 h-20 text-pink-400 mx-auto mb-4" />
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {isPerfect ? "Perfect Score! 🎉" : 
               isExcellent ? "Excellent! 🌟" : 
               isGood ? "Good Job! 🎯" : "Keep Learning! 💪"}
            </h1>
            
            <div className="text-2xl text-white/90 mb-8">
              You scored <span className="font-bold text-yellow-300">{score}/100</span> points!
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-white">{percentage}%</div>
              <div className="text-white/80">Accuracy</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-white">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
              <div className="text-white/80">Time Left</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={restartQuiz}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-200"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '#/language/n5-vocabulary'}
              className="flex-1 px-6 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-200"
            >
              Back to Vocabulary
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default QuickQuiz;

// Tailwind CSS animations (add to your global CSS or tailwind.config.js):
// .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 8s ease-in-out infinite; }
// @keyframes gradient-x { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
// .animate-sparkle0 { animation: sparkle 2.5s linear infinite; }
// .animate-sparkle1 { animation: sparkle 3s linear infinite; }
// .animate-sparkle2 { animation: sparkle 3.5s linear infinite; }
// .animate-sparkle3 { animation: sparkle 4s linear infinite; }
// .animate-sparkle4 { animation: sparkle 4.5s linear infinite; }
// @keyframes sparkle { 0% { opacity: 0.2; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } 100% { opacity: 0.2; transform: scale(1); } }
// .animate-fade-in { animation: fadeIn 1.5s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
// .animate-spin-slow { animation: spin 3s linear infinite; } 