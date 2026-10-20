import {
  DailySchedule,
  GalleryPhoto,
  MembershipPlan,
  ServiceItem,
  SiteSettings,
  TestimonialItem,
} from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  businessName: 'Be Fit Fitness Club',
  tagline: 'BUILD YOUR STRONGER SELF.',
  subTagline: 'Train Strong. Move Better. Be Fit.',
  address: 'Viraj Complex, Zeal College Chowk, Mokarwadi',
  landmark: 'Zeal College Chowk',
  cityStatePincode: 'Narhe, Pune, Maharashtra 411041',
  phone: '+91 89758 97171',
  cleanPhone: '918975897171',
  googleRating: 4.8,
  reviewCount: 221,
  status: 'Operational',
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.453982463773!2d73.8248100759312!3d18.44850787093282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc29500735749bb%3A0x868b55d7f573c7ce!2sViraj%20Complex!5e0!3m2!1sen!2sin!4v1700000000000',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Viraj+Complex,+Zeal+College+Chowk,+Narhe,+Pune,+Maharashtra+411041',
  whatsappMessage:
    'Hello Be Fit Fitness Club, I would like to know more about your gym membership and facilities.',
};

export const INITIAL_SCHEDULE: DailySchedule[] = [
  { day: 'Monday', openTime: '05:15', closeTime: '22:15', isOpen: true },
  { day: 'Tuesday', openTime: '05:15', closeTime: '22:15', isOpen: true },
  { day: 'Wednesday', openTime: '05:15', closeTime: '22:15', isOpen: true },
  { day: 'Thursday', openTime: '05:15', closeTime: '22:15', isOpen: true },
  { day: 'Friday', openTime: '05:15', closeTime: '22:15', isOpen: true },
  { day: 'Saturday', openTime: '05:15', closeTime: '22:15', isOpen: true },
  { day: 'Sunday', openTime: '08:00', closeTime: '12:00', isOpen: true },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'strength',
    title: 'Strength & Resistance Training',
    category: 'Core Discipline',
    description:
      'Heavy-duty barbell racks, calibrated Olympic plates, and selectorized resistance equipment engineered for progressive overload and muscle hypertrophy.',
    features: ['Olympic Barbell Cages', 'Pin-Loaded Isolations', 'Progressive Overload Tracking'],
    image: '/src/assets/images/strength_training_area_1792466126123.jpg',
    published: true,
  },
  {
    id: 'free_weights',
    title: 'Free Weights & Dumbbells',
    category: 'Hypertrophy',
    description:
      'Tiered precision dumbbell racks ranging from light warm-ups to high-poundage heavy iron, adjustable incline/flat benches, and EZ curl stations.',
    features: ['High-Poundage Dumbbell Racks', 'Multi-Angle Utility Benches', 'Kettlebells & Barbells'],
    image: '/src/assets/images/free_weights_dumbbells_1792466128059.jpg',
    published: true,
  },
  {
    id: 'cardio',
    title: 'Cardio Training & Conditioning',
    category: 'Endurance',
    description:
      'High-performance curved treadmills, ergonomic indoor rowers, cross-trainers, and spin cycles designed to build cardiovascular capacity and burn fat.',
    features: ['Curved Non-Motorized Treadmills', 'Air Rowers & Bikes', 'Real-time Heart Rate Tracking'],
    image: '/src/assets/images/cardio_functional_zone_1792466126850.jpg',
    published: true,
  },
  {
    id: 'functional',
    title: 'Functional Fitness Training',
    category: 'Athleticism',
    description:
      'High-grip turf sprint tracks, heavy battle ropes, plyometric boxes, medicine balls, and agility rigs for athletic stamina and functional durability.',
    features: ['High-Traction Turf Track', 'Heavy Battle Ropes', 'Plyometric Stations'],
    image: '/src/assets/images/gym_interior_atmosphere_1792466127490.jpg',
    published: true,
  },
  {
    id: 'beginner_guidance',
    title: 'Beginner-Friendly Guidance',
    category: 'Coaching',
    description:
      'A welcoming environment built to eliminate gym intimidation. Our certified trainers guide proper biomechanical form, warmups, and workout fundamentals.',
    features: ['Zero-Intimidation Atmosphere', 'Form Correction & Safety', 'Equipment Orientation'],
    image: '/src/assets/images/hero_gym_cinematic_1792466125912.jpg',
    published: true,
  },
];

