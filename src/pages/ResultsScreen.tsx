import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ScanFace, PersonStanding, Salad, Palette, Footprints, Shirt, Scissors, Sparkles, Share2, Bookmark, PartyPopper, Briefcase, Coffee } from 'lucide-react';
import type { FullAnalysis } from '@/lib/analysis';
import { toast } from 'sonner';

const ResultsScreen = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<FullAnalysis | null>(null);
  const [faceImg, setFaceImg] = useState('');
  const [bodyImg, setBodyImg] = useState('');
  const [feature, setFeature] = useState('');

  useEffect(() => {
    const r = sessionStorage.getItem('drip-results');
    if (!r) { navigate('/gender'); return; }
    setResults(JSON.parse(r));
    setFaceImg(sessionStorage.getItem('drip-face-image') || '');
    setBodyImg(sessionStorage.getItem('drip-body-image') || '');
    setFeature(sessionStorage.getItem('drip-feature') || '');
  }, [navigate]);

  if (!results) return null;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8 max-w-lg mx-auto pb-24">
      <motion.button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <ArrowLeft size={18} /> Back
      </motion.button>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
        <Sparkles className="text-primary" size={28} />
        <h1 className="font-display text-3xl font-bold gradient-text">Your Style Profile</h1>
      </motion.div>

      {/* Image previews */}
      <motion.div className="flex gap-3 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        {faceImg && (
          <div className="glass-card overflow-hidden flex-1">
            <img src={faceImg} alt="Face" className="w-full h-32 object-cover" />
            <div className="p-2 text-xs text-center text-muted-foreground">Face</div>
          </div>
        )}
        {bodyImg && (
          <div className="glass-card overflow-hidden flex-1">
            <img src={bodyImg} alt="Body" className="w-full h-32 object-cover" />
            <div className="p-2 text-xs text-center text-muted-foreground">Body</div>
          </div>
        )}
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-5">
        {/* Face Results */}
        {results.face && (
          <>
            <motion.div variants={item} className="section-card">
              <SectionTitle icon={ScanFace} title="Face Shape Detected" />
              <p className="text-2xl font-display font-bold gradient-text capitalize mt-2">{results.face.faceShape}</p>
            </motion.div>

            {results.face.beardStyles && (
              <motion.div variants={item} className="section-card">
                <SectionTitle icon={Scissors} title="Recommended Beard Styles" />
                <TagList items={results.face.beardStyles} />
              </motion.div>
            )}

            <motion.div variants={item} className="section-card">
              <SectionTitle icon={Sparkles} title="Recommended Hairstyles" />
              <TagList items={results.face.hairstyles} />
            </motion.div>

            <motion.div variants={item} className="section-card">
              <SectionTitle icon={Sparkles} title="Grooming Tips" />
              <ul className="mt-3 space-y-2">
                {results.face.groomingTips.map((tip, i) => (
                  <li key={i} className="text-sm text-secondary-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span> {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}

        {/* Body Results */}
        {results.body && (
          <>
            <motion.div variants={item} className="section-card">
              <SectionTitle icon={PersonStanding} title="Outfit Recommendation" />
              <div className="flex gap-4 mt-3">
                <div className="glass-card px-4 py-2 text-center flex-1">
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-display font-bold text-primary capitalize">{results.body.bodyType}</p>
                </div>
                <div className="glass-card px-4 py-2 text-center flex-1">
                  <p className="text-xs text-muted-foreground">Shape</p>
                  <p className="font-display font-bold text-primary capitalize">{results.body.bodyShape}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="section-card">
              <SectionTitle icon={Shirt} title="Recommended Tops" />
              <TagList items={results.body.tops} />
            </motion.div>

            <motion.div variants={item} className="section-card">
              <SectionTitle icon={Shirt} title="Recommended Bottoms" />
              <TagList items={results.body.bottoms} />
            </motion.div>

            <motion.div variants={item} className="section-card">
              <SectionTitle icon={Footprints} title="Recommended Footwear" />
              <TagList items={results.body.footwear} />
            </motion.div>

            <motion.div variants={item} className="section-card">
              <SectionTitle icon={Palette} title="Color Combinations" />
              <div className="flex flex-col gap-2 mt-3">
                {results.body.colorCombinations.map((combo, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span className="text-xs text-muted-foreground w-6">{i + 1}.</span>
                    {combo.map((c, j) => (
                      <span key={j} className="glass-card px-3 py-1 text-xs text-secondary-foreground">{c}</span>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* Diet Results */}
        {results.diet && (
          <>
            <motion.div variants={item} className="section-card">
              <SectionTitle icon={Salad} title="Diet Plan" />
              <p className="text-sm text-muted-foreground mt-1">
                Based on <span className="text-primary capitalize font-medium">{results.diet.bodyType}</span> body type
              </p>
              <p className="text-lg font-display font-bold text-foreground mt-2">{results.diet.calories}</p>
            </motion.div>

            {results.diet.meals.map((meal, i) => (
              <motion.div key={i} variants={item} className="section-card">
                <h4 className="font-semibold text-foreground">{meal.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{meal.description}</p>
              </motion.div>
            ))}

            <motion.div variants={item} className="section-card">
              <SectionTitle icon={Sparkles} title="Diet Tips" />
              <ul className="mt-3 space-y-2">
                {results.diet.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-secondary-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span> {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Action buttons */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border flex gap-3 max-w-lg mx-auto"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => toast.success('Results saved!')}
          className="flex-1 btn-gold flex items-center justify-center gap-2 text-sm py-3"
        >
          <Bookmark size={16} /> Save
        </button>
        <button
          onClick={() => {
            navigator.clipboard?.writeText('Check out DRIP - AI Styling & Diet App!');
            toast.success('Link copied to clipboard!');
          }}
          className="flex-1 glass-card flex items-center justify-center gap-2 text-sm py-3 text-foreground hover:border-primary/40 transition-colors cursor-pointer"
        >
          <Share2 size={16} /> Share
        </button>
      </motion.div>
    </div>
  );
};

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="text-primary" size={18} />
      <h3 className="font-semibold text-foreground">{title}</h3>
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {items.map((item, i) => (
        <span key={i} className="glass-card px-3 py-1.5 text-sm text-secondary-foreground">{item}</span>
      ))}
    </div>
  );
}

export default ResultsScreen;
