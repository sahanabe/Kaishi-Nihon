import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Timer as TimerIcon, Trophy, User, Zap, Star, ArrowRight, Check, X, RotateCcw, Heart, Target, Award, Clock } from 'lucide-react';

// Complete question bank for Progress Test (more advanced questions)
const progressQuestionBank = [
  {
    id: 1,
    question: "What is the polite form of '食べる'?",
    options: ["食べます", "食べる", "食べて", "食べた"],
    correct: 0,
    explanation: "食べます (tabemasu) is the polite form of 食べる (taberu)."
  },
  {
    id: 2,
    question: "Which particle is used to mark the subject in '私は学生です'?",
    options: ["を", "に", "は", "が"],
    correct: 2,
    explanation: "は (wa) is used to mark the topic/subject in this sentence."
  },
  {
    id: 3,
    question: "What does 'お疲れ様でした' mean?",
    options: ["Thank you", "Goodbye", "Good work/Well done", "Excuse me"],
    correct: 2,
    explanation: "お疲れ様でした (otsukaresama deshita) means 'good work' or 'well done'."
  },
  {
    id: 4,
    question: "Which number is '九'?",
    options: ["7", "8", "9", "10"],
    correct: 2,
    explanation: "九 (kyuu/ku) means 'nine' in Japanese."
  },
  {
    id: 5,
    question: "What is the past tense of '行く'?",
    options: ["行きます", "行った", "行く", "行って"],
    correct: 1,
    explanation: "行った (itta) is the past tense of 行く (iku)."
  },
  {
    id: 6,
    question: "Which color is '紫'?",
    options: ["Blue", "Purple", "Pink", "Violet"],
    correct: 1,
    explanation: "紫 (murasaki) means 'purple' in Japanese."
  },
  {
    id: 7,
    question: "What does 'お元気ですか' mean?",
    options: ["How are you?", "What's your name?", "Where are you from?", "How old are you?"],
    correct: 0,
    explanation: "お元気ですか (ogenki desu ka) means 'How are you?'"
  },
  {
    id: 8,
    question: "Which word means 'older sister'?",
    options: ["妹 (imouto)", "姉 (ane)", "弟 (otouto)", "兄 (ani)"],
    correct: 1,
    explanation: "姉 (ane) means 'older sister' in Japanese."
  },
  {
    id: 9,
    question: "What is '読む' in English?",
    options: ["To write", "To read", "To speak", "To listen"],
    correct: 1,
    explanation: "読む (yomu) means 'to read' in Japanese."
  },
  {
    id: 10,
    question: "Which particle is used for objects in '本を読む'?",
    options: ["は", "を", "に", "が"],
    correct: 1,
    explanation: "を (wo) marks the direct object in this sentence."
  },
  {
    id: 11,
    question: "What does '失礼します' mean?",
    options: ["Thank you", "Excuse me", "Goodbye", "Hello"],
    correct: 1,
    explanation: "失礼します (shitsurei shimasu) means 'excuse me' or 'pardon me'."
  },
  {
    id: 12,
    question: "Which number is '十'?",
    options: ["8", "9", "10", "11"],
    correct: 2,
    explanation: "十 (juu) means 'ten' in Japanese."
  },
  {
    id: 13,
    question: "What is the negative form of '行く'?",
    options: ["行かない", "行きます", "行った", "行って"],
    correct: 0,
    explanation: "行かない (ikanai) is the negative form of 行く (iku)."
  },
  {
    id: 14,
    question: "Which color is 'ピンク'?",
    options: ["Red", "Pink", "Purple", "Orange"],
    correct: 1,
    explanation: "ピンク (pinku) means 'pink' in Japanese."
  },
  {
    id: 15,
    question: "What does 'お名前は何ですか' mean?",
    options: ["How are you?", "What's your name?", "Where are you from?", "How old are you?"],
    correct: 1,
    explanation: "お名前は何ですか (onamae wa nan desu ka) means 'What's your name?'"
  },
  {
    id: 16,
    question: "Which word means 'younger brother'?",
    options: ["兄 (ani)", "姉 (ane)", "弟 (otouto)", "妹 (imouto)"],
    correct: 2,
    explanation: "弟 (otouto) means 'younger brother' in Japanese."
  },
  {
    id: 17,
    question: "What is '書く' in English?",
    options: ["To read", "To write", "To speak", "To listen"],
    correct: 1,
    explanation: "書く (kaku) means 'to write' in Japanese."
  },
  {
    id: 18,
    question: "Which particle is used for time in '三時に会いましょう'?",
    options: ["は", "を", "に", "が"],
    correct: 2,
    explanation: "に (ni) marks time in this sentence."
  },
  {
    id: 19,
    question: "What does 'よろしくお願いします' mean?",
    options: ["Thank you", "Please", "Nice to meet you", "Goodbye"],
    correct: 2,
    explanation: "よろしくお願いします (yoroshiku onegaishimasu) means 'nice to meet you' or 'please treat me well'."
  },
  {
    id: 20,
    question: "Which number is '百'?",
    options: ["50", "100", "1000", "10"],
    correct: 1,
    explanation: "百 (hyaku) means 'hundred' in Japanese."
  },
  {
    id: 21,
    question: "What is the polite form of '来る'?",
    options: ["来ます", "来る", "来て", "来た"],
    correct: 0,
    explanation: "来ます (kimasu) is the polite form of 来る (kuru)."
  },
  {
    id: 22,
    question: "Which color is 'オレンジ'?",
    options: ["Red", "Yellow", "Orange", "Green"],
    correct: 2,
    explanation: "オレンジ (orenji) means 'orange' in Japanese."
  },
  {
    id: 23,
    question: "What does 'どこから来ましたか' mean?",
    options: ["How are you?", "What's your name?", "Where are you from?", "How old are you?"],
    correct: 2,
    explanation: "どこから来ましたか (doko kara kimashita ka) means 'Where are you from?'"
  },
  {
    id: 24,
    question: "Which word means 'younger sister'?",
    options: ["姉 (ane)", "妹 (imouto)", "兄 (ani)", "弟 (otouto)"],
    correct: 1,
    explanation: "妹 (imouto) means 'younger sister' in Japanese."
  },
  {
    id: 25,
    question: "What is '聞く' in English?",
    options: ["To speak", "To hear", "To listen", "To talk"],
    correct: 2,
    explanation: "聞く (kiku) means 'to listen' or 'to hear' in Japanese."
  },
  {
    id: 26,
    question: "Which particle is used for location in '学校に行く'?",
    options: ["は", "を", "に", "が"],
    correct: 2,
    explanation: "に (ni) marks the destination in this sentence."
  },
  {
    id: 27,
    question: "What does 'お疲れ様です' mean?",
    options: ["Thank you", "Goodbye", "Good work", "Hello"],
    correct: 2,
    explanation: "お疲れ様です (otsukaresama desu) means 'good work' or 'thank you for your work'."
  },
  {
    id: 28,
    question: "Which number is '千'?",
    options: ["100", "500", "1000", "10000"],
    correct: 2,
    explanation: "千 (sen) means 'thousand' in Japanese."
  },
  {
    id: 29,
    question: "What is the past tense of '見る'?",
    options: ["見ます", "見た", "見る", "見て"],
    correct: 1,
    explanation: "見た (mita) is the past tense of 見る (miru)."
  },
  {
    id: 30,
    question: "Which color is 'グレー'?",
    options: ["Black", "White", "Gray", "Brown"],
    correct: 2,
    explanation: "グレー (guree) means 'gray' in Japanese."
  },
  {
    id: 31,
    question: "What does '何歳ですか' mean?",
    options: ["How are you?", "What's your name?", "Where are you from?", "How old are you?"],
    correct: 3,
    explanation: "何歳ですか (nansai desu ka) means 'How old are you?'"
  },
  {
    id: 32,
    question: "Which word means 'grandmother'?",
    options: ["祖父 (sofu)", "祖母 (sobo)", "叔父 (oji)", "叔母 (oba)"],
    correct: 1,
    explanation: "祖母 (sobo) means 'grandmother' in Japanese."
  },
  {
    id: 33,
    question: "What is '話す' in English?",
    options: ["To listen", "To speak", "To hear", "To talk"],
    correct: 1,
    explanation: "話す (hanasu) means 'to speak' or 'to talk' in Japanese."
  },
  {
    id: 34,
    question: "Which particle is used for possession in '私の本'?",
    options: ["は", "を", "に", "の"],
    correct: 3,
    explanation: "の (no) marks possession in this phrase."
  },
  {
    id: 35,
    question: "What does '申し訳ございません' mean?",
    options: ["Thank you", "Excuse me", "I'm sorry", "Goodbye"],
    correct: 2,
    explanation: "申し訳ございません (moushiwake gozaimasen) is a very formal way to say 'I'm sorry'."
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

// Function to get daily progress test questions (25 questions per day, shuffled)
const getDailyProgressQuestions = (): typeof progressQuestionBank => {
  const today = new Date().toDateString();
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Use seed to get consistent questions for the day
  const shuffled = shuffleArray(progressQuestionBank);
  return shuffled.slice(0, 25);
};

// Animated background using CSS
const AnimatedBackground: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="w-full h-full bg-gradient-to-br from-green-700 via-blue-600 to-purple-500 animate-gradient-x opacity-80"></div>
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
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#3b82f6" />
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
        className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
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
            backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

const ProgressTest: React.FC = () => {
  console.log('ProgressTest component loaded');
  const [quizState, setQuizState] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
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
  const [dailyQuestions, setDailyQuestions] = useState(getDailyProgressQuestions());
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (quizState === 'quiz' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, quizState]);

  const startQuiz = () => {
    setQuizState('quiz');
    setTimeLeft(900);
    setScore(0);
    setStreak(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setPowerUpsUsed({ fiftyFifty: false, hint: false, skip: false });
    setEliminatedOptions([]);
    setShowHint(false);
    // Get fresh daily questions
    setDailyQuestions(getDailyProgressQuestions());
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
            <Sparkles className="w-12 h-12 text-green-400 animate-bounce mr-2" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
              Progress Test
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-8 animate-fade-in">
            25 questions <span className="mx-2">•</span> 15 minutes <span className="mx-2">•</span> <span className="text-green-300 font-bold">Test Your Knowledge!</span>
          </p>
          <div className="flex flex-col items-center space-y-4 mb-10">
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 text-white text-lg font-semibold shadow-lg backdrop-blur-md">
                <Clock className="w-6 h-6 mr-2 text-green-300 animate-pulse" />
                <span>Extended time</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 text-white text-lg font-semibold shadow-lg backdrop-blur-md">
                <Trophy className="w-6 h-6 mr-2 text-yellow-300 animate-bounce" />
                <span>Advanced level</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 text-white text-lg font-semibold shadow-lg backdrop-blur-md">
                <Zap className="w-6 h-6 mr-2 text-blue-300 animate-spin-slow" />
                <span>Power-ups</span>
              </div>
            </div>
          </div>
          <button
            onClick={startQuiz}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:scale-105 hover:from-green-300 hover:to-purple-700 transition-all duration-300 flex items-center group"
          >
            Start Progress Test
            <ArrowRight className="w-8 h-8 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    );
  }

  if (quizState === 'quiz') {
    const question = dailyQuestions[currentQuestion];
    
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-green-700 via-blue-600 to-purple-500">
        <Confetti show={showConfetti} />
        <div className="container mx-auto px-6 py-8">
          {/* Header with timer and progress */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <div className="text-2xl font-bold">Question {currentQuestion + 1}/25</div>
                <div className="text-sm opacity-80">Score: {score} | Streak: {streak}</div>
              </div>
            </div>
            <Timer timeLeft={timeLeft} totalTime={900} />
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <ProgressBar current={currentQuestion + 1} total={25} />
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
              <div className="mb-6 p-4 bg-green-500/20 rounded-lg border border-green-400/30">
                <div className="text-green-300 font-semibold mb-2">💡 Hint:</div>
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
    const percentage = (score / 250) * 100; // 25 questions * 10 points each
    const isPerfect = score === 250;
    const isExcellent = score >= 200;
    const isGood = score >= 150;
    
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-green-700 via-blue-600 to-purple-500 flex items-center justify-center">
        <Confetti show={isPerfect || isExcellent} />
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-2xl mx-6 text-center border border-white/20">
          <div className="mb-8">
            {isPerfect ? (
              <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-bounce" />
            ) : isExcellent ? (
              <Star className="w-20 h-20 text-green-400 mx-auto mb-4 animate-pulse" />
            ) : isGood ? (
              <Award className="w-20 h-20 text-blue-400 mx-auto mb-4" />
            ) : (
              <Heart className="w-20 h-20 text-purple-400 mx-auto mb-4" />
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {isPerfect ? "Perfect Score! 🎉" : 
               isExcellent ? "Excellent! 🌟" : 
               isGood ? "Good Job! 🎯" : "Keep Learning! 💪"}
            </h1>
            
            <div className="text-2xl text-white/90 mb-8">
              You scored <span className="font-bold text-green-300">{score}/250</span> points!
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-200"
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

export default ProgressTest; 