import React, { useState, useEffect } from 'react';
import { Building2, Home, Trees, Flower, BookOpen, ArrowLeft, ArrowRight, Plus, MapPin, Users, Star, Sparkles, Hammer, Wrench, Crown } from 'lucide-react';

// Memory Palace data with rooms and kanji
const memoryPalaceData = {
  rooms: [
    {
      id: 1,
      name: 'Grand Hall',
      icon: '🏛️',
      description: 'Majestic entrance hall with towering columns',
      kanji: [
        { id: 1, character: '大', meaning: 'Big', location: 'Entrance door', color: '#ff6b6b' },
        { id: 2, character: '小', meaning: 'Small', location: 'Left column', color: '#4ecdc4' },
        { id: 3, character: '高', meaning: 'Tall', location: 'Right column', color: '#45b7d1' }
      ],
      built: true,
      level: 3
    },
    {
      id: 2,
      name: 'Garden',
      icon: '🌸',
      description: 'Peaceful garden with cherry blossoms',
      kanji: [
        { id: 4, character: '花', meaning: 'Flower', location: 'Cherry tree', color: '#ff9ff3' },
        { id: 5, character: '木', meaning: 'Tree', location: 'Ancient oak', color: '#26de81' },
        { id: 6, character: '草', meaning: 'Grass', location: 'Stone path', color: '#a8e6cf' }
      ],
      built: true,
      level: 2
    },
    {
      id: 3,
      name: 'Library',
      icon: '📚',
      description: 'Vast library with endless knowledge',
      kanji: [
        { id: 7, character: '本', meaning: 'Book', location: 'Shelf A1', color: '#feca57' },
        { id: 8, character: '読', meaning: 'Read', location: 'Reading desk', color: '#ff9ff3' },
        { id: 9, character: '学', meaning: 'Study', location: 'Study corner', color: '#54a0ff' }
      ],
      built: true,
      level: 4
    },
    {
      id: 4,
      name: 'Kitchen',
      icon: '🍳',
      description: 'Warm kitchen with traditional stove',
      kanji: [
        { id: 10, character: '火', meaning: 'Fire', location: 'Stove', color: '#ff6b6b' },
        { id: 11, character: '水', meaning: 'Water', location: 'Sink', color: '#4ecdc4' },
        { id: 12, character: '食', meaning: 'Eat', location: 'Dining table', color: '#feca57' }
      ],
      built: false,
      level: 0
    },
    {
      id: 5,
      name: 'Bedroom',
      icon: '🛏️',
      description: 'Cozy bedroom with tatami mats',
      kanji: [
        { id: 13, character: '寝', meaning: 'Sleep', location: 'Futon', color: '#a8e6cf' },
        { id: 14, character: '夢', meaning: 'Dream', location: 'Window', color: '#ff9ff3' },
        { id: 15, character: '安', meaning: 'Peace', location: 'Wall', color: '#26de81' }
      ],
      built: false,
      level: 0
    },
    {
      id: 6,
      name: 'Bathroom',
      icon: '🚿',
      description: 'Traditional Japanese bathroom',
      kanji: [
        { id: 16, character: '洗', meaning: 'Wash', location: 'Sink', color: '#4ecdc4' },
        { id: 17, character: '湯', meaning: 'Hot water', location: 'Bath', color: '#ff6b6b' },
        { id: 18, character: '清', meaning: 'Clean', location: 'Mirror', color: '#a8e6cf' }
      ],
      built: false,
      level: 0
    }
  ],
  stats: {
    totalRooms: 6,
    builtRooms: 3,
    totalKanji: 18,
    masteredKanji: 9,
    palaceLevel: 2
  }
};

// Animated background component
const AnimatedBackground: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="w-full h-full bg-gradient-to-br from-amber-700 via-orange-600 to-red-500 animate-gradient-x opacity-80"></div>
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className={`absolute block w-2 h-2 rounded-full bg-yellow-400 opacity-40 animate-sparkle${i % 5}`}
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

