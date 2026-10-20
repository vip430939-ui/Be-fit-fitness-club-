import React, { useRef, useState, useEffect } from 'react';

export const ThreeDPlate: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 12, y: -18 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Mouse distance from center (-1 to 1)
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      setRotation({
        x: Math.max(-25, Math.min(25, -deltaY * 20)),
        y: Math.max(-30, Math.min(30, deltaX * 25)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotation({ x: 10, y: -15 });
      }}
      className="relative w-64 h-64 sm:w-80 sm:h-80 select-none cursor-grab active:cursor-grabbing perspective-1000 flex items-center justify-center"
      style={{ perspective: '1200px' }}
      aria-hidden="true"
    >
      {/* 3D Olympic Weight Plate & Dumbbell Assembly */}
      <div
        className="w-full h-full relative transition-transform duration-200 ease-out transform-style-3d flex items-center justify-center"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
        }}
      >
        {/* Glow halo behind plate */}
        <div
          className="absolute inset-0 rounded-full bg-[#BEF264]/15 filter blur-3xl transition-opacity duration-300"
          style={{ opacity: isHovered ? 0.9 : 0.4 }}
        />

        {/* Outer Heavy Steel Rim */}
        <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-[#2D333B] via-[#161B22] to-[#0A0C10] border-4 border-[#3A424E] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(190,242,100,0.15)] flex items-center justify-center relative">
          {/* Subtle rim highlight */}
          <div className="absolute inset-1 rounded-full border border-white/10" />

          {/* Electric Lime Accent Ring */}
          <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full border-2 border-[#BEF264]/40 flex items-center justify-center relative shadow-[inset_0_0_20px_rgba(190,242,100,0.15)]">
            {/* Grip handles cutouts around perimeter */}
            <div className="absolute top-2 w-16 h-4 rounded-full bg-[#08090C] border border-[#2D333B]" />
            <div className="absolute bottom-2 w-16 h-4 rounded-full bg-[#08090C] border border-[#2D333B]" />
            <div className="absolute left-2 w-4 h-16 rounded-full bg-[#08090C] border border-[#2D333B]" />
            <div className="absolute right-2 w-4 h-16 rounded-full bg-[#08090C] border border-[#2D333B]" />

            {/* Inner Metallic Hub */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#1E232A] via-[#2A303C] to-[#12151B] border-2 border-white/20 shadow-inner flex flex-col items-center justify-center">
              {/* Olympic Bore Center */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#090A0D] border-2 border-[#BEF264] shadow-[0_0_15px_rgba(190,242,100,0.4)] flex items-center justify-center">
                <span className="text-[#BEF264] font-athletic font-extrabold text-xs sm:text-sm tracking-wider">
                  20 KG
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold mt-1.5">
                BE FIT PUNE
              </span>
            </div>
          </div>
        </div>

        {/* 3D Floating Athletic Badge floating slightly forward in Z axis */}
        <div
          className="absolute -bottom-2 -right-2 px-3 py-1.5 bg-[#0F1115]/90 border border-[#BEF264]/50 rounded-md backdrop-blur-md shadow-xl text-left"
          style={{ transform: 'translateZ(35px)' }}
        >
          <div className="text-[10px] text-neutral-400 uppercase font-mono">Calibrated Iron</div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BEF264]" />
            Olympic Grade
          </div>
        </div>
      </div>
    </div>
  );
};
