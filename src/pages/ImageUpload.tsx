import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePlus, ArrowLeft, X, Loader2, ScanFace, PersonStanding, PartyPopper, Briefcase, Coffee, Check } from 'lucide-react';
import type { FeatureType } from './FeaturesMenu';
import type { Gender, FullAnalysis } from '@/lib/analysis';
import { analyzeFace, analyzeBody, analyzeDiet, fullAnalysis, simulateAnalysis } from '@/lib/analysis';

const ImageUpload = () => {
  const { gender, feature } = useParams<{ gender: string; feature: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);

  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<'face' | 'body'>('face');
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);

  const feat = feature as FeatureType;
  const g = gender as Gender;
  const needsFace = feat === 'face' || feat === 'drip';
  const needsBody = feat === 'body' || feat === 'diet' || feat === 'drip';
  const showOccasions = feat === 'body' || feat === 'drip';

  const occasions = [
    { id: 'casual', label: 'Casual', icon: Coffee },
    { id: 'formal', label: 'Formal', icon: Briefcase },
    { id: 'party', label: 'Party', icon: PartyPopper },
  ];

  const toggleOccasion = (id: string) => {
    setSelectedOccasions(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'face' | 'body') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      if (target === 'face') setFaceImage(url);
      else setBodyImage(url);
    };
    reader.readAsDataURL(file);
  };

  const canSubmit = () => {
    if (feat === 'drip') return faceImage && bodyImage && selectedOccasions.length > 0;
    if (feat === 'face') return faceImage;
    if (feat === 'body') return bodyImage && selectedOccasions.length > 0;
    return bodyImage;
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      let result: FullAnalysis;
      if (feat === 'drip') {
        result = await simulateAnalysis(() => fullAnalysis(g, selectedOccasions), 3500);
      } else if (feat === 'face') {
        const face = await simulateAnalysis(() => analyzeFace(g), 2500);
        result = { face };
      } else if (feat === 'body') {
        const body = await simulateAnalysis(() => analyzeBody(g, selectedOccasions), 2500);
        result = { body };
      } else {
        const body = await simulateAnalysis(() => analyzeBody(g), 1500);
        const diet = await simulateAnalysis(() => analyzeDiet(body.bodyType), 1500);
        result = { diet };
      }

      // Store results and navigate
      sessionStorage.setItem('drip-results', JSON.stringify(result));
      sessionStorage.setItem('drip-face-image', faceImage || '');
      sessionStorage.setItem('drip-body-image', bodyImage || '');
      sessionStorage.setItem('drip-feature', feat);
      sessionStorage.setItem('drip-gender', g);
      sessionStorage.setItem('drip-occasions', JSON.stringify(selectedOccasions));
      navigate('/results');
    } catch {
      setAnalyzing(false);
    }
  };

  const openUpload = (target: 'face' | 'body') => {
    setUploadTarget(target);
    if (target === 'face') fileInputRef.current?.click();
    else fileInput2Ref.current?.click();
  };


  return (
    <div className="min-h-screen bg-background px-6 py-8 max-w-lg mx-auto">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'face')} />
      <input ref={fileInput2Ref} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'body')} />

      <motion.button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <ArrowLeft size={18} /> Back
      </motion.button>

      <motion.h1
        className="font-display text-3xl font-bold gradient-text mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Upload Image
      </motion.h1>
      <motion.p
        className="text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {feat === 'drip'
          ? 'Upload both face and full body photos'
          : feat === 'face'
          ? 'Upload a clear photo of your face'
          : 'Upload a full body photo'}
      </motion.p>

      <div className="flex flex-col gap-6">
        {/* Face upload */}
        {needsFace && (
          <UploadCard
            label="Face Photo"
            icon={ScanFace}
            image={faceImage}
            onUpload={() => openUpload('face')}
            
            onClear={() => setFaceImage(null)}
            delay={0.2}
          />
        )}

        {/* Body upload */}
        {needsBody && (
          <UploadCard
            label="Body Photo"
            icon={PersonStanding}
            image={bodyImage}
            onUpload={() => openUpload('body')}
            
            onClear={() => setBodyImage(null)}
            delay={0.3}
          />
        )}
      </div>

      {/* Occasion selector - shown after image is uploaded */}
      {showOccasions && bodyImage && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-foreground mb-1">Select Occasions</h3>
          <p className="text-sm text-muted-foreground mb-4">Choose the occasions you want outfit recommendations for</p>
          <div className="flex gap-3">
            {occasions.map((occ) => {
              const selected = selectedOccasions.includes(occ.id);
              return (
                <motion.button
                  key={occ.id}
                  onClick={() => toggleOccasion(occ.id)}
                  className={`flex-1 glass-card p-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 ${
                    selected ? 'border-primary/60 bg-primary/10' : ''
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    selected ? 'bg-primary/20' : 'bg-secondary'
                  }`}>
                    {selected ? <Check className="text-primary" size={20} /> : <occ.icon className="text-muted-foreground" size={20} />}
                  </div>
                  <span className={`text-sm font-medium ${selected ? 'text-primary' : 'text-muted-foreground'}`}>{occ.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Analyze button */}
      <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <AnimatePresence mode="wait">
          {analyzing ? (
            <motion.div
              key="loading"
              className="glass-card p-6 flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="text-primary animate-spin" size={40} />
              <p className="text-foreground font-medium">Analyzing your style profile…</p>
              <div className="w-full h-1 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--gradient-gold)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="btn"
              onClick={handleAnalyze}
              disabled={!canSubmit()}
              className="w-full btn-gold disabled:opacity-30 disabled:cursor-not-allowed text-lg"
              whileTap={{ scale: 0.95 }}
            >
              Analyze Now
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

function UploadCard({
  label,
  icon: Icon,
  image,
  onUpload,
  onClear,
  delay,
}: {
  label: string;
  icon: React.ElementType;
  image: string | null;
  onUpload: () => void;
  onClear: () => void;
  delay: number;
}) {
  return (
    <motion.div
      className="glass-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {image ? (
        <div className="relative">
          <img src={image} alt={label} className="w-full h-64 object-cover" />
          <button
            onClick={onClear}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-3 left-3 glass-card px-3 py-1 text-xs text-foreground">{label} ✓</div>
        </div>
      ) : (
        <button
          onClick={onUpload}
          className="w-full p-10 flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-border flex items-center justify-center">
            <Icon size={28} />
          </div>
          <span className="font-medium">{label}</span>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1">
              <ImagePlus size={14} /> Upload Photo
            </span>
          </div>
          <span className="text-xs text-destructive/70 mt-1">⚠ No group photo</span>
        </button>
      )}
    </motion.div>
  );
}

export default ImageUpload;