// Room Card Component
const RoomCard: React.FC<{ room: any; onSelect: (room: any) => void }> = ({ room, onSelect }) => {
  return (
    <div 
      className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
        room.built 
          ? 'border-green-400 hover:border-green-300' 
          : 'border-gray-400 hover:border-gray-300 opacity-60'
      }`}
      onClick={() => onSelect(room)}
    >
      <div className="text-center">
        <div className="text-4xl mb-3">{room.icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{room.name}</h3>
        <p className="text-white/80 text-sm mb-4">{room.description}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {room.kanji.map((k: any) => (
            <div 
              key={k.id}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: k.color }}
            >
              {k.character}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-white/80 text-sm">
            {room.built ? `Level ${room.level}` : 'Not Built'}
          </div>
          <div className="text-white/80 text-sm">
            {room.kanji.length} kanji
          </div>
        </div>
        
        {!room.built && (
          <div className="mt-3">
            <button className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-lg hover:scale-105 transition-all duration-200 flex items-center mx-auto">
              <Hammer className="w-4 h-4 mr-2" />
              Build 🏗️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Room Detail Component
const RoomDetail: React.FC<{ room: any; onBack: () => void }> = ({ room, onBack }) => {
  const [selectedKanji, setSelectedKanji] = useState<any>(null);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center">
              {room.icon} {room.name}
            </h2>
            <p className="text-white/80">{room.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-white/80 text-sm">Level {room.level}</div>
          <div className="text-white/80 text-sm">{room.kanji.length} kanji</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Kanji Locations</h3>
          <div className="space-y-3">
            {room.kanji.map((kanji: any) => (
              <div 
                key={kanji.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedKanji?.id === kanji.id ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'
                }`}
                onClick={() => setSelectedKanji(kanji)}
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: kanji.color }}
                  >
                    {kanji.character}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-bold">{kanji.meaning}</div>
                    <div className="text-white/70 text-sm">{kanji.location}</div>
                  </div>
                  <MapPin className="w-5 h-5 text-white/60" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">Memory Techniques</h3>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-bold mb-2">Spatial Association</h4>
              <p className="text-white/80 text-sm">
                Place each kanji in a specific location within the room. 
                The physical position helps create strong memory associations.
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-bold mb-2">Visual Storytelling</h4>
              <p className="text-white/80 text-sm">
                Create stories connecting the kanji to its location. 
                For example, 火 (fire) on the stove creates a logical connection.
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-bold mb-2">Emotional Connection</h4>
              <p className="text-white/80 text-sm">
                Associate feelings with each location. 
                The bedroom feels peaceful, the kitchen feels warm and inviting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedKanji && (
        <div className="mt-6 bg-white/10 rounded-lg p-4">
          <h4 className="text-white font-bold mb-2">Selected Kanji: {selectedKanji.character}</h4>
          <p className="text-white/80">
            <strong>Meaning:</strong> {selectedKanji.meaning}<br/>
            <strong>Location:</strong> {selectedKanji.location}<br/>
            <strong>Memory Tip:</strong> Imagine this kanji physically placed at {selectedKanji.location.toLowerCase()}. 
            The visual connection will help you remember both the character and its meaning.
          </p>
        </div>
      )}
    </div>
  );
};

const KanjiMemoryPalace: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [showBuildModal, setShowBuildModal] = useState(false);
  const [buildingRoom, setBuildingRoom] = useState<any>(null);

  const handleRoomSelect = (room: any) => {
    if (room.built) {
      setSelectedRoom(room);
    } else {
      setBuildingRoom(room);
      setShowBuildModal(true);
    }
  };

  const buildRoom = () => {
    if (buildingRoom) {
      // In a real app, this would update the database
      buildingRoom.built = true;
      buildingRoom.level = 1;
      setShowBuildModal(false);
      setBuildingRoom(null);
    }
  };

  if (selectedRoom) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-amber-700 via-orange-600 to-red-500">
        <AnimatedBackground />
        <div className="relative z-10 container mx-auto px-6 py-8">
          <RoomDetail room={selectedRoom} onBack={() => setSelectedRoom(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-700 via-orange-600 to-red-500">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="w-12 h-12 text-yellow-400 animate-pulse mr-2" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
              Memory Palace
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-6">
            Build virtual rooms and place kanji in spatial memory locations
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 rounded-xl p-4 text-white text-center">
              <div className="text-2xl font-bold">{memoryPalaceData.stats.totalRooms}</div>
              <div className="text-sm opacity-80">Total Rooms</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white text-center">
              <div className="text-2xl font-bold">{memoryPalaceData.stats.builtRooms}</div>
              <div className="text-sm opacity-80">Built</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white text-center">
              <div className="text-2xl font-bold">{memoryPalaceData.stats.totalKanji}</div>
              <div className="text-sm opacity-80">Kanji</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white text-center">
              <div className="text-2xl font-bold">{memoryPalaceData.stats.palaceLevel}</div>
              <div className="text-sm opacity-80">Level</div>
            </div>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memoryPalaceData.rooms.map((room) => (
            <RoomCard key={room.id} room={room} onSelect={handleRoomSelect} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => window.location.href = '#/language/kanji-mastery'}
            className="px-6 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-200"
          >
            Back to Kanji Mastery
          </button>
        </div>
      </div>

      {/* Build Modal */}
      {showBuildModal && buildingRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-6 text-center">
            <div className="text-4xl mb-4">{buildingRoom.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-4">Build {buildingRoom.name}?</h3>
            <p className="text-white/80 mb-6">{buildingRoom.description}</p>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowBuildModal(false)}
                className="flex-1 px-6 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={buildRoom}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-200"
              >
                Build 🏗️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanjiMemoryPalace; 