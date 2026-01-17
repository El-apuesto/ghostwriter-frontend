// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Credit costs for different story types
export const CREDIT_COSTS = {
  sample: 10,
  novella: 25,
  novel: 100,
  short_memoir: 25,
  standard_biography: 50,
  comprehensive: 100,
  ebook_cover_free: 0,
  ebook_cover_premium: 10,
  print_cover_free: 0,
  print_cover_premium: 10,
  epub: 5,
  mobi: 5,
  pdf: 5,
  blurb: 2,
  author_bio: 3,
};

// Credit packs
export const CREDIT_PACKS = {
  micro: { name: 'Micro Pack', credits: 10, price: 1.50, bonus: 0 },
  small: { name: 'Small Pack', credits: 25, price: 3.50, bonus: 0 },
  medium: { name: 'Medium Pack', credits: 50, price: 6.50, bonus: 0 },
  starter: { name: 'Starter Pack', credits: 100, price: 12.00, bonus: 0 },
  value: { name: 'Value Pack', credits: 250, price: 28.00, bonus: 10 },
  pro: { name: 'Pro Pack', credits: 500, price: 52.00, bonus: 15 },
  ultimate: { name: 'Ultimate Pack', credits: 1000, price: 95.00, bonus: 20 },
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
