export interface MedicalService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  bullets?: string[];
  title_id?: string;
  description_id?: string;
  bullets_id?: string[];
}

// ==========================================
// MOCK DATASETS
// ==========================================

export const SERVICES: MedicalService[] = [
  {
    id: "1",
    title: "Medical Concierge",
    title_id: "Layanan Concierge Medis",
    description: "A personal assistant dedicated to managing all your medical travel needs.",
    description_id: "Asisten pribadi yang didedikasikan untuk mengelola seluruh kebutuhan perjalanan medis Anda.",
    iconName: "Nurse",
    bullets: [
      "In-depth and comprehensive understanding and evaluation of your medical condition, history, needs and wants",
      "Expert selection of top doctors and specialized hospitals tailored to your health condition, needs and wants",
      "Scheduling doctor’s consultations and medical procedures",
      "Coordinate second opinion consultations from trusted hospitals",
      "Full assistance from registration to hospital billing processes",
      "Direct coordination with hospitals and specialists in the destination country",
      "VIP pick-up and drop-off to and from healthcare facilities"
    ],
    bullets_id: [
      "Pemahaman dan evaluasi mendalam serta komprehensif mengenai kondisi medis, riwayat, kebutuhan, dan keinginan Anda",
      "Pemilihan dokter terbaik dan rumah sakit spesialis oleh ahli yang disesuaikan dengan kondisi kesehatan, kebutuhan, dan keinginan Anda",
      "Penjadwalan konsultasi dokter dan prosedur medis",
      "Koordinasi konsultasi opini kedua (second opinion) dari rumah sakit tepercaya",
      "Pendampingan penuh mulai dari proses pendaftaran hingga penagihan rumah sakit",
      "Koordinasi langsung dengan rumah sakit dan dokter spesialis di negara tujuan",
      "Layanan antar-jemput VIP dari dan ke fasilitas kesehatan"
    ]
  },
  {
    id: "2",
    title: "Medical Tourism",
    title_id: "Wisata Medis",
    description: "Access to international standard healthcare facilities, with over 120+ trusted hospitals and clinics across 9 countries, including Indonesia, Malaysia, Singapore, Thailand, China, Japan, India, Taiwan, and South Korea.",
    description_id: "Akses ke fasilitas kesehatan berstandar internasional, dengan lebih dari 120+ rumah sakit dan klinik terpercaya di 9 negara, termasuk Indonesia, Malaysia, Singapura, Thailand, China, Jepang, India, Taiwan, dan Korea Selatan.",
    iconName: "LocationMed",
    bullets: [
      "Planning of medical travel routes and comfortable accommodations",
      "Assistance with medical visa application and other documentation",
      "Support by medical staff or translators during your treatment journey"
    ],
    bullets_id: [
      "Perencanaan rute perjalanan medis dan akomodasi yang nyaman",
      "Bantuan pengurusan aplikasi visa medis dan dokumentasi lainnya",
      "Dukungan oleh staf medis atau penerjemah selama perjalanan perawatan Anda"
    ]
  },
  {
    id: "3",
    title: "Customized Medical Check-Up (MCU) for Individuals & Corporates",
    title_id: "Customized Medical Check-Up (MCU) untuk Individu & Korporat",
    description: "Comprehensive medical check-up packages specifically designed to adapt to your profile, age, and physical condition.",
    description_id: "Paket pemeriksaan medis menyeluruh yang dirancang secara khusus untuk menyesuaikan dengan profil, usia, dan kondisi fisik Anda.",
    iconName: "Checkup",
    bullets: [
      "Initial health risk assessment through pre-MCU consultation sessions",
      "A series of laboratory and radiology tests personalized to your needs",
      "Detailed analysis of examination results with relevant specialists",
      "Recommendations for lifestyle adjustments and post-MCU follow-up care"
    ],
    bullets_id: [
      "Penilaian risiko kesehatan awal melalui sesi konsultasi pra-MCU",
      "Serangkaian tes laboratorium dan radiologi yang dipersonalisasi sesuai kebutuhan Anda",
      "Analisis mendalam hasil pemeriksaan dengan spesialis terkait",
      "Rekomendasi penyesuaian gaya hidup dan perawatan lanjutan pasca-MCU"
    ]
  },
  {
    id: "4",
    title: "Homecare Services",
    title_id: "Layanan Perawatan di Rumah (Homecare)",
    description: "Enjoy hospital-standard medical care and recovery directly from the comfort and privacy of your own home.",
    description_id: "Nikmati perawatan medis dan pemulihan berstandar rumah sakit secara langsung dari kenyamanan dan privasi rumah Anda sendiri.",
    iconName: "Medical Shield",
    bullets: [
      "Routine and scheduled visits by licensed doctors, nurses, physiotherapists and other medical staff",
      "Post-operative intensive care and chronic disease management at home",
      "Provision and arrangements of medical equipments and medicines",
      "Periodic and remote monitoring of the patient's health progress"
    ],
    bullets_id: [
      "Kunjungan rutin dan terjadwal oleh dokter, perawat, fisioterapis, dan staf medis berlisensi lainnya",
      "Perawatan intensif pasca-operasi dan manajemen penyakit kronis di rumah",
      "Penyediaan dan pengaturan peralatan medis serta obat-obatan",
      "Pemantauan berkala dan jarak jauh terhadap perkembangan kesehatan pasien"
    ]
  },
  {
    id: "5",
    title: "Emergency Medical Evacuation",
    title_id: "Evakuasi Medis Darurat",
    description: "A fast, reliable and secure emergency medical transport service to preferred healthcare facilities equipped with adequate life-support.",
    description_id: "Layanan transportasi medis darurat yang cepat, andal, dan aman ke fasilitas kesehatan pilihan yang dilengkapi dengan peralatan penunjang hidup yang memadai.",
    iconName: "Ambulance - Fast",
    bullets: [
      "24/7 rapid response for evacuation needs via air or land",
      "Ambulance and medical transport equipped with mobile ICU standards",
      "Direct and intensive accompaniment by certified emergency doctors, nurses and medical staff",
      "Seamless patient transfer coordination from bed-to-bed"
    ],
    bullets_id: [
      "Respons cepat 24/7 untuk kebutuhan evakuasi melalui udara atau darat",
      "Ambulans dan transportasi medis yang dilengkapi dengan standar ICU seluler",
      "Pendampingan langsung dan intensif oleh dokter, perawat, dan staf medis darurat bersertifikat",
      "Koordinasi pemindahan pasien yang mulus dari tempat tidur ke tempat tidur (bed-to-bed)"
    ]
  }
];
