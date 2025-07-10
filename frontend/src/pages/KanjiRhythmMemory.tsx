import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, Volume2, ArrowLeft, ArrowRight, Clock, Target, Star, Sparkles, Zap, Heart, Drum, Piano, Guitar } from 'lucide-react';

// Rhythm Memory data with musical patterns
const rhythmMemoryData = [
  {
    id: 1,
    kanji: '心',
    hiragana: 'こころ',
    romaji: 'kokoro',
    english: 'Heart, Mind',
    meaning: 'Heart, mind, spirit',
    rhythm: [1, 0, 1, 0, 1, 1, 0, 1], // 8-beat pattern
    bpm: 120,
    musicalNote: 'C',
    color: '#ff6b6b',
    sound: 'heartbeat'
  },
  {
    id: 2,
    kanji: '火',
    hiragana: 'ひ',
    romaji: 'hi',
    english: 'Fire',
    meaning: 'Fire, flame',
    rhythm: [1, 1, 0, 1, 0, 1, 1, 0], // 8-beat pattern
    bpm: 140,
    musicalNote: 'D',
    color: '#ff8e53',
    sound: 'fire'
  },
  {
    id: 3,
    kanji: '水',
    hiragana: 'みず',
    romaji: 'mizu',
    english: 'Water',
    meaning: 'Water, liquid',
    rhythm: [1, 0, 0, 1, 0, 0, 1, 0], // 8-beat pattern
    bpm: 80,
    musicalNote: 'E',
    color: '#4ecdc4',
    sound: 'water'
  },
  {
    id: 4,
    kanji: '木',
    hiragana: 'き',
    romaji: 'ki',
    english: 'Tree, Wood',
    meaning: 'Tree, wood, timber',
    rhythm: [1, 0, 1, 0, 1, 0, 1, 0], // 8-beat pattern
    bpm: 100,
    musicalNote: 'F',
    color: '#26de81',
    sound: 'nature'
  },
  {
    id: 5,
    kanji: '金',
    hiragana: 'かね',
    romaji: 'kane',
    english: 'Gold, Money',
    meaning: 'Gold, metal, money',
    rhythm: [1, 1, 1, 0, 1, 1, 1, 0], // 8-beat pattern
    bpm: 160,
    musicalNote: 'G',
    color: '#ffd700',
    sound: 'coin'
  },
  {
    id: 6,
    kanji: '土',
    hiragana: 'つち',
    romaji: 'tsuchi',
    english: 'Earth, Soil',
    meaning: 'Earth, soil, ground',
    rhythm: [1, 0, 0, 0, 1, 0, 0, 0], // 8-beat pattern
    bpm: 60,
    musicalNote: 'A',
    color: '#8b4513',
    sound: 'earth'
  },
  {
    id: 7,
    kanji: '空',
    hiragana: 'そら',
    romaji: 'sora',
    english: 'Sky, Air',
    meaning: 'Sky, air, empty',
    rhythm: [1, 1, 0, 0, 1, 1, 0, 0], // 8-beat pattern
    bpm: 110,
    musicalNote: 'B',
    color: '#87ceeb',
    sound: 'wind'
  },
  {
    id: 8,
    kanji: '月',
    hiragana: 'つき',
    romaji: 'tsuki',
    english: 'Moon',
    meaning: 'Moon, month',
    rhythm: [1, 0, 1, 1, 0, 1, 0, 1], // 8-beat pattern
    bpm: 90,
    musicalNote: 'C',
    color: '#f0f8ff',
    sound: 'moon'
  }
];

// Animated background component
const AnimatedBackground: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="w-full h-full bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 animate-gradient-x opacity-80"></div>
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <span
          key={i}
          className={`absolute block w-1 h-1 rounded-full bg-pink-400 opacity-50 animate-sparkle${i % 5}`}
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

// Rhythm Visualizer Component
const RhythmVisualizer: React.FC<{ rhythm: number[]; isPlaying: boolean; currentBeat: number }> = ({ rhythm, isPlaying, currentBeat }) => {
  return (
    <div className="flex space-x-2 justify-center mb-6">
      {rhythm.map((beat, index) => (
        <div
          key={index}
          className={`w-8 h-8 rounded-full transition-all duration-200 ${
            beat === 1
              ? currentBeat === index && isPlaying
                ? 'bg-pink-500 scale-125 shadow-lg'
                : 'bg-pink-400'
              : 'bg-gray-400'
          }`}
        />
      ))}
    </div>
  );
};

// BPM Controller Component
const BPMController: React.FC<{ bpm: number; onBPMChange: (bpm: number) => void }> = ({ bpm, onBPMChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="text-white font-bold">BPM:</label>
      <input
        type="range"
        min="60"
        max="200"
        value={bpm}
        onChange={(e) => onBPMChange(parseInt(e.target.value))}
        className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-white font-bold min-w-[3rem]">{bpm}</span>
    </div>
  );
};

