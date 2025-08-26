import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CookingUtensil {
  id: number;
  x: number;
  y: number;
  rotation: number;
  icon: string;
  size: number;
  color: string;
}

const CookingUtensilsAnimation = () => {
  const [utensils, setUtensils] = useState<CookingUtensil[]>([]);

  const utensilIcons = ['🍴', '🥄', '🔪', '🥢', '🍽️', '🥡', '🍳', '🥘'];
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];

  useEffect(() => {
    const generateUtensils = () => {
      const newUtensils: CookingUtensil[] = [];
      for (let i = 0; i < 12; i++) {
        newUtensils.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          icon: utensilIcons[Math.floor(Math.random() * utensilIcons.length)],
          size: Math.random() * 25 + 15,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setUtensils(newUtensils);
    };

    generateUtensils();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {utensils.map((utensil) => (
        <motion.div
          key={utensil.id}
          className="absolute opacity-15"
          style={{
            fontSize: `${utensil.size}px`,
            left: utensil.x,
            top: utensil.y,
            color: utensil.color,
            filter: `drop-shadow(0 4px 8px ${utensil.color}40)`,
          }}
          animate={{
            rotate: [utensil.rotation, utensil.rotation + 360],
            y: [utensil.y, utensil.y - 100, utensil.y + 50, utensil.y],
            x: [utensil.x, utensil.x + 30, utensil.x - 30, utensil.x],
            scale: [1, 1.3, 0.7, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {utensil.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default CookingUtensilsAnimation;