export const INITIAL_PLANS: MembershipPlan[] = [
  {
    id: 'plan_monthly',
    name: 'Monthly Membership',
    durationMonths: 1,
    durationLabel: '1 Month Commitment',
    priceDisplay: 'Contact for Pricing',
    isVerifiedPrice: false,
    featured: false,
    highlights: [
      'Full access to gym floor & free weights',
      'Cardio & resistance machines',
      'Beginner workout induction session',
      'Standard & gender-neutral restrooms',
      'Free high-speed member Wi-Fi',
    ],
    terms: 'Valid for 30 consecutive calendar days from activation.',
    published: true,
  },
  {
    id: 'plan_quarterly',
    name: 'Quarterly Membership',
    durationMonths: 3,
    durationLabel: '3 Months Program',
    priceDisplay: 'Contact for Pricing',
    isVerifiedPrice: false,
    featured: true,
    highlights: [
      'Everything in Monthly tier',
      'Trainer guidance for routine optimization',
      'Full access to functional fitness turf track',
      'Standard locker facilities included',
      'Credit/Debit card & NFC mobile payments',
    ],
    terms: 'Valid for 90 days. Ideal for establishing progressive strength habits.',
    published: true,
  },
  {
    id: 'plan_halfyearly',
    name: 'Half-Yearly Membership',
    durationMonths: 6,
    durationLabel: '6 Months Transformation',
    priceDisplay: 'Contact for Pricing',
    isVerifiedPrice: false,
    featured: false,
    highlights: [
      'Full 6-month continuous gym membership',
      'Complete strength, cardio & functional equipment',
      'Body composition check-ins',
      'Locker room & gender-neutral restrooms',
      'On-site member assistance',
    ],
    terms: 'Valid for 180 consecutive days. Requires valid ID verification.',
    published: true,
  },
  {
    id: 'plan_annual',
    name: 'Annual Membership',
    durationMonths: 12,
    durationLabel: 'Full Year Commitment',
    priceDisplay: 'Contact for Pricing',
    isVerifiedPrice: false,
    featured: false,
    highlights: [
      'Complete 365-day membership privilege',
      'Unrestricted peak and off-peak workout hours',
      'Dedicated member support from certified staff',
      'Complimentary locker storage access',
      'Community fitness events & workout challenges',
    ],
    terms: 'Valid for 365 days. Membership is non-transferable.',
    published: true,
  },
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev_1',
    author: 'Verified Gym Member',
    source: 'Google Review',
    rating: 5,
    reviewText:
      "I've had fantastic experience at be fit .the facility is well maintained, the equipment is top notch, and the overall atmosphere is welcoming and motivating . Staff is always friendly and ready to assist with any questions .",
    published: true,
    dateAdded: '2026-08-14',
  },
  {
    id: 'rev_2',
    author: 'Verified Gym Member',
    source: 'Google Review',
    rating: 5,
    reviewText: 'The gym is amazing . Top equipment,amazing facilities,and great environment',
    published: true,
    dateAdded: '2026-09-02',
  },
  {
    id: 'rev_3',
    author: 'Verified Gym Member',
    source: 'Google Review',
    rating: 5,
    reviewText: 'Best gym in Narhe as compared to other gyms . Best equipments and friendly trainers . Must visit',
    published: true,
    dateAdded: '2026-09-20',
  },
  {
    id: 'rev_4',
    author: 'Verified Gym Member',
    source: 'Google Review',
    rating: 5,
    reviewText:
      "I've had an amazing experience at Befit Gym! The atmosphere is energetic, clean, and welcoming—whether you're a beginner or a seasoned athlete. The equipment is top-notch and always well-maintained, with everything from free weights to cardio machines and functional training gear .I’ve seen real results since joining, not just physically but mentally as well. Befit Gym has become more than a place to work out—it’s a community that supports and inspires you every step of the way. Highly recommend it to anyone looking to get fit in a positive, professional environment.",
    published: true,
    dateAdded: '2026-10-05',
  },
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'gal_1',
    title: 'Main Workout Floor & Olympic Racks',
    category: 'facility',
    imageUrl: '/src/assets/images/hero_gym_cinematic_1792466125912.jpg',
    altText: 'Spacious gym floor with Olympic barbells, power racks, and ambient electric lime lighting',
    isVerifiedActual: false,
  },
  {
    id: 'gal_2',
    title: 'Heavy Strength & Power Stations',
    category: 'strength',
    imageUrl: '/src/assets/images/strength_training_area_1792466126123.jpg',
    altText: 'Olympic squat cages and heavy bumper plates in the strength training area',
    isVerifiedActual: false,
  },
  {
    id: 'gal_3',
    title: 'Precision Free Weights & Dumbbells',
    category: 'free_weights',
    imageUrl: '/src/assets/images/free_weights_dumbbells_1792466128059.jpg',
    altText: 'Tiered heavy dumbbells with knurled grips on commercial rubber racks',
    isVerifiedActual: false,
  },
  {
    id: 'gal_4',
    title: 'Curved Cardio & Functional Turf Track',
    category: 'cardio',
    imageUrl: '/src/assets/images/cardio_functional_zone_1792466126850.jpg',
    altText: 'High-end curved treadmills, rowing machines and sprint turf track',
    isVerifiedActual: false,
  },
  {
    id: 'gal_5',
    title: 'Community Conditioning Zone',
    category: 'facility',
    imageUrl: '/src/assets/images/gym_interior_atmosphere_1792466127490.jpg',
    altText: 'Vibrant workout environment showing battle ropes, kettlebells and community space',
    isVerifiedActual: false,
  },
];

