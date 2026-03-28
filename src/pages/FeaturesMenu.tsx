import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScanFace, Body, Salad, Flame, ArrowLeft } from 'lucide-react';

// Body icon doesn't exist in lucide, use a substitute
import { PersonStanding } from 'lucide-react';

export type FeatureType = 'face' | 'body' | 'diet' | 'drip';

interface Feature {
  id: FeatureType;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const features: Feature[] = [
  {
    id: 'face',
    title: 'Face Analysis',
    description: 'Detect face shape & get grooming recommendations',
    icon: ScanFace,
    color: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    id: 'body',
    title: 'Body Analysis',
    description: 'Analyze body type for perfect outfit recommendations',
    icon: PersonStanding,
    color: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    id: 'diet',
    title: 'Diet Recommendation',
    description: 'Get a personalized diet plan based on your physique',
    icon: Salad,
    color: 'from-orange-500/20 to-yellow-500/10',
  },
  {
    id: 'drip',
    title: '🔥 DRIP Special',
    description: 'Complete analysis: Face + Body + Diet all in one',
    icon: Flame,
    color: 'from-primary/20 to-accent/10',
  },
];

const FeaturesMenu = () => {
  const { gender } = useParams<{ gender: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-6 py-8 max-w-lg mx-auto">
      <motion.button
        onClick={() => navigate('/gender')}
        className="flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <ArrowLeft size={18} /> Back
      </motion.button>

      <motion.h1
        className="font-display text-3xl font-bold gradient-text mb-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Choose Feature
      </motion.h1>
      <motion.p
        className="text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {gender === 'male' ? '👨' : '👩'} {gender === 'male' ? 'Male' : 'Female'} Analysis
      </motion.p>

      <div className="flex flex-col gap-4">
        {features.map((f, i) => (
          <motion.button
            key={f.id}
            onClick={() => navigate(`/upload/${gender}/${f.id}`)}
            className={`glass-card-hover p-5 flex items-center gap-4 text-left bg-gradient-to-r ${f.color} cursor-pointer`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-card/80 border border-border shrink-0">
              <f.icon className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FeaturesMenu;
