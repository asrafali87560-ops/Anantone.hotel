/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { GALLERY_DATA } from '../data';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'rooms', label: 'Luxurious Rooms' },
    { id: 'banquet', label: 'Grand Banquet' },
    { id: 'dining', label: 'Fabulous Dining' },
    { id: 'interior', label: 'Hotel Interior' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    // Find the actual index in the filtered items list
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-900 border-t border-stone-850">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-500 font-serif text-sm uppercase tracking-[0.25em] font-semibold">
            Visual Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
            Our Stunning Photo Gallery
          </h2>
          <div className="flex justify-center items-center space-x-2 pt-2">
            <div className="w-12 h-[1px] bg-amber-500/50" />
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <div className="w-12 h-[1px] bg-amber-500/50" />
          </div>
          <p className="text-stone-400 text-base font-sans font-light max-w-2xl mx-auto">
            Take a virtual tour of Anant One. Explore our cleanly maintained rooms, magnificent wedding configurations, and mouth-watering culinary preparations.
          </p>
        </div>

        {/* Categories Controls */}
        <div className="flex justify-center items-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase transition-colors duration-150 ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-grid">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative h-72 rounded-xl overflow-hidden border border-stone-850 shadow-md bg-stone-950 cursor-pointer"
              id={`gallery-item-${item.id}`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-75"
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <div className="space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-350">
                  <span className="text-amber-400 text-[10px] uppercase tracking-wider font-semibold">
                    {item.category}
                  </span>
                  <h3 className="text-stone-100 font-serif font-semibold text-lg flex items-center justify-between">
                    <span>{item.title}</span>
                    <ZoomIn className="w-5 h-5 text-amber-500 shrink-0 ml-2" />
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between p-4"
          onClick={handleCloseLightbox}
          id="gallery-lightbox"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center text-stone-300 py-2 px-4 max-w-7xl mx-auto w-full z-10">
            <div>
              <span className="text-amber-400 text-[10px] uppercase tracking-widest font-semibold block">
                Category: {filteredItems[lightboxIndex].category}
              </span>
              <h4 className="text-stone-100 font-serif font-bold text-lg">
                {filteredItems[lightboxIndex].title}
              </h4>
            </div>
            <button
              onClick={handleCloseLightbox}
              className="p-2 text-stone-400 hover:text-stone-200 bg-stone-900 border border-stone-800 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Stage */}
          <div className="flex-1 flex justify-center items-center relative py-4 max-w-5xl mx-auto w-full">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 text-stone-400 hover:text-stone-100 bg-stone-900/55 backdrop-blur-md hover:bg-stone-900 border border-stone-800 rounded-full transition-all cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Display Image */}
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[70vh] max-w-full object-contain rounded-lg border border-stone-800 shadow-2xl animate-fade-in"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 text-stone-400 hover:text-stone-100 bg-stone-900/55 backdrop-blur-md hover:bg-stone-900 border border-stone-800 rounded-full transition-all cursor-pointer z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Foot Indicators */}
          <div className="text-stone-500 text-xs font-mono text-center pb-2">
            Image {lightboxIndex + 1} of {filteredItems.length}
          </div>
        </div>
      )}
    </section>
  );
}
