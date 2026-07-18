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
    title: "Medical Tourism",
    title_id: "Wisata Medis",
    description: "Access to international standard healthcare facilities is now within your reach. With over 120+ hospitals and clinics across 9 countries - Indonesia, Malaysia, Singapore, Thailand, China, Japan, India, Taiwan, and South Korea.",
    description_id: "Akses ke fasilitas kesehatan berstandar internasional kini berada dalam jangkauan Anda. Dengan lebih dari 120+ rumah sakit dan klinik di 9 negara - Indonesia, Malaysia, Singapura, Thailand, China, Jepang, India, Taiwan, dan Korea Selatan.",
    iconName: "LocationMed",
    bullets: [
      "Planning of medical travel routes and comfortable accommodations",
      "Assistance with medical visa processing and hospital documentation",
      "Direct coordination with hospitals and specialists in the destination country",
      "Accompaniment by medical staff or translators during your treatment journey"
    ],
    bullets_id: [
      "Perencanaan rute perjalanan medis dan akomodasi yang nyaman",
      "Bantuan pengurusan visa medis dan dokumentasi rumah sakit",
      "Koordinasi langsung dengan rumah sakit dan spesialis di negara tujuan",
      "Pendampingan oleh staf medis atau penerjemah selama perjalanan perawatan Anda"
    ]
  },
  {
    id: "2",
    title: "Medical Concierge",
    title_id: "Layanan Concierge Medis",
    description: "A personal medical assistant service dedicated to managing all your administrative and clinical travel needs.",
    description_id: "Layanan asisten medis pribadi yang didedikasikan untuk mengelola semua kebutuhan perjalanan klinis dan administratif Anda.",
    iconName: "Nurse",
    bullets: [
      "Scheduling consultations and medical procedures without long queues",
      "Full assistance with registration and hospital billing processes",
      "VIP pick-up and drop-off to and from healthcare facilities",
      "Priority lane access to various leading healthcare services"
    ],
    bullets_id: [
      "Penjadwalan konsultasi dan tindakan medis tanpa antrean panjang",
      "Bantuan penuh dalam proses registrasi dan penagihan rumah sakit",
      "Layanan antar-jemput VIP dari dan ke fasilitas kesehatan",
      "Akses jalur prioritas ke berbagai layanan kesehatan terkemuka"
    ]
  },
  {
    id: "3",
    title: "Medical Consultant",
    title_id: "Konsultan Medis",
    description: "Receive professional medical opinions and precise treatment guidance directly from our network of expert doctors.",
    description_id: "Dapatkan opini medis profesional dan panduan perawatan yang tepat langsung dari jaringan dokter ahli kami.",
    iconName: "Stethoscope",
    bullets: [
      "In-depth and comprehensive evaluation of your medical history and records",
      "Second opinion services from trusted hospitals",
      "Recommendations for medical actions and referrals to the most suitable specialists",
      "Interactive consultation sessions to address all your concerns regarding your diagnosis"
    ],
    bullets_id: [
      "Evaluasi mendalam dan komprehensif terhadap riwayat dan rekam medis Anda",
      "Layanan opini kedua (second opinion) dari rumah sakit terpercaya",
      "Rekomendasi tindakan medis dan rujukan ke spesialis yang paling sesuai",
      "Sesi konsultasi interaktif untuk menjawab semua kekhawatiran Anda terkait diagnosis"
    ]
  },
  {
    id: "4",
    title: "Customized Medical Check-Up (MCU) Individual & Corporate",
    title_id: "Customized Medical Check-Up (MCU) Individu & Korporat",
    description: "Comprehensive health examinations specifically designed to adapt to your risk profile, age, and physical condition.",
    description_id: "Pemeriksaan kesehatan menyeluruh yang dirancang khusus untuk menyesuaikan dengan profil risiko, usia, dan kondisi fisik Anda.",
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
    id: "5",
    title: "Homecare Services",
    title_id: "Layanan Homecare",
    description: "Enjoy hospital-standard medical care and recovery directly from the comfort and privacy of your own home.",
    description_id: "Nikmati perawatan medis dan pemulihan berstandar rumah sakit secara langsung dari kenyamanan dan privasi rumah Anda sendiri.",
    iconName: "Medical Shield",
    bullets: [
      "Routine and scheduled visits by licensed doctors, nurses, and physiotherapists",
      "Post-operative intensive care and chronic disease management at home",
      "Provision and arrangement of home medical equipment",
      "Periodic and remote monitoring of the patient's health progress"
    ],
    bullets_id: [
      "Kunjungan rutin dan terjadwal oleh dokter, perawat, dan fisioterapis berlisensi",
      "Perawatan intensif pasca-operasi dan manajemen penyakit kronis di rumah",
      "Penyediaan dan pengaturan peralatan medis rumah tangga",
      "Pemantauan berkala dan jarak jauh terhadap perkembangan kesehatan pasien"
    ]
  },
  {
    id: "6",
    title: "Emergency Medical Evacuation",
    title_id: "Evakuasi Medis Darurat",
    description: "A fast and secure emergency medical transport service to referral healthcare facilities equipped with adequate life-support equipment.",
    description_id: "Layanan transportasi medis darurat yang cepat dan aman ke fasilitas kesehatan rujukan yang dilengkapi dengan peralatan penunjang hidup yang memadai.",
    iconName: "Ambulance - Fast",
    bullets: [
      "24/7 rapid response for evacuation needs via land, sea, or air",
      "Ambulance fleet and medical transport equipped with mobile ICU standards",
      "Direct and intensive accompaniment by certified emergency medical teams",
      "Seamless patient transfer coordination (bed-to-bed) with the receiving hospital"
    ],
    bullets_id: [
      "Respons cepat 24/7 untuk kebutuhan evakuasi melalui darat, laut, atau udara",
      "Armada ambulans dan transportasi medis yang dilengkapi dengan standar ICU seluler",
      "Pendampingan langsung dan intensif oleh tim medis darurat bersertifikat",
      "Koordinasi pemindahan pasien yang mulus (bed-to-bed) dengan rumah sakit penerima"
    ]
  }
];
