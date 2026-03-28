// Simulated AI analysis engine

export type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'diamond';
export type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';
export type BodyShape = 'rectangle' | 'triangle' | 'inverted-triangle' | 'hourglass' | 'oval';
export type Gender = 'male' | 'female';

export interface FaceAnalysisResult {
  faceShape: FaceShape;
  beardStyles?: string[];
  hairstyles: string[];
  groomingTips: string[];
}

export interface BodyAnalysisResult {
  bodyType: BodyType;
  bodyShape: BodyShape;
  tops: string[];
  bottoms: string[];
  footwear: string[];
  colorCombinations: string[][];
}

export interface DietResult {
  bodyType: BodyType;
  calories: string;
  meals: { name: string; description: string }[];
  tips: string[];
}

export interface FullAnalysis {
  face?: FaceAnalysisResult;
  body?: BodyAnalysisResult;
  diet?: DietResult;
}

const faceShapes: FaceShape[] = ['oval', 'round', 'square', 'heart', 'diamond'];
const bodyTypes: BodyType[] = ['ectomorph', 'mesomorph', 'endomorph'];
const bodyShapes: BodyShape[] = ['rectangle', 'triangle', 'inverted-triangle', 'hourglass', 'oval'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const maleBeardMap: Record<FaceShape, string[]> = {
  oval: ['Full Beard', 'Stubble', 'Goatee', 'Van Dyke'],
  round: ['Extended Goatee', 'Anchor Beard', 'Balbo', 'Chin Strap'],
  square: ['Circle Beard', 'Short Stubble', 'Chin Curtain', 'Soul Patch'],
  heart: ['Full Beard', 'Mutton Chops', 'Handlebar Mustache'],
  diamond: ['Anchor Beard', 'Balbo', 'Extended Goatee'],
};

const maleHairMap: Record<FaceShape, string[]> = {
  oval: ['Textured Quiff', 'Side Part', 'Buzz Cut', 'Pompadour'],
  round: ['Faux Hawk', 'Pompadour', 'High Fade', 'Spiky Top'],
  square: ['Side Swept', 'Crew Cut', 'Textured Crop', 'Slick Back'],
  heart: ['Side Part', 'Fringe', 'Medium Length Waves'],
  diamond: ['Textured Fringe', 'Side Part', 'Messy Top'],
};

const femaleHairMap: Record<FaceShape, string[]> = {
  oval: ['Long Layers', 'Bob Cut', 'Beach Waves', 'Pixie Cut'],
  round: ['Long Side-Swept Bangs', 'Layered Lob', 'High Ponytail', 'Asymmetric Bob'],
  square: ['Soft Waves', 'Side-Parted Long Hair', 'Layered Curtain Bangs'],
  heart: ['Side-Swept Bangs', 'Chin-Length Bob', 'Textured Lob'],
  diamond: ['Side Part with Volume', 'Chin-Length Styles', 'Soft Curls'],
};

const topsMap: Record<BodyType, { male: string[]; female: string[] }> = {
  ectomorph: {
    male: ['Layered Jackets', 'Horizontal Stripe Tees', 'Chunky Knits', 'Structured Blazers'],
    female: ['Peplum Tops', 'Ruffled Blouses', 'Off-Shoulder Tops', 'Cropped Jackets'],
  },
  mesomorph: {
    male: ['Fitted V-Necks', 'Henley Shirts', 'Slim Fit Polos', 'Tailored Shirts'],
    female: ['Wrap Tops', 'Fitted Turtlenecks', 'Bodycon Tops', 'Structured Blazers'],
  },
  endomorph: {
    male: ['Vertical Stripe Shirts', 'Dark V-Necks', 'Structured Blazers', 'Untucked Button-Downs'],
    female: ['A-Line Tops', 'Empire Waist Blouses', 'Flowy Tunics', 'V-Neck Tops'],
  },
};

const bottomsMap: Record<BodyType, { male: string[]; female: string[] }> = {
  ectomorph: {
    male: ['Slim Fit Chinos', 'Tapered Jeans', 'Cargo Pants'],
    female: ['Wide-Leg Pants', 'Pleated Skirts', 'Boyfriend Jeans'],
  },
  mesomorph: {
    male: ['Straight Fit Jeans', 'Tailored Trousers', 'Classic Chinos'],
    female: ['High-Waist Jeans', 'Pencil Skirts', 'Tailored Trousers'],
  },
  endomorph: {
    male: ['Dark Straight Jeans', 'Flat Front Trousers', 'Relaxed Chinos'],
    female: ['Bootcut Jeans', 'A-Line Skirts', 'Palazzo Pants'],
  },
};

const footwearMap: Record<BodyType, string[]> = {
  ectomorph: ['Chelsea Boots', 'High-Top Sneakers', 'Platform Shoes'],
  mesomorph: ['Classic Sneakers', 'Oxford Shoes', 'Loafers'],
  endomorph: ['Leather Boots', 'Clean Sneakers', 'Derby Shoes'],
};

const colorCombos: string[][] = [
  ['Navy', 'White', 'Tan'],
  ['Black', 'Grey', 'Gold'],
  ['Olive', 'Cream', 'Brown'],
  ['Burgundy', 'Charcoal', 'White'],
  ['Teal', 'Ivory', 'Brown'],
  ['Dusty Rose', 'Cream', 'Gold'],
  ['Forest Green', 'Tan', 'White'],
];

const dietMap: Record<BodyType, DietResult> = {
  ectomorph: {
    bodyType: 'ectomorph',
    calories: '2,800 - 3,200 kcal/day',
    meals: [
      { name: 'Power Breakfast', description: 'Oats with banana, peanut butter, honey & whole milk' },
      { name: 'Protein Lunch', description: 'Grilled chicken, brown rice, avocado & mixed greens' },
      { name: 'Recovery Dinner', description: 'Salmon, sweet potato, steamed veggies & olive oil' },
      { name: 'Snacks', description: 'Trail mix, protein shakes, Greek yogurt with granola' },
    ],
    tips: ['Eat calorie-dense foods', 'Have 5-6 meals per day', 'Focus on compound exercises', 'Prioritize protein intake'],
  },
  mesomorph: {
    bodyType: 'mesomorph',
    calories: '2,200 - 2,600 kcal/day',
    meals: [
      { name: 'Balanced Breakfast', description: 'Eggs, whole grain toast, spinach & berries' },
      { name: 'Lean Lunch', description: 'Turkey wrap with veggies, quinoa side' },
      { name: 'Clean Dinner', description: 'Grilled fish, roasted vegetables, brown rice' },
      { name: 'Snacks', description: 'Nuts, fruits, protein bar' },
    ],
    tips: ['Balance macros equally', 'Mix cardio and strength training', 'Stay hydrated', 'Moderate portion sizes'],
  },
  endomorph: {
    bodyType: 'endomorph',
    calories: '1,800 - 2,200 kcal/day',
    meals: [
      { name: 'Light Breakfast', description: 'Greek yogurt with berries & chia seeds' },
      { name: 'Green Lunch', description: 'Large salad with grilled chicken, lemon dressing' },
      { name: 'Lean Dinner', description: 'Baked chicken breast, steamed broccoli, cauliflower rice' },
      { name: 'Snacks', description: 'Cucumber slices, almonds, green tea' },
    ],
    tips: ['Reduce refined carbs', 'Focus on high-fiber foods', 'Prioritize cardio', 'Eat smaller, frequent meals'],
  },
};

export function analyzeFace(gender: Gender): FaceAnalysisResult {
  const shape = pick(faceShapes);
  return {
    faceShape: shape,
    beardStyles: gender === 'male' ? maleBeardMap[shape] : undefined,
    hairstyles: gender === 'male' ? maleHairMap[shape] : femaleHairMap[shape],
    groomingTips: gender === 'male'
      ? ['Use beard oil daily', 'Exfoliate twice a week', 'Moisturize after shaving', 'Use SPF 30+ sunscreen']
      : ['Double cleanse routine', 'Use retinol at night', 'Weekly face mask', 'Always remove makeup before bed'],
  };
}

export function analyzeBody(gender: Gender): BodyAnalysisResult {
  const bt = pick(bodyTypes);
  const bs = pick(bodyShapes);
  const g = gender === 'male' ? 'male' : 'female';
  return {
    bodyType: bt,
    bodyShape: bs,
    tops: topsMap[bt][g],
    bottoms: bottomsMap[bt][g],
    footwear: footwearMap[bt],
    colorCombinations: [pick(colorCombos), pick(colorCombos), pick(colorCombos)],
  };
}

export function analyzeDiet(bodyType: BodyType): DietResult {
  return dietMap[bodyType];
}

export function fullAnalysis(gender: Gender): FullAnalysis {
  const face = analyzeFace(gender);
  const body = analyzeBody(gender);
  const diet = analyzeDiet(body.bodyType);
  return { face, body, diet };
}

export async function simulateAnalysis<T>(fn: () => T, delayMs = 3000): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fn()), delayMs);
  });
}
