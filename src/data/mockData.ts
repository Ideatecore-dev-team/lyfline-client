export interface Hospital {
  id: string;
  name: string;
  logo: string; // Placeholder or actual path
  country: string;
  flag: string; // Emoji flag or path
}

export interface MedicalService {
  id: string;
  title: string;
  description: string;
  iconName: "Calendar" | "Home" | "Truck" | "UserCheck" | "Plane" | "ShieldCheck";
  bullets?: string[];
}

export interface RecoveryStep {
  id: string;
  number: string;
  title: string;
  description: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  category: "Lifestyle" | "Cardiology" | "General" | "Health";
  imageUrl: string;
  readTime: string;
}

// ==========================================
// MOCK DATASETS
// ==========================================

export const HOSPITALS: Hospital[] = [
  { id: "1", name: "Mayapada Hospital", logo: "/Partners/mayapada hospital.png", country: "Indonesia", flag: "/Flags/ID-Indonesia icon.png" },
  { id: "2", name: "MAX Healthcare", logo: "/Partners/Max healtcare.png", country: "India", flag: "/Flags/IN-India icon.png" },
  { id: "3", name: "Ready Plastic Surgery", logo: "/Partners/Ready Plastic Surgery.png", country: "South Korea", flag: "/Flags/KR-Korea icon.png" },
  { id: "4", name: "Pantai Hospitals", logo: "/Partners/Pantai Hospitals.png", country: "Malaysia", flag: "/Flags/MY-malaysia icon.png" },
  { id: "5", name: "Bumrungrad International Hospital", logo: "/Partners/bumrungrad international h.png", country: "Thailand", flag: "/Flags/TH-Thailand icon.png" },
];

export const SERVICES: MedicalService[] = [
  {
    id: "1",
    title: "Medical Appointment Assistance",
    description: "We help schedule your consultations and treatments with trusted medical providers.",
    iconName: "Calendar",
    bullets: [
      "Thorough information and background understanding via initial consultation",
      "Complete options provided - doctors, clinics, hospitals and treatment packages",
      "Post-treatment care locally and internationally",
      "Access to teleconsultation from doctors worldwide"
    ]
  },
  {
    id: "2",
    title: "Your Personalized Home Care",
    description: "Get medical care from the comfort of your home, including lab tests, IV therapy, home visits, and more.",
    iconName: "Home",
    bullets: [
      "At-home lab tests and blood draws",
      "Intravenous (IV) therapy and infusions",
      "Professional nurse and doctor home visits",
      "Post-hospitalization recovery care at home"
    ]
  },
  {
    id: "3",
    title: "Medical Evacuation",
    description: "Safe and reliable transportation to your preferred medical provider.",
    iconName: "Truck",
    bullets: [
      "24/7 emergency medical coordination",
      "Safe transfer to preferred medical centers",
      "Air and ground ambulance arrangements",
      "Medical escort accompanied transport"
    ]
  },
  {
    id: "4",
    title: "Patient–Doctor Matching",
    description: "We carefully match patients with suitable doctors based on medical needs and background analysis.",
    iconName: "UserCheck",
    bullets: [
      "Personalized specialist recommendations",
      "Comprehensive medical background reviews",
      "Second opinion coordination",
      "Doctor qualification and credential verification"
    ]
  },
  {
    id: "5",
    title: "Travel & Accommodation Support",
    description: "We assist with flights, accommodation, transport, visas, and travel arrangements for your medical journey.",
    iconName: "Plane",
    bullets: [
      "Flight booking and routing assistance",
      "Hotel and long-term stay accommodation",
      "Airport transfer and local transport booking",
      "Medical visa documentation and support"
    ]
  },
  {
    id: "6",
    title: "Guided Care",
    description: "Your treatment journey is carefully monitored to ensure the right care for your medical needs.",
    iconName: "ShieldCheck",
    bullets: [
      "Continuous treatment journey monitoring",
      "Dedicated care coordinator throughout",
      "Translation and documentation support",
      "Post-treatment follow-up scheduling"
    ]
  },
];

