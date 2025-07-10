import React, { useState, useEffect } from 'react';
import { Brain, Eye, Lightbulb, MapPin, Star, ArrowLeft, ArrowRight, Play, Pause, RotateCcw, Target, Sparkles } from 'lucide-react';

// Memory palace data with visual associations
const memoryPalaceData = [
  {
    id: 1,
    word: '水',
    hiragana: 'みず',
    romaji: 'mizu',
    english: 'Water',
    association: 'Imagine a crystal clear lake with rippling water',
    image: '💧',
    location: 'Kitchen Sink',
    story: 'Picture yourself washing your hands at the kitchen sink, feeling the cool water flow over your fingers.',
    difficulty: 'easy'
  },
  {
    id: 2,
    word: '火',
    hiragana: 'ひ',
    romaji: 'hi',
    english: 'Fire',
    association: 'Visualize a warm, crackling campfire',
    image: '🔥',
    location: 'Fireplace',
    story: 'Imagine sitting by a cozy fireplace, watching the flames dance and feeling the warmth on your face.',
    difficulty: 'easy'
  },
  {
    id: 3,
    word: '山',
    hiragana: 'やま',
    romaji: 'yama',
    english: 'Mountain',
    association: 'Picture a majestic mountain peak reaching into the clouds',
    image: '⛰️',
    location: 'Mountain View',
    story: 'Visualize standing at the base of Mount Fuji, looking up at its snow-capped peak against a clear blue sky.',
    difficulty: 'easy'
  },
  {
    id: 4,
    word: '車',
    hiragana: 'くるま',
    romaji: 'kuruma',
    english: 'Car',
    association: 'Imagine a sleek red sports car parked in your driveway',
    image: '🚗',
    location: 'Garage',
    story: 'Picture opening your garage door to reveal a shiny red car, ready for a road trip adventure.',
    difficulty: 'medium'
  },
  {
    id: 5,
    word: '本',
    hiragana: 'ほん',
    romaji: 'hon',
    english: 'Book',
    association: 'Visualize a leather-bound book with golden pages',
    image: '📚',
    location: 'Library',
    story: 'Imagine walking into an ancient library filled with towering bookshelves, each book containing endless knowledge.',
    difficulty: 'medium'
  },
  {
    id: 6,
    word: '電話',
    hiragana: 'でんわ',
    romaji: 'denwa',
    english: 'Telephone',
    association: 'Picture a vintage rotary phone ringing on a wooden desk',
    image: '📞',
    location: 'Office Desk',
    story: 'Visualize an old-fashioned telephone with a brass bell, sitting on a polished mahogany desk in a classic office.',
    difficulty: 'medium'
  },
  {
    id: 7,
    word: '飛行機',
    hiragana: 'ひこうき',
    romaji: 'hikouki',
    english: 'Airplane',
    association: 'Imagine a massive jumbo jet soaring through fluffy white clouds',
    image: '✈️',
    location: 'Airport',
    story: 'Picture yourself at an airport, watching a huge airplane take off into the sky, leaving behind a trail of white clouds.',
    difficulty: 'hard'
  },
  {
    id: 8,
    word: '病院',
    hiragana: 'びょういん',
    romaji: 'byouin',
    english: 'Hospital',
    association: 'Visualize a modern hospital building with a red cross sign',
    image: '🏥',
    location: 'Medical District',
    story: 'Imagine a clean, modern hospital with large windows, doctors in white coats, and the familiar red cross symbol.',
    difficulty: 'hard'
  },
  {
    id: 9,
    word: '銀行',
    hiragana: 'ぎんこう',
    romaji: 'ginkou',
    english: 'Bank',
    association: 'Picture a grand bank building with marble columns',
    image: '🏦',
    location: 'Financial District',
    story: 'Visualize walking into a majestic bank with marble floors, golden vault doors, and tellers behind polished counters.',
    difficulty: 'hard'
  },
  {
    id: 10,
    word: '大学',
    hiragana: 'だいがく',
    romaji: 'daigaku',
    english: 'University',
    association: 'Imagine a sprawling campus with students walking between historic buildings',
    image: '🎓',
    location: 'Campus',
    story: 'Picture a beautiful university campus with ivy-covered buildings, students carrying books, and the sound of bells ringing.',
    difficulty: 'hard'
  }
];

