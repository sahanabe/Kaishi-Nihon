import React, { useState, useEffect, useRef } from 'react';
import { Zap, Clock, Target, Star, ArrowLeft, ArrowRight, Play, Pause, RotateCcw, Trophy, Sparkles } from 'lucide-react';

// Speed recognition data
const speedRecognitionData = [
  {
    id: 1,
    japanese: 'こんにちは',
    hiragana: 'こんにちは',
    romaji: 'konnichiwa',
    english: 'Good afternoon / Hello',
    category: 'Greetings',
    difficulty: 'easy'
  },
  {
    id: 2,
    japanese: 'ありがとう',
    hiragana: 'ありがとう',
    romaji: 'arigatou',
    english: 'Thank you',
    category: 'Greetings',
    difficulty: 'easy'
  },
  {
    id: 3,
    japanese: '水',
    hiragana: 'みず',
    romaji: 'mizu',
    english: 'Water',
    category: 'Basic Words',
    difficulty: 'easy'
  },
  {
    id: 4,
    japanese: '火',
    hiragana: 'ひ',
    romaji: 'hi',
    english: 'Fire',
    category: 'Basic Words',
    difficulty: 'easy'
  },
  {
    id: 5,
    japanese: '山',
    hiragana: 'やま',
    romaji: 'yama',
    english: 'Mountain',
    category: 'Basic Words',
    difficulty: 'easy'
  },
  {
    id: 6,
    japanese: '食べる',
    hiragana: 'たべる',
    romaji: 'taberu',
    english: 'To eat',
    category: 'Verbs',
    difficulty: 'medium'
  },
  {
    id: 7,
    japanese: '学生',
    hiragana: 'がくせい',
    romaji: 'gakusei',
    english: 'Student',
    category: 'People',
    difficulty: 'medium'
  },
  {
    id: 8,
    japanese: '家族',
    hiragana: 'かぞく',
    romaji: 'kazoku',
    english: 'Family',
    category: 'People',
    difficulty: 'medium'
  },
  {
    id: 9,
    japanese: '大きい',
    hiragana: 'おおきい',
    romaji: 'ookii',
    english: 'Big',
    category: 'Adjectives',
    difficulty: 'medium'
  },
  {
    id: 10,
    japanese: '学校',
    hiragana: 'がっこう',
    romaji: 'gakkou',
    english: 'School',
    category: 'Places',
    difficulty: 'medium'
  },
  {
    id: 11,
    japanese: '勉強',
    hiragana: 'べんきょう',
    romaji: 'benkyou',
    english: 'Study',
    category: 'Verbs',
    difficulty: 'hard'
  },
  {
    id: 12,
    japanese: '電話',
    hiragana: 'でんわ',
    romaji: 'denwa',
    english: 'Telephone',
    category: 'Objects',
    difficulty: 'hard'
  },
  {
    id: 13,
    japanese: '飛行機',
    hiragana: 'ひこうき',
    romaji: 'hikouki',
    english: 'Airplane',
    category: 'Transport',
    difficulty: 'hard'
  },
  {
    id: 14,
    japanese: '病院',
    hiragana: 'びょういん',
    romaji: 'byouin',
    english: 'Hospital',
    category: 'Places',
    difficulty: 'hard'
  },
  {
    id: 15,
    japanese: '銀行',
    hiragana: 'ぎんこう',
    romaji: 'ginkou',
    english: 'Bank',
    category: 'Places',
    difficulty: 'hard'
  }
];

