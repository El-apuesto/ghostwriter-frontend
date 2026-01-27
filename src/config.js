// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Credit costs for different story types - MATCHES BACKEND
export const CREDIT_COSTS = {
  // Fiction
  fiction_sample: 0,
  fiction_novella: 50,
  fiction_novel: 100,
  
  // Biography
  biography_sample: 0,
  biography_short_memoir: 50,
  biography_standard: 75,
  biography_comprehensive: 125,
  
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
  micro: { name: 'Micro Top-Up', credits: 20, price: 5.00, bonus: 0 },
  small: { name: 'Small Top-Up', credits: 40, price: 10.00, bonus: 0 },
  medium: { name: 'Medium Top-Up', credits: 60, price: 15.00, bonus: 0 },
  starter: { name: 'Starter Pack', credits: 100, price: 25.00, bonus: 0 },
  value: { name: 'Value Pack', credits: 250, price: 60.00, bonus: 4 },
  pro: { name: 'Pro Pack', credits: 550, price: 120.00, bonus: 15 },
  ultimate: { name: 'Ultimate Pack', credits: 1200, price: 240.00, bonus: 25 },
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
