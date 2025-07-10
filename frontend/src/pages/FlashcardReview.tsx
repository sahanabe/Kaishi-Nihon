import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RotateCcw, Check, X, ArrowLeft, ArrowRight, Clock, Target, Star, Heart } from 'lucide-react';

// Sample flashcard data with spaced repetition
const flashcardData = [
  {
    id: 1,
    japanese: 'こんにちは',
    hiragana: 'こんにちは',
    romaji: 'konnichiwa',
    english: 'Good afternoon / Hello',
    category: 'Greetings',
    difficulty: 'easy',
    lastReviewed: null as Date | null,
    reviewCount: 0,
    mastered: false
  },
  {
    id: 2,
    japanese: 'ありがとう',
    hiragana: 'ありがとう',
    romaji: 'arigatou',
    english: 'Thank you',
    category: 'Greetings',
    difficulty: 'easy',
    lastReviewed: null,
    reviewCount: 0,
    mastered: false
  },
  {
    id: 3,
    japanese: '水',
    hiragana: 'みず',
    romaji: 'mizu',
    english: 'Water',
    category: 'Basic Words',
    difficulty: 'easy',
    lastReviewed: null,
    reviewCount: 0,
    mastered: false
  },
  {
    id: 4,
    japanese: '食べる',
    hiragana: 'たべる',
    romaji: 'taberu',
    english: 'To eat',
    category: 'Verbs',
    difficulty: 'medium',
    lastReviewed: null,
    reviewCount: 0,
    mastered: false
  },
  {
    id: 5,
    japanese: '学生',
    hiragana: 'がくせい',
    romaji: 'gakusei',
    english: 'Student',
    category: 'People',
    difficulty: 'medium',
    lastReviewed: null,
    reviewCount: 0,
    mastered: false
  },
  {
    id: 6,
    japanese: '家族',
    hiragana: 'かぞく',
    romaji: 'kazoku',
    english: 'Family',
    category: 'People',
    difficulty: 'medium',
    lastReviewed: null,
    reviewCount: 0,
    mastered: false
  },
  {
    id: 7,
    japanese: '大きい',
    hiragana: 'おおきい',
    romaji: 'ookii',
    english: 'Big',
    category: 'Adjectives',
    difficulty: 'medium',
    lastReviewed: null,
    reviewCount: 0,
    mastered: false
  },
  {
    id: 8,
    japanese: '学校',
    hiragana: 'がっこう',
    romaji: 'gakkou',
    english: 'School',
    category: 'Places',
    difficulty: 'medium',
    lastReviewed: null,
    reviewCount: 0,
    mastered: false
  },
  {
    id: 9,
    japanese: '勉強',
    hiragana: 'べんきょう',
    romaji: 'benkyou',
    english: 'Study',
    category: 'Verbs',
    difficulty: 'hard',
    lastReviewed: null,
    reviewCount: 0,
    mastered: false
  },
  {
    id: 10,
    japanese: 'お疲れ様でした',
    hiragana: 'おつかれさまでした',
    romaji: 'otsukaresama deshita',
    english: 'Good work / Well done',
    category: 'Greetings',
    difficulty: 'hard',
    lastReviewed: null,
    reviewCount: 0,
    mastered: false
  }
];

