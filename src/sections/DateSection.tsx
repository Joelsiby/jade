import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScratchCardProps {
  value: string;
  label: string;
  delay: number;
}

function ScratchCard({ value, delay }: ScratchCardProps) {
  const [isScratched, setIsScratched] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Direct offset measurements
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    if (width === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Initial fill - Light sky blue matte finish
    ctx.fillStyle = '#a3c4dc';
    ctx.fillRect(0, 0, width, height);

    // Grain - Subtle matte texture
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.08})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 1.5, 1.5);
    }
  }, []);

  useEffect(() => {
    // Multiple attempts to ensure layout completion
    initCanvas();
    const t1 = setTimeout(initCanvas, 50);
    const t2 = setTimeout(initCanvas, 250);
    window.addEventListener('resize', initCanvas);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', initCanvas);
    };
  }, [initCanvas]);

  const scratch = (clientX: number, clientY: number) => {
    if (isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 45, 0, Math.PI * 2);
    ctx.fill();

    if (Math.random() > 0.9) {
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let trans = 0;
      for (let i = 3; i < pixels.length; i += 40) {
        if (pixels[i] === 0) trans++;
      }
      // Require 45% to be scratched to auto-reveal
      if (trans > (pixels.length / 40) * 0.45) setIsScratched(true);
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    const client = 'touches' in e ? e.touches[0] : e;
    scratch(client.clientX, client.clientY);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    const client = 'touches' in e ? e.touches[0] : e;
    scratch(client.clientX, client.clientY);
  };

  const handleEnd = () => isDrawing.current = false;

  return (
    <motion.div
      className="relative w-[110px] sm:w-[160px] aspect-[3/4] rounded-xl overflow-hidden shadow-soft cursor-pointer select-none"
      initial={{ opacity: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      {/* Revealed content */}
      <div className="absolute inset-0 bg-white flex flex-col items-center justify-center">
        <span className="font-display text-4xl sm:text-6xl text-[#6b5b4e]">{value}</span>
      </div>

      {/* Scratch overlay canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-auto cursor-crosshair"
        style={{ touchAction: 'none' }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />

    </motion.div>
  );
}

export default function DateSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative w-full py-16 sm:py-24 bg-[#faf7f2]">
      {/* Decorative top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#faf7f2] to-transparent" />

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Title */}
        <motion.p
          className="font-script text-4xl sm:text-5xl text-[#6b5b4e] mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          The Date
        </motion.p>

        <motion.div
          className="flex items-center gap-2 text-[#8b7d6b] text-sm mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="text-[#d4af37]">&#10022;</span>
          <span className="font-serif tracking-wider">Scratch to reveal the date</span>
          <span className="text-[#d4af37]">&#10022;</span>
        </motion.div>

        {/* Scratch cards */}
        <div className="flex gap-4 sm:gap-8">
          <ScratchCard value="14" label="Day" delay={0.2} />
          <ScratchCard value="Sep" label="Month" delay={0.4} />
          <ScratchCard value="2025" label="Year" delay={0.6} />
        </div>

        {/* Labels */}
        <div className="flex gap-4 sm:gap-8 mt-4">
          {['DAY', 'MONTH', 'YEAR'].map((label, i) => (
            <motion.span
              key={label}
              className="w-[110px] sm:w-[160px] text-center text-xs tracking-[0.1em] sm:tracking-[0.2em] text-[#9b8b7a] font-serif uppercase"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