export const STEPS: RecoveryStep[] = [
  {
    id: "1",
    number: "01",
    title: "Initial Consultation",
    description: "No Hidden Fees. Transparent pricing with no unexpected charges or complicated payment schemes.",
  },
  {
    id: "2",
    number: "02",
    title: "Doctor & Hospital Match",
    description: "We shortlist the right specialists from our verified global network and coordinate with the chosen hospital.",
  },
  {
    id: "3",
    number: "03",
    title: "Travel Arrangements",
    description: "From flights and visas to hotel bookings — every logistics detail is managed so you can travel stress-free.",
  },
  {
    id: "4",
    number: "04",
    title: "Treatment & Follow-up",
    description: "We stay with you through your treatment and coordinate aftercare, ensuring a smooth and safe recovery journey.",
  },
];

export const STATS = [
  { id: "1", value: "30+", label: "Hospitals Partners Worldwide", highlight: true },
  { id: "2", value: "7", label: "Countries in Our Network", highlight: false },
  { id: "3", value: "100%", label: "End-to-End Service Coverage", highlight: false },
  { id: "4", value: "95%", label: "Satisfaction Rate", highlight: false },
];

export const BENEFITS = [
  {
    id: "1",
    title: "No Hidden Fees",
    description: "Transparent pricing with no unexpected charges or complicated payment schemes.",
    iconName: "Home", // We'll map to heart or dollar icon later
  },
  {
    id: "2",
    title: "End-to-End Guided Care",
    description: "We support and guide you throughout your entire medical journey, from consultation to recovery.",
    iconName: "UserCheck",
  },
  {
    id: "3",
    title: "Flexible Treatment Packages",
    description: "Choose from a variety of care and treatment options tailored to your medical needs.",
    iconName: "Calendar",
  },
  {
    id: "4",
    title: "Transparent Procedures & Information",
    description: "Clear communication and honest medical information at every stage of your care.",
    iconName: "ShieldCheck",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "User A",
    role: "Manager at PT ABCD",
    quote: "I have used LYFLINE many times, and I am truly satisfied with their service — fast responses, great pricing, and so much more. We are very grateful to have LYFLINE as our support system. Thank you so much!",
  },
  {
    id: "2",
    name: "User B",
    role: "Graphic Designer",
    quote: "The most efficient, reliable, fastest, and most responsive healthcare service in Jakarta! I will always trust LYFLINE to provide our medical needs and healthcare services.",
  },
  {
    id: "3",
    name: "User C",
    role: "Traveler",
    quote: "Thank you will never be enough to express how grateful we are for the support, care, and assistance provided by LYFLINE in our home. Their attention to detail is something we truly value. They were truly our lifesavers.",
  },
  {
    id: "4",
    name: "User D",
    role: "Traveler",
    quote: "We truly appreciated the outstanding service we received during our family's COVID situation. Thank you for being punctual, making everything easy and hassle-free for us, and always doing your best despite how busy things were every day. Thank you once again, and we wish all the best for your entire team!",
  },
];

export const ARTICLES: Article[] = [
  {
    id: "1",
    title: "Tips Mudik Aman buat Penderita Maag: Jangan Sampai Perut Melilit di Tengah Macet!",
    date: "Maret 15, 2026",
    category: "Lifestyle",
    imageUrl: "/articles/mudik-maag.jpg",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Lutut Sering Bunyi “Krek” Saat Beraktivitas? Kenali Gejala Osteoarthritis yang Sering Dianggap Remeh",
    date: "Februari 26, 2026",
    category: "Cardiology", // Wait, is it Orthopedics? In mock it says Cardiology
    imageUrl: "/articles/lutut-krek.jpg",
    readTime: "4 min read",
  },
  {
    id: "3",
    title: "Masih Sering Lemas di Minggu Pertama Puasa? 5 Trik Rahasia Biar Tubuh Cepat Adaptasi dengan Jam Puasa",
    date: "Februari 25, 2026",
    category: "Lifestyle",
    imageUrl: "/articles/lemas-puasa.jpg",
    readTime: "6 min read",
  },
];
