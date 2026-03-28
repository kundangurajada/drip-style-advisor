import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, UserRound } from 'lucide-react';

const GenderSelect = () => {
  const navigate = useNavigate();

  const options = [
    { label: 'Male', icon: User, gender: 'male', gradient: 'from-blue-500/20 to-primary/20' },
    { label: 'Female', icon: UserRound, gender: 'female', gradient: 'from-pink-500/20 to-accent/20' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
        style={{ background: 'radial-gradient(circle, hsl(38 92% 55%), transparent)' }}
      />

      <motion.h1
        className="font-display text-4xl font-bold mb-2 gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to DRIP
      </motion.h1>

      <motion.p
        className="text-muted-foreground mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Select your gender to get started
      </motion.p>

      <div className="flex gap-6 w-full max-w-sm flex-col sm:flex-row">
        {options.map(({ label, icon: Icon, gender, gradient }, i) => (
          <motion.button
            key={gender}
            onClick={() => navigate(`/features/${gender}`)}
            className={`flex-1 glass-card-hover p-8 flex flex-col items-center gap-4 bg-gradient-to-br ${gradient} cursor-pointer`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10 border border-primary/20">
              <Icon className="text-primary" size={32} />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">{label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default GenderSelect;
