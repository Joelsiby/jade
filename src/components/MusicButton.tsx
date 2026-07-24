import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

export default function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/song.mp3" loop />
      <motion.button
        onClick={toggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center bg-[#6b5b4e] text-[#faf7f2] shadow-lg"
        style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.25)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -6, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 1 },
          scale: { duration: 0.6, delay: 1 },
          y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" fill="currentColor" />
        ) : (
          <Play className="w-6 h-6 translate-x-0.5" fill="currentColor" />
        )}
      </motion.button>
    </>
  );
}
