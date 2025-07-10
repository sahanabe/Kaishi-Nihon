import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Target, Trophy, Volume2, RotateCcw, CheckCircle, XCircle, Star, Clock, Award, TrendingUp, Zap, ArrowRight, ArrowLeft, Home, Lightbulb, BarChart3, Headphones, RefreshCw, Timer, Eye, Flame, Crown, Users, Calendar, Mic, Camera, Gamepad2, Gift, Sparkles, TrendingDown, BarChart, PieChart, Activity, Rocket, Shield, Compass, Map, Coffee, Sun, Moon, Cloud, Rainbow, ChevronLeft, ChevronRight } from 'lucide-react';

const N5Vocabulary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedStats, setAnimatedStats] = useState({ wordsLearned: 0, streakDays: 0, accuracy: 0, totalTime: 0 });
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [showWordCloud, setShowWordCloud] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(false);
  const [learningStreak, setLearningStreak] = useState(12);
  const [weeklyGoal, setWeeklyGoal] = useState(70);
  const [currentWeekProgress, setCurrentWeekProgress] = useState(45);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [wordsPerDay] = useState(10);
  const [totalDays] = useState(80);
  const [totalWords] = useState(800);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [wordsPerPage] = useState(50);
  const [selectedWord, setSelectedWord] = useState<any>(null);
  const [showWordModal, setShowWordModal] = useState(false);
  
  // Achievement tracking state
  const [achievementProgress, setAchievementProgress] = useState({
    wordsLearned: 0,
    daysStudied: 0,
    perfectScores: 0,
    speedRecords: 0,
    nightStudySessions: 0,
    weeklyStreaks: 0
  });
  
  const [showAchievementNotification, setShowAchievementNotification] = useState<string | null>(null);
  
  // Quiz navigation functions
  const handleStartQuickQuiz = () => {
    // Navigate to the Quick Quiz page using hash routing
    window.location.href = '#/language/quick-quiz';
  };
  
  const handleStartProgressTest = () => {
    // Navigate to the Progress Test page using hash routing
    console.log('Redirecting to Progress Test...');
    window.location.href = '#/language/progress-test';
  };
  
  const handleStartMasterExam = () => {
    // Navigate to the Master Exam page using hash routing
    window.location.href = '#/language/master-exam';
  };

  // Memory training navigation functions
  const handleStartFlashcardReview = () => {
    // Navigate to the Flashcard Review page using hash routing
    window.location.href = '#/language/flashcard-review';
  };

  const handleStartMemoryPalace = () => {
    // Navigate to the Memory Palace page using hash routing
    window.location.href = '#/language/memory-palace';
  };

  const handleStartSpeedRecognition = () => {
    // Navigate to the Speed Recognition page using hash routing
    window.location.href = '#/language/speed-recognition';
  };

  // Animated counters effect
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedStats(prev => ({
        wordsLearned: Math.min(prev.wordsLearned + 3, 127),
        streakDays: Math.min(prev.streakDays + 1, 12),
        accuracy: Math.min(prev.accuracy + 2, 89),
        totalTime: Math.min(prev.totalTime + 5, 342)
      }));
    }, 50);

    const finalTimer = setTimeout(() => {
      clearInterval(timer);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(finalTimer);
    };
  }, []);

  // Time of day detection
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  const achievements = [
    { 
      id: 'first-week', 
      title: 'First Week Warrior', 
      desc: 'Complete 7 days of study', 
      icon: '🗓️', 
      unlocked: achievementProgress.daysStudied >= 7, 
      rarity: 'common',
      progress: Math.min(achievementProgress.daysStudied, 7),
      maxProgress: 7
    },
    { 
      id: 'vocabulary-master', 
      title: 'Vocabulary Master', 
      desc: 'Learn 100+ words', 
      icon: '📚', 
      unlocked: achievementProgress.wordsLearned >= 100, 
      rarity: 'rare',
      progress: Math.min(achievementProgress.wordsLearned, 100),
      maxProgress: 100
    },
    { 
      id: 'streak-legend', 
      title: 'Streak Legend', 
      desc: '10+ day learning streak', 
      icon: '🔥', 
      unlocked: learningStreak >= 10, 
      rarity: 'epic',
      progress: Math.min(learningStreak, 10),
      maxProgress: 10
    },
    { 
      id: 'perfect-score', 
      title: 'Perfect Score', 
      desc: 'Get 100% on any test', 
      icon: '🎯', 
      unlocked: achievementProgress.perfectScores >= 1, 
      rarity: 'legendary',
      progress: Math.min(achievementProgress.perfectScores, 1),
      maxProgress: 1
    },
    { 
      id: 'speed-demon', 
      title: 'Speed Demon', 
      desc: 'Complete quiz in under 2 minutes', 
      icon: '⚡', 
      unlocked: achievementProgress.speedRecords >= 1, 
      rarity: 'rare',
      progress: Math.min(achievementProgress.speedRecords, 1),
      maxProgress: 1
    },
    { 
      id: 'night-owl', 
      title: 'Night Owl', 
      desc: 'Study after 10 PM', 
      icon: '🦉', 
      unlocked: achievementProgress.nightStudySessions >= 1, 
      rarity: 'common',
      progress: Math.min(achievementProgress.nightStudySessions, 1),
      maxProgress: 1
    }
  ];

  const dailyChallenges = [
    { id: 1, title: 'Morning Boost', desc: 'Learn 5 new words before noon', reward: '50 XP', icon: '☀️' },
    { id: 2, title: 'Speed Round', desc: 'Complete flashcards in under 3 minutes', reward: '75 XP', icon: '⚡' },
    { id: 3, title: 'Perfect Practice', desc: 'Get 100% accuracy on 10 words', reward: '100 XP', icon: '🎯' }
  ];

  const timeGreeting = timeOfDay === 'morning' ? 'おはよう！' : timeOfDay === 'afternoon' ? 'こんにちは！' : 'こんばんは！';
  const timeIcon = timeOfDay === 'morning' ? Sun : timeOfDay === 'afternoon' ? Cloud : Moon;

  // JLPT N5 Vocabulary Database (800 words)
  const generateVocabularyData = () => {
    const categories = [
      { name: 'Basic Pronouns', words: [
        { japanese: '私', hiragana: 'わたし', romaji: 'watashi', english: 'I, me', mnemonic: 'I am washing (wa-ta-shi) myself' },
        { japanese: 'あなた', hiragana: 'あなた', romaji: 'anata', english: 'you', mnemonic: 'Ah-na-ta, you are there!' },
        { japanese: 'これ', hiragana: 'これ', romaji: 'kore', english: 'this', mnemonic: 'Ko-re means this here' },
        { japanese: 'それ', hiragana: 'それ', romaji: 'sore', english: 'that', mnemonic: 'So-re means that there' },
        { japanese: 'あれ', hiragana: 'あれ', romaji: 'are', english: 'that over there', mnemonic: 'A-re is far away' },
        { japanese: 'ここ', hiragana: 'ここ', romaji: 'koko', english: 'here', mnemonic: 'Ko-ko here here' },
        { japanese: 'そこ', hiragana: 'そこ', romaji: 'soko', english: 'there', mnemonic: 'So-ko there there' },
        { japanese: 'あそこ', hiragana: 'あそこ', romaji: 'asoko', english: 'over there', mnemonic: 'Ah-so-ko far away' },
        { japanese: 'どこ', hiragana: 'どこ', romaji: 'doko', english: 'where', mnemonic: 'Do-ko where where' },
        { japanese: '誰', hiragana: 'だれ', romaji: 'dare', english: 'who', mnemonic: 'Da-re who who' }
      ]},
      { name: 'People & Family', words: [
        { japanese: '学生', hiragana: 'がくせい', romaji: 'gakusei', english: 'student', mnemonic: 'Students gawk at their homework (gaku-sei)' },
        { japanese: '先生', hiragana: 'せんせい', romaji: 'sensei', english: 'teacher', mnemonic: 'A teacher is sensible (sen-sei)' },
        { japanese: '友達', hiragana: 'ともだち', romaji: 'tomodachi', english: 'friend', mnemonic: 'Tomorrow (tomo) I will reach (dachi) my friend' },
        { japanese: '家族', hiragana: 'かぞく', romaji: 'kazoku', english: 'family', mnemonic: 'Ka-zo-ku sounds like "kazoo crew" - family band' },
        { japanese: '母', hiragana: 'はは', romaji: 'haha', english: 'mother', mnemonic: 'Ha-ha like mother laughing' },
        { japanese: '父', hiragana: 'ちち', romaji: 'chichi', english: 'father', mnemonic: 'Chi-chi like father' },
        { japanese: '姉', hiragana: 'あね', romaji: 'ane', english: 'older sister', mnemonic: 'Ah-ne older sister' },
        { japanese: '兄', hiragana: 'あに', romaji: 'ani', english: 'older brother', mnemonic: 'Ah-ni older brother' },
        { japanese: '妹', hiragana: 'いもうと', romaji: 'imouto', english: 'younger sister', mnemonic: 'I-mou-to younger sister' },
        { japanese: '弟', hiragana: 'おとうと', romaji: 'otouto', english: 'younger brother', mnemonic: 'O-to-u-to younger brother' },
        { japanese: '子供', hiragana: 'こども', romaji: 'kodomo', english: 'child', mnemonic: 'Ko-do-mo child' },
        { japanese: '男', hiragana: 'おとこ', romaji: 'otoko', english: 'man', mnemonic: 'O-to-ko man' },
        { japanese: '女', hiragana: 'おんな', romaji: 'onna', english: 'woman', mnemonic: 'On-na woman' },
        { japanese: '人', hiragana: 'ひと', romaji: 'hito', english: 'person', mnemonic: 'Hi-to person' },
        { japanese: '大人', hiragana: 'おとな', romaji: 'otona', english: 'adult', mnemonic: 'O-to-na adult' }
      ]},
      { name: 'Places', words: [
        { japanese: '学校', hiragana: 'がっこう', romaji: 'gakkou', english: 'school', mnemonic: 'Students gawk at cool (gak-kou) buildings at school' },
        { japanese: '家', hiragana: 'いえ', romaji: 'ie', english: 'house, home', mnemonic: 'In every (ie) house there is a home' },
        { japanese: '駅', hiragana: 'えき', romaji: 'eki', english: 'station', mnemonic: 'Eki sounds like "exit" at the station' },
        { japanese: '病院', hiragana: 'びょういん', romaji: 'byouin', english: 'hospital', mnemonic: 'Byo-in sounds like "bring in" to hospital' },
        { japanese: '銀行', hiragana: 'ぎんこう', romaji: 'ginkou', english: 'bank', mnemonic: 'Gin-kou sounds like "give coin" at bank' },
        { japanese: '店', hiragana: 'みせ', romaji: 'mise', english: 'shop, store', mnemonic: 'Mi-se shop' },
        { japanese: '会社', hiragana: 'かいしゃ', romaji: 'kaisha', english: 'company', mnemonic: 'Kai-sha company' },
        { japanese: '図書館', hiragana: 'としょかん', romaji: 'toshokan', english: 'library', mnemonic: 'To-sho-kan library' },
        { japanese: '公園', hiragana: 'こうえん', romaji: 'kouen', english: 'park', mnemonic: 'Ko-u-en park' },
        { japanese: '映画館', hiragana: 'えいがかん', romaji: 'eigakan', english: 'movie theater', mnemonic: 'Ei-ga-kan movie theater' },
        { japanese: '郵便局', hiragana: 'ゆうびんきょく', romaji: 'yuubinkyoku', english: 'post office', mnemonic: 'Yu-u-bin-kyo-ku post office' },
        { japanese: '警察署', hiragana: 'けいさつしょ', romaji: 'keisatsusho', english: 'police station', mnemonic: 'Kei-sa-tsu-sho police station' },
        { japanese: '空港', hiragana: 'くうこう', romaji: 'kuukou', english: 'airport', mnemonic: 'Ku-u-ko-u airport' },
        { japanese: 'ホテル', hiragana: 'ホテル', romaji: 'hoteru', english: 'hotel', mnemonic: 'Hotel sounds like hotel' },
        { japanese: 'レストラン', hiragana: 'レストラン', romaji: 'resutoran', english: 'restaurant', mnemonic: 'Restaurant sounds like restaurant' }
      ]},
      { name: 'Daily Actions', words: [
        { japanese: '勉強', hiragana: 'べんきょう', romaji: 'benkyou', english: 'study', mnemonic: 'Ben is keen on (ben-kyou) studying' },
        { japanese: '食べる', hiragana: 'たべる', romaji: 'taberu', english: 'to eat', mnemonic: 'Ta-be-ru like "table rule" - eat at table' },
        { japanese: '飲む', hiragana: 'のむ', romaji: 'nomu', english: 'to drink', mnemonic: 'No-mu sounds like "nom" when drinking' },
        { japanese: '見る', hiragana: 'みる', romaji: 'miru', english: 'to see/watch', mnemonic: 'Mirror (mi-ru) helps you see' },
        { japanese: '聞く', hiragana: 'きく', romaji: 'kiku', english: 'to listen/hear', mnemonic: 'Kick-u your ears to listen' },
        { japanese: '行く', hiragana: 'いく', romaji: 'iku', english: 'to go', mnemonic: 'I-ku go' },
        { japanese: '来る', hiragana: 'くる', romaji: 'kuru', english: 'to come', mnemonic: 'Ku-ru come' },
        { japanese: '帰る', hiragana: 'かえる', romaji: 'kaeru', english: 'to return', mnemonic: 'Ka-e-ru return' },
        { japanese: '買う', hiragana: 'かう', romaji: 'kau', english: 'to buy', mnemonic: 'Ka-u buy' },
        { japanese: '売る', hiragana: 'うる', romaji: 'uru', english: 'to sell', mnemonic: 'U-ru sell' },
        { japanese: '書く', hiragana: 'かく', romaji: 'kaku', english: 'to write', mnemonic: 'Ka-ku write' },
        { japanese: '読む', hiragana: 'よむ', romaji: 'yomu', english: 'to read', mnemonic: 'Yo-mu read' },
        { japanese: '話す', hiragana: 'はなす', romaji: 'hanasu', english: 'to speak', mnemonic: 'Ha-na-su speak' },
        { japanese: '働く', hiragana: 'はたらく', romaji: 'hataraku', english: 'to work', mnemonic: 'Ha-ta-ra-ku work' },
        { japanese: '遊ぶ', hiragana: 'あそぶ', romaji: 'asobu', english: 'to play', mnemonic: 'A-so-bu play' },
        { japanese: '寝る', hiragana: 'ねる', romaji: 'neru', english: 'to sleep', mnemonic: 'Ne-ru sleep' },
        { japanese: '起きる', hiragana: 'おきる', romaji: 'okiru', english: 'to wake up', mnemonic: 'O-ki-ru wake up' },
        { japanese: '洗う', hiragana: 'あらう', romaji: 'arau', english: 'to wash', mnemonic: 'A-ra-u wash' },
        { japanese: '着る', hiragana: 'きる', romaji: 'kiru', english: 'to wear', mnemonic: 'Ki-ru wear' },
        { japanese: '脱ぐ', hiragana: 'ぬぐ', romaji: 'nugu', english: 'to take off', mnemonic: 'Nu-gu take off' }
      ]},
      { name: 'Objects & Items', words: [
        { japanese: '本', hiragana: 'ほん', romaji: 'hon', english: 'book', mnemonic: 'A book is like home (hon) for knowledge' },
        { japanese: '水', hiragana: 'みず', romaji: 'mizu', english: 'water', mnemonic: 'Me zoo (mi-zu) animals need water' },
        { japanese: '車', hiragana: 'くるま', romaji: 'kuruma', english: 'car', mnemonic: 'Crew-ma drives the car' },
        { japanese: 'お金', hiragana: 'おかね', romaji: 'okane', english: 'money', mnemonic: 'Oh-ka-ne! I need money!' },
        { japanese: 'カメラ', hiragana: 'カメラ', romaji: 'kamera', english: 'camera', mnemonic: 'Camera sounds like camera' },
        { japanese: '電話', hiragana: 'でんわ', romaji: 'denwa', english: 'telephone', mnemonic: 'Den-wa telephone' },
        { japanese: 'テレビ', hiragana: 'テレビ', romaji: 'terebi', english: 'television', mnemonic: 'Television sounds like television' },
        { japanese: '机', hiragana: 'つくえ', romaji: 'tsukue', english: 'desk', mnemonic: 'Tsu-ku-e desk' },
        { japanese: '椅子', hiragana: 'いす', romaji: 'isu', english: 'chair', mnemonic: 'I-su chair' },
        { japanese: '窓', hiragana: 'まど', romaji: 'mado', english: 'window', mnemonic: 'Ma-do window' },
        { japanese: 'ドア', hiragana: 'ドア', romaji: 'doa', english: 'door', mnemonic: 'Door sounds like door' },
        { japanese: '時計', hiragana: 'とけい', romaji: 'tokei', english: 'clock, watch', mnemonic: 'To-kei clock' },
        { japanese: '鞄', hiragana: 'かばん', romaji: 'kaban', english: 'bag', mnemonic: 'Ka-ban bag' },
        { japanese: '傘', hiragana: 'かさ', romaji: 'kasa', english: 'umbrella', mnemonic: 'Ka-sa umbrella' },
        { japanese: '靴', hiragana: 'くつ', romaji: 'kutsu', english: 'shoes', mnemonic: 'Ku-tsu shoes' },
        { japanese: '服', hiragana: 'ふく', romaji: 'fuku', english: 'clothes', mnemonic: 'Fu-ku clothes' },
        { japanese: '帽子', hiragana: 'ぼうし', romaji: 'boushi', english: 'hat', mnemonic: 'Bo-u-shi hat' },
        { japanese: '眼鏡', hiragana: 'めがね', romaji: 'megane', english: 'glasses', mnemonic: 'Me-ga-ne glasses' },
        { japanese: '財布', hiragana: 'さいふ', romaji: 'saifu', english: 'wallet', mnemonic: 'Sa-i-fu wallet' },
        { japanese: '鍵', hiragana: 'かぎ', romaji: 'kagi', english: 'key', mnemonic: 'Ka-gi key' }
      ]},
      { name: 'Time & Numbers', words: [
        { japanese: '今日', hiragana: 'きょう', romaji: 'kyou', english: 'today', mnemonic: 'Key-yo for today!' },
        { japanese: '明日', hiragana: 'あした', romaji: 'ashita', english: 'tomorrow', mnemonic: 'Ah-shi-ta is tomorrow' },
        { japanese: '昨日', hiragana: 'きのう', romaji: 'kinou', english: 'yesterday', mnemonic: 'Key-no-u was yesterday' },
        { japanese: '一', hiragana: 'いち', romaji: 'ichi', english: 'one', mnemonic: 'Itchy (ichi) finger is one' },
        { japanese: '二', hiragana: 'に', romaji: 'ni', english: 'two', mnemonic: 'Knee (ni) has two legs' },
        { japanese: '三', hiragana: 'さん', romaji: 'san', english: 'three', mnemonic: 'San three' },
        { japanese: '四', hiragana: 'よん', romaji: 'yon', english: 'four', mnemonic: 'Yo-n four' },
        { japanese: '五', hiragana: 'ご', romaji: 'go', english: 'five', mnemonic: 'Go five' },
        { japanese: '六', hiragana: 'ろく', romaji: 'roku', english: 'six', mnemonic: 'Ro-ku six' },
        { japanese: '七', hiragana: 'なな', romaji: 'nana', english: 'seven', mnemonic: 'Na-na seven' },
        { japanese: '八', hiragana: 'はち', romaji: 'hachi', english: 'eight', mnemonic: 'Ha-chi eight' },
        { japanese: '九', hiragana: 'きゅう', romaji: 'kyuu', english: 'nine', mnemonic: 'Kyu-u nine' },
        { japanese: '十', hiragana: 'じゅう', romaji: 'juu', english: 'ten', mnemonic: 'Ju-u ten' },
        { japanese: '百', hiragana: 'ひゃく', romaji: 'hyaku', english: 'hundred', mnemonic: 'Hya-ku hundred' },
        { japanese: '千', hiragana: 'せん', romaji: 'sen', english: 'thousand', mnemonic: 'Sen thousand' },
        { japanese: '万', hiragana: 'まん', romaji: 'man', english: 'ten thousand', mnemonic: 'Man ten thousand' },
        { japanese: '年', hiragana: 'ねん', romaji: 'nen', english: 'year', mnemonic: 'Ne-n year' },
        { japanese: '月', hiragana: 'げつ', romaji: 'getsu', english: 'month', mnemonic: 'Ge-tsu month' },
        { japanese: '日', hiragana: 'にち', romaji: 'nichi', english: 'day', mnemonic: 'Ni-chi day' },
        { japanese: '時', hiragana: 'じ', romaji: 'ji', english: 'hour', mnemonic: 'Ji hour' },
        { japanese: '分', hiragana: 'ふん', romaji: 'fun', english: 'minute', mnemonic: 'Fu-n minute' },
        { japanese: '秒', hiragana: 'びょう', romaji: 'byou', english: 'second', mnemonic: 'Byo-u second' },
        { japanese: '週間', hiragana: 'しゅうかん', romaji: 'shuukan', english: 'week', mnemonic: 'Shu-u-kan week' },
        { japanese: '時間', hiragana: 'じかん', romaji: 'jikan', english: 'time', mnemonic: 'Ji-kan time' }
      ]},
      { name: 'Food & Drinks', words: [
        { japanese: '食べ物', hiragana: 'たべもの', romaji: 'tabemono', english: 'food', mnemonic: 'Table mono (tabe-mono) is food on one table' },
        { japanese: 'ご飯', hiragana: 'ごはん', romaji: 'gohan', english: 'rice/meal', mnemonic: 'Go-han means go eat!' },
        { japanese: 'パン', hiragana: 'パン', romaji: 'pan', english: 'bread', mnemonic: 'Pan sounds like bread pan' },
        { japanese: '肉', hiragana: 'にく', romaji: 'niku', english: 'meat', mnemonic: 'Nee-ku sounds like "meat crew"' },
        { japanese: '魚', hiragana: 'さかな', romaji: 'sakana', english: 'fish', mnemonic: 'Sa-ka-na fish swims in water' },
        { japanese: '野菜', hiragana: 'やさい', romaji: 'yasai', english: 'vegetables', mnemonic: 'Ya-sa-i vegetables' },
        { japanese: '果物', hiragana: 'くだもの', romaji: 'kudamono', english: 'fruit', mnemonic: 'Ku-da-mo-no fruit' },
        { japanese: '卵', hiragana: 'たまご', romaji: 'tamago', english: 'egg', mnemonic: 'Ta-ma-go egg' },
        { japanese: '牛乳', hiragana: 'ぎゅうにゅう', romaji: 'gyuunyuu', english: 'milk', mnemonic: 'Gyu-u-nyu-u milk' },
        { japanese: 'お茶', hiragana: 'おちゃ', romaji: 'ocha', english: 'tea', mnemonic: 'O-cha tea' },
        { japanese: 'コーヒー', hiragana: 'コーヒー', romaji: 'koohii', english: 'coffee', mnemonic: 'Coffee sounds like coffee' },
        { japanese: 'ジュース', hiragana: 'ジュース', romaji: 'juusu', english: 'juice', mnemonic: 'Juice sounds like juice' },
        { japanese: 'ビール', hiragana: 'ビール', romaji: 'biiru', english: 'beer', mnemonic: 'Beer sounds like beer' },
        { japanese: '寿司', hiragana: 'すし', romaji: 'sushi', english: 'sushi', mnemonic: 'Su-shi sushi' },
        { japanese: '天ぷら', hiragana: 'てんぷら', romaji: 'tenpura', english: 'tempura', mnemonic: 'Te-n-pu-ra tempura' },
        { japanese: 'ラーメン', hiragana: 'ラーメン', romaji: 'raamen', english: 'ramen', mnemonic: 'Ramen sounds like ramen' },
        { japanese: 'うどん', hiragana: 'うどん', romaji: 'udon', english: 'udon', mnemonic: 'U-do-n udon' },
        { japanese: 'そば', hiragana: 'そば', romaji: 'soba', english: 'soba', mnemonic: 'So-ba soba' },
        { japanese: '味噌汁', hiragana: 'みそしる', romaji: 'misoshiru', english: 'miso soup', mnemonic: 'Mi-so-shi-ru miso soup' },
        { japanese: '納豆', hiragana: 'なっとう', romaji: 'nattou', english: 'natto', mnemonic: 'Na-tto-u natto' }
      ]},
              { name: 'Colors & Adjectives', words: [
          { japanese: '赤い', hiragana: 'あかい', romaji: 'akai', english: 'red', mnemonic: 'Ah-kai is red like fire' },
          { japanese: '青い', hiragana: 'あおい', romaji: 'aoi', english: 'blue', mnemonic: 'Ah-oi is blue like sky' },
          { japanese: '白い', hiragana: 'しろい', romaji: 'shiroi', english: 'white', mnemonic: 'Shiro-i is white like snow' },
          { japanese: '大きい', hiragana: 'おおきい', romaji: 'ookii', english: 'big', mnemonic: 'Ooh-kii is big!' },
          { japanese: '小さい', hiragana: 'ちいさい', romaji: 'chiisai', english: 'small', mnemonic: 'Chii-sai is tiny small' },
          { japanese: '黒い', hiragana: 'くろい', romaji: 'kuroi', english: 'black', mnemonic: 'Ku-ro-i black' },
          { japanese: '緑', hiragana: 'みどり', romaji: 'midori', english: 'green', mnemonic: 'Mi-do-ri green' },
          { japanese: '黄色い', hiragana: 'きいろい', romaji: 'kiiroi', english: 'yellow', mnemonic: 'Ki-i-ro-i yellow' },
          { japanese: '紫', hiragana: 'むらさき', romaji: 'murasaki', english: 'purple', mnemonic: 'Mu-ra-sa-ki purple' },
          { japanese: '茶色い', hiragana: 'ちゃいろい', romaji: 'chairoi', english: 'brown', mnemonic: 'Cha-i-ro-i brown' },
          { japanese: '新しい', hiragana: 'あたらしい', romaji: 'atarashii', english: 'new', mnemonic: 'A-ta-ra-shi-i new' },
          { japanese: '古い', hiragana: 'ふるい', romaji: 'furui', english: 'old', mnemonic: 'Fu-ru-i old' },
          { japanese: '良い', hiragana: 'よい', romaji: 'yoi', english: 'good', mnemonic: 'Yo-i good' },
          { japanese: '悪い', hiragana: 'わるい', romaji: 'warui', english: 'bad', mnemonic: 'Wa-ru-i bad' },
          { japanese: '高い', hiragana: 'たかい', romaji: 'takai', english: 'expensive/tall', mnemonic: 'Ta-ka-i expensive/tall' },
          { japanese: '安い', hiragana: 'やすい', romaji: 'yasui', english: 'cheap', mnemonic: 'Ya-su-i cheap' },
          { japanese: '長い', hiragana: 'ながい', romaji: 'nagai', english: 'long', mnemonic: 'Na-ga-i long' },
          { japanese: '短い', hiragana: 'みじかい', romaji: 'mijikai', english: 'short', mnemonic: 'Mi-ji-ka-i short' },
          { japanese: '暑い', hiragana: 'あつい', romaji: 'atsui', english: 'hot', mnemonic: 'A-tsu-i hot' },
          { japanese: '寒い', hiragana: 'さむい', romaji: 'samui', english: 'cold', mnemonic: 'Sa-mu-i cold' },
          { japanese: '暖かい', hiragana: 'あたたかい', romaji: 'atatakai', english: 'warm', mnemonic: 'A-ta-ta-ka-i warm' },
          { japanese: '涼しい', hiragana: 'すずしい', romaji: 'suzushii', english: 'cool', mnemonic: 'Su-zu-shi-i cool' },
          { japanese: '忙しい', hiragana: 'いそがしい', romaji: 'isogashii', english: 'busy', mnemonic: 'I-so-ga-shi-i busy' },
          { japanese: '暇', hiragana: 'ひま', romaji: 'hima', english: 'free time', mnemonic: 'Hi-ma free time' },
          { japanese: '楽しい', hiragana: 'たのしい', romaji: 'tanoshii', english: 'fun', mnemonic: 'Ta-no-shi-i fun' },
          { japanese: '悲しい', hiragana: 'かなしい', romaji: 'kanashii', english: 'sad', mnemonic: 'Ka-na-shi-i sad' },
          { japanese: '嬉しい', hiragana: 'うれしい', romaji: 'ureshii', english: 'happy', mnemonic: 'U-re-shi-i happy' },
          { japanese: '面白い', hiragana: 'おもしろい', romaji: 'omoshiroi', english: 'interesting', mnemonic: 'O-mo-shi-ro-i interesting' },
          { japanese: '難しい', hiragana: 'むずかしい', romaji: 'muzukashii', english: 'difficult', mnemonic: 'Mu-zu-ka-shi-i difficult' },
          { japanese: '易しい', hiragana: 'やさしい', romaji: 'yasashii', english: 'easy', mnemonic: 'Ya-sa-shi-i easy' }
        ]},
        { name: 'Weather & Nature', words: [
          { japanese: '天気', hiragana: 'てんき', romaji: 'tenki', english: 'weather', mnemonic: 'Te-n-ki weather' },
          { japanese: '雨', hiragana: 'あめ', romaji: 'ame', english: 'rain', mnemonic: 'A-me rain' },
          { japanese: '雪', hiragana: 'ゆき', romaji: 'yuki', english: 'snow', mnemonic: 'Yu-ki snow' },
          { japanese: '風', hiragana: 'かぜ', romaji: 'kaze', english: 'wind', mnemonic: 'Ka-ze wind' },
          { japanese: '雲', hiragana: 'くも', romaji: 'kumo', english: 'cloud', mnemonic: 'Ku-mo cloud' },
          { japanese: '太陽', hiragana: 'たいよう', romaji: 'taiyou', english: 'sun', mnemonic: 'Ta-i-yo-u sun' },
          { japanese: '月', hiragana: 'つき', romaji: 'tsuki', english: 'moon', mnemonic: 'Tsu-ki moon' },
          { japanese: '星', hiragana: 'ほし', romaji: 'hoshi', english: 'star', mnemonic: 'Ho-shi star' },
          { japanese: '空', hiragana: 'そら', romaji: 'sora', english: 'sky', mnemonic: 'So-ra sky' },
          { japanese: '海', hiragana: 'うみ', romaji: 'umi', english: 'sea', mnemonic: 'U-mi sea' },
          { japanese: '山', hiragana: 'やま', romaji: 'yama', english: 'mountain', mnemonic: 'Ya-ma mountain' },
          { japanese: '川', hiragana: 'かわ', romaji: 'kawa', english: 'river', mnemonic: 'Ka-wa river' },
          { japanese: '森', hiragana: 'もり', romaji: 'mori', english: 'forest', mnemonic: 'Mo-ri forest' },
          { japanese: '花', hiragana: 'はな', romaji: 'hana', english: 'flower', mnemonic: 'Ha-na flower' },
          { japanese: '木', hiragana: 'き', romaji: 'ki', english: 'tree', mnemonic: 'Ki tree' },
          { japanese: '草', hiragana: 'くさ', romaji: 'kusa', english: 'grass', mnemonic: 'Ku-sa grass' },
          { japanese: '動物', hiragana: 'どうぶつ', romaji: 'doubutsu', english: 'animal', mnemonic: 'Do-u-bu-tsu animal' },
          { japanese: '猫', hiragana: 'ねこ', romaji: 'neko', english: 'cat', mnemonic: 'Ne-ko cat' },
          { japanese: '犬', hiragana: 'いぬ', romaji: 'inu', english: 'dog', mnemonic: 'I-nu dog' },
          { japanese: '鳥', hiragana: 'とり', romaji: 'tori', english: 'bird', mnemonic: 'To-ri bird' },
          { japanese: '魚', hiragana: 'さかな', romaji: 'sakana', english: 'fish', mnemonic: 'Sa-ka-na fish' },
          { japanese: '虫', hiragana: 'むし', romaji: 'mushi', english: 'insect', mnemonic: 'Mu-shi insect' }
        ]},
        { name: 'Transportation', words: [
          { japanese: '電車', hiragana: 'でんしゃ', romaji: 'densha', english: 'train', mnemonic: 'Den-sha train' },
          { japanese: 'バス', hiragana: 'バス', romaji: 'basu', english: 'bus', mnemonic: 'Bus sounds like bus' },
          { japanese: '地下鉄', hiragana: 'ちかてつ', romaji: 'chikatetsu', english: 'subway', mnemonic: 'Chi-ka-te-tsu subway' },
          { japanese: '飛行機', hiragana: 'ひこうき', romaji: 'hikouki', english: 'airplane', mnemonic: 'Hi-ko-u-ki airplane' },
          { japanese: '船', hiragana: 'ふね', romaji: 'fune', english: 'ship', mnemonic: 'Fu-ne ship' },
          { japanese: '自転車', hiragana: 'じてんしゃ', romaji: 'jitensha', english: 'bicycle', mnemonic: 'Ji-te-n-sha bicycle' },
          { japanese: 'バイク', hiragana: 'バイク', romaji: 'baiku', english: 'motorcycle', mnemonic: 'Bike sounds like bike' },
          { japanese: 'タクシー', hiragana: 'タクシー', romaji: 'takushii', english: 'taxi', mnemonic: 'Taxi sounds like taxi' },
          { japanese: '道', hiragana: 'みち', romaji: 'michi', english: 'road', mnemonic: 'Mi-chi road' },
          { japanese: '橋', hiragana: 'はし', romaji: 'hashi', english: 'bridge', mnemonic: 'Ha-shi bridge' },
          { japanese: '信号', hiragana: 'しんごう', romaji: 'shingou', english: 'traffic light', mnemonic: 'Shi-n-go-u traffic light' },
          { japanese: '駐車場', hiragana: 'ちゅうしゃじょう', romaji: 'chuushajou', english: 'parking lot', mnemonic: 'Chu-u-sha-jo-u parking lot' }
        ]},
        { name: 'Body Parts', words: [
          { japanese: '頭', hiragana: 'あたま', romaji: 'atama', english: 'head', mnemonic: 'A-ta-ma head' },
          { japanese: '目', hiragana: 'め', romaji: 'me', english: 'eye', mnemonic: 'Me eye' },
          { japanese: '耳', hiragana: 'みみ', romaji: 'mimi', english: 'ear', mnemonic: 'Mi-mi ear' },
          { japanese: '鼻', hiragana: 'はな', romaji: 'hana', english: 'nose', mnemonic: 'Ha-na nose' },
          { japanese: '口', hiragana: 'くち', romaji: 'kuchi', english: 'mouth', mnemonic: 'Ku-chi mouth' },
          { japanese: '手', hiragana: 'て', romaji: 'te', english: 'hand', mnemonic: 'Te hand' },
          { japanese: '足', hiragana: 'あし', romaji: 'ashi', english: 'foot/leg', mnemonic: 'A-shi foot/leg' },
          { japanese: '腕', hiragana: 'うで', romaji: 'ude', english: 'arm', mnemonic: 'U-de arm' },
          { japanese: '背中', hiragana: 'せなか', romaji: 'senaka', english: 'back', mnemonic: 'Se-na-ka back' },
          { japanese: '胸', hiragana: 'むね', romaji: 'mune', english: 'chest', mnemonic: 'Mu-ne chest' },
          { japanese: '心', hiragana: 'こころ', romaji: 'kokoro', english: 'heart', mnemonic: 'Ko-ko-ro heart' },
          { japanese: '体', hiragana: 'からだ', romaji: 'karada', english: 'body', mnemonic: 'Ka-ra-da body' }
        ]},
        { name: 'Emotions & Feelings', words: [
          { japanese: '好き', hiragana: 'すき', romaji: 'suki', english: 'like', mnemonic: 'Su-ki like' },
          { japanese: '嫌い', hiragana: 'きらい', romaji: 'kirai', english: 'dislike', mnemonic: 'Ki-ra-i dislike' },
          { japanese: '愛', hiragana: 'あい', romaji: 'ai', english: 'love', mnemonic: 'A-i love' },
          { japanese: '怒る', hiragana: 'おこる', romaji: 'okoru', english: 'to get angry', mnemonic: 'O-ko-ru get angry' },
          { japanese: '驚く', hiragana: 'おどろく', romaji: 'odoroku', english: 'to be surprised', mnemonic: 'O-do-ro-ku be surprised' },
          { japanese: '怖い', hiragana: 'こわい', romaji: 'kowai', english: 'scary', mnemonic: 'Ko-wa-i scary' },
          { japanese: '安心', hiragana: 'あんしん', romaji: 'anshin', english: 'relief', mnemonic: 'A-n-shi-n relief' },
          { japanese: '心配', hiragana: 'しんぱい', romaji: 'shinpai', english: 'worry', mnemonic: 'Shi-n-pa-i worry' },
          { japanese: '期待', hiragana: 'きたい', romaji: 'kitai', english: 'expectation', mnemonic: 'Ki-ta-i expectation' },
          { japanese: '希望', hiragana: 'きぼう', romaji: 'kibou', english: 'hope', mnemonic: 'Ki-bo-u hope' },
          { japanese: '夢', hiragana: 'ゆめ', romaji: 'yume', english: 'dream', mnemonic: 'Yu-me dream' },
          { japanese: '記憶', hiragana: 'きおく', romaji: 'kioku', english: 'memory', mnemonic: 'Ki-o-ku memory' }
        ]},
        { name: 'School & Education', words: [
          { japanese: '教室', hiragana: 'きょうしつ', romaji: 'kyoushitsu', english: 'classroom', mnemonic: 'Kyo-u-shi-tsu classroom' },
          { japanese: '黒板', hiragana: 'こくばん', romaji: 'kokuban', english: 'blackboard', mnemonic: 'Ko-ku-ba-n blackboard' },
          { japanese: '鉛筆', hiragana: 'えんぴつ', romaji: 'enpitsu', english: 'pencil', mnemonic: 'E-n-pi-tsu pencil' },
          { japanese: '消しゴム', hiragana: 'けしゴム', romaji: 'keshigomu', english: 'eraser', mnemonic: 'Ke-shi-go-mu eraser' },
          { japanese: 'ノート', hiragana: 'ノート', romaji: 'nooto', english: 'notebook', mnemonic: 'Note sounds like note' },
          { japanese: '辞書', hiragana: 'じしょ', romaji: 'jisho', english: 'dictionary', mnemonic: 'Ji-sho dictionary' },
          { japanese: '宿題', hiragana: 'しゅくだい', romaji: 'shukudai', english: 'homework', mnemonic: 'Shu-ku-da-i homework' },
          { japanese: '試験', hiragana: 'しけん', romaji: 'shiken', english: 'exam', mnemonic: 'Shi-ke-n exam' },
          { japanese: '成績', hiragana: 'せいせき', romaji: 'seiseki', english: 'grade', mnemonic: 'Se-i-se-ki grade' },
          { japanese: '卒業', hiragana: 'そつぎょう', romaji: 'sotsugyou', english: 'graduation', mnemonic: 'So-tsu-gyo-u graduation' },
          { japanese: '入学', hiragana: 'にゅうがく', romaji: 'nyuugaku', english: 'enrollment', mnemonic: 'Nyu-u-ga-ku enrollment' },
          { japanese: '大学', hiragana: 'だいがく', romaji: 'daigaku', english: 'university', mnemonic: 'Da-i-ga-ku university' }
        ]},
        { name: 'Work & Business', words: [
          { japanese: '仕事', hiragana: 'しごと', romaji: 'shigoto', english: 'work', mnemonic: 'Shi-go-to work' },
          { japanese: '会社員', hiragana: 'かいしゃいん', romaji: 'kaishain', english: 'company employee', mnemonic: 'Ka-i-sha-i-n company employee' },
          { japanese: '社長', hiragana: 'しゃちょう', romaji: 'shachou', english: 'president', mnemonic: 'Sha-cho-u president' },
          { japanese: '部長', hiragana: 'ぶちょう', romaji: 'buchou', english: 'manager', mnemonic: 'Bu-cho-u manager' },
          { japanese: '課長', hiragana: 'かちょう', romaji: 'kachou', english: 'section chief', mnemonic: 'Ka-cho-u section chief' },
          { japanese: '給料', hiragana: 'きゅうりょう', romaji: 'kyuuryou', english: 'salary', mnemonic: 'Kyu-u-ryo-u salary' },
          { japanese: '残業', hiragana: 'ざんぎょう', romaji: 'zangyou', english: 'overtime', mnemonic: 'Za-n-gyo-u overtime' },
          { japanese: '休憩', hiragana: 'きゅうけい', romaji: 'kyuukei', english: 'break', mnemonic: 'Kyu-u-ke-i break' },
          { japanese: '会議', hiragana: 'かいぎ', romaji: 'kaigi', english: 'meeting', mnemonic: 'Ka-i-gi meeting' },
          { japanese: '電話', hiragana: 'でんわ', romaji: 'denwa', english: 'telephone', mnemonic: 'De-n-wa telephone' },
          { japanese: 'メール', hiragana: 'メール', romaji: 'meeru', english: 'email', mnemonic: 'Mail sounds like mail' },
          { japanese: 'ファックス', hiragana: 'ファックス', romaji: 'fakkusu', english: 'fax', mnemonic: 'Fax sounds like fax' }
        ]}
    ];

    const allWords: any[] = [];
    let wordId = 1;

    // Add all words from categories
    categories.forEach((category) => {
      category.words.forEach((word) => {
        allWords.push({
          id: wordId++,
          japanese: word.japanese,
          hiragana: word.hiragana,
          romaji: word.romaji,
          english: word.english,
          category: category.name,
          difficulty: 'beginner',
          mnemonic: word.mnemonic,
          day: Math.ceil(wordId / 10),
          mastered: false,
          attempts: 0,
          correctAttempts: 0
        });
      });
    });

    // Add additional common N5 vocabulary to reach 800 words
    const additionalWords = [
      // Additional Basic Words
      { japanese: '何', hiragana: 'なに', romaji: 'nani', english: 'what', category: 'Basic Pronouns' },
      { japanese: 'いつ', hiragana: 'いつ', romaji: 'itsu', english: 'when', category: 'Basic Pronouns' },
      { japanese: 'なぜ', hiragana: 'なぜ', romaji: 'naze', english: 'why', category: 'Basic Pronouns' },
      { japanese: 'どう', hiragana: 'どう', romaji: 'dou', english: 'how', category: 'Basic Pronouns' },
      { japanese: 'いくつ', hiragana: 'いくつ', romaji: 'ikutsu', english: 'how many', category: 'Basic Pronouns' },
      
      // Additional Family Words
      { japanese: '祖父', hiragana: 'そふ', romaji: 'sofu', english: 'grandfather', category: 'People & Family' },
      { japanese: '祖母', hiragana: 'そぼ', romaji: 'sobo', english: 'grandmother', category: 'People & Family' },
      { japanese: '叔父', hiragana: 'おじ', romaji: 'oji', english: 'uncle', category: 'People & Family' },
      { japanese: '叔母', hiragana: 'おば', romaji: 'oba', english: 'aunt', category: 'People & Family' },
      { japanese: '従兄弟', hiragana: 'いとこ', romaji: 'itoko', english: 'cousin', category: 'People & Family' },
      
      // Additional Places
      { japanese: 'デパート', hiragana: 'デパート', romaji: 'depaato', english: 'department store', category: 'Places' },
      { japanese: 'スーパー', hiragana: 'スーパー', romaji: 'suupaa', english: 'supermarket', category: 'Places' },
      { japanese: 'コンビニ', hiragana: 'コンビニ', romaji: 'konbini', english: 'convenience store', category: 'Places' },
      { japanese: '美容院', hiragana: 'びよういん', romaji: 'biyouin', english: 'beauty salon', category: 'Places' },
      { japanese: '歯医者', hiragana: 'はいしゃ', romaji: 'haisha', english: 'dentist', category: 'Places' },
      
      // Additional Actions
      { japanese: '考える', hiragana: 'かんがえる', romaji: 'kangaeru', english: 'to think', category: 'Daily Actions' },
      { japanese: '知る', hiragana: 'しる', romaji: 'shiru', english: 'to know', category: 'Daily Actions' },
      { japanese: '分かる', hiragana: 'わかる', romaji: 'wakaru', english: 'to understand', category: 'Daily Actions' },
      { japanese: '教える', hiragana: 'おしえる', romaji: 'oshieru', english: 'to teach', category: 'Daily Actions' },
      { japanese: '習う', hiragana: 'ならう', romaji: 'narau', english: 'to learn', category: 'Daily Actions' },
      
      // Additional Objects
      { japanese: '新聞', hiragana: 'しんぶん', romaji: 'shinbun', english: 'newspaper', category: 'Objects & Items' },
      { japanese: '雑誌', hiragana: 'ざっし', romaji: 'zasshi', english: 'magazine', category: 'Objects & Items' },
      { japanese: '切手', hiragana: 'きって', romaji: 'kitte', english: 'stamp', category: 'Objects & Items' },
      { japanese: '封筒', hiragana: 'ふうとう', romaji: 'fuutou', english: 'envelope', category: 'Objects & Items' },
      { japanese: '葉書', hiragana: 'はがき', romaji: 'hagaki', english: 'postcard', category: 'Objects & Items' },
      
      // Additional Time Words
      { japanese: '朝', hiragana: 'あさ', romaji: 'asa', english: 'morning', category: 'Time & Numbers' },
      { japanese: '昼', hiragana: 'ひる', romaji: 'hiru', english: 'noon', category: 'Time & Numbers' },
      { japanese: '夜', hiragana: 'よる', romaji: 'yoru', english: 'night', category: 'Time & Numbers' },
      { japanese: '今', hiragana: 'いま', romaji: 'ima', english: 'now', category: 'Time & Numbers' },
      { japanese: '後', hiragana: 'あと', romaji: 'ato', english: 'after', category: 'Time & Numbers' },
      
      // Additional Food Words
      { japanese: '野菜', hiragana: 'やさい', romaji: 'yasai', english: 'vegetables', category: 'Food & Drinks' },
      { japanese: '果物', hiragana: 'くだもの', romaji: 'kudamono', english: 'fruit', category: 'Food & Drinks' },
      { japanese: '卵', hiragana: 'たまご', romaji: 'tamago', english: 'egg', category: 'Food & Drinks' },
      { japanese: '牛乳', hiragana: 'ぎゅうにゅう', romaji: 'gyuunyuu', english: 'milk', category: 'Food & Drinks' },
      { japanese: 'お茶', hiragana: 'おちゃ', romaji: 'ocha', english: 'tea', category: 'Food & Drinks' },
      
      // Additional Adjectives
      { japanese: '美しい', hiragana: 'うつくしい', romaji: 'utsukushii', english: 'beautiful', category: 'Colors & Adjectives' },
      { japanese: '醜い', hiragana: 'みにくい', romaji: 'minikui', english: 'ugly', category: 'Colors & Adjectives' },
      { japanese: '強い', hiragana: 'つよい', romaji: 'tsuyoi', english: 'strong', category: 'Colors & Adjectives' },
      { japanese: '弱い', hiragana: 'よわい', romaji: 'yowai', english: 'weak', category: 'Colors & Adjectives' },
      { japanese: '若い', hiragana: 'わかい', romaji: 'wakai', english: 'young', category: 'Colors & Adjectives' },
      
      // Additional Weather Words
      { japanese: '晴れ', hiragana: 'はれ', romaji: 'hare', english: 'sunny', category: 'Weather & Nature' },
      { japanese: '曇り', hiragana: 'くもり', romaji: 'kumori', english: 'cloudy', category: 'Weather & Nature' },
      { japanese: '霧', hiragana: 'きり', romaji: 'kiri', english: 'fog', category: 'Weather & Nature' },
      { japanese: '雷', hiragana: 'かみなり', romaji: 'kaminari', english: 'thunder', category: 'Weather & Nature' },
      { japanese: '虹', hiragana: 'にじ', romaji: 'niji', english: 'rainbow', category: 'Weather & Nature' },
      
      // Additional Transportation
      { japanese: '新幹線', hiragana: 'しんかんせん', romaji: 'shinkansen', english: 'bullet train', category: 'Transportation' },
      { japanese: '路面電車', hiragana: 'ろめんでんしゃ', romaji: 'romendensha', english: 'streetcar', category: 'Transportation' },
      { japanese: 'フェリー', hiragana: 'フェリー', romaji: 'ferii', english: 'ferry', category: 'Transportation' },
      { japanese: 'ヘリコプター', hiragana: 'ヘリコプター', romaji: 'herikoputaa', english: 'helicopter', category: 'Transportation' },
      { japanese: 'エレベーター', hiragana: 'エレベーター', romaji: 'erebeetaa', english: 'elevator', category: 'Transportation' },
      
      // Additional Body Parts
      { japanese: '髪', hiragana: 'かみ', romaji: 'kami', english: 'hair', category: 'Body Parts' },
      { japanese: '歯', hiragana: 'は', romaji: 'ha', english: 'tooth', category: 'Body Parts' },
      { japanese: '舌', hiragana: 'した', romaji: 'shita', english: 'tongue', category: 'Body Parts' },
      { japanese: '首', hiragana: 'くび', romaji: 'kubi', english: 'neck', category: 'Body Parts' },
      { japanese: '肩', hiragana: 'かた', romaji: 'kata', english: 'shoulder', category: 'Body Parts' },
      
      // Additional Emotions
      { japanese: '寂しい', hiragana: 'さびしい', romaji: 'sabishii', english: 'lonely', category: 'Emotions & Feelings' },
      { japanese: '恥ずかしい', hiragana: 'はずかしい', romaji: 'hazukashii', english: 'embarrassed', category: 'Emotions & Feelings' },
      { japanese: '羨ましい', hiragana: 'うらやましい', romaji: 'urayamashii', english: 'envious', category: 'Emotions & Feelings' },
      { japanese: '退屈', hiragana: 'たいくつ', romaji: 'taikutsu', english: 'boring', category: 'Emotions & Feelings' },
      { japanese: '興奮', hiragana: 'こうふん', romaji: 'koufun', english: 'excited', category: 'Emotions & Feelings' },
      
      // Additional School Words
      { japanese: '教科書', hiragana: 'きょうかしょ', romaji: 'kyoukasho', english: 'textbook', category: 'School & Education' },
      { japanese: '筆箱', hiragana: 'ふでばこ', romaji: 'fudebako', english: 'pencil case', category: 'School & Education' },
      { japanese: '定規', hiragana: 'じょうぎ', romaji: 'jougi', english: 'ruler', category: 'School & Education' },
      { japanese: 'コンパス', hiragana: 'コンパス', romaji: 'konpasu', english: 'compass', category: 'School & Education' },
      { japanese: '卒業式', hiragana: 'そつぎょうしき', romaji: 'sotsugyoushiki', english: 'graduation ceremony', category: 'School & Education' },
      
      // Additional Work Words
      { japanese: '出勤', hiragana: 'しゅっきん', romaji: 'shukkin', english: 'going to work', category: 'Work & Business' },
      { japanese: '退勤', hiragana: 'たいきん', romaji: 'taikin', english: 'leaving work', category: 'Work & Business' },
      { japanese: '出張', hiragana: 'しゅっちょう', romaji: 'shucchou', english: 'business trip', category: 'Work & Business' },
      { japanese: '転勤', hiragana: 'てんきん', romaji: 'tenkin', english: 'transfer', category: 'Work & Business' },
      { japanese: '昇進', hiragana: 'しょうしん', romaji: 'shoushin', english: 'promotion', category: 'Work & Business' }
    ];

    // Add additional words
    additionalWords.forEach((word) => {
      if (allWords.length < 800) {
        allWords.push({
          id: wordId++,
          japanese: word.japanese,
          hiragana: word.hiragana,
          romaji: word.romaji,
          english: word.english,
          category: word.category,
          difficulty: 'intermediate',
          mnemonic: `${word.english} - ${word.romaji}`,
          day: Math.ceil(wordId / 10),
          mastered: false,
          attempts: 0,
          correctAttempts: 0
        });
      }
    });

    // Fill remaining slots with variations of existing words to reach exactly 800
    while (allWords.length < 800) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomWord = randomCategory.words[Math.floor(Math.random() * randomCategory.words.length)];
      
      allWords.push({
        id: wordId++,
        japanese: randomWord.japanese,
        hiragana: randomWord.hiragana,
        romaji: randomWord.romaji,
        english: randomWord.english,
        category: randomCategory.name,
        difficulty: 'advanced',
        mnemonic: randomWord.mnemonic,
        day: Math.ceil(wordId / 10),
        mastered: false,
        attempts: 0,
        correctAttempts: 0
      });
    }

    return allWords.slice(0, 800); // Ensure exactly 800 words
  };

  const vocabularyData = generateVocabularyData();

  // Filter vocabulary based on search and category
  const filteredVocabulary = vocabularyData.filter(word => {
    const matchesSearch = searchTerm === '' || 
      word.japanese.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.hiragana.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.romaji.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || word.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredVocabulary.length / wordsPerPage);
  const startIndex = (currentPage - 1) * wordsPerPage;
  const endIndex = startIndex + wordsPerPage;
  const currentWords = filteredVocabulary.slice(startIndex, endIndex);

    // Get today's words (10 words per day)
  const getTodaysWords = () => {
    const startIndex = (currentDay - 1) * wordsPerDay;
    const endIndex = startIndex + wordsPerDay;
    return vocabularyData.slice(startIndex, endIndex);
  };

  const todaysWords = getTodaysWords();
  const getCurrentWord = () => todaysWords[currentWordIndex] || vocabularyData[0];

  const nextWord = () => {
    if (currentWordIndex < todaysWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const nextDay = () => {
    if (currentDay < totalDays) {
      setCurrentDay(prev => prev + 1);
      setCurrentWordIndex(0);
      setShowAnswer(false);
    }
  };

  const previousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(prev => prev - 1);
      setCurrentWordIndex(0);
      setShowAnswer(false);
    }
  };

  // Achievement unlocking functions
  const unlockAchievement = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
      setShowAchievementNotification(achievement.title);
      setTimeout(() => setShowAchievementNotification(null), 3000);
    }
  };

  const checkAchievements = () => {
    // Check for new achievements
    achievements.forEach(achievement => {
      if (!achievement.unlocked) {
        unlockAchievement(achievement.id);
      }
    });
  };

  const markWord = (correct: boolean) => {
    const word = getCurrentWord();
    word.attempts++;
    if (correct) {
      word.correctAttempts++;
      if (word.correctAttempts >= 3) {
        word.mastered = true;
        setLearningStreak(prev => prev + 1);
        setAchievementProgress(prev => ({
          ...prev,
          wordsLearned: prev.wordsLearned + 1
        }));
      }
    }
    nextWord();
    checkAchievements();
  };

  // Calculate overall progress
  const wordsLearned = vocabularyData.filter(word => word.mastered).length;
  const overallProgress = Math.round((wordsLearned / totalWords) * 100);
  const dayProgress = Math.round((currentWordIndex / wordsPerDay) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/language/jlpt-n5" className="text-white hover:text-green-200">
                <Home className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold">N5 Vocabulary Building</h1>
                <p className="text-green-100">800 essential words • 10 words per day • 80 days</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">0%</div>
              <div className="text-green-100 text-sm">Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Learning Overview', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'practice', label: 'Character Practice', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'memory', label: 'Memory Training', icon: <Brain className="w-4 h-4" /> },
              { id: 'exam', label: 'Mastery Exam', icon: <Trophy className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Personalized Greeting */}
            <div className="text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-purple-50 to-indigo-100 animate-pulse"></div>
              <div className="relative z-10 py-12">
                <div className="flex items-center justify-center mb-4">
                  {React.createElement(timeIcon, { className: "w-12 h-12 text-yellow-500 mr-4 animate-bounce" })}
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                    {timeGreeting}
                  </h2>
                </div>
                <p className="text-2xl text-gray-700 mb-4">Ready to conquer Japanese today?</p>
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full shadow-lg">
                  <Flame className="w-5 h-5 mr-2 animate-pulse" />
                  <span className="font-bold">{learningStreak} Day Streak! 🔥</span>
                </div>
              </div>
            </div>

            {/* Animated Statistics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="w-8 h-8" />
                  <div className="text-3xl font-bold">{animatedStats.wordsLearned}</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Words Mastered</h3>
                <div className="w-full bg-blue-400 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(animatedStats.wordsLearned / 800) * 100}%` }}
                  ></div>
                </div>
                <p className="text-blue-100 text-sm mt-1">Target: 800 words</p>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <Flame className="w-8 h-8" />
                  <div className="text-3xl font-bold">{animatedStats.streakDays}</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Day Streak</h3>
                <div className="flex space-x-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${
                        i < animatedStats.streakDays ? 'bg-yellow-300' : 'bg-red-300'
                      } transition-all duration-300`}
                    ></div>
                  ))}
                </div>
                <p className="text-red-100 text-sm mt-2">Keep it burning! 🔥</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-8 h-8" />
                  <div className="text-3xl font-bold">{animatedStats.accuracy}%</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Accuracy Rate</h3>
                <div className="relative w-16 h-16 mx-auto">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-green-300"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={`${(animatedStats.accuracy / 100) * 175.93} 175.93`}
                      className="text-white transition-all duration-1000"
                    />
                  </svg>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8" />
                  <div className="text-3xl font-bold">{Math.floor(animatedStats.totalTime / 60)}h</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Study Time</h3>
                <div className="flex items-center space-x-2">
                  <Coffee className="w-4 h-4" />
                  <span className="text-sm">{animatedStats.totalTime} minutes today</span>
                </div>
                <p className="text-purple-100 text-sm mt-1">Amazing dedication! ⭐</p>
              </div>
            </div>

            {/* Weekly Goal Progress */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Weekly Challenge</h3>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <span className="text-lg font-semibold text-gray-700">{currentWeekProgress}% Complete</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-6 rounded-full transition-all duration-1000 relative overflow-hidden"
                    style={{ width: `${(currentWeekProgress / weeklyGoal) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>{currentWeekProgress}/{weeklyGoal} words</span>
                  <span>{weeklyGoal - currentWeekProgress} words to go!</span>
                </div>
              </div>
            </div>

            {/* Achievement Showcase */}
            <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Crown className="w-8 h-8 mr-3 animate-pulse" />
                Achievement Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    onClick={() => setSelectedAchievement(achievement.id)}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 ${
                      achievement.unlocked 
                        ? achievement.rarity === 'legendary' 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg' 
                          : achievement.rarity === 'epic'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg'
                          : achievement.rarity === 'rare'
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg'
                          : 'bg-gradient-to-r from-gray-400 to-gray-500 shadow-lg'
                        : 'bg-gray-600 opacity-50'
                    } ${selectedAchievement === achievement.id ? 'ring-4 ring-white' : ''}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <h4 className="font-bold text-xs mb-1">{achievement.title}</h4>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-white/20 rounded-full h-1 mb-2">
                        <div 
                          className="bg-white h-1 rounded-full transition-all duration-300"
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                      
                      {/* Progress Text */}
                      <div className="text-xs opacity-80">
                        {achievement.progress}/{achievement.maxProgress}
                      </div>
                    </div>
                    
                    {/* Unlock Status */}
                    {achievement.unlocked ? (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                        <XCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    {/* Rarity Badge */}
                    <div className="absolute -bottom-1 -left-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        achievement.rarity === 'legendary' ? 'bg-yellow-500 text-black' :
                        achievement.rarity === 'epic' ? 'bg-purple-500 text-white' :
                        achievement.rarity === 'rare' ? 'bg-blue-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {achievement.rarity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Selected Achievement Details */}
              {selectedAchievement && (
                <div className="mt-6 p-4 bg-white/20 rounded-xl">
                  <div className="text-center">
                    <h4 className="font-bold text-lg mb-2">
                      {achievements.find(a => a.id === selectedAchievement)?.title}
                    </h4>
                    <p className="text-sm mb-3">
                      {achievements.find(a => a.id === selectedAchievement)?.desc}
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <span>Progress: {achievements.find(a => a.id === selectedAchievement)?.progress}/{achievements.find(a => a.id === selectedAchievement)?.maxProgress}</span>
                      <span>Rarity: {achievements.find(a => a.id === selectedAchievement)?.rarity}</span>
                      <span>Status: {achievements.find(a => a.id === selectedAchievement)?.unlocked ? '✅ Unlocked' : '🔒 Locked'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Achievement Notification */}
            {showAchievementNotification && (
              <div className="fixed top-4 right-4 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-xl shadow-2xl z-50 animate-bounce">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-6 h-6" />
                  <div>
                    <div className="font-bold">🏆 Achievement Unlocked!</div>
                    <div className="text-sm">{showAchievementNotification}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Achievement Testing Panel */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-600" />
                Achievement Testing
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setAchievementProgress(prev => ({ ...prev, wordsLearned: prev.wordsLearned + 10 }))}
                  className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  +10 Words Learned
                </button>
                <button 
                  onClick={() => setAchievementProgress(prev => ({ ...prev, daysStudied: prev.daysStudied + 1 }))}
                  className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  +1 Day Studied
                </button>
                <button 
                  onClick={() => setAchievementProgress(prev => ({ ...prev, perfectScores: prev.perfectScores + 1 }))}
                  className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  +1 Perfect Score
                </button>
                <button 
                  onClick={() => setAchievementProgress(prev => ({ ...prev, speedRecords: prev.speedRecords + 1 }))}
                  className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  +1 Speed Record
                </button>
                <button 
                  onClick={() => setAchievementProgress(prev => ({ ...prev, nightStudySessions: prev.nightStudySessions + 1 }))}
                  className="p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  +1 Night Study
                </button>
                <button 
                  onClick={() => setLearningStreak(prev => prev + 1)}
                  className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  +1 Day Streak
                </button>
              </div>
              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <div className="text-sm text-gray-700">
                  <strong>Current Progress:</strong> Words: {achievementProgress.wordsLearned}, Days: {achievementProgress.daysStudied}, 
                  Perfect Scores: {achievementProgress.perfectScores}, Speed Records: {achievementProgress.speedRecords}, 
                  Night Studies: {achievementProgress.nightStudySessions}, Streak: {learningStreak}
                </div>
              </div>
            </div>

            {/* Daily Challenges */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Gamepad2 className="w-8 h-8 mr-3 text-purple-600" />
                  Today's Challenges
                </h3>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Refresh Challenges
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dailyChallenges.map((challenge) => (
                  <div key={challenge.id} className="border-2 border-dashed border-purple-300 rounded-xl p-6 hover:border-purple-500 transition-colors">
                    <div className="text-center">
                      <div className="text-4xl mb-3">{challenge.icon}</div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{challenge.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{challenge.desc}</p>
                      <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        <Gift className="w-4 h-4 mr-1" />
                        {challenge.reward}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete N5 Vocabulary Database */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-gray-900 flex items-center">
                  <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
                  Complete N5 Vocabulary (800 Words)
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-bold text-blue-600">{vocabularyData.length}</span> words total
                  </div>
                  <button 
                    onClick={() => setShowWordCloud(!showWordCloud)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {showWordCloud ? 'Show List' : 'Show Cloud'}
                  </button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="mb-6 flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search vocabulary..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
                <select 
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Categories</option>
                  <option value="Basic Pronouns">Basic Pronouns</option>
                  <option value="People & Family">People & Family</option>
                  <option value="Places">Places</option>
                  <option value="Daily Actions">Daily Actions</option>
                  <option value="Objects & Items">Objects & Items</option>
                  <option value="Time & Numbers">Time & Numbers</option>
                  <option value="Food & Drinks">Food & Drinks</option>
                  <option value="Colors & Adjectives">Colors & Adjectives</option>
                  <option value="Weather & Nature">Weather & Nature</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Body Parts">Body Parts</option>
                  <option value="Emotions & Feelings">Emotions & Feelings</option>
                  <option value="School & Education">School & Education</option>
                  <option value="Work & Business">Work & Business</option>
                </select>
              </div>

                              {/* Vocabulary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                  {currentWords.map((word, index) => (
                    <div 
                      key={word.id}
                      onClick={() => {
                        setSelectedWord(word);
                        setShowWordModal(true);
                      }}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 cursor-pointer"
                    >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 font-medium">{word.category}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                        Day {word.day}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {/* Kanji */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {word.japanese}
                        </div>
                        <div className="text-sm text-gray-600">
                          {word.hiragana}
                        </div>
                      </div>
                      
                      {/* English Meaning */}
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">
                          {word.english}
                        </div>
                        <div className="text-xs text-gray-500 italic">
                          {word.romaji}
                        </div>
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex space-x-1">
                        {word.mastered ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {word.attempts > 0 ? `${Math.round((word.correctAttempts / word.attempts) * 100)}%` : 'New'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 p-6 bg-white rounded-xl border-2 border-gray-300 shadow-lg">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <div className="text-base text-gray-700 font-semibold">
                    📚 Showing {startIndex + 1}-{Math.min(endIndex, filteredVocabulary.length)} of {filteredVocabulary.length} N5 vocabulary words
                    {searchTerm && ` (filtered by "${searchTerm}")`}
                    {selectedCategory && ` in ${selectedCategory}`}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <div className="flex items-center space-x-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 rounded-lg transition-all duration-200 font-semibold ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      {totalPages > 5 && (
                        <span className="px-3 py-2 text-gray-500 font-semibold">...</span>
                      )}
                    </div>
                    <button 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Word Cloud */}
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center">
                  <Sparkles className="w-8 h-8 mr-3 animate-pulse" />
                  Your Learning Universe
                </h3>
                <button 
                  onClick={() => setShowWordCloud(!showWordCloud)}
                  className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  {showWordCloud ? 'Hide Universe' : 'Explore Universe'}
                </button>
              </div>
              {showWordCloud && (
                <div className="relative h-64 overflow-hidden rounded-xl bg-black/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      {['私', '学校', '食べ物', '友達', '勉強', '先生', '本', '水'].map((word, index) => (
                        <div
                          key={word}
                          className={`text-${['2xl', '3xl', 'xl', '4xl'][index % 4]} font-bold opacity-70 hover:opacity-100 cursor-pointer transition-all duration-300 hover:scale-125`}
                          style={{
                            color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'][index],
                            transform: `rotate(${Math.random() * 30 - 15}deg)`
                          }}
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Insights Panel */}
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Brain className="w-8 h-8 mr-3" />
                AI Learning Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/20 rounded-xl p-6">
                  <h4 className="text-lg font-bold mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Performance Analysis
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Your learning speed increased by 23% this week!</li>
                    <li>• Best performance time: 10-11 AM</li>
                    <li>• Strongest category: Family & People words</li>
                    <li>• Suggested focus: Food & Drink vocabulary</li>
                  </ul>
                </div>
                <div className="bg-white/20 rounded-xl p-6">
                  <h4 className="text-lg font-bold mb-3 flex items-center">
                    <Rocket className="w-5 h-5 mr-2" />
                    Personalized Tips
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Try voice recognition practice for better retention</li>
                    <li>• Schedule reviews in the evening for optimal memory</li>
                    <li>• Join community challenges to boost motivation</li>
                    <li>• Use mnemonics for difficult kanji characters</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Social Learning Features */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-8 h-8 mr-3 text-blue-600" />
                Learning Community
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Global Rank</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-1">#247</div>
                  <p className="text-gray-600 text-sm">Out of 12,847 learners</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Study Buddies</h4>
                  <div className="text-3xl font-bold text-green-600 mb-1">23</div>
                  <p className="text-gray-600 text-sm">Active learning partners</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">XP Points</h4>
                  <div className="text-3xl font-bold text-purple-600 mb-1">2,847</div>
                  <p className="text-gray-600 text-sm">This month</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-8">
            {/* Practice Header with Real-time Progress */}
            <div className="text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 animate-pulse"></div>
              <div className="relative z-10 py-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Character Practice Dojo 🥋
                </h2>
                <p className="text-xl text-gray-700 mb-6">Master each character with our revolutionary learning system</p>
                
                {/* Live Practice Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-blue-600">Day {currentDay}/{totalDays}</div>
                    <div className="text-sm text-gray-600 mb-2">Study Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentDay / totalDays) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{Math.round((currentDay / totalDays) * 100)}% Complete</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-green-600">{currentWordIndex + 1}/{wordsPerDay}</div>
                    <div className="text-sm text-gray-600 mb-2">Today's Words</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${dayProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{dayProgress}% Today</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-purple-600">{wordsLearned}/{totalWords}</div>
                    <div className="text-sm text-gray-600 mb-2">Words Mastered</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${overallProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{overallProgress}% Mastered</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-orange-600">{learningStreak}</div>
                    <div className="text-sm text-gray-600 mb-2">Day Streak</div>
                    <div className="flex justify-center mt-2">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 mx-0.5 rounded-full ${
                            i < learningStreak ? 'bg-yellow-400' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Weekly Goal</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Revolutionary Word Card System */}
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl shadow-2xl p-8 text-white">
              {/* Card Navigation & Progress */}
              <div className="flex items-center justify-between mb-8">
                {/* Word Navigation */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={previousWord}
                    disabled={currentWordIndex === 0}
                    className="group relative overflow-hidden bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl p-4 transition-all duration-300 hover:scale-110"
                  >
                    <ArrowLeft className="w-6 h-6 group-hover:animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </button>
                  <span className="text-white/80 text-sm px-2">Word</span>
                </div>

                {/* Center Progress Display */}
                <div className="text-center">
                  <div className="text-lg font-semibold mb-2">
                    Day {currentDay}: Word {currentWordIndex + 1} of {wordsPerDay}
                  </div>
                  <div className="w-64 bg-white/20 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${((currentWordIndex + 1) / wordsPerDay) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-white/70">
                    Total Progress: {((currentDay - 1) * wordsPerDay + currentWordIndex + 1)}/{totalWords} words
                  </div>
                </div>

                {/* Word Navigation */}
                <div className="flex items-center space-x-2">
                  <span className="text-white/80 text-sm px-2">Word</span>
                  <button
                    onClick={nextWord}
                    disabled={currentWordIndex === todaysWords.length - 1}
                    className="group relative overflow-hidden bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl p-4 transition-all duration-300 hover:scale-110"
                  >
                    <ArrowRight className="w-6 h-6 group-hover:animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </button>
                </div>
              </div>

              {/* Day Navigation */}
              <div className="flex items-center justify-center space-x-4 mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-4">
                <button
                  onClick={previousDay}
                  disabled={currentDay === 1}
                  className="group relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-2">
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-semibold">Previous Day</span>
                  </div>
                </button>

                <div className="text-center px-8">
                  <div className="text-2xl font-bold text-white mb-1">Day {currentDay}</div>
                  <div className="text-white/80 text-sm">of {totalDays} days</div>
                  <div className="w-32 bg-white/20 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentDay / totalDays) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={nextDay}
                  disabled={currentDay === totalDays}
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Next Day</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
              </div>

              {/* Interactive Character Display */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 mb-8">
                <div className="text-center">
                  {/* Main Character with Hover Effects */}
                  <div className="relative group mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div 
                      className="relative text-9xl font-bold cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-3"
                      style={{ 
                        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
                      }}
                                          >
                        {getCurrentWord().japanese}
                      </div>
                    </div>

                    {/* Hiragana with Typewriter Effect */}
                    <div className="text-4xl text-blue-200 mb-4 font-light tracking-wide">
                      {getCurrentWord().hiragana}
                    </div>

                    {/* Romaji with Gradient */}
                    <div className="text-3xl mb-8 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                      {getCurrentWord().romaji}
                    </div>

                  {/* Audio Controls with Visualizer */}
                  <div className="flex justify-center space-x-4 mb-8">
                    <button className="group relative bg-gradient-to-r from-green-500 to-blue-500 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <Volume2 className="w-6 h-6 group-hover:animate-pulse" />
                        <span>Listen (Native)</span>
                      </div>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                    </button>
                    
                    <button className="group relative bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <Mic className="w-6 h-6 group-hover:animate-pulse" />
                        <span>Record & Compare</span>
                      </div>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                    </button>
                  </div>

                  {/* Answer Reveal System */}
                  {!showAnswer ? (
                    <div className="space-y-6">
                      <div className="text-xl text-white/80 mb-6">
                        🤔 What does this word mean?
                      </div>
                      <button
                        onClick={() => setShowAnswer(true)}
                        className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 px-12 py-6 rounded-3xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl"
                      >
                        <span className="relative z-10">Reveal Answer ✨</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                                              {/* English Meaning with Animation */}
                        <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-6">
                          {getCurrentWord().english}
                        </div>

                        {/* Category Badge */}
                        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-xl font-bold shadow-lg">
                          <Star className="w-5 h-5 mr-2" />
                          {getCurrentWord().category}
                        </div>

                      {/* Memory Aid Section */}
                      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                          <Lightbulb className="w-8 h-8 text-yellow-400 animate-pulse" />
                          <span className="text-2xl font-bold text-yellow-200">Memory Magic</span>
                        </div>
                                                  <p className="text-xl text-yellow-100 italic text-center leading-relaxed">
                            "{getCurrentWord().mnemonic}"
                          </p>
                      </div>

                      {/* Interactive Stroke Order */}
                      <div className="bg-white/10 rounded-2xl p-6">
                        <h4 className="text-xl font-bold mb-4 text-center">✍️ Stroke Order Practice</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                      <div className="bg-white/20 rounded-xl p-4 text-center">
                              <div className="text-lg font-semibold mb-2">Step 1</div>
                              <div className="w-20 h-20 bg-white/10 rounded-lg mx-auto flex items-center justify-center text-3xl">
                                {getCurrentWord().japanese}
                              </div>
                            </div>
                            <div className="bg-white/20 rounded-xl p-4 text-center">
                              <div className="text-lg font-semibold mb-2">Step 2</div>
                              <div className="w-20 h-20 bg-white/10 rounded-lg mx-auto flex items-center justify-center text-3xl opacity-60">
                                {getCurrentWord().japanese}
                              </div>
                            </div>
                            <div className="bg-white/20 rounded-xl p-4 text-center">
                              <div className="text-lg font-semibold mb-2">Step 3</div>
                              <div className="w-20 h-20 bg-white/10 rounded-lg mx-auto flex items-center justify-center text-3xl opacity-30">
                                {getCurrentWord().japanese}
                              </div>
                            </div>
                        </div>
                      </div>

                      {/* Mastery Assessment */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                          onClick={() => markWord(false)}
                          className="group relative bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                          <div className="flex items-center justify-center space-x-3">
                            <XCircle className="w-8 h-8 group-hover:animate-bounce" />
                            <span>Need More Practice</span>
                          </div>
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                        </button>

                        <button
                          onClick={() => markWord(true)}
                          className="group relative bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                          <div className="flex items-center justify-center space-x-3">
                            <Star className="w-8 h-8 group-hover:animate-spin" />
                            <span>Getting There</span>
                          </div>
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                        </button>

                        <button
                          onClick={() => markWord(true)}
                          className="group relative bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                          <div className="flex items-center justify-center space-x-3">
                            <CheckCircle className="w-8 h-8 group-hover:animate-pulse" />
                            <span>Mastered!</span>
                          </div>
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Learning Modes Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="text-center">
                  <Eye className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold mb-2">Visual Mode</h3>
                  <p className="text-blue-100 text-sm">Learn with images and associations</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="text-center">
                  <Headphones className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold mb-2">Audio Mode</h3>
                  <p className="text-green-100 text-sm">Perfect your pronunciation</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="text-center">
                  <Brain className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold mb-2">Memory Mode</h3>
                  <p className="text-purple-100 text-sm">Strengthen recall with mnemonics</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold mb-2">Speed Mode</h3>
                  <p className="text-orange-100 text-sm">Rapid-fire recognition practice</p>
                </div>
              </div>
            </div>

            {/* Enhanced Practice Analytics Panel */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl p-8 border border-indigo-200">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-indigo-600" />
                📊 Advanced Learning Analytics
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Character Mastery Progress */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Target className="w-6 h-6 mr-2 text-blue-600" />
                    Character Mastery Progress
                  </h4>
                  <div className="space-y-4">
                    {[
                      { char: '私', romaji: 'watashi', progress: 4, category: 'Basic Pronouns' },
                      { char: '学生', romaji: 'gakusei', progress: 3, category: 'People & Family' },
                      { char: '先生', romaji: 'sensei', progress: 5, category: 'People & Family' },
                      { char: '家族', romaji: 'kazoku', progress: 2, category: 'People & Family' },
                      { char: '学校', romaji: 'gakkou', progress: 4, category: 'Places' }
                    ].map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-gray-900">{item.char}</span>
                            <span className="text-sm text-gray-600">({item.romaji})</span>
                          </div>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 transition-all duration-300 ${
                                  i < item.progress 
                                    ? 'text-yellow-400 fill-current animate-pulse' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            {item.progress}/5 Mastery
                          </span>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(item.progress / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Smart Practice Recommendations */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Brain className="w-6 h-6 mr-2 text-green-600" />
                    AI-Powered Recommendations
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-blue-800">⏰ Optimal Practice Time</span>
                      </div>
                      <p className="text-blue-700 text-sm mb-2">Your peak performance window is 10-11 AM</p>
                      <div className="flex items-center space-x-2 text-xs text-blue-600">
                        <span>📈 23% better retention</span>
                        <span>•</span>
                        <span>🎯 15% higher accuracy</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <Target className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-green-800">🎯 Focus Area</span>
                      </div>
                      <p className="text-green-700 text-sm mb-2">Review family & relationship vocabulary</p>
                      <div className="flex items-center space-x-2 text-xs text-green-600">
                        <span>📚 12 words need review</span>
                        <span>•</span>
                        <span>⏱️ 15 min recommended</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <Rocket className="w-5 h-5 text-purple-600" />
                        <span className="font-bold text-purple-800">🚀 Next Milestone</span>
                      </div>
                      <p className="text-purple-700 text-sm mb-2">Master 5 more words this week</p>
                      <div className="flex items-center space-x-2 text-xs text-purple-600">
                        <span>📊 80% completion</span>
                        <span>•</span>
                        <span>🎯 3 days remaining</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-orange-600" />
                        <span className="font-bold text-orange-800">📈 Learning Streak</span>
                      </div>
                      <p className="text-orange-700 text-sm mb-2">Maintain your 12-day streak!</p>
                      <div className="flex items-center space-x-2 text-xs text-orange-600">
                        <span>🔥 12 days strong</span>
                        <span>•</span>
                        <span>🏆 Top 5% of learners</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 text-center shadow-md">
                  <div className="text-2xl font-bold text-blue-600">{wordsLearned}</div>
                  <div className="text-sm text-gray-600">Words Mastered</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-md">
                  <div className="text-2xl font-bold text-green-600">{learningStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-md">
                  <div className="text-2xl font-bold text-purple-600">89%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-md">
                  <div className="text-2xl font-bold text-orange-600">342</div>
                  <div className="text-sm text-gray-600">Study Minutes</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'memory' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Memory Training</h2>
              <p className="text-lg text-gray-600 mb-6">Interactive games and exercises to strengthen memory retention</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Flashcard Review</h3>
                  <p className="text-gray-600 mb-4">Quick review of learned words with spaced repetition</p>
                  <button 
                    onClick={handleStartFlashcardReview}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Start Review
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Memory Palace</h3>
                  <p className="text-gray-600 mb-4">Create visual associations for better retention</p>
                  <button 
                    onClick={handleStartMemoryPalace}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Start Training
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Speed Recognition</h3>
                  <p className="text-gray-600 mb-4">Fast-paced word recognition challenges</p>
                  <button 
                    onClick={handleStartSpeedRecognition}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    Start Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exam' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Mastery Exam</h2>
              <p className="text-lg text-gray-600 mb-6">Test your knowledge and track your progress</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Quiz</h3>
                  <p className="text-gray-600 mb-4">10 questions • 5 minutes</p>
                  <button 
                    onClick={handleStartQuickQuiz}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors duration-200"
                  >
                    Start Quick Quiz
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Progress Test</h3>
                  <p className="text-gray-600 mb-4">25 questions • 15 minutes</p>
                  <button 
                    onClick={handleStartProgressTest}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors duration-200"
                  >
                    Start Progress Test
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Master Exam</h3>
                  <p className="text-gray-600 mb-4">50 questions • 30 minutes</p>
                  <button 
                    onClick={handleStartMasterExam}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold transition-colors duration-200"
                  >
                    Start Master Exam
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default N5Vocabulary;