// Animated background
const AnimatedBackground: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="w-full h-full bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 animate-gradient-x opacity-80"></div>
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {[...Array(20)].map((_, i) => (
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

// Progress bar component
const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const FlashcardReview: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewCards, setReviewCards] = useState(flashcardData);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [reviewSession, setReviewSession] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0
  });

  const currentCard = reviewCards[currentCardIndex];

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const markCard = (correct: boolean) => {
    const updatedCards = [...reviewCards];
    const currentCard = updatedCards[currentCardIndex];
    
    if (correct) {
      currentCard.reviewCount++;
      currentCard.lastReviewed = new Date();
      if (currentCard.reviewCount >= 3) {
        currentCard.mastered = true;
      }
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      setSessionStats(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      currentCard.reviewCount = Math.max(0, currentCard.reviewCount - 1);
      setStreak(0);
      setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1, total: prev.total + 1 }));
    }

    setReviewCards(updatedCards);

    // Move to next card or end session
    setTimeout(() => {
      if (currentCardIndex < reviewCards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
        setIsFlipped(false);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  const startReview = () => {
    setReviewSession(true);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setScore(0);
    setStreak(0);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
    setShowResults(false);
  };

  const restartReview = () => {
    setReviewSession(false);
    setShowResults(false);
  };

  if (!reviewSession) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-16 flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 text-blue-400 animate-bounce mr-2" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
              Flashcard Review
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-8 animate-fade-in">
            Spaced repetition system <span className="mx-2">•</span> {reviewCards.length} cards <span className="mx-2">•</span> <span className="text-blue-300 font-bold">Master Japanese!</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{reviewCards.filter(card => card.mastered).length}</div>
              <div className="text-sm opacity-80">Mastered Cards</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{reviewCards.length}</div>
              <div className="text-sm opacity-80">Total Cards</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{Math.round((reviewCards.filter(card => card.mastered).length / reviewCards.length) * 100)}%</div>
              <div className="text-sm opacity-80">Progress</div>
            </div>
          </div>

          <button
            onClick={startReview}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:scale-105 hover:from-blue-300 hover:to-pink-700 transition-all duration-300 flex items-center group"
          >
            Start Review
            <ArrowRight className="w-8 h-8 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const accuracy = Math.round((sessionStats.correct / sessionStats.total) * 100);
    
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-2xl mx-6 text-center border border-white/20">
          <div className="mb-8">
            <Star className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Review Complete! 🎉
            </h1>
            <div className="text-2xl text-white/90 mb-8">
              You reviewed <span className="font-bold text-blue-300">{sessionStats.total}</span> cards!
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-white">{accuracy}%</div>
              <div className="text-white/80">Accuracy</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-white">{sessionStats.correct}</div>
              <div className="text-white/80">Correct</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={restartReview}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-200"
            >
              Review Again
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
    <div className="relative min-h-screen bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white">
            <div className="text-2xl font-bold">Card {currentCardIndex + 1}/{reviewCards.length}</div>
            <div className="text-sm opacity-80">Score: {score} | Streak: {streak}</div>
          </div>
          <div className="text-white text-right">
            <div className="text-sm opacity-80">Mastered: {reviewCards.filter(card => card.mastered).length}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <ProgressBar current={currentCardIndex + 1} total={reviewCards.length} />
        </div>

        {/* Flashcard */}
        <div className="flex justify-center mb-8">
          <div 
            className="w-full max-w-md h-64 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 cursor-pointer transform transition-all duration-500 hover:scale-105"
            onClick={flipCard}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="h-full flex flex-col justify-center items-center text-center">
              {!isFlipped ? (
                <>
                  <div className="text-4xl font-bold text-white mb-4">{currentCard.japanese}</div>
                  <div className="text-xl text-white/80 mb-2">{currentCard.hiragana}</div>
                  <div className="text-lg text-white/60">{currentCard.romaji}</div>
                  <div className="text-sm text-white/40 mt-4">Click to reveal answer</div>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-white mb-4">{currentCard.english}</div>
                  <div className="text-lg text-white/80 mb-2">{currentCard.category}</div>
                  <div className="text-sm text-white/60">Difficulty: {currentCard.difficulty}</div>
                  <div className="text-sm text-white/40 mt-4">Reviews: {currentCard.reviewCount}</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Answer buttons */}
        {isFlipped && (
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => markCard(false)}
              className="px-8 py-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 hover:scale-105 transition-all duration-200 flex items-center"
            >
              <X className="w-6 h-6 mr-2" />
              Incorrect
            </button>
            <button
              onClick={() => markCard(true)}
              className="px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 hover:scale-105 transition-all duration-200 flex items-center"
            >
              <Check className="w-6 h-6 mr-2" />
              Correct
            </button>
          </div>
        )}

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

export default FlashcardReview; 