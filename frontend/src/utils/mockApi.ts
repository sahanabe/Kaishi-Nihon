// Mock API for when backend is not available
export const mockAuthAPI = {
  login: async (credentials: { email: string; password: string }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    if (credentials.email && credentials.password) {
      // Generate realistic user name from email
      const emailName = credentials.email.split('@')[0];
      const firstName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
      const lastName = 'User';
      
      const mockUser = {
        id: 'mock-user-123',
        name: `${firstName} ${lastName}`,
        email: credentials.email,
        nationality: 'International',
        currentLocation: 'Tokyo, Japan',
        japaneseLevel: 'Beginner',
        joinDate: new Date().toISOString()
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Store in localStorage
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return {
        data: {
          data: {
            user: mockUser,
            token: mockToken
          },
          success: true,
          message: 'Login successful (Mock)'
        }
      };
    } else {
      throw new Error('Invalid credentials');
    }
  },
  
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    nationality?: string;
    currentLocation?: string;
  }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: 'mock-user-' + Date.now(),
      name: userData.name || 'New User',
      email: userData.email,
      nationality: userData.nationality || 'International',
      currentLocation: userData.currentLocation || 'Tokyo, Japan',
      japaneseLevel: 'Beginner',
      joinDate: new Date().toISOString()
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return {
      data: {
        data: {
          user: mockUser,
          token: mockToken
        },
        success: true,
        message: 'Registration successful (Mock)'
      }
    };
  },
  
  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = localStorage.getItem('user');
    if (user) {
      return {
        data: {
          success: true,
          user: JSON.parse(user)
        }
      };
    } else {
      throw new Error('User not found');
    }
  },
  
  updateProfile: async (userData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = localStorage.getItem('user');
    if (user) {
      const updatedUser = { ...JSON.parse(user), ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return {
        data: {
          success: true,
          message: 'Profile updated successfully (Mock)',
          user: updatedUser
        }
      };
    } else {
      throw new Error('User not found');
    }
  },

  googleAuth: async (credential: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate realistic Japanese user name for demo
    const demoNames = [
      'Yuki Tanaka',
      'Hiroshi Yamamoto', 
      'Aiko Suzuki',
      'Kenji Watanabe',
      'Mika Sato',
      'Takashi Ito',
      'Yumi Nakamura',
      'Shinji Kobayashi',
      'Akiko Fujimoto',
      'Masato Tanaka'
    ];
    
    const randomName = demoNames[Math.floor(Math.random() * demoNames.length)];
    const demoEmail = `demo.${randomName.toLowerCase().replace(' ', '.')}@gmail.com`;
    
    const mockUser = {
      id: 'mock-google-user-' + Date.now(),
      name: randomName,
      email: demoEmail,
      nationality: 'Japanese',
      currentLocation: 'Tokyo, Japan',
      japaneseLevel: 'Native',
      joinDate: new Date().toISOString()
    };
    
    const mockToken = 'mock-google-jwt-token-' + Date.now();
    
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return {
      data: {
        data: {
          user: mockUser,
          token: mockToken
        },
        success: true,
        message: 'Google Sign-In successful (Mock)'
      }
    };
  }
};

export const mockVisaAPI = {
  getTypes: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      data: {
        success: true,
        visaTypes: [
          { id: 'student', name: 'Student Visa', description: 'For studying in Japan' },
          { id: 'work', name: 'Work Visa', description: 'For employment in Japan' },
          { id: 'tourist', name: 'Tourist Visa', description: 'For tourism and short visits' },
          { id: 'business', name: 'Business Visa', description: 'For business activities' }
        ]
      }
    };
  },
  
  getRecommendations: async (params: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: {
        success: true,
        recommendations: [
          {
            visaType: 'student',
            confidence: 85,
            reasons: ['Educational purpose', 'Valid school acceptance'],
            requirements: ['School acceptance letter', 'Financial proof', 'Academic records']
          }
        ]
      }
    };
  }
};

export const mockLanguageAPI = {
  getLevels: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      data: {
        success: true,
        levels: [
          { id: 'beginner', name: 'Beginner (N5)', description: 'Basic Japanese skills' },
          { id: 'intermediate', name: 'Intermediate (N4-N3)', description: 'Conversational Japanese' },
          { id: 'advanced', name: 'Advanced (N2-N1)', description: 'Fluent Japanese' }
        ]
      }
    };
  },
  
  takeAssessment: async (answers: any[]) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock assessment result
    const score = Math.floor(Math.random() * 40) + 60; // 60-100
    const level = score >= 80 ? 'N4' : score >= 60 ? 'N5' : 'Beginner';
    
    return {
      data: {
        success: true,
        score,
        level,
        recommendations: [
          'Focus on basic grammar patterns',
          'Practice daily vocabulary',
          'Consider JLPT N5 preparation'
        ]
      }
    };
  }
};

export const mockServicesAPI = {
  getAllServices: async () => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return {
      data: {
        success: true,
        services: [
          { id: 'airport', name: 'Airport Pickup', description: 'Reliable airport transportation' },
          { id: 'accommodation', name: 'Accommodation', description: 'Find your perfect home' },
          { id: 'ticketing', name: 'Ticketing', description: 'Book flights and trains' }
        ]
      }
    };
  }
};

export const mockConsultationAPI = {
  getLawyers: async (params: any) => {
    await new Promise(resolve => setTimeout(resolve, 900));
    return {
      data: {
        success: true,
        lawyers: [
          {
            id: 'lawyer-1',
            name: 'Yuki Tanaka',
            specialization: 'Immigration Law',
            location: 'Tokyo',
            languages: ['Japanese', 'English'],
            rating: 4.8,
            experience: '15 years'
          },
          {
            id: 'lawyer-2',
            name: 'Hiroshi Yamamoto',
            specialization: 'Visa Applications',
            location: 'Osaka',
            languages: ['Japanese', 'English', 'Chinese'],
            rating: 4.9,
            experience: '12 years'
          }
        ]
      }
    };
  }
};

// Check if we should use mock API
export const shouldUseMockAPI = () => {
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  return isProduction && !process.env.REACT_APP_API_URL;
}; 