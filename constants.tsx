
import React from 'react';
import { Music, MapPin, Star, Mic, PenTool, Waves, BookOpen, Camera, Utensils, Sparkles, Heart, Flame, Cookie, Gift, Home, Map, Gem, Shirt, User } from 'lucide-react';
import { PhotoMemory, SpellMessage, Song } from './types';

export const COLORS = {
  primary: '#FBBF24', // Warm Golden Yellow
  secondary: '#FEF3C7', // Cream
  accent: '#92400E', // Antique Gold
  background: '#FFFBEB', // Parchment Beige
};

// Use the lh3.googleusercontent.com delivery network which is the most reliable for embedding
const getDriveUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

// Reliable direct MP3 link
export const BACKGROUND_MUSIC_URL = `https://cdn.jsdelivr.net/gh/MASKOTkun/Music@main/jugraafiya_UjySwKpo.mp3`;

export const SNEHA_PHOTOS: PhotoMemory[] = [
  {
    url: getDriveUrl("10FFcUoufS9pG66kMXL5V3ai-Ns5iVyLH"),
    caption: "That look that says a thousand magical words."
  },
  {
    url: getDriveUrl("14oKSDZ_0Hb6zqfFBjmkyTzOww7U0o3s5"),
    caption: "You, the sunflowers, and the city lights – pure magic."
  },
  {
    url: getDriveUrl("1MocY8nulWSm9hkqrHp8QvV03R5_aD99J"),
    caption: "Tradition meets a sparkle that's uniquely yours."
  },
  {
    url: getDriveUrl("1UMnmUWQ8jtDv3OK4z4QJW0fbXRg7glmB"),
    caption: "Finding beauty in every leaf and every moment."
  },
  {
    url: getDriveUrl("1lquErRdu8d5Qdr11Q9SFRM-JQv6OSRf1"),
    caption: "The warmest smile to end the day."
  }
];

export const PENSIEVE_MEMORIES = [
  {
    id: 1,
    title: "The Young Alchemist",
    description: "A memory from when every puddle was a potion and every stick a wand. The magic was just beginning to brew in those bright eyes.",
    image: "https://cdn.jsdelivr.net/gh/MASKOTkun/Music@main/IMG-20251226-WA0021.jpg",
    color: "from-amber-200 via-yellow-100 to-orange-200"
  },
  {
    id: 2,
    title: "First Enchantments",
    description: "Eyes wide with the kind of wonder that only exists before the world grows large. A pure, unfiltered light that hasn't dimmed in twenty years.",
    image: "https://cdn.jsdelivr.net/gh/MASKOTkun/Music@main/IMG-20251226-WA0019.jpg",
    color: "from-blue-100 via-indigo-50 to-purple-100"
  },
  {
    id: 3,
    title: "The Tiny Trailblazer",
    description: "Small feet making giant prints in the hearts of everyone you met. Even then, you were leading the way to joy and laughter.",
    image: "https://cdn.jsdelivr.net/gh/MASKOTkun/Music@main/IMG-20251226-WA0014.jpg",
    color: "from-rose-100 via-pink-50 to-amber-100"
  },
  {
    id: 4,
    title: "Whispers of Innocence",
    description: "A quiet moment of childhood peace, where the soul was as clear as a crystal ball and twice as bright as the morning sun.",
    image: "https://cdn.jsdelivr.net/gh/MASKOTkun/Music@main/IMG-20251226-WA0011.jpg",
    color: "from-emerald-50 via-teal-50 to-cyan-100"
  },
  {
    id: 5,
    title: "The Eternal Sparkle",
    description: "The foundations of the incredible woman you are today. That same mischievous smile, captured just a few chapters earlier in your story.",
    image: "https://cdn.jsdelivr.net/gh/MASKOTkun/Music@main/IMG-20251226-WA0008.jpg",
    color: "from-violet-100 via-fuchsia-50 to-pink-200"
  }
];

