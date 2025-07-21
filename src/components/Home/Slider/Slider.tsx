import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Zap } from 'lucide-react';
import img1 from '../../../assets/image1.jpg'
import img2 from '../../../assets/image2.jpg'
import img3 from '../../../assets/image3.jpg'
import img4 from '../../../assets/image4.avif'
const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  type Slide = {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    color: string;
    accent: string;
  };

  const slides: Slide[] = [
    {
      id: 1,
      image: img1,
      title: 'Ai Categorization',
      subtitle: 'Handpicked, powerful, and ready for you. Dive into a curated selection.',
      color: 'from-violet-600 via-purple-600 to-indigo-600',
      accent: 'violet'
    },
    {
      id: 2,
      image: img2,
      title: 'Event Schedule',
      subtitle: 'From fitness to finance, we\'ve got an app for that.',
      color: 'from-emerald-500 via-teal-500 to-cyan-500',
      accent: 'emerald'
    },
    {
      id: 3,
      image: img3,
      title: 'See Other Post',
      subtitle: 'Smooth design, optimized performance across all devices.',
      color: 'from-rose-500 via-pink-500 to-fuchsia-500',
      accent: 'rose'
    },
    {
      id: 4,
      image: img4,
      title: 'Update Your Task',
      subtitle: 'Stay connected. Stay productive. Stay ahead.',
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      accent: 'orange'
    }
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('next');
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('prev');
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden mt-10">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2s"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-4s transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-20 pb-10 text-center">
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
           Mini Event Scheduler with AI Categorization
        </h1>
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <Sparkles className="w-5 h-5 animate-spin-slow" />
          <p className="text-lg">Mini Event Scheduler</p>
          <Zap className="w-5 h-5 animate-bounce" />
        </div>
      </div>

      {/* Main Slider Container */}
      <div className="relative z-10 flex items-center justify-center px-4 md:px-8">
        
        {/* Left Arrow - Unique Design */}
        <div className="relative group cursor-pointer" onClick={prevSlide}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r ${currentSlideData.color} p-1 group-hover:scale-110 transition-all duration-300 shadow-2xl`}>
            <div className="w-full h-full bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:animate-pulse" />
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Previous
          </div>
        </div>

        {/* Slider Content - Hexagonal Design */}
        <div className="mx-8 md:mx-16 relative">
          <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
            
            {/* Hexagonal Frame */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.color} rounded-3xl transform rotate-6 scale-95 opacity-50 animate-spin-very-slow shadow-2xl`}></div>
            <div className={`absolute inset-0 bg-gradient-to-tl ${currentSlideData.color} rounded-3xl transform -rotate-3 scale-98 opacity-30 animate-spin-reverse shadow-xl`}></div>
            
            {/* Main Content Container */}
            <div className={`relative w-full h-full bg-gradient-to-br ${currentSlideData.color} rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 ${
              isTransitioning 
                ? direction === 'next' 
                  ? 'translate-x-8 opacity-50 scale-95' 
                  : '-translate-x-8 opacity-50 scale-95'
                : 'translate-x-0 opacity-100 scale-100'
            }`}>
              
              {/* Image */}
              <div className="absolute inset-0">
                <img 
                  src={currentSlideData.image} 
                  alt={currentSlideData.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                <div className={`transform transition-all duration-500 delay-200 ${
                  isTransitioning ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
                }`}>
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                    {currentSlideData.title}
                  </h2>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed mb-6">
                    {currentSlideData.subtitle}
                  </p>
                  
                  {/* CTA Button */}
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 font-semibold">
                    <span>Explore Now</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  </button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
              <div className="absolute top-12 right-8 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <div className="absolute bottom-20 left-6 w-4 h-4 bg-white/30 rounded-full animate-bounce"></div>
            </div>

            {/* Slide Counter */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === currentSlide 
                        ? `w-8 bg-gradient-to-r ${currentSlideData.color}` 
                        : 'w-2 bg-white/30'
                    }`}
                  ></div>
                ))}
              </div>
              <div className="text-white/60 text-sm font-mono">
                {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        {/* Right Arrow - Unique Design */}
        <div className="relative group cursor-pointer" onClick={nextSlide}>
          <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-l ${currentSlideData.color} p-1 group-hover:scale-110 transition-all duration-300 shadow-2xl`}>
            <div className="w-full h-full bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:animate-pulse" />
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Next
          </div>
        </div>
      </div>

      {/* Side Navigation */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => {
              if (!isTransitioning && index !== currentSlide) {
                setIsTransitioning(true);
                setDirection(index > currentSlide ? 'next' : 'prev');
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsTransitioning(false);
                }, 300);
              }
            }}
            className={`w-3 h-8 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? `bg-gradient-to-b ${slide.color} shadow-lg` 
                : 'bg-white/20 hover:bg-white/40'
            }`}
          ></button>
        ))}
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-very-slow {
          from { transform: rotate(6deg); }
          to { transform: rotate(366deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(-3deg); }
          to { transform: rotate(-363deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-spin-very-slow {
          animation: spin-very-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite reverse;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animation-delay-2s {
          animation-delay: 2s;
        }

        .animation-delay-4s {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Slider;