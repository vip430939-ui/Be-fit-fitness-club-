import React, { useState } from 'react';
import { GalleryPhoto } from '../types';
import { Maximize2, X, Info } from 'lucide-react';

interface GallerySectionProps {
  photos: GalleryPhoto[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    { key: 'all', label: 'All Areas' },
    { key: 'strength', label: 'Strength' },
    { key: 'free_weights', label: 'Free Weights' },
    { key: 'cardio', label: 'Cardio' },
    { key: 'facility', label: 'Facility & Atmosphere' },
  ];

  const filteredPhotos =
    activeFilter === 'all' ? photos : photos.filter((p) => p.category === activeFilter);

  return (
    <section id="gallery" className="py-24 bg-[#0B0D11] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-[#BEF264] mb-3">
              Visual Tour & Training Floor
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              CLUB <span className="text-[#BEF264]">GALLERY.</span>
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-[#12151B] border border-white/10 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  activeFilter === cat.key
                    ? 'bg-[#BEF264] text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden bg-[#12151B] border border-white/10 cursor-pointer aspect-video sm:aspect-square lg:aspect-[4/3] shadow-lg hover:border-[#BEF264]/50 transition-all duration-300"
            >
              <img
                src={photo.imageUrl}
                alt={photo.altText}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#BEF264] mb-0.5">
                    {photo.category.replace('_', ' ')}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#BEF264] transition-colors line-clamp-1">
                    {photo.title}
                  </h4>
                </div>
                <div className="p-2 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/20 group-hover:bg-[#BEF264] group-hover:text-black transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Photography Notice */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-neutral-400 text-center">
          <Info className="w-4 h-4 text-neutral-400 shrink-0" />
          <span>
            Photos represent real training equipment and facilities available at Be Fit Fitness Club, Narhe, Pune.
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0F1115] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/50">
              <div>
                <h3 className="text-base font-bold text-white">{selectedPhoto.title}</h3>
                <span className="text-xs font-mono text-[#BEF264] uppercase">
                  {selectedPhoto.category.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10"
                aria-label="Close photo view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.altText}
                className="max-h-[70vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-4 bg-[#0F1115] text-xs text-neutral-400 border-t border-white/10">
              {selectedPhoto.altText}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
