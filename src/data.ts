/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Room, BanquetPackage, Review, GalleryItem } from './types';

export const HOTEL_INFO = {
  name: "Anant One Hotel & Banquet",
  hindiName: "अनंत वन होटल & बैंक्वेट",
  phone: "076783 39370",
  address: "28, Navyug (Vavyug) Market, Ghaziabad, Uttar Pradesh 201001",
  email: "info@anantonehotel.com",
  mapsLink: "https://maps.google.com/?q=Anant+One+Hotel+Banquet+Navyug+Market+Ghaziabad",
  description: "Experience unparalleled luxury and warm Indian hospitality in the heart of Ghaziabad. Featuring three storeys of elegantly furnished modern rooms, a grand banquet hall, and an extraordinary culinary experience under one roof.",
  amenities: [
    "Fully Air Conditioned Rooms",
    "Grand 3-Storey Venue",
    "Exquisite In-house Catering",
    "Complimentary Valet Parking (Overcoming market challenges)",
    "Professional Security & CCTV",
    "24/7 Power Backup",
    "In-house Event Decorators"
  ]
};

export const ROOMS_DATA: Room[] = [
  {
    id: "deluxe-king",
    name: "Premium Deluxe Room",
    description: "Generously spaced and beautifully decorated, our Deluxe rooms are crafted with modern high-end interiors, cozy wooden details, and premium king-sized comfort.",
    pricePerNight: 2499,
    capacity: 2,
    size: "320 sq. ft.",
    bedType: "King Bed",
    image: "/src/assets/images/anant_luxury_room_1783610724635.jpg",
    amenities: ["Complimentary High-speed Wi-Fi", "LED Smart TV", "Luxury Bath Amenities", "Tea/Coffee Maker", "Fully Air Conditioned", "24/7 In-Room Dining"],
    featured: true,
    rating: 4.8
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    description: "The ultimate expression of luxury featuring an elegant living space, custom decorative interiors, premium sound isolation, and dedicated personal assistance.",
    pricePerNight: 3999,
    capacity: 3,
    size: "480 sq. ft.",
    bedType: "Super King Bed",
    image: "/src/assets/images/anant_hero_banner_1783610693597.jpg", // reuse beautiful hotel facade/lobby image as showcase
    amenities: ["Welcome Drinks", "Complimentary High-speed Wi-Fi", "LED Smart TV with Premium OTT", "Premium Bathroom with Bathtub", "Minibar", "Express Check-in", "Valet Service Included"],
    featured: true,
    rating: 4.9
  },
  {
    id: "standard-cosy",
    name: "Cozy Standard Room",
    description: "Well-furnished rooms designed perfectly for short business trips or cozy overnight stays, with top-tier cleanliness and comforting modern style.",
    pricePerNight: 1799,
    capacity: 2,
    size: "240 sq. ft.",
    bedType: "Queen Bed",
    image: "/src/assets/images/anant_luxury_room_1783610724635.jpg", // Fallback to room image
    amenities: ["Complimentary Wi-Fi", "LED TV", "Air Conditioned", "Attached Premium Bathroom", "Intercom Facility"],
    featured: false,
    rating: 4.6
  }
];

