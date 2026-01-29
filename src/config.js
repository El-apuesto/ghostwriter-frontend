// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// Credit costs for different story types - MATCHES BACKEND
export const CREDIT_COSTS = {
  // Fiction
  fiction_sample: 0,
  fiction_novella: 130,
  fiction_novel: 210,
  
  // Premium Fiction
  fiction_premium_novella: 150,
  fiction_premium_novel: 230,
  
  // Biography
  biography_sample: 0,
  biography_short_memoir: 130,
  biography_standard: 130,
  
  // Extras
  ebook_cover: 10,
  print_cover: 15,
  epub_export: 5,
  mobi_export: 5,
  kdp_pdf: 10,
  blurb: 5,
  author_bio: 3,
};

// Credit packs - MATCHES BACKEND (prices in cents converted to dollars)
export const CREDIT_PACKS = {
  top_up: { name: 'Top-Up Pack', credits: 50, price: 5.00, bonus: 0, priceId: 'price_1SuIGA5EmQCAemjp8HDzJlpv' },
};

// Stripe Price IDs for products
export const STRIPE_PRICE_IDS = {
  // Fiction
  novella: 'price_1SudhH5EmQCAemjpOuZF2n53',
  premium_novella: 'price_1SudjM5EmQCAemjp9sEg3Vyh',
  novel: 'price_1Sudli5EmQCAemjpDHIMhgaC',
  premium_novel: 'price_1Sudmv5EmQCAemjp7aLriIhA',
  
  // Sequels and Trilogies
  sequel: 'price_1Sudpo5EmQCAemjpkFIKal3c',
  trilogy: 'price_1SudsM5EmQCAemjpECUhoolR',
  
  // Credit Top-Up
  top_up: 'price_1SuIGA5EmQCAemjp8HDzJlpv',
};

// Writing styles
export const WRITING_STYLES = [
  { value: 'sarcastic_deadpan', label: '😏 Sarcastic Deadpan' },
  { value: 'gothic_horror', label: '🦇 Gothic Horror' },
  { value: 'dark_comedy', label: '🌑 Dark Comedy' },
  { value: 'noir', label: '🕵️ Noir' },
  { value: 'cyberpunk', label: '🤖 Cyberpunk' },
  { value: 'modern', label: '📱 Modern' },
  { value: 'classic', label: '📚 Classic' },
];

// Genres
export const GENRES = [
  { value: 'horror', label: '👻 Horror' },
  { value: 'mystery', label: '🔍 Mystery' },
  { value: 'thriller', label: '⚡ Thriller' },
  { value: 'dark_fantasy', label: '🗡️ Dark Fantasy' },
  { value: 'scifi', label: '🚀 Sci-Fi' },
  { value: 'comedy', label: '😂 Comedy' },
  { value: 'satire', label: '🎭 Satire' },
];

// Biography types
export const BIOGRAPHY_TYPES = [
  { value: 'autobiography', label: '✍️ Autobiography' },
  { value: 'biography', label: '📖 Biography' },
  { value: 'memoir', label: '💭 Memoir' },
  { value: 'family_history', label: '👨‍👩‍👧‍👦 Family History' },
];

// Narrative voices
export const NARRATIVE_VOICES = [
  { value: 'first_person', label: 'First Person (I/We)' },
  { value: 'third_person_limited', label: 'Third Person Limited' },
  { value: 'third_person_omniscient', label: 'Third Person Omniscient' },
  { value: 'conversational', label: 'Conversational' },
  { value: 'formal', label: 'Formal' },
  { value: 'journalistic', label: 'Journalistic' },
];

// Cover styles for free covers
export const COVER_STYLES = [
  { value: 'dark', label: '🌑 Dark' },
  { value: 'mystery', label: '🔮 Mystery' },
  { value: 'fantasy', label: '✨ Fantasy' },
  { value: 'romance', label: '💕 Romance' },
  { value: 'scifi', label: '🛸 Sci-Fi' },
];