// Animated background component
const AnimatedBackground: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="w-full h-full bg-gradient-to-br from-yellow-600 via-orange-500 to-red-500 animate-gradient-x opacity-80"></div>
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <span
          key={i}
          className={`absolute block w-1 h-1 rounded-full bg-white opacity-40 animate-sparkle${i % 5}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  </div>
);

// Timer component
const Timer: React.FC<{ timeLeft: number; totalTime: number }> = ({ timeLeft, totalTime }) => {
  const percentage = (timeLeft / totalTime) * 100;
  
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center text-white">
        <Clock className="w-6 h-6 mr-2" />
        <span className="text-2xl font-bold">{timeLeft}s</span>
      </div>
      <div className="w-32 bg-white/20 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-100 ${
            percentage > 50 ? 'bg-green-400' : percentage > 25 ? 'bg-yellow-400' : 'bg-red-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const SpeedRecognition: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
    averageTime: 0
  });
  const [startTime, setStartTime] = useState(0);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);

  const currentQuestion = speedRecognitionData[currentQuestionIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate mixed answer options for current question
  const getMixedAnswers = () => {
    const correctAnswer = currentQuestion.english;
    const allAnswers = speedRecognitionData.map(word => word.english);
    const wrongAnswers = allAnswers.filter(answer => answer !== correctAnswer);
    
    // Shuffle wrong answers and take first 3
    const shuffledWrongAnswers = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 3);
    
    // Add correct answer and shuffle all options
    const allOptions = [...shuffledWrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
    
    return allOptions;
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeout();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, gameStarted]);

  const handleTimeout = () => {
    setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1, total: prev.total + 1 }));
    setStreak(0);
    nextQuestion();
  };

  const handleAnswer = (correct: boolean) => {
    const responseTime = 10 - timeLeft;
    setResponseTimes(prev => [...prev, responseTime]);
    
    if (correct) {
      setScore(prev => prev + Math.max(1, Math.floor(10 - responseTime)));
      setStreak(prev => prev + 1);
      setSessionStats(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setStreak(0);
      setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1, total: prev.total + 1 }));
    }
    
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < speedRecognitionData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(10);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const avgTime = responseTimes.length > 0 
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length 
      : 0;
    
    setSessionStats(prev => ({ ...prev, averageTime: avgTime }));
    setShowResults(true);
  };

  const startChallenge = () => {
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setTimeLeft(10);
    setScore(0);
    setStreak(0);
    setSessionStats({ correct: 0, incorrect: 0, total: 0, averageTime: 0 });
    setResponseTimes([]);
    setShowResults(false);
    setStartTime(Date.now());
  };

  const restartChallenge = () => {
    setGameStarted(false);
    setShowResults(false);
  };

  if (!gameStarted) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-16 flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-6">
            <Zap className="w-12 h-12 text-yellow-400 animate-pulse mr-2" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
              Speed Recognition
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-8 animate-fade-in">
            Lightning-fast responses <span className="mx-2">•</span> {speedRecognitionData.length} words <span className="mx-2">•</span> <span className="text-yellow-300 font-bold">Test your reflexes!</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">10s</div>
              <div className="text-sm opacity-80">Per Word</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{speedRecognitionData.length}</div>
              <div className="text-sm opacity-80">Total Words</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">∞</div>
              <div className="text-sm opacity-80">Speed Power</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-10 max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Target className="w-6 h-6 mr-2 text-yellow-400" />
              Challenge Rules
            </h3>
            <div className="text-white/90 space-y-3 text-left">
              <p>• <strong>10 seconds</strong> per word - think fast!</p>
              <p>• <strong>Faster responses</strong> earn more points</p>
              <p>• <strong>Build streaks</strong> for bonus points</p>
              <p>• <strong>Don't let time run out!</strong></p>
            </div>
          </div>

          <button
            onClick={startChallenge}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:scale-105 hover:from-yellow-300 hover:to-red-700 transition-all duration-300 flex items-center group"
          >
            Start Challenge
            <ArrowRight className="w-8 h-8 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const accuracy = Math.round((sessionStats.correct / sessionStats.total) * 100);
    const avgTime = Math.round(sessionStats.averageTime * 10) / 10;
    
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-yellow-600 via-orange-500 to-red-500 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-2xl mx-6 text-center border border-white/20">
          <div className="mb-8">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Challenge Complete! ⚡
            </h1>
            <div className="text-2xl text-white/90 mb-8">
              Final Score: <span className="font-bold text-yellow-300">{score}</span> points!
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-white">{accuracy}%</div>
              <div className="text-white/80">Accuracy</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-white">{avgTime}s</div>
              <div className="text-white/80">Avg Response</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={restartChallenge}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-200"
            >
              Challenge Again
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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-600 via-orange-500 to-red-500">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white">
            <div className="text-2xl font-bold">Word {currentQuestionIndex + 1}/{speedRecognitionData.length}</div>
            <div className="text-sm opacity-80">Score: {score} | Streak: {streak}</div>
          </div>
          <div className="text-white">
            <Timer timeLeft={timeLeft} totalTime={10} />
          </div>
        </div>

        {/* Question Card */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-white mb-4">{currentQuestion.japanese}</div>
              <div className="text-xl text-white/80 mb-2">{currentQuestion.hiragana}</div>
              <div className="text-lg text-white/60 mb-4">{currentQuestion.romaji}</div>
              <div className="text-sm text-white/40">{currentQuestion.category}</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-6">
                What does this mean?
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getMixedAnswers().map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(answer === currentQuestion.english)}
                    className={`py-6 px-8 text-white font-bold rounded-xl hover:scale-105 transition-all duration-200 text-lg ${
                      answer === currentQuestion.english 
                        ? 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-300 hover:to-green-700' 
                        : 'bg-gradient-to-r from-red-400 to-red-600 hover:from-red-300 hover:to-red-700'
                    }`}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => window.location.href = '#/language/n5-vocabulary'}
            className="px-6 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Vocabulary
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeedRecognition; 