export const BANQUET_PACKAGES: BanquetPackage[] = [
  {
    id: "shubh-aarambh",
    name: "The Shubh Aarambh Package (Marriage & Grand Parties)",
    description: "A comprehensive event planning solution for grand celebrations, weddings, and premium gatherings. Includes luxury floral decor, stage setups, and majestic lightning.",
    capacityRange: "80 - 150 guests",
    pricePerPlate: 850,
    features: [
      "Full 3-Storey Grand Venue Access",
      "Stunning Custom Floral & Light Decorations",
      "Gourmet Royal Buffet (Veg/Non-Veg options)",
      "Premium Stage Setup & Audio System",
      "Dedicated Supervision & Hospitality Crew",
      "Complimentary Valet & Traffic Controllers"
    ],
    image: "/src/assets/images/anant_banquet_hall_1783610708772.jpg"
  },
  {
    id: "utsav-celebration",
    name: "The Utsav Celebration Package (Small to Mid Functions)",
    description: "Tailored specifically for birthdays, anniversaries, corporate seminars, and intimate pre-wedding ceremonies. Best-suited under 100 people.",
    capacityRange: "30 - 80 guests",
    pricePerPlate: 650,
    features: [
      "Dedicated Event Floor Access",
      "Charming Standard Balloon/Floral Themes",
      "Premium Multi-Cuisine Buffet",
      "Professional Sound & Mic Setup",
      "Warm Hospitality Service & Staff Support",
      "Valet Parking Service"
    ],
    image: "/src/assets/images/anant_food_buffet_1783610739807.jpg"
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    author: "Anjali Rajput",
    rating: 5,
    comment: "Good quality room well furnished. Behaviour is very good, every staff is care able. Good party space and well maintain decorations. Good food and with good quality Services. Owner behave like a family. Clean and decorative rooms with good interior. This venue perfectly combines comfort with exceptional hospitality.",
    date: "June 2026",
    tag: "Rooms & Hospitality"
  },
  {
    id: "rev-2",
    author: "Deepak Sharma",
    rating: 5,
    comment: "Awesome food quality, staff behaviour is very good, and thankyou so much Ganesh ji 🥰🥰 for taking special care of our guests during the ceremony!",
    date: "May 2026",
    tag: "Outstanding Service"
  },
  {
    id: "rev-3",
    author: "Sarthak Gupta",
    rating: 5,
    comment: "Anant 1 hotel ke sare log bahut bhadiya or khane ki baat ki jaye to ek dam fabulous! Best banquet experience in Ghaziabad.",
    date: "April 2026",
    tag: "Gourmet Food"
  },
  {
    id: "rev-4",
    author: "Rohit Mishra",
    rating: 5,
    comment: "Very nice space and hall good quality and great work. Very tasty food supervision bahut acha h overall good. Highly recommended for events.",
    date: "July 2026",
    tag: "Event Supervision"
  },
  {
    id: "rev-5",
    author: "Vivek Kumar",
    rating: 5,
    comment: "Good place for any kind of small party.. Can relate it to Marriage hall also. Well maintained and very beautifully decorated.",
    date: "March 2026",
    tag: "Event Decor"
  },
  {
    id: "rev-6",
    author: "Rajesh Tyagi",
    rating: 4,
    comment: "I attended a function in this hotel. Service is OK, food is good. Good for small functions, three-story building is very accessible. Parking in market is limited, but their dedicated valet team took our keys and handled parking seamlessly!",
    date: "May 2026",
    tag: "Honest Guest Review"
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Elegant Hotel Facade at Night",
    category: "interior",
    image: "/src/assets/images/anant_hero_banner_1783610693597.jpg"
  },
  {
    id: "gal-2",
    title: "Grand Banquet Table Settings",
    category: "banquet",
    image: "/src/assets/images/anant_banquet_hall_1783610708772.jpg"
  },
  {
    id: "gal-3",
    title: "Luxury Suite Living & Sleeping Quarter",
    category: "rooms",
    image: "/src/assets/images/anant_luxury_room_1783610724635.jpg"
  },
  {
    id: "gal-4",
    title: "Mouth-Watering Gourmet Buffet",
    category: "dining",
    image: "/src/assets/images/anant_food_buffet_1783610739807.jpg"
  },
  {
    id: "gal-5",
    title: "Premium Banquet Lighting & Stage Setup",
    category: "banquet",
    image: "/src/assets/images/anant_banquet_hall_1783610708772.jpg"
  },
  {
    id: "gal-6",
    title: "Cozy Furnished Room with Elegant Decor",
    category: "rooms",
    image: "/src/assets/images/anant_luxury_room_1783610724635.jpg"
  }
];

export const FAQS_DATA = [
  {
    question: "What is the guest capacity of your banquet hall?",
    answer: "Anant One features a flexible three-story building design that is highly optimized for small to mid-sized functions, ranging perfectly from 30 guests to 150 guests. It is commonly described as a grand venue for small parties and intimate marriages."
  },
  {
    question: "How do you manage the parking challenges in Navyug Market?",
    answer: "While Navyug Market is a bustling commercial area with active street parking, Anant One offers fully complimentary and professional Valet Parking. Our dedicated valet drivers receive your vehicle at the entrance and park it safely, ensuring a hassle-free arrival for you and your guests."
  },
  {
    question: "Can we request custom themes and menus for our function?",
    answer: "Absolutely! Our owner and management behave like a family to customize every event. Under the expert guidance of Ganesh ji and our food supervisors, we can design custom menus (pure veg, non-veg, or multi-cuisine) and bespoke decorations to make your party dreamlike."
  },
  {
    question: "Are your hotel rooms fully air-conditioned and furnished?",
    answer: "Yes, all rooms across our three-story hotel are clean, highly decorative with luxury interiors, fully air-conditioned, and furnished with high-end premium bedding, TV, Wi-Fi, and top-tier guest care services."
  }
];
