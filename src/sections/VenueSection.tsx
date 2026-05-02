import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function VenueSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative w-full py-16 sm:py-24 bg-[#faf7f2]">
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Title */}
        <motion.p
          className="font-script text-4xl sm:text-5xl text-[#6b5b4e] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Wedding venue
        </motion.p>

        {/* Venue Info */}
        <motion.a
          href="https://maps.google.com/?q=Villa+Borghese+Puerto+Vallarta"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 mb-6 cursor-pointer hover:opacity-80 transition-opacity"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.div
            className="w-10 h-10 rounded-full bg-[#c5d5e4]/50 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <MapPin className="w-5 h-5 text-[#7a9ab8]" />
          </motion.div>
          <div>
            <p className="font-display text-lg text-[#6b5b4e]">Villa Borghese</p>
            <p className="font-serif text-sm text-[#8b7d6b]">Address: Puerto Vallarta, MX</p>
          </div>
        </motion.a>
      </div>

      {/* Venue Image (Full Bleed) */}
      <motion.div
        className="relative w-full overflow-hidden shadow-soft"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <img
          src="/venue.jpg"
          alt="Wedding venue"
          className="w-full h-[50vh] sm:h-[70vh] object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f2] via-transparent to-transparent opacity-80" />
        
        {/* Floating location badge */}
        <motion.a
          href="https://maps.google.com/?q=Villa+Borghese+Puerto+Vallarta"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 glass rounded-full px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-white/40 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <MapPin className="w-5 h-5 text-[#7a9ab8]" />
          <span className="font-serif text-base sm:text-lg text-[#6b5b4e]">Puerto Vallarta</span>
        </motion.a>
      </motion.div>
    </section>
  );
}
