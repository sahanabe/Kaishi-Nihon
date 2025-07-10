import React, { useState, useEffect, useRef } from 'react';
import { Eye, Hand, RotateCcw, Play, Pause, Volume2, ArrowLeft, ArrowRight, Sparkles, Zap, Target, Brain, Camera, Move, RotateCw } from 'lucide-react';

// 3D Kanji data with holographic properties
const holographicKanjiData = [
  {
    id: 1,
    kanji: '漢',
    hiragana: 'かん',
    romaji: 'kan',
    english: 'Chinese, Han',
    meaning: 'Chinese character, Han dynasty',
    strokeCount: 14,
    radicals: ['氵', '廿', '口'],
    holographicColor: '#00ffff',
    rotationSpeed: 2,
    glowIntensity: 0.8,
    gestureControls: ['rotate', 'scale', 'flip']
  },
  {
    id: 2,
    kanji: '字',
    hiragana: 'じ',
    romaji: 'ji',
    english: 'Character, Letter',
    meaning: 'Written character, letter',
    strokeCount: 6,
    radicals: ['宀', '子'],
    holographicColor: '#ff00ff',
    rotationSpeed: 1.5,
    glowIntensity: 0.9,
    gestureControls: ['rotate', 'scale', 'flip']
  },
  {
    id: 3,
    kanji: '学',
    hiragana: 'がく',
    romaji: 'gaku',
    english: 'Study, Learning',
    meaning: 'To study, learning, scholarship',
    strokeCount: 8,
    radicals: ['冖', '子'],
    holographicColor: '#ffff00',
    rotationSpeed: 2.5,
    glowIntensity: 0.7,
    gestureControls: ['rotate', 'scale', 'flip']
  },
  {
    id: 4,
    kanji: '水',
    hiragana: 'みず',
    romaji: 'mizu',
    english: 'Water',
    meaning: 'Water, liquid',
    strokeCount: 4,
    radicals: ['氵'],
    holographicColor: '#0080ff',
    rotationSpeed: 1.8,
    glowIntensity: 0.6,
    gestureControls: ['rotate', 'scale', 'flip']
  },
  {
    id: 5,
    kanji: '火',
    hiragana: 'ひ',
    romaji: 'hi',
    english: 'Fire',
    meaning: 'Fire, flame',
    strokeCount: 4,
    radicals: ['火'],
    holographicColor: '#ff4000',
    rotationSpeed: 2.2,
    glowIntensity: 0.8,
    gestureControls: ['rotate', 'scale', 'flip']
  },
  {
    id: 6,
    kanji: '木',
    hiragana: 'き',
    romaji: 'ki',
    english: 'Tree, Wood',
    meaning: 'Tree, wood, timber',
    strokeCount: 4,
    radicals: ['木'],
    holographicColor: '#00ff00',
    rotationSpeed: 1.6,
    glowIntensity: 0.5,
    gestureControls: ['rotate', 'scale', 'flip']
  },
  {
    id: 7,
    kanji: '金',
    hiragana: 'かね',
    romaji: 'kane',
    english: 'Gold, Money',
    meaning: 'Gold, metal, money',
    strokeCount: 8,
    radicals: ['金'],
    holographicColor: '#ffd700',
    rotationSpeed: 2.0,
    glowIntensity: 0.9,
    gestureControls: ['rotate', 'scale', 'flip']
  },
  {
    id: 8,
    kanji: '土',
    hiragana: 'つち',
    romaji: 'tsuchi',
    english: 'Earth, Soil',
    meaning: 'Earth, soil, ground',
    strokeCount: 3,
    radicals: ['土'],
    holographicColor: '#8b4513',
    rotationSpeed: 1.4,
    glowIntensity: 0.4,
    gestureControls: ['rotate', 'scale', 'flip']
  }
];

// Animated background component
const AnimatedBackground: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="w-full h-full bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 animate-gradient-x opacity-90"></div>
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <span
          key={i}
          className={`absolute block w-1 h-1 rounded-full bg-cyan-400 opacity-60 animate-sparkle${i % 5}`}
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

