import React from 'react';

interface KanaYoonSectionProps {
  script: 'hiragana' | 'katakana';
  onKanaClick: (char: string, script: 'hiragana' | 'katakana') => void;
  playAudio: (char: string, script: 'hiragana' | 'katakana') => void;
}

const yoonData = {
  hiragana: [
    ['きゃ', 'きゅ', 'きょ'],
    ['ぎゃ', 'ぎゅ', 'ぎょ'],
    ['しゃ', 'しゅ', 'しょ'],
    ['じゃ', 'じゅ', 'じょ'],
    ['ちゃ', 'ちゅ', 'ちょ'],
    ['ぢゃ', 'ぢゅ', 'ぢょ'],
    ['にゃ', 'にゅ', 'にょ'],
    ['ひゃ', 'ひゅ', 'ひょ'],
    ['びゃ', 'びゅ', 'びょ'],
    ['ぴゃ', 'ぴゅ', 'ぴょ'],
    ['みゃ', 'みゅ', 'みょ'],
    ['りゃ', 'りゅ', 'りょ'],
  ],
  katakana: [
    ['キャ', 'キュ', 'キョ'],
    ['ギャ', 'ギュ', 'ギョ'],
    ['シャ', 'シュ', 'ショ'],
    ['ジャ', 'ジュ', 'ジョ'],
    ['チャ', 'チュ', 'チョ'],
    ['ヂャ', 'ヂュ', 'ヂョ'],
    ['ニャ', 'ニュ', 'ニョ'],
    ['ヒャ', 'ヒュ', 'ヒョ'],
    ['ビャ', 'ビュ', 'ビョ'],
    ['ピャ', 'ピュ', 'ピョ'],
    ['ミャ', 'ミュ', 'ミョ'],
    ['リャ', 'リュ', 'リョ'],
  ],
};

const baseLabels = ['K', 'G', 'S', 'Z', 'T', 'D', 'N', 'H', 'B', 'P', 'M', 'R'];
const yoonLabels = ['YA', 'YU', 'YO'];

const KanaYoonSection: React.FC<KanaYoonSectionProps> = ({ script, onKanaClick, playAudio }) => {
  const color = script === 'hiragana' ? 'from-pink-50 to-pink-200' : 'from-blue-50 to-blue-200';
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">🟢</span>
        <span className="font-bold text-blue-600">Yōon (Contracted Sounds)</span>
        <span className="ml-2 text-xs text-gray-500" title="Yōon are combinations of I-row kana + small ya/yu/yo, e.g. き+ゃ=きゃ">What is this?</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-center rounded-xl shadow bg-gradient-to-br {color} border border-gray-200">
          <thead>
            <tr>
              <th className="p-2"></th>
              {yoonLabels.map((col) => (
                <th key={col} className="p-2 text-md font-bold text-gray-700">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {yoonData[script].map((row, i) => (
              <tr key={i} className="hover:bg-white/30 transition">
                <td className="p-2 font-bold text-gray-500">{baseLabels[i]}</td>
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
    </div>
  );
};

export default KanaYoonSection; 