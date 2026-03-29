import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scissors, Salad, Shirt, Sparkles, Crown, Gem } from 'lucide-react';
import dripLogo from '@/assets/drip-logo.jpg';

const icons = [
  { Icon: Scissors, x: '15%', y: '20%', delay: 0 },
  { Icon: Salad, x: '75%', y: '15%', delay: 0.3 },
  { Icon: Shirt, x: '25%', y: '70%', delay: 0.6 },
  { Icon: Crown, x: '70%', y: '65%', delay: 0.9 },
  { Icon: Gem, x: '50%', y: '40%', delay: 1.2 },
];

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/gender'), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, hsl(38 92% 55%), transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
          style={{ background: 'radial-gradient(circle, hsl(280 60% 50%), transparent 70%)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Floating icons */}
      {icons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/30"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: [0, 0.4, 0.2, 0.4],
            scale: [0, 1, 0.8, 1],
            rotate: [0, 360],
            y: [0, -15, 0, 15, 0],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Icon size={36} />
        </motion.div>
      ))}

      {/* Logo */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          className="flex items-center justify-center w-24 h-24 rounded-3xl glass-card"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Sparkles className="text-primary" size={44} />
        </motion.div>

        <motion.h1
          className="font-display text-7xl font-extrabold tracking-wider gradient-text"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          DRIP
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-center text-sm max-w-[280px] leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Dynamic Recommendation System for
          <br />
          Intelligent Personal Styling & Diet
        </motion.p>

        {/* Loading bar */}
        <motion.div
          className="mt-8 h-0.5 rounded-full overflow-hidden w-48 bg-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--gradient-gold)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.5, delay: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