// 3D Kanji Component
const Kanji3D: React.FC<{ kanji: any; isActive: boolean }> = ({ kanji, isActive }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setRotation(prev => ({
          x: prev.x + kanji.rotationSpeed * 0.5,
          y: prev.y + kanji.rotationSpeed * 0.3,
          z: prev.z + kanji.rotationSpeed * 0.2
        }));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isActive, kanji.rotationSpeed]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isActive) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setRotation({
        x: (y - 0.5) * 30,
        y: (x - 0.5) * 30,
        z: 0
      });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isActive) {
      e.preventDefault();
      setScale(prev => Math.max(0.5, Math.min(2, prev + e.deltaY * -0.001)));
    }
  };

  return (
    <div
      className={`relative w-64 h-64 flex items-center justify-center cursor-pointer transition-all duration-300 ${
        isActive ? 'transform-gpu' : 'opacity-50'
      }`}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg) scale(${scale})`,
        filter: `drop-shadow(0 0 20px ${kanji.holographicColor})`,
      }}
    >
      <div
        className={`text-8xl font-bold transition-all duration-500 ${
          isHovered ? 'animate-pulse' : ''
        }`}
        style={{
          color: kanji.holographicColor,
          textShadow: `0 0 30px ${kanji.holographicColor}, 0 0 60px ${kanji.holographicColor}`,
          opacity: kanji.glowIntensity
        }}
      >
        {kanji.kanji}
      </div>
      
      {/* Holographic effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};

const Kanji3DHolographic: React.FC = () => {
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [gestureMode, setGestureMode] = useState(false);
  const [arMode, setArMode] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    viewed: 0,
    interacted: 0,
    timeSpent: 0
  });

  const currentKanji = holographicKanjiData[currentKanjiIndex];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentKanjiIndex(prev => (prev + 1) % holographicKanjiData.length);
        setSessionStats(prev => ({ ...prev, viewed: prev.viewed + 1 }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const nextKanji = () => {
    setCurrentKanjiIndex(prev => (prev + 1) % holographicKanjiData.length);
    setSessionStats(prev => ({ ...prev, viewed: prev.viewed + 1 }));
  };

  const previousKanji = () => {
    setCurrentKanjiIndex(prev => prev === 0 ? holographicKanjiData.length - 1 : prev - 1);
    setSessionStats(prev => ({ ...prev, viewed: prev.viewed + 1 }));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleGestureMode = () => {
    setGestureMode(!gestureMode);
  };

  const toggleARMode = () => {
    setArMode(!arMode);
  };

  if (!isPlaying && sessionStats.viewed === 0) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16 flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-6">
            <Eye className="w-12 h-12 text-cyan-400 animate-pulse mr-2" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
              3D Holographic Kanji
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-8 animate-fade-in">
            Experience kanji in 3D space <span className="mx-2">•</span> Gesture controls <span className="mx-2">•</span> <span className="text-cyan-300 font-bold">AR Compatible!</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">{holographicKanjiData.length}</div>
              <div className="text-sm opacity-80">3D Kanji</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">∞</div>
              <div className="text-sm opacity-80">Gestures</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold">AR</div>
              <div className="text-sm opacity-80">Ready</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-10 max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Hand className="w-6 h-6 mr-2 text-cyan-400" />
              Gesture Controls
            </h3>
            <div className="text-white/90 space-y-3 text-left">
              <p>• <strong>Mouse/Touch:</strong> Rotate kanji in 3D space</p>
              <p>• <strong>Scroll:</strong> Zoom in/out on kanji details</p>
              <p>• <strong>Hover:</strong> Activate holographic effects</p>
              <p>• <strong>AR Mode:</strong> View in real-world environment</p>
            </div>
          </div>

          <button
            onClick={togglePlay}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:scale-105 hover:from-cyan-300 hover:to-purple-700 transition-all duration-300 flex items-center group"
          >
            Launch 🚀
            <ArrowRight className="w-8 h-8 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white">
            <div className="text-2xl font-bold">Kanji {currentKanjiIndex + 1}/{holographicKanjiData.length}</div>
            <div className="text-sm opacity-80">Viewed: {sessionStats.viewed}</div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={toggleGestureMode}
              className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
                gestureMode 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Hand className="w-5 h-5 inline mr-2" />
              Gesture
            </button>
            
            <button
              onClick={toggleARMode}
              className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
                arMode 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Camera className="w-5 h-5 inline mr-2" />
              AR
            </button>
            
            <button
              onClick={togglePlay}
              className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-lg hover:scale-105 transition-all duration-200"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Main 3D Display */}
        <div className="flex justify-center items-center mb-8">
          <Kanji3D kanji={currentKanji} isActive={true} />
        </div>

        {/* Kanji Information */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto">
          <div className="text-center text-white mb-6">
            <div className="text-3xl font-bold mb-2">{currentKanji.kanji}</div>
            <div className="text-lg opacity-80 mb-1">{currentKanji.hiragana} ({currentKanji.romaji})</div>
            <div className="text-xl font-semibold mb-4">{currentKanji.english}</div>
            <div className="text-sm opacity-70 mb-4">{currentKanji.meaning}</div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-bold">Strokes</div>
                <div>{currentKanji.strokeCount}</div>
              </div>
              <div>
                <div className="font-bold">Radicals</div>
                <div>{currentKanji.radicals.join(', ')}</div>
              </div>
              <div>
                <div className="font-bold">Color</div>
                <div className="w-4 h-4 rounded-full mx-auto" style={{ backgroundColor: currentKanji.holographicColor }}></div>
              </div>
            </div>
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

export default Kanji3DHolographic; 