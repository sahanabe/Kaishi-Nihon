import React from 'react';

interface KanaGojuuonTableProps {
  script: 'hiragana' | 'katakana';
  onKanaClick: (char: string, script: 'hiragana' | 'katakana') => void;
  playAudio: (char: string, script: 'hiragana' | 'katakana') => void;
}

const gojuuonData = {
  hiragana: [
    ['あ', 'い', 'う', 'え', 'お'],
    ['か', 'き', 'く', 'け', 'こ'],
    ['さ', 'し', 'す', 'せ', 'そ'],
    ['た', 'ち', 'つ', 'て', 'と'],
    ['な', 'に', 'ぬ', 'ね', 'の'],
    ['は', 'ひ', 'ふ', 'へ', 'ほ'],
    ['ま', 'み', 'む', 'め', 'も'],
    ['や', '', 'ゆ', '', 'よ'],
    ['ら', 'り', 'る', 'れ', 'ろ'],
    ['わ', '', '', '', 'を'],
    ['ん', '', '', '', ''],
  ],
  katakana: [
    ['ア', 'イ', 'ウ', 'エ', 'オ'],
    ['カ', 'キ', 'ク', 'ケ', 'コ'],
    ['サ', 'シ', 'ス', 'セ', 'ソ'],
    ['タ', 'チ', 'ツ', 'テ', 'ト'],
    ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
    ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
    ['マ', 'ミ', 'ム', 'メ', 'モ'],
    ['ヤ', '', 'ユ', '', 'ヨ'],
    ['ラ', 'リ', 'ル', 'レ', 'ロ'],
    ['ワ', '', '', '', 'ヲ'],
    ['ン', '', '', '', ''],
  ],
};

const romajiRows = [
  ['a', 'i', 'u', 'e', 'o'],
  ['ka', 'ki', 'ku', 'ke', 'ko'],
  ['sa', 'shi', 'su', 'se', 'so'],
  ['ta', 'chi', 'tsu', 'te', 'to'],
  ['na', 'ni', 'nu', 'ne', 'no'],
  ['ha', 'hi', 'fu', 'he', 'ho'],
  ['ma', 'mi', 'mu', 'me', 'mo'],
  ['ya', '', 'yu', '', 'yo'],
  ['ra', 'ri', 'ru', 're', 'ro'],
  ['wa', '', '', '', 'wo'],
  ['n', '', '', '', ''],
];

const rowLabels = ['', 'K', 'S', 'T', 'N', 'H', 'M', 'Y', 'R', 'W', ''];

const KanaGojuuonTable: React.FC<KanaGojuuonTableProps> = ({ script, onKanaClick, playAudio }) => {
  const color = script === 'hiragana' ? 'from-pink-200 to-pink-400' : 'from-blue-200 to-blue-400';
  return (
    <div className="overflow-x-auto animate-fade-in">
      <table className="w-full text-center rounded-2xl shadow-xl bg-gradient-to-br {color} border border-gray-200">
        <thead>
          <tr>
            <th className="p-2"></th>
            {['A', 'I', 'U', 'E', 'O'].map((col) => (
              <th key={col} className="p-2 text-lg font-bold text-gray-700">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {gojuuonData[script].map((row, i) => (
            <tr key={i} className="hover:bg-white/30 transition">
              <td className="p-2 font-bold text-gray-500">{rowLabels[i]}</td>
              {row.map((kana, j) => (
                <td key={j} className="p-2">
                  {kana ? (
                    <button
                      className={`group w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-xl shadow-md bg-white/80 hover:bg-gradient-to-br ${color} hover:scale-110 transition-transform border-2 border-transparent hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                      onClick={() => { onKanaClick(kana, script); playAudio(kana, script); }}
                      title={romajiRows[i][j]}
                    >
                      <span className="text-3xl md:text-4xl font-extrabold text-gray-900 group-hover:text-yellow-600 transition-colors">{kana}</span>
                      <span className="text-xs text-gray-500 group-hover:text-yellow-700">{romajiRows[i][j]}</span>
                    </button>
                  ) : (
                    <span className="w-16 h-16 md:w-20 md:h-20 inline-block"></span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right text-xs text-gray-400 mt-2">Click any character for details & audio</div>
    </div>
  );
};

export default KanaGojuuonTable; 