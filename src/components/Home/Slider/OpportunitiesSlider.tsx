import React from 'react';
// import { ArrowRight } from 'lucide-react';

const backgroundImage = "/api/placeholder/800/500";

type CategoryCardProps = {
  icon: React.ReactNode;
  title: string;
  listings: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, listings }) => {
  return (
    <div className="bg-gray-800 bg-opacity-70 rounded-xl p-4 flex flex-col items-center justify-center text-white h-full w-full transition-all hover:scale-105">
      <div className="bg-opacity-90 rounded-full p-3 mb-2">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-300">{listings} Listings</p>
    </div>
  );
};

const OpportunitiesSlider = () => {
  return (
    <div className="w-full bg-gray-900 bg-opacity-70 relative py-16">
      {/* Background overlay with image */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.6,
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Header Text */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">
            Let's work with each other & create
          </h2>
          <h1 className="text-5xl font-bold text-yellow-400 mt-2">
            Great Opportunities
          </h1>
        </div>
        
        {/* Button Options */}
        <div className="flex justify-center gap-4 mb-16">
          <button className="px-6 py-3 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition-colors">
            I'm looking for a talent
          </button>
          <button className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded hover:bg-white hover:bg-opacity-10 transition-colors">
            I'm looking for a work
          </button>
        </div>
        
        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <CategoryCard 
            icon={<div className="w-12 h-12 rounded-full bg-red-400 flex items-center justify-center">🚗</div>}
            title="Automotive"
            listings="321247"
          />
          <CategoryCard 
            icon={<div className="w-12 h-12 rounded-full bg-pink-400 flex items-center justify-center">💅</div>}
            title="Beauty & Care"
            listings="321247"
          />
          <CategoryCard 
            icon={<div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center">📈</div>}
            title="Marketing"
            listings="321247"
          />
          <CategoryCard 
            icon={<div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center">👶</div>}
            title="Child Care"
            listings="321247"
          />
          <CategoryCard 
            icon={<div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">🧹</div>}
            title="House Cleaning"
            listings="321247"
          />
        </div>
        
        {/* Explore More Button */}
        <div className="flex justify-center">
          <div className="bg-indigo-600 rounded-xl p-4 text-center text-white">
            <h3 className="font-medium mb-2">Explore more categories</h3>
            <button className="bg-yellow-400 text-black py-2 px-6 rounded transition-colors hover:bg-yellow-500 flex mx-auto items-center justify-center">
              Explore all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesSlider;