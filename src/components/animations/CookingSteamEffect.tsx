import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SteamParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

const CookingSteamEffect = () => {
  const [particles, setParticles] = useState<SteamParticle[]>([]);

  useEffect(() => {
    const generateSteam = () => {
      const newParticles: SteamParticle[] = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight - 100,
          size: Math.random() * 40 + 20,
          opacity: Math.random() * 0.3 + 0.1,
          duration: Math.random() * 8 + 4,
        });
      }
      setParticles(newParticles);
    };

    generateSteam();
    const interval = setInterval(generateSteam, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
            opacity: particle.opacity,
          }}
          animate={{
            y: [particle.y, particle.y - 300],
            x: [
              particle.x, 
              particle.x + Math.random() * 100 - 50,
              particle.x + Math.random() * 100 - 50,
              particle.x
            ],
            scale: [0.5, 1.2, 0.8, 0],
            opacity: [0, particle.opacity, particle.opacity * 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default CookingSteamEffect;
