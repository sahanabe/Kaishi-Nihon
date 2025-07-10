import React from 'react';

interface KanaDakutenSectionProps {
  script: 'hiragana' | 'katakana';
  onKanaClick: (char: string, script: 'hiragana' | 'katakana') => void;
  playAudio: (char: string, script: 'hiragana' | 'katakana') => void;
}

const dakutenData = {
  hiragana: [
    ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
    ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
    ['だ', 'ぢ', 'づ', 'で', 'ど'],
    ['ば', 'び', 'ぶ', 'べ', 'ぼ'],
  ],
  katakana: [
    ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'],
    ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'],
    ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'],
    ['バ', 'ビ', 'ブ', 'ベ', 'ボ'],
  ],
};

const handakutenData = {
  hiragana: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'],
  katakana: ['パ', 'ピ', 'プ', 'ペ', 'ポ'],
};

const rowLabels = ['G', 'Z', 'D', 'B'];

const KanaDakutenSection: React.FC<KanaDakutenSectionProps> = ({ script, onKanaClick, playAudio }) => {
  const color = script === 'hiragana' ? 'from-pink-100 to-pink-300' : 'from-blue-100 to-blue-300';
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">🔹</span>
        <span className="font-bold text-blue-600">Dakuten (゛) – Voiced Sounds</span>
        <span className="ml-2 text-xs text-gray-500" title="Dakuten (゛) marks make kana voiced, e.g. か→が">What is this?</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-center rounded-xl shadow bg-gradient-to-br {color} border border-gray-200">
          <thead>
            <tr>
              <th className="p-2"></th>
              {['A', 'I', 'U', 'E', 'O'].map((col) => (
                <th key={col} className="p-2 text-md font-bold text-gray-700">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dakutenData[script].map((row, i) => (
              <tr key={i} className="hover:bg-white/30 transition">
                <td className="p-2 font-bold text-gray-500">{rowLabels[i]}</td>
                {row.map((kana, j) => (
                  <td key={j} className="p-2">
                    <button
                      className={`group w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center rounded-lg shadow bg-white/80 hover:bg-gradient-to-br ${color} hover:scale-110 transition-transform border-2 border-transparent hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                      onClick={() => { onKanaClick(kana, script); playAudio(kana, script); }}
                      title="Click for details & audio"
                    >
                      <span className="text-2xl md:text-3xl font-extrabold text-gray-900 group-hover:text-yellow-600 transition-colors">{kana}</span>
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center space-x-2 mb-2 mt-8">
        <span className="text-lg">🔹</span>
        <span className="font-bold text-blue-600">Handakuten (゜) – Semi-voiced Sounds</span>
        <span className="ml-2 text-xs text-gray-500" title="Handakuten (゜) is only for H-row, e.g. は→ぱ">What is this?</span>
      </div>
      <div className="flex gap-2 justify-center">
        {handakutenData[script].map((kana) => (
          <button
            key={kana}
            className={`group w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center rounded-lg shadow bg-white/80 hover:bg-gradient-to-br ${color} hover:scale-110 transition-transform border-2 border-transparent hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
            onClick={() => { onKanaClick(kana, script); playAudio(kana, script); }}
            title="Click for details & audio"
          >
            <span className="text-2xl md:text-3xl font-extrabold text-gray-900 group-hover:text-yellow-600 transition-colors">{kana}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default KanaDakutenSection; 