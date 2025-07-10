import React, { useRef, useState, useEffect } from 'react';
import { 
  Brush, 
  Eraser, 
  RotateCcw, 
  RotateCw, 
  Trash2, 
  Volume2, 
  Play, 
  Pause,
  Settings,
  Palette,
  Eye,
  EyeOff,
  Check,
  X,
  Brain,
  Lightbulb
} from 'lucide-react';

interface AdvancedDrawingPadProps {
  currentCharacter: {
    char: string;
    romaji: string;
    sound: string;
    mnemonic: string;
    strokes: number;
    strokePaths?: number[][][];
  };
  onCharacterClick: (char: string, script: 'hiragana' | 'katakana') => void;
  playAudio: (char: string, script: 'hiragana' | 'katakana') => void;
  script: 'hiragana' | 'katakana';
  feedback: string;
  feedbackType: 'positive' | 'negative' | 'neutral';
  onMarkCorrect: () => void;
  onMarkIncorrect: () => void;
  onClearCanvas: () => void;
}

const AdvancedDrawingPad: React.FC<AdvancedDrawingPadProps> = ({
  currentCharacter,
  onCharacterClick,
  playAudio,
  script,
  feedback,
  feedbackType,
  onMarkCorrect,
  onMarkIncorrect,
  onClearCanvas
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(3);
  const [brushColor, setBrushColor] = useState('#1F2937');
  const [isEraser, setIsEraser] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lastPosition, setLastPosition] = useState<{x: number, y: number} | null>(null);

  const colors = [
    '#1F2937', // Dark gray
    '#DC2626', // Red
    '#2563EB', // Blue
    '#059669', // Green
    '#7C3AED', // Purple
    '#EA580C', // Orange
    '#DB2777', // Pink
  ];

  const brushSizes = [1, 2, 3, 5, 8, 12];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size - optimized for visibility and practice
    canvas.width = 500;
    canvas.height = 500;

    // Clear and draw guide
    clearCanvas();
    drawGuide();
  }, [currentCharacter]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const drawGuide = () => {
    if (!showGuide) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw light character guide - bigger for larger canvas
    ctx.font = 'bold 180px serif';
    ctx.fillStyle = 'rgba(107, 114, 128, 0.2)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentCharacter.char, canvas.width / 2, canvas.height / 2);

    // Stroke numbers removed for cleaner practice experience
    // Users can focus on drawing without numbered distractions
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setDrawingHistory(prev => [...prev.slice(0, historyIndex + 1), imageData]);
    setHistoryIndex(prev => prev + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      setHistoryIndex(prev => prev - 1);
      ctx.putImageData(drawingHistory[historyIndex - 1], 0, 0);
    }
  };

  const redo = () => {
    if (historyIndex < drawingHistory.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      setHistoryIndex(prev => prev + 1);
      ctx.putImageData(drawingHistory[historyIndex + 1], 0, 0);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPosition({x, y});
    saveToHistory();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPosition) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = isEraser ? '#FFFFFF' : brushColor;
    ctx.lineWidth = isEraser ? brushSize * 2 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastPosition({x, y});
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };

  const playStrokeAnimation = () => {
    if (!currentCharacter.strokePaths || isAnimating) return;

    setIsAnimating(true);
    setAnimationStep(0);
    clearCanvas();

    const animateStroke = (strokeIndex: number) => {
      if (strokeIndex >= currentCharacter.strokePaths!.length) {
        setIsAnimating(false);
        return;
      }

      const strokePath = currentCharacter.strokePaths![strokeIndex];
      let pointIndex = 0;

      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      ctx.strokeStyle = '#4F46E5';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const drawStrokePath = () => {
        if (pointIndex >= strokePath.length - 1) {
          setTimeout(() => animateStroke(strokeIndex + 1), 800);
          return;
        }

        const currentPoint = strokePath[pointIndex];
        const nextPoint = strokePath[pointIndex + 1];

        ctx.beginPath();
        ctx.moveTo(currentPoint[0], currentPoint[1]);
        ctx.lineTo(nextPoint[0], nextPoint[1]);
        ctx.stroke();

        pointIndex++;
        setTimeout(drawStrokePath, 50);
      };

      drawStrokePath();
    };

    animateStroke(0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-3xl font-bold text-black">Advanced Drawing Pad</h3>
          <div className="flex items-center space-x-2">
            <span className="text-base text-black font-semibold">Script:</span>
            <span className={`px-3 py-1 rounded text-sm font-bold ${
              script === 'hiragana' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {script === 'hiragana' ? 'ひらがな' : 'カタカナ'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={`p-2 rounded-lg transition-colors ${
              showGuide ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
            }`}
            title={showGuide ? 'Hide Guide' : 'Show Guide'}
          >
            {showGuide ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          <button
            onClick={playStrokeAnimation}
            disabled={isAnimating || !currentCharacter.strokePaths}
            className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors disabled:opacity-50"
            title="Play Stroke Animation"
          >
            {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Character Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
          <div className="text-7xl font-bold text-gray-900 mb-3">
            {currentCharacter.char}
          </div>
          <div className="text-2xl text-gray-600 mb-2">
            {currentCharacter.romaji}
          </div>
          <div className="text-lg text-purple-600 font-semibold">
            {currentCharacter.sound}
          </div>
          <button
            onClick={() => playAudio(currentCharacter.char, script)}
            className="mt-4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
            title="Listen to pronunciation"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            <span className="font-semibold text-yellow-800 text-lg">Memory Technique</span>
          </div>
          <p className="text-yellow-700 text-base">{currentCharacter.mnemonic}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {currentCharacter.strokes}
            </div>
            <div className="text-base text-gray-600 mb-3">
              stroke{currentCharacter.strokes > 1 ? 's' : ''} total
            </div>
            <div>
              <button
                onClick={() => onCharacterClick(currentCharacter.char, script)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-base font-semibold"
              >
                Practice Character
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Drawing Tools */}
      <div className="flex items-center justify-between mb-6 p-6 bg-white border-2 border-gray-200 rounded-xl shadow-lg">
        <div className="flex items-center space-x-4">
          {/* Brush Tool */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEraser(false)}
              className={`p-2 rounded-lg transition-colors ${
                !isEraser ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}
              title="Brush Tool"
            >
              <Brush className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsEraser(true)}
              className={`p-2 rounded-lg transition-colors ${
                isEraser ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
              }`}
              title="Eraser Tool"
            >
              <Eraser className="w-4 h-4" />
            </button>
          </div>

          {/* Brush Size */}
          <div className="flex items-center space-x-3">
            <span className="text-base text-black font-bold">Size:</span>
            <select
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="border-2 border-gray-400 rounded-lg px-3 py-2 text-base font-semibold bg-white text-black"
            >
              {brushSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div className="flex items-center space-x-3">
            <span className="text-base text-black font-bold">Color:</span>
            <div className="flex space-x-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setBrushColor(color)}
                  className={`w-8 h-8 rounded-full border-3 transition-all ${
                    brushColor === color ? 'border-black scale-125 shadow-lg' : 'border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="Undo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= drawingHistory.length - 1}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50"
            title="Redo"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={clearCanvas}
            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
            title="Clear Canvas"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Drawing Canvas */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
        <div className="text-center mb-4">
          <h4 className="text-2xl font-bold text-black mb-2">🎨 Practice Drawing Pad</h4>
          <p className="text-lg text-black font-semibold">Draw the character <span className="font-bold text-purple-600 text-2xl">{currentCharacter.char}</span> with proper stroke order</p>
        </div>
        <div className="flex justify-center overflow-hidden">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={500}
              height={500}
              className="border-4 border-dashed border-purple-300 rounded-xl mx-auto block cursor-crosshair bg-white shadow-2xl max-w-full h-auto"
              style={{ maxWidth: '100%', height: 'auto' }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <div className="text-base text-black font-bold bg-white px-6 py-3 rounded-lg shadow-md border-2 border-gray-200">
            {isEraser ? '🧽 Eraser Mode' : '✏️ Drawing Mode'} • 
            Size: {brushSize} • 
            Color: <span className="inline-block w-6 h-6 rounded-full border-2 border-gray-400 ml-3" style={{ backgroundColor: brushColor }}></span>
          </div>
        </div>
      </div>

      {/* AI Feedback and Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Feedback */}
        <div className={`rounded-xl p-4 ${
          feedbackType === 'positive' ? 'bg-green-50 border border-green-200' :
          feedbackType === 'negative' ? 'bg-red-50 border border-red-200' :
          'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            <Brain className={`w-5 h-5 ${
              feedbackType === 'positive' ? 'text-green-600' :
              feedbackType === 'negative' ? 'text-red-600' :
              'text-blue-600'
            }`} />
            <span className={`font-semibold ${
              feedbackType === 'positive' ? 'text-green-800' :
              feedbackType === 'negative' ? 'text-red-800' :
              'text-blue-800'
            }`}>AI Feedback</span>
          </div>
          <p className={`text-sm ${
            feedbackType === 'positive' ? 'text-green-700' :
            feedbackType === 'negative' ? 'text-red-700' :
            'text-blue-700'
          }`}>
            {feedback}
          </p>
        </div>

        {/* Practice Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={onMarkCorrect}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            title="Mark as correct"
          >
            <Check className="w-5 h-5" />
            <span>Correct</span>
          </button>
          <button
            onClick={onMarkIncorrect}
            className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            title="Mark as incorrect - try again"
          >
            <X className="w-5 h-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedDrawingPad; 