// Animated background component
const AnimatedBackground: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="w-full h-full bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 animate-gradient-x opacity-80"></div>
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <span
          key={i}
          className={`absolute block w-3 h-3 rounded-full bg-white opacity-20 animate-sparkle${i % 5}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
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
        className="h-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const MemoryPalace: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAssociation, setShowAssociation] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [trainingSession, setTrainingSession] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0
  });

  const currentCard = memoryPalaceData[currentCardIndex];

  const revealAssociation = () => {
    setShowAssociation(true);
  };

  const revealStory = () => {
    setShowStory(true);
  };

  const markCard = (correct: boolean) => {
    if (correct) {
      setScore(prev => prev + 15);
      setStreak(prev => prev + 1);
      setSessionStats(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setStreak(0);
      setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1, total: prev.total + 1 }));
    }

    // Move to next card or end session
    setTimeout(() => {
      if (currentCardIndex < memoryPalaceData.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
        setShowAssociation(false);
        setShowStory(false);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const startTraining = () => {
    setTrainingSession(true);
    setCurrentCardIndex(0);
    setShowAssociation(false);
    setShowStory(false);
    setScore(0);
    setStreak(0);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
    setShowResults(false);
  };

  const restartTraining = () => {
    setTrainingSession(false);
    setShowResults(false);
  };

  if (!trainingSession) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16 flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-6">
            <Brain className="w-12 h-12 text-indigo-400 animate-pulse mr-2" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
              Memory Palace
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-8 animate-fade-in">
            Visual associations <span className="mx-2">•</span> Spatial memory <span className="mx-2">•</span> <span className="text-indigo-300 font-bold">Enhanced retention!</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{memoryPalaceData.length}</div>
              <div className="text-sm opacity-80">Memory Locations</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">3</div>
              <div className="text-sm opacity-80">Difficulty Levels</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">∞</div>
              <div className="text-sm opacity-80">Memory Power</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-10 max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2 text-yellow-400" />
              How Memory Palace Works
            </h3>
            <div className="text-white/90 space-y-3 text-left">
              <p>• <strong>Visual Associations:</strong> Connect Japanese words to vivid mental images</p>
              <p>• <strong>Spatial Memory:</strong> Place each word in a familiar location</p>
              <p>• <strong>Story Creation:</strong> Build memorable narratives around each word</p>
              <p>• <strong>Emotional Connection:</strong> Engage multiple senses for better retention</p>
            </div>
          </div>

          <button
            onClick={startTraining}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:scale-105 hover:from-indigo-300 hover:to-pink-700 transition-all duration-300 flex items-center group"
          >
            Start Training
            <ArrowRight className="w-8 h-8 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const accuracy = Math.round((sessionStats.correct / sessionStats.total) * 100);
    
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-2xl mx-6 text-center border border-white/20">
          <div className="mb-8">
            <Brain className="w-20 h-20 text-indigo-400 mx-auto mb-4 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Training Complete! 🧠
            </h1>
            <div className="text-2xl text-white/90 mb-8">
              You explored <span className="font-bold text-indigo-300">{sessionStats.total}</span> memory locations!
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-white">{accuracy}%</div>
              <div className="text-white/80">Memory Accuracy</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-white">{sessionStats.correct}</div>
              <div className="text-white/80">Words Remembered</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={restartTraining}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-200"
            >
              Train Again
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
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white">
            <div className="text-2xl font-bold">Location {currentCardIndex + 1}/{memoryPalaceData.length}</div>
            <div className="text-sm opacity-80">Score: {score} | Streak: {streak}</div>
          </div>
          <div className="text-white text-right">
            <div className="text-sm opacity-80">Difficulty: {currentCard.difficulty}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <ProgressBar current={currentCardIndex + 1} total={memoryPalaceData.length} />
        </div>

        {/* Memory Palace Card */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{currentCard.image}</div>
              <div className="text-4xl font-bold text-white mb-2">{currentCard.word}</div>
              <div className="text-xl text-white/80 mb-1">{currentCard.hiragana}</div>
              <div className="text-lg text-white/60 mb-4">{currentCard.romaji}</div>
              <div className="text-2xl font-bold text-white mb-2">{currentCard.english}</div>
              <div className="text-sm text-white/60 flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-1" />
                {currentCard.location}
              </div>
            </div>

            {!showAssociation ? (
              <button
                onClick={revealAssociation}
                className="w-full py-4 bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
              >
                <Eye className="w-5 h-5 mr-2" />
                Reveal Visual Association
              </button>
            ) : (
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-white mb-2">Visual Association:</h4>
                  <p className="text-white/90">{currentCard.association}</p>
                </div>
                
                {!showStory ? (
                  <button
                    onClick={revealStory}
                    className="w-full py-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Reveal Memory Story
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <h4 className="text-lg font-bold text-white mb-2">Memory Story:</h4>
                      <p className="text-white/90">{currentCard.story}</p>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={() => markCard(false)}
                        className="flex-1 py-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 hover:scale-105 transition-all duration-200"
                      >
                        Need More Practice
                      </button>
                      <button
                        onClick={() => markCard(true)}
                        className="flex-1 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 hover:scale-105 transition-all duration-200"
                      >
                        Remembered!
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
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

export default MemoryPalace; 