export const TWENTY_LETTERS = [
  {
    title: "Chapter 1: The Golden Milestone",
    content: "Happy 20th Birthday, Sneha! As you step into this beautiful new decade, we celebrate the magic you've brought into the world for two whole decades. 20 years of being a light, 20 years of spreading warmth. This isn't just a birthday; it's a testament to the wonderful human you've become.",
    quote: "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light."
  },
  {
    title: "Chapter 2: The Heart of Gold",
    content: "Your kindness isn't just an act; it's your core. Like a well-cast 'Expecto Patronum', your kindness has the power to drive away any shadow. You care for people in a way that makes them feel seen and heard in a busy world.",
    quote: "It is our choices, Harry, that show what we truly are, far more than our abilities."
  },
  {
    title: "Chapter 3: The Spirit of Empathy",
    content: "You possess the rare ability to walk in someone else's shoes without losing your own stride. Your empathy is your superpower, Sneha. You sense the unspoken and comfort the weary with just a glance.",
    quote: "Wit beyond measure is man's greatest treasure."
  },
  {
    title: "Chapter 4: Unwavering Resilience",
    content: "Life hasn't always been easy, but you've faced every challenge with a grace that is purely magical. You bend like a willow but never break, standing taller after every storm.",
    quote: "Working hard is important. But there is something that matters even more: believing in yourself."
  },
  {
    title: "Chapter 5: Ancient Wisdom",
    content: "At 20, you carry the wisdom of someone much older. You understand the nuances of life, the importance of silence, and the power of a thoughtful word. You are a 'Ravenclaw' at heart when it comes to depth.",
    quote: "The mind is not a book, to be opened at will and examined at leisure."
  },
  {
    title: "Chapter 6: The Magic of Laughter",
    content: "Your laugh is infectious—a universal healing spell. When you smile, the whole room feels a little brighter. Never lose that spark; it's the most powerful charm in your arsenal.",
    quote: "Laughter is the best medicine, especially when it's shared with friends."
  },
  {
    title: "Chapter 7: Pure Integrity",
    content: "You stand by what is right, even when it's not easy. Your moral compass is true, and your honesty is refreshing. You are someone people can rely on without a second thought.",
    quote: "We must all face the choice between what is right and what is easy."
  },
  {
    title: "Chapter 8: Eternal Curiosity",
    content: "The way you look at the world with wonder is a gift. Whether it's a new book, a hidden alley in Old Kolkata, or a complex recipe, your desire to learn is a flame that never goes out.",
    quote: "Curiosity is not a sin... but we should exercise caution with our curiosity."
  },
  {
    title: "Chapter 9: The Warmth of Home",
    content: "You have this incredible way of making anywhere feel like home. Your presence is like a warm fireplace in the Gryffindor common room—safe, inviting, and full of life.",
    quote: "Home is where the heart is, and your heart is wide enough for everyone."
  },
  {
    title: "Chapter 10: Absolute Sincerity",
    content: "In a world of filters and masks, you are refreshingly real. Your words carry weight because they come from the soul. You are as authentic as a phoenix feather.",
    quote: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic."
  },
  {
    title: "Chapter 11: Quiet Generosity",
    content: "You give without expecting anything in return. Not just material things, but your time, your energy, and your heart. You are a treasure that keeps on giving.",
    quote: "It is better to give than to receive, especially when it comes from the heart."
  },
  {
    title: "Chapter 12: Gentle Patience",
    content: "The way you handle the chaos of life with such patience is inspiring. You understand that good things take time, like a perfectly brewed potion.",
    quote: "Everything comes to him who waits, provided he knows what he is waiting for."
  },
  {
    title: "Chapter 13: Silent Courage",
    content: "Courage doesn't always roar. Sometimes it's the quiet voice at the end of the day saying, 'I will try again tomorrow.' You have that strength in spades, Sneha.",
    quote: "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends."
  },
  {
    title: "Chapter 14: Radiant Authenticity",
    content: "You are unapologetically yourself. You don't try to fit into the molds the world sets for you. You create your own magic, and it is beautiful to behold.",
    quote: "To thine own self be true."
  },
  {
    title: "Chapter 15: The Grace of Forgiveness",
    content: "You hold no bitterness. Your heart is too full of light to make room for shadows. Your ability to move forward with grace is a lesson to us all.",
    quote: "Forgiveness is a virtue, and you possess it in abundance."
  },
  {
    title: "Chapter 16: Loyal Beyond Measure",
    content: "A friend like you is a once-in-a-lifetime find. You are the Hufflepuff loyalty personified—standing by those you love through thick and thin, no matter the cost.",
    quote: "Things we lose have a way of coming back to us in the end, if not always in the way we expect."
  },
  {
    title: "Chapter 17: Natural Inspiration",
    content: "You don't even realize how many people you inspire just by being you. Your journey, your values, and your kindness serve as a lighthouse for others.",
    quote: "Do not pity the dead, Harry. Pity the living, and, above all, those who live without love."
  },
  {
    title: "Chapter 18: Clarity of Purpose",
    content: "You move through the world with a sense of focus that is admirable. You know what matters—family, tradition, kindness—and you never lose sight of them.",
    quote: "Destiny is something we create for ourselves."
  },
  {
    title: "Chapter 19: Infinite Grace",
    content: "The way you carry yourself, even in stressful times, is full of poise. You have an inner calm that acts as an anchor for those around you.",
    quote: "Grace is not something you have, it's something you are."
  },
  {
    title: "Chapter 20: The Magic Ahead",
    content: "This is just the beginning of your 'Part 2'. The next twenty years will be even more magical than the last. Keep dreaming, keep shining, and keep being the incredible Sneha we all love.",
    quote: "Of course it is happening inside your head, Harry, but why on earth should that mean that it is not real?"
  }
];