export const INITIAL_FAQS = [
  {
    question: 'Where is Be Fit Fitness Club located in Narhe?',
    answer:
      'We are located at Viraj Complex, right at Zeal College Chowk, Mokarwadi, Narhe, Pune, Maharashtra 411041. It is directly accessible from the main chowk, ideal for students and residents alike.',
  },
  {
    question: 'What are the gym operating hours?',
    answer:
      'Monday through Saturday, our doors open bright and early at 5:15 AM and remain open until 10:15 PM. On Sundays, we operate a dedicated morning session from 8:00 AM to 12:00 PM.',
  },
  {
    question: 'Are certified trainers available on the gym floor?',
    answer:
      'Yes, Be Fit Fitness Club employs certified trainers on-site to assist members with equipment setup, correct biomechanical form, workout safety, and progressive strength development.',
  },
  {
    question: 'How do I know membership pricing and join?',
    answer:
      'Official rates are provided on-site or via direct WhatsApp enquiry to suit your goals (monthly, quarterly, half-yearly, or annual). Tap "Enquire Now" or message us on WhatsApp at +91 89758 97171 for the latest verified plan options.',
  },
  {
    question: 'What payment methods do you accept at the front desk?',
    answer:
      'We accept Credit Cards, Debit Cards, Google Pay, UPI, and NFC mobile tap-and-pay at the club counter.',
  },
  {
    question: 'What amenities and facilities are provided?',
    answer:
      'The club features high-speed free Wi-Fi, gender-neutral and standard restrooms, on-site storage, precision Olympic strength racks, heavy dumbbells, modern cardio, and a functional turf track.',
  },
];