const KanjiRhythmMemory: React.FC = () => {
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [volume, setVolume] = useState(0.7);
  const [sessionStats, setSessionStats] = useState({
    played: 0,
    correct: 0,
    total: 0
  });

  const currentKanji = rhythmMemoryData[currentKanjiIndex];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const beatInterval = (60 / bpm) * 1000; // Convert BPM to milliseconds
      
      intervalRef.current = setInterval(() => {
        setCurrentBeat(prev => {
          const nextBeat = (prev + 1) % currentKanji.rhythm.length;
          if (nextBeat === 0) {
            // Completed one cycle
            setSessionStats(prev => ({ ...prev, played: prev.played + 1 }));
          }
          return nextBeat;
        });
      }, beatInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      setCurrentBeat(0);
    }
  }, [isPlaying, bpm, currentKanji.rhythm.length]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextKanji = () => {
    setCurrentKanjiIndex(prev => (prev + 1) % rhythmMemoryData.length);
    setCurrentBeat(0);
    setIsPlaying(false);
  };

  const previousKanji = () => {
    setCurrentKanjiIndex(prev => prev === 0 ? rhythmMemoryData.length - 1 : prev - 1);
    setCurrentBeat(0);
    setIsPlaying(false);
  };

  const handleBPMChange = (newBPM: number) => {
    setBpm(newBPM);
    // Update the current kanji's BPM
    currentKanji.bpm = newBPM;
  };

  if (!isPlaying && sessionStats.played === 0) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16 flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-6">
            <Music className="w-12 h-12 text-pink-400 animate-pulse mr-2" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
              Rhythm Memory
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-8 animate-fade-in">
            Learn kanji through musical patterns <span className="mx-2">•</span> Rhythmic sequences <span className="mx-2">•</span> <span className="text-pink-300 font-bold">BPM: 120 ♪</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{rhythmMemoryData.length}</div>
              <div className="text-sm opacity-80">Musical Kanji</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">8</div>
              <div className="text-sm opacity-80">Beat Patterns</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">♪</div>
              <div className="text-sm opacity-80">Musical Notes</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-10 max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Drum className="w-6 h-6 mr-2 text-pink-400" />
              Musical Learning
            </h3>
            <div className="text-white/90 space-y-3 text-left">
              <p>• <strong>Rhythm Patterns:</strong> Each kanji has a unique 8-beat rhythm</p>
              <p>• <strong>BPM Control:</strong> Adjust tempo to match your learning pace</p>
              <p>• <strong>Visual Beats:</strong> See the rhythm pattern light up in real-time</p>
              <p>• <strong>Musical Notes:</strong> Each kanji corresponds to a musical note</p>
            </div>
          </div>

          <button
            onClick={togglePlay}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-pink-400 via-purple-500 to-red-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:scale-105 hover:from-pink-300 hover:to-red-700 transition-all duration-300 flex items-center group"
          >
            Play 🎮
            <ArrowRight className="w-8 h-8 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white">
            <div className="text-2xl font-bold">Kanji {currentKanjiIndex + 1}/{rhythmMemoryData.length}</div>
            <div className="text-sm opacity-80">Played: {sessionStats.played}</div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={togglePlay}
              className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-200 flex items-center"
            >
              {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-white" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Main Display */}
        <div className="flex justify-center items-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl text-center">
            <div className="text-8xl font-bold text-white mb-6" style={{ color: currentKanji.color }}>
              {currentKanji.kanji}
            </div>
            
            <div className="text-white mb-6">
              <div className="text-2xl font-bold mb-2">{currentKanji.english}</div>
              <div className="text-lg opacity-80 mb-1">{currentKanji.hiragana} ({currentKanji.romaji})</div>
              <div className="text-sm opacity-70">{currentKanji.meaning}</div>
            </div>

            {/* Musical Info */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-white font-bold">Note</div>
                <div className="text-pink-300 text-xl">{currentKanji.musicalNote}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-white font-bold">BPM</div>
                <div className="text-pink-300 text-xl">{currentKanji.bpm}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-white font-bold">Sound</div>
                <div className="text-pink-300 text-sm">{currentKanji.sound}</div>
              </div>
            </div>

            {/* Rhythm Visualizer */}
            <RhythmVisualizer 
              rhythm={currentKanji.rhythm} 
              isPlaying={isPlaying} 
              currentBeat={currentBeat} 
            />

            {/* BPM Controller */}
            <BPMController bpm={bpm} onBPMChange={handleBPMChange} />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-6 mt-8">
          <button
            onClick={previousKanji}
            className="px-6 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          
          <button
            onClick={() => window.location.href = '#/language/kanji-mastery'}
            className="px-6 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-200"
          >
            Back to Kanji Mastery
          </button>
          
          <button
            onClick={nextKanji}
            className="px-6 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center"
          >
            Next
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KanjiRhythmMemory; 