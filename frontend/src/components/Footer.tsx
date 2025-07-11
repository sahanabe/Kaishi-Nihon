import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Globe, 
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  ArrowRight, Heart, Shield, Award, Zap,
  Brain, Users
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'Contact', href: '/contact' }
  ];

  const services = [
    { name: 'Language Learning', href: '/language', icon: Brain },
    { name: 'Visa Services', href: '/visa', icon: Shield },
    { name: 'Japan Services', href: '/services', icon: Globe },
    { name: 'Expert Consultation', href: '/consultation', icon: Users }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refund' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook, color: 'hover:text-blue-600' },
    { name: 'Twitter', href: '#', icon: Twitter, color: 'hover:text-blue-400' },
    { name: 'Instagram', href: '#', icon: Instagram, color: 'hover:text-pink-600' },
    { name: 'LinkedIn', href: '#', icon: Linkedin, color: 'hover:text-blue-700' },
    { name: 'YouTube', href: '#', icon: Youtube, color: 'hover:text-red-600' }
  ];



  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #8B5CF6 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #06B6D4 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>



      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12">
          
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">始</span>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold">Kaishi Nihon</h2>
                <p className="text-purple-300 text-xs sm:text-sm">AI-Powered Immigration</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              The world's first AI-powered Japan immigration platform. We use cutting-edge artificial intelligence 
              to provide personalized guidance, predict visa outcomes, and ensure your successful journey to Japan.
            </p>

            {/* AI Features */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                <span>99.2% AI Prediction Accuracy</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                <span>Government Certified Partners</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                <span>Award-winning Immigration Platform</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4">
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-300">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                <span className="break-all">support@kaishinihon.com</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-300">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                <span>+81-3-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-300">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                <span className="break-words">Tokyo, Japan • San Francisco, USA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-xs sm:text-sm flex items-center group"
                  >
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1.5 sm:mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">Our Services</h3>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <li key={index}>
                    <Link
                      to={service.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-xs sm:text-sm flex items-center group"
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-purple-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                      {service.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Legal Links */}
            <h4 className="font-semibold text-sm sm:text-md mt-6 sm:mt-8 mb-3 sm:mb-4 text-white">Legal</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-gray-300 transition-colors duration-200 text-xs"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="w-full sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">Stay Connected</h3>
            
            {/* Newsletter Signup */}
            <div className="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-700 w-full">
              <h4 className="font-semibold mb-2 sm:mb-3 text-white text-sm sm:text-base">Get AI Immigration Updates</h4>
              <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">Weekly tips, success stories, and AI insights delivered to your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-gray-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm border border-gray-600 focus:border-purple-500 focus:outline-none focus:bg-gray-600 transition-colors"
                />
                <button className="bg-gradient-to-r from-purple-600 to-purple-700 px-3 sm:px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors flex-shrink-0 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-white text-sm sm:text-base">Follow Us</h4>
              <div className="flex space-x-2 sm:space-x-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200 hover:scale-110 hover:bg-gray-700`}
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-3 sm:space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              <span>© {currentYear} Kaishi Nihon. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center justify-center sm:justify-start space-x-1">
                <span>Made with</span>
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                <span>for Japan dreamers</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="text-purple-400 font-medium">Powered by Kaishi Innovations.com</span>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm text-gray-400">
              <span>🇯🇵 Proudly serving Japan immigration since 2024</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 