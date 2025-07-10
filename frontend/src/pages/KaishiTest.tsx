import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Trophy, 
  Brain, 
  Target, 
  Zap, 
  BarChart3, 
  TrendingUp, 
  Award, 
  Star, 
  Home,
  RotateCcw,
  PlayCircle,
  Pause,
  Volume2,
  Headphones,
  BookOpen,
  Eye,
  Activity,
  Rocket
} from 'lucide-react';

const KaishiTest: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Test questions database
  const testQuestions = [
    // Reading Comprehension Questions
    {
      id: 1,
      type: 'reading',
      passage: '田中さんは大学生です。毎日学校に行きます。電車で通学しています。朝7時に起きて、8時に家を出ます。',
      question: '田中さんは何をしていますか？',
      options: ['会社員', '大学生', '高校生', '中学生'],
      correct: 1,
      explanation: '田中さんは大学生です。'
    },
    {
      id: 2,
      type: 'reading',
      passage: '私は東京に住んでいます。毎日電車で会社に行きます。仕事は9時から5時までです。',
      question: '仕事は何時から何時までですか？',
      options: ['8時から4時', '9時から5時', '10時から6時', '7時から3時'],
      correct: 1,
      explanation: '仕事は9時から5時までです。'
    },
    {
      id: 3,
      type: 'listening',
      audioText: '私は毎日コーヒーを飲みます。朝と昼に飲みます。',
      question: '何を飲みますか？',
      options: ['お茶', 'コーヒー', 'ジュース', '水'],
      correct: 1,
      explanation: '私は毎日コーヒーを飲みます。'
    },
    {
      id: 4,
      type: 'listening',
      audioText: '明日は土曜日です。友達と映画を見に行きます。',
      question: '明日何をしますか？',
      options: ['買い物', '映画を見る', '勉強', '運動'],
      correct: 1,
      explanation: '友達と映画を見に行きます。'
    },
    {
      id: 5,
      type: 'grammar',
      question: '「私は学生です」の否定形は何ですか？',
      options: ['私は学生じゃありません', '私は学生です', '私は学生でした', '私は学生になります'],
      correct: 0,
      explanation: '「じゃありません」は「です」の否定形です。'
    },
    {
      id: 6,
      type: 'grammar',
      question: '「これは本です」の疑問形は何ですか？',
      options: ['これは本です', 'これは本ですか？', 'これは本でした', 'これは本になります'],
      correct: 1,
      explanation: '「か」を文末につけると疑問形になります。'
    },
    {
      id: 7,
      type: 'vocabulary',
      question: '「おはようございます」は何を意味しますか？',
      options: ['こんにちは', 'おはよう', 'こんばんは', 'さようなら'],
      correct: 1,
      explanation: '「おはようございます」は朝の挨拶です。'
    },
    {
      id: 8,
      type: 'vocabulary',
      question: '「ありがとうございます」は何を意味しますか？',
      options: ['すみません', 'ありがとう', 'お疲れ様', '失礼します'],
      correct: 1,
      explanation: '「ありがとうございます」は感謝を表す言葉です。'
    },
    {
      id: 9,
      type: 'reading',
      passage: 'このレストランはとても人気があります。料理がおいしくて、値段も安いです。',
      question: 'このレストランの特徴は何ですか？',
      options: ['高級', '安くておいしい', '静か', '大きい'],
      correct: 1,
      explanation: '料理がおいしくて、値段も安いです。'
    },
    {
      id: 10,
      type: 'listening',
      audioText: '今日は雨が降っています。傘を持って行きましょう。',
      question: '今日の天気はどうですか？',
      options: ['晴れ', '雨', '曇り', '雪'],
      correct: 1,
      explanation: '今日は雨が降っています。'
    }
  ];

  const completeTest = () => {
    setIsTestCompleted(true);
    calculateScore();
    setShowResults(true);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === testQuestions[index].correct) {
        correctAnswers++;
      }
    });
    const finalScore = Math.round((correctAnswers / testQuestions.length) * 100);
    setScore(finalScore);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTestStarted && !isPaused && timeLeft > 0 && !isTestCompleted) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestStarted, isPaused, timeLeft, isTestCompleted]);

  const startTest = () => {
    setIsTestStarted(true);
    setTimeLeft(15 * 60);
    setUserAnswers(new Array(testQuestions.length).fill(-1));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeTest();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'reading':
        return <BookOpen className="w-5 h-5" />;
      case 'listening':
        return <Headphones className="w-5 h-5" />;
      case 'grammar':
        return <Brain className="w-5 h-5" />;
      case 'vocabulary':
        return <Target className="w-5 h-5" />;
      default:
        return <Eye className="w-5 h-5" />;
    }
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'reading':
        return 'text-blue-400';
      case 'listening':
        return 'text-green-400';
      case 'grammar':
        return 'text-purple-400';
      case 'vocabulary':
        return 'text-orange-400';
      default:
        return 'text-white';
    }
  };

  if (!isTestStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Trophy className="w-16 h-16 text-yellow-400 animate-pulse" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Kaishi Test
              </h1>
              <Zap className="w-16 h-16 text-orange-400 animate-pulse" />
            </div>
            <p className="text-xl text-white/80">Comprehensive JLPT N5 Reading & Listening Assessment</p>
          </div>

          {/* Test Overview */}
          <div className="max-w-4xl mx-auto bg-white/10 rounded-3xl p-8 backdrop-blur-lg border border-white/20 mb-8">
            <h2 className="text-3xl font-bold text-center mb-8">Test Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                    <Clock className="w-6 h-6 text-blue-400" />
                    <span>Time Limit</span>
                  </h3>
                  <p className="text-2xl font-bold text-blue-400">15 Minutes</p>
                  <p className="text-white/70">Complete all questions within the time limit</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                    <Target className="w-6 h-6 text-green-400" />
                    <span>Questions</span>
                  </h3>
                  <p className="text-2xl font-bold text-green-400">{testQuestions.length} Questions</p>
                  <p className="text-white/70">Reading, Listening, Grammar & Vocabulary</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                    <span>Scoring</span>
                  </h3>
                  <p className="text-2xl font-bold text-purple-400">Percentage Based</p>
                  <p className="text-white/70">Get detailed feedback and analysis</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                    <Award className="w-6 h-6 text-yellow-400" />
                    <span>Certificate</span>
                  </h3>
                  <p className="text-2xl font-bold text-yellow-400">N5 Level</p>
                  <p className="text-white/70">Achievement certificate upon completion</p>
                </div>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={startTest}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-16 py-6 rounded-2xl font-bold text-2xl hover:scale-105 transition-transform shadow-2xl"
            >
              <div className="flex items-center space-x-4">
                <Rocket className="w-8 h-8" />
                <span>Start Kaishi Test</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Trophy className="w-16 h-16 text-yellow-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Test Results
              </h1>
              <Star className="w-16 h-16 text-orange-400" />
            </div>
          </div>

          {/* Score Display */}
          <div className="max-w-4xl mx-auto bg-white/10 rounded-3xl p-8 backdrop-blur-lg border border-white/20 mb-8">
            <div className="text-center mb-8">
              <div className="text-8xl font-bold mb-4">
                {score >= 80 ? (
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {score}%
                  </span>
                ) : score >= 60 ? (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    {score}%
                  </span>
                ) : (
                  <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                    {score}%
                  </span>
                )}
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Practicing!'}
              </h2>
              <p className="text-xl text-white/70">
                {score >= 80 ? 'You have mastered N5 level concepts!' : 
                 score >= 60 ? 'You are making good progress!' : 
                 'Continue studying to improve your skills!'}
              </p>
            </div>

            {/* Detailed Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {userAnswers.filter((answer, index) => answer === testQuestions[index].correct).length}
                </div>
                <div className="text-white/70">Correct Answers</div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {testQuestions.length}
                </div>
                <div className="text-white/70">Total Questions</div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {formatTime(15 * 60 - timeLeft)}
                </div>
                <div className="text-white/70">Time Used</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/language/grammar-fundamentals')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform"
              >
                <div className="flex items-center space-x-2">
                  <Home className="w-5 h-5" />
                  <span>Back to Practice</span>
                </div>
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-green-500 to-blue-500 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform"
              >
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5" />
                  <span>Retake Test</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = testQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Timer */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl font-bold">Kaishi Test</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 rounded-xl px-6 py-3 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-red-400" />
              <span className="font-bold text-xl">
                {formatTime(timeLeft)}
              </span>
            </div>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition-colors"
            >
              {isPaused ? <PlayCircle className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-white/70 text-sm mb-2">
            <span>Question {currentQuestion + 1} of {testQuestions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / testQuestions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / testQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto bg-white/10 rounded-3xl p-8 backdrop-blur-lg border border-white/20">
          {/* Question Type */}
          <div className="flex items-center space-x-2 mb-6">
            <div className={`p-2 rounded-lg bg-white/10 ${getQuestionTypeColor(currentQ.type)}`}>
              {getQuestionTypeIcon(currentQ.type)}
            </div>
            <span className="text-white/70 capitalize">{currentQ.type} Question</span>
          </div>

          {/* Passage or Audio Text */}
          {currentQ.passage && (
            <div className="bg-white/5 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>Reading Passage</span>
              </h3>
              <p className="text-lg leading-relaxed text-white/90">{currentQ.passage}</p>
            </div>
          )}

          {currentQ.audioText && (
            <div className="bg-white/5 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Headphones className="w-5 h-5 text-green-400" />
                <span>Audio Text</span>
              </h3>
              <p className="text-lg leading-relaxed text-white/90">{currentQ.audioText}</p>
              <button className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 rounded-lg hover:scale-105 transition-transform">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4" />
                  <span>Play Audio</span>
                </div>
              </button>
            </div>
          )}

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6">{currentQ.question}</h3>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    userAnswers[currentQuestion] === index
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      userAnswers[currentQuestion] === index
                        ? 'border-white bg-white'
                        : 'border-white/50'
                    }`}>
                      {userAnswers[currentQuestion] === index && (
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                      )}
                    </div>
                    <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all ${
                currentQuestion === 0
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              {userAnswers.map((answer, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    answer !== -1 ? 'bg-green-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextQuestion}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              <div className="flex items-center space-x-2">
                <span>{currentQuestion === testQuestions.length - 1 ? 'Finish' : 'Next'}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KaishiTest; 