export const SPELL_MESSAGES: SpellMessage[] = [
  { id: '1', text: "You make ordinary moments feel special." },
  { id: '2', text: "Some people bring warmth wherever they go." },
  { id: '3', text: "You feel like a good kind of magic." },
  { id: '4', text: "A single smile can light up the Room of Requirement." }
];

export const FAVORITE_SONGS: Song[] = [
  {
    id: '1',
    title: "Jugrafiyan",
    artist: "Udit Narayan & Shreya Ghoshal",
    audioUrl: ""
  },
  {
    id: '2',
    title: "Gehra Hua",
    artist: "Arijit Singh",
    audioUrl: ""
  },
  {
    id: '3',
    title: "Barbaad",
    artist: "Jubin Nautiyal",
    audioUrl: ""
  }
];

export const HOBBIES = [
  { name: "Writing", icon: <PenTool size={20} /> },
  { name: "Reading", icon: <BookOpen size={20} /> },
  { name: "Photography", icon: <Camera size={20} /> },
  { name: "Beach", icon: <Waves size={20} /> },
  { name: "Cooking", icon: <Utensils size={20} /> },
  { name: "Dancing", icon: <Music size={20} /> },
  { name: "Singing", icon: <Mic size={20} /> }
];

export const HER_FOOD = [
  { name: "Chinese", icon: <Utensils size={20} /> },
  { name: "Indian", icon: <MapPin size={20} /> },
  { name: "Mio amore", subtitle: "special mention", icon: <Heart size={20} /> },
  { name: "Sweets", icon: <Star size={20} /> },
  { name: "Fried chicken", icon: <Flame size={20} /> },
  { name: "Blueberry muffin", icon: <Cookie size={20} /> },
  { name: "Cadbury", subtitle: "with no nuts", icon: <Gift size={20} /> }
];

export const HER_PLACES = [
  { name: "Home", icon: <Home size={20} /> },
  { name: "Ganga Ghat", icon: <Waves size={20} /> },
  { name: "Temples", icon: <Sparkles size={20} /> },
  { name: "Mayapur", icon: <Map size={20} /> },
  { name: "Old Kolkata", icon: <MapPin size={20} /> }
];

export const HER_ATTIRE = [
  { name: "Sarees", icon: <Shirt size={20} /> },
  { name: "Kurtis", icon: <Shirt size={20} /> },
  { name: "Jhumkas", icon: <Gem size={20} /> },
  { name: "Oxidised Jewellery", icon: <Gem size={20} /> },
  { name: "Lehengas", icon: <Shirt size={20} /> },
  { name: "Glass Bangles", icon: <Sparkles size={20} /> }
];

export const HER_ACTORS = [
  { name: "Shah Rukh Khan", icon: <User size={20} /> },
  { name: "Dev", icon: <User size={20} /> },
  { name: "Shahid Kapoor", icon: <User size={20} /> },
  { name: "Sumedh Mudgalkar", icon: <User size={20} /> },
  { name: "Ahaan Pandey", icon: <User size={20} /> }
];

export const MAGICAL_LIKES = []; 
export const THINGS_SHE_LIKES = [];
