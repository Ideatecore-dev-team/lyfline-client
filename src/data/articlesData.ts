import { type BadgeVariant } from "@/components/Badge";

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
}

export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  categoryVariant: BadgeVariant;
  imageUrl: string;
  readTime: string;
  intro: string[];
  sections: ArticleSection[];
  references?: string[];
}

export const ALL_ARTICLES: Article[] = [
  {
    id: "tips-mudik-aman-buat-penderita-maag",
    title: "Tips Mudik Aman buat Penderita Maag: Jangan Sampai Perut Melilit di Tengah Macet!",
    date: "Maret 15, 2026",
    category: "Lifestyle",
    categoryVariant: "green",
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600",
    readTime: "5 min read",
    intro: [
      "Mudik di akhir Ramadan atau menjelang Idul Fitri sering melibatkan perjalanan jauh dan waktu tempuh yang panjang. Bagi penderita maag, kondisi ini bisa menjadi tantangan tersendiri. Perubahan jadwal makan, perjalanan panjang, hingga stres akibat kemacetan dapat memicu kambuhnya gejala maag.",
      "Akibatnya, perut bisa terasa perih, mual, hingga melilit di tengah perjalanan. Agar perjalanan mudik tetap nyaman, penting bagi penderita maag untuk mempersiapkan diri dengan baik sebelum berangkat."
    ],
    sections: [
      {
        heading: "Mengapa Mudik Bisa Memicu Maag?",
        paragraphs: [
          "Maag umumnya terjadi akibat iritasi pada lapisan lambung yang dapat dipicu oleh peningkatan asam lambung, pola makan yang tidak teratur, maupun stres.",
          "Perjalanan mudik biasanya dilakukan ketika sebagian orang masih menjalani puasa Ramadan atau baru saja mengalami perubahan pola makan selama sebulan terakhir. Kondisi ini, ditambah perjalanan jauh dan kemacetan, dapat meningkatkan risiko kambuhnya maag.",
          "Beberapa faktor yang dapat memicu gejala maag selama mudik antara lain:"
        ],
        bulletPoints: [
          "Jadwal makan yang berubah atau tertunda karena perjalanan",
          "Konsumsi makanan pedas, asam, atau berlemak saat berbuka",
          "Kurang istirahat selama perjalanan jauh",
          "Stres akibat kemacetan atau kelelahan"
        ]
      },
      {
        heading: "Tips Mudik Aman untuk Penderita Maag",
        paragraphs: [
          "Agar perjalanan mudik tetap nyaman meski sedang menjalani puasa, penderita maag perlu memperhatikan pola makan, istirahat, serta kondisi tubuh selama perjalanan.",
          "Beberapa langkah berikut dapat membantu mencegah maag kambuh saat mudik:"
        ]
      },
      {
        heading: "Jangan Lewatkan Sahur",
        paragraphs: [
          "Bagi penderita maag, sahur sangat penting untuk membantu menjaga lambung tidak kosong terlalu lama selama puasa. Pilih makanan yang mudah dicerna dan tidak memicu produksi asam lambung berlebih, seperti nasi, lauk berprotein, sayuran, serta buah yang tidak terlalu asam.",
          "Hindari makanan yang terlalu pedas, berlemak, atau asam saat sahur karena dapat meningkatkan risiko iritasi lambung selama perjalanan."
        ]
      },
      {
        heading: "Siapkan Bekal untuk Berbuka di Perjalanan",
        paragraphs: [
          "Jika perjalanan masih berlangsung saat waktu berbuka tiba, sebaiknya siapkan makanan atau minuman ringan untuk berbuka.",
          "Kurma, roti, biskuit, atau pisang dapat menjadi pilihan karena relatif mudah dicerna oleh lambung. Setelah berbuka ringan, Anda bisa makan lebih lengkap saat sudah tiba di tempat tujuan atau saat beristirahat."
        ]
      },
      {
        heading: "Hindari Makan Berlebihan Saat Berbuka",
        paragraphs: [
          "Setelah seharian berpuasa, banyak orang cenderung makan dalam porsi besar saat berbuka. Namun bagi penderita maag, makan terlalu banyak sekaligus dapat membuat lambung bekerja lebih berat dan memicu rasa tidak nyaman di perut.",
          "Sebaiknya berbuka secara bertahap, dimulai dengan makanan ringan terlebih dahulu sebelum makan utama."
        ]
      },
      {
        heading: "Minum air putih yang cukup",
        paragraphs: [
          "Selama menjalani puasa, tubuh tidak mendapatkan asupan cairan dalam waktu cukup lama. Oleh karena itu, penting untuk mencukupi kebutuhan cairan saat sahur dan berbuka.",
          "Minum air putih yang cukup dapat membantu menjaga fungsi pencernaan tetap baik dan mencegah tubuh mengalami dehidrasi selama perjalanan."
        ]
      },
      {
        heading: "Istirahat Secukupnya Selama Perjalanan",
        paragraphs: [
          "Perjalanan jauh saat mudik dapat membuat tubuh mudah lelah. Kurang istirahat juga dapat memperburuk keluhan lambung pada sebagian orang.",
          "Jika memungkinkan, cobalah beristirahat sejenak selama perjalanan untuk membantu tubuh tetap rileks."
        ]
      },
      {
        heading: "Kelola Stres Selama Perjalanan",
        paragraphs: [
          "Kemacetan panjang sering kali membuat perjalanan terasa melelahkan dan memicu stres. Padahal, stres dapat memicu peningkatan produksi asam lambung pada sebagian orang.",
          "Untuk mengatasinya, cobalah mendengarkan musik, berbincang dengan keluarga, atau melakukan teknik pernapasan sederhana agar tubuh tetap rileks selama perjalanan."
        ]
      },
      {
        heading: "Bawa Obat Maag Pribadi",
        paragraphs: [
          "Jika memiliki riwayat maag yang sering kambuh, sebaiknya tetap membawa obat maag yang biasa digunakan.",
          "Obat seperti antasida dapat membantu menetralkan asam lambung dan meredakan gejala jika perut mulai terasa tidak nyaman selama perjalanan.",
          "Bagi penderita maag, persiapan sebelum mudik tidak hanya soal kendaraan atau barang bawaan, tetapi juga kondisi kesehatan. Jika Anda memiliki riwayat maag yang sering kambuh, sebaiknya berkonsultasi terlebih dahulu dengan dokter sebelum melakukan mudik, terutama jika masih menjalani puasa.",
          "Dokter dapat membantu menilai kondisi lambung, memberikan saran pola makan selama perjalanan, serta meresepkan obat yang sesuai untuk mencegah gejala kambuh saat mudik.",
          "Selain itu, pemeriksaan kesehatan juga dapat dilakukan dengan lebih praktis dari rumah melalui layanan LYFLINE. Melalui LYFLINE, Anda dapat melakukan pengecekan kesehatan di rumah serta memperoleh pendampingan medis untuk membantu memastikan kondisi tubuh tetap prima sebelum mudik.",
          "Dengan persiapan yang tepat, perjalanan mudik dapat berlangsung lebih nyaman tanpa terganggu oleh keluhan maag."
        ]
      }
    ],
    references: [
      "American Health Association (2024). Healthy Travel. https://www.heart.org/en/healthy-living/healthy-lifestyle/mental-health-and-wellbeing/healthy-travel",
      "Cleveland Clinic (2025). Indigestion (Dyspepsia). https://my.clevelandclinic.org/health/symptoms/7316-indigestion-dyspepsia",
      "Healthline (2024). Why Do I Have Indigestion? https://www.healthline.com/health/indigestion",
      "Houston Methodist (2024). Tips for Eating Healthy While Traveling. https://www.houstonmethodist.org/blog/articles/2024/may/tips-for-eating-healthy-while-traveling/",
      "Mayo Clinic (2025). How to stay healthy while traveling: Tips for flights, cruises, and road trips. https://mcpress.mayoclinic.org/living-well/how-to-stay-healthy-while-traveling-tips-for-flights-cruises-and-road-trips/",
      "Ministry of Health Singapore (2025). Travel Tips to Stay Healthy During the Holidays. https://www.healthhub.sg/well-being-and-lifestyle/exercise-and-fitness/healthy-on-holiday-tips-to-stay-fit-when-travelling",
      "National Institute of Health (2023). Good Food to Help Your Digestion. https://www.nhs.uk/live-well/eat-well/digestive-health/good-foods-to-help-your-digestion/"
    ]
  },
  {
    id: "lutut-sering-bunyi-krek-saat-beraktivitas",
    title: "Lutut Sering Bunyi “Krek” Saat Beraktivitas? Kenali Gejala Osteoartritis yang Sering Dianggap Remeh",
    date: "Februari 26, 2026",
    category: "Cardiology",
    categoryVariant: "yellow",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    readTime: "4 min read",
    intro: [
      "Pernahkah Anda mendengar bunyi 'krek' pada lutut saat berjongkok, menaiki tangga, atau sekadar meluruskan kaki? Bunyi tersebut sering kali diabaikan dan dianggap sebagai hal biasa akibat kelelahan atau penuaan dini.",
      "Namun, jika bunyi krek ini disertai dengan rasa nyeri, kaku, atau pembengkakan, bisa jadi itu merupakan gejala awal Osteoartritis (OA) lutut. Osteoartritis adalah penyakit sendi degeneratif yang paling umum memengaruhi jutaan orang di seluruh dunia."
    ],
    sections: [
      {
        heading: "Mengapa Sendi Lutut Mengeluarkan Bunyi?",
        paragraphs: [
          "Bunyi krek pada lutut secara medis dikenal sebagai krepitasi. Krepitasi bisa disebabkan oleh berbagai hal, mulai dari pelepasan gas di dalam cairan sendi hingga gesekan antara tulang akibat penipisan tulang rawan pelindung sendi.",
          "Pada kasus Osteoartritis, tulang rawan yang berfungsi sebagai bantalan gesekan antar tulang mulai menipis dan rusak. Akibatnya, tulang saling bergesekan secara langsung saat sendi digerakkan, menciptakan bunyi krepitasi dan memicu peradangan serta nyeri."
        ]
      },
      {
        heading: "Gejala Osteoartritis Lutut yang Perlu Diwaspadai",
        paragraphs: [
          "Selain bunyi 'krek' pada sendi lutut, terdapat beberapa gejala penyerta Osteoartritis yang tidak boleh disepelekan:",
          "1. Nyeri Sendi: Rasa sakit yang muncul atau bertambah parah saat Anda berjalan, menaiki tangga, atau membawa beban berat.",
          "2. Kekakuan Sendi: Lutut terasa kaku, terutama di pagi hari setelah bangun tidur atau setelah duduk terlalu lama.",
          "3. Keterbatasan Gerak: Kesulitan untuk menekuk atau meluruskan lutut sepenuhnya.",
          "4. Pembengkakan: Lutut tampak lebih besar atau memerah akibat peradangan jaringan di sekitar sendi."
        ]
      }
    ]
  },
  {
    id: "masih-sering-lemas-di-minggu-pertama-puasa",
    title: "Masih Sering Lemas di Minggu Pertama Puasa? 5 Trik Rahasia Biar Tubuh Cepat Adaptasi dengan Jam Puasa",
    date: "Februari 25, 2026",
    category: "Lifestyle",
    categoryVariant: "green",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    readTime: "6 min read",
    intro: [
      "Memasuki minggu pertama puasa Ramadan, rasa lemas, mengantuk, dan sulit berkonsentrasi sering kali menjadi keluhan utama. Tubuh yang biasanya menerima asupan energi secara konstan kini harus beradaptasi dengan perubahan pola makan dan tidur yang drastis.",
      "Kondisi ini sebenarnya wajar karena tubuh sedang melakukan transisi dan detoksifikasi alami. Namun, Anda tidak perlu membiarkan rasa lemas ini mengganggu produktivitas harian Anda. Berikut beberapa trik rahasia membantu tubuh cepat beradaptasi."
    ],
    sections: [
      {
        heading: "1. Fokus pada Hidrasi Optimal (Metode 2-4-2)",
        paragraphs: [
          "Dehidrasi adalah penyebab utama tubuh lemas dan sakit kepala saat puasa. Terapkan aturan minum 8 gelas sehari dengan pola 2-4-2: 2 gelas saat berbuka, 4 gelas sepanjang malam (dari setelah berbuka hingga tidur), dan 2 gelas saat sahur.",
          "Pilihlah air putih hangat dan hindari minuman berkafein atau terlalu manis karena dapat memicu buang air kecil lebih sering dan membuat tubuh lebih cepat haus."
        ]
      },
      {
        heading: "2. Pilih Karbohidrat Kompleks dan Serat Saat Sahur",
        paragraphs: [
          "Makanan sahur menentukan tingkat energi Anda sepanjang hari. Hindari karbohidrat sederhana yang cepat dicerna seperti nasi putih dalam jumlah berlebih atau mi instan.",
          "Sebaliknya, konsumsi karbohidrat kompleks seperti nasi merah, oatmeal, roti gandum, serta sayuran berserat tinggi. Nutrisi kompleks dicerna lambat oleh tubuh sehingga melepaskan energi secara bertahap."
        ]
      }
    ]
  },
  {
    id: "7-kebiasaan-sehari-hari-untuk-menjaga-kesehatan-jantung",
    title: "7 Kebiasaan Sehari-hari untuk Menjaga Kesehatan Jantung",
    date: "Maret 15, 2026",
    category: "Lifestyle",
    categoryVariant: "green",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    readTime: "5 min read",
    intro: [
      "Jantung adalah salah satu organ vital tubuh yang bekerja tanpa henti. Menjaga kesehatannya tidak harus dimulai dengan langkah besar, melainkan melalui kebiasaan-kebiasaan kecil sehari-hari.",
      "Dengan mengubah kebiasaan makan, tingkat aktivitas fisik, dan pengelolaan stres, Anda dapat mengurangi risiko penyakit jantung secara signifikan."
    ],
    sections: [
      {
        heading: "Langkah Sederhana untuk Jantung Sehat",
        paragraphs: [
          "Berikut adalah 7 kebiasaan harian yang dapat membantu Anda menjaga kesehatan jantung tetap prima:",
          "1. Aktif Bergerak: Lakukan aktivitas fisik minimal 30 menit setiap hari, seperti jalan cepat atau bersepeda.",
          "2. Kurangi Konsumsi Garam dan Lemak Jenuh: Pilih masakan yang dikukus atau direbus daripada digoreng.",
          "3. Kelola Stres dengan Baik: Lakukan meditasi, hobi, atau meditasi relaksasi pernapasan.",
          "4. Tidur Cukup: Usahakan untuk tidur berkualitas selama 7-8 jam setiap malam untuk memberi waktu bagi jantung beristirahat."
        ]
      }
    ]
  },
  {
    id: "mengenali-tanda-tanda-awal-penyakit-jantung-yang-perlu-diwaspadai",
    title: "Mengenali Tanda-Tanda Awal Penyakit Jantung yang Perlu Diwaspadai",
    date: "Februari 26, 2026",
    category: "Cardiology",
    categoryVariant: "yellow",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    readTime: "5 min read",
    intro: [
      "Penyakit jantung sering kali datang secara tiba-tiba, namun tubuh sebenarnya sering memberikan alarm atau tanda bahaya jauh sebelum kondisi kritis terjadi.",
      "Mengenali tanda-tanda awal ini dan segera melakukan konsultasi medis adalah kunci utama untuk mencegah komplikasi yang berakibat fatal."
    ],
    sections: [
      {
        heading: "Tanda-Tanda yang Tidak Boleh Anda Abaikan",
        paragraphs: [
          "Waspadai beberapa gejala berikut jika terjadi secara berulang atau memburuk dari waktu ke waktu:",
          "1. Nyeri Dada (Angina): Rasa tertekan atau sesak di dada tengah yang menjalar ke lengan kiri, leher, atau rahang.",
          "2. Sesak Napas: Merasa kehabisan napas bahkan saat melakukan aktivitas ringan atau saat beristirahat.",
          "3. Kelelahan Ekstrim: Merasa sangat lelah tanpa sebab yang jelas sepanjang hari.",
          "4. Detak Jantung Tidak Teratur (Palpitasi): Jantung terasa berdebar-debar atau berdetak tidak beraturan."
        ]
      }
    ]
  },
  {
    id: "dampak-stres-terhadap-kesehatan-fisik-dan-mental",
    title: "Dampak Stres terhadap Kesehatan Fisik dan Mental",
    date: "Februari 25, 2026",
    category: "Lifestyle",
    categoryVariant: "green",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    readTime: "6 min read",
    intro: [
      "Stres adalah bagian alami dari kehidupan modern, namun stres kronis yang dibiarkan tanpa pengelolaan dapat merusak kesehatan fisik dan mental secara perlahan.",
      "Memahami bagaimana stres memengaruhi tubuh dapat membantu kita mengambil tindakan preventif sebelum kesehatan terganggu lebih serius."
    ],
    sections: [
      {
        heading: "Bagaimana Stres Merusak Kesehatan Tubuh?",
        paragraphs: [
          "Saat stres, tubuh melepaskan hormon kortisol dan adrenalin yang memicu peningkatan tekanan darah dan detak jantung. Dalam jangka panjang, kondisi ini meningkatkan risiko hipertensi, serangan jantung, dan stroke.",
          "Secara mental, stres kronis menyebabkan kecemasan berlebih, depresi, gangguan tidur, hingga kelelahan mental (burnout) yang menurunkan kualitas hidup secara drastis."
        ]
      }
    ]
  },
  {
    id: "memahami-kolesterol-arti-angka-pada-hasil-pemeriksaan-anda",
    title: "Memahami Kolesterol: Arti Angka pada Hasil Pemeriksaan Anda",
    date: "Maret 15, 2026",
    category: "Cardiology",
    categoryVariant: "yellow",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    readTime: "5 min read",
    intro: [
      "Apakah Anda baru saja melakukan pemeriksaan darah rutin dan bingung membaca hasil tes kolesterol?",
      "Kolesterol sering kali disalahartikan sebagai zat yang sepenuhnya buruk bagi tubuh, padahal kolesterol memiliki peran penting dalam pembentukan sel dan hormon."
    ],
    sections: [
      {
        heading: "Membaca Angka Kolesterol Anda",
        paragraphs: [
          "Berikut penjelasan singkat mengenai parameter kolesterol pada hasil lab Anda:",
          "1. Kolesterol Total: Kadar gabungan seluruh jenis kolesterol. Angka ideal adalah kurang dari 200 mg/dL.",
          "2. LDL (Low-Density Lipoprotein): Sering disebut 'kolesterol jahat' karena dapat menumpuk di dinding arteri. Idealnya di bawah 100 mg/dL.",
          "3. HDL (High-Density Lipoprotein): Sering disebut 'kolesterol baik' karena membantu membuang kolesterol dari arteri. Idealnya di atas 50 mg/dL.",
          "4. Trigliserida: Jenis lemak lain dalam darah. Idealnya kurang dari 150 mg/dL."
        ]
      }
    ]
  },
  {
    id: "pentingnya-pemeriksaan-kesehatan-rutin-di-setiap-tahap-kehidupan",
    title: "Pentingnya Pemeriksaan Kesehatan Rutin di Setiap Tahap Kehidupan",
    date: "Februari 26, 2026",
    category: "Preventive Care",
    categoryVariant: "red",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    readTime: "7 min read",
    intro: [
      "Mencegah lebih baik daripada mengobati bukan sekadar slogan, melainkan prinsip medis utama untuk menjaga kualitas hidup jangka panjang.",
      "Pemeriksaan kesehatan rutin atau medical check-up (MCU) membantu mendeteksi potensi masalah kesehatan secara dini sebelum memicu gejala parah."
    ],
    sections: [
      {
        heading: "Mengapa Medical Check-Up Rutin Sangat Penting?",
        paragraphs: [
          "Banyak penyakit kronis seperti hipertensi, diabetes, dan kanker stadium awal berkembang secara diam-diam tanpa keluhan fisik yang berarti.",
          "Melakukan MCU setahun sekali membantu dokter memetakan kondisi kesehatan Anda, memberikan intervensi gaya hidup yang tepat, serta mengobati kelainan sedini mungkin guna menghindari pengobatan medis yang mahal dan berisiko di kemudian hari."
        ]
      }
    ]
  },
  {
    id: "makanan-yang-baik-untuk-kesehatan-jantung-dan-tubuh",
    title: "Makanan yang Baik untuk Kesehatan Jantung dan Tubuh",
    date: "Februari 25, 2026",
    category: "Nutrition",
    categoryVariant: "purple",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    readTime: "6 min read",
    intro: [
      "Makanan yang Anda konsumsi setiap hari adalah bahan bakar utama bagi tubuh dan jantung Anda.",
      "Memilih jenis makanan yang tepat dapat membantu membersihkan pembuluh darah, mengurangi kolesterol, dan menormalkan tekanan darah."
    ],
    sections: [
      {
        heading: "Daftar Makanan Super Ramah Jantung",
        paragraphs: [
          "Sertakan makanan-makanan sehat ini ke dalam menu harian Anda:",
          "1. Sayuran Hijau: Bayam, kailan, dan brokoli kaya akan vitamin K yang melindungi arteri dan menurunkan tekanan darah.",
          "2. Ikan Berlemak Baik: Salmon, tuna, dan sarden yang mengandung asam lemak omega-3 membantu mengurangi denyut tidak teratur dan trigliserida.",
          "3. Gandum Utuh: Oatmeal dan beras merah membantu mengikat kolesterol jahat di sistem pencernaan dan membuangnya dari tubuh."
        ]
      }
    ]
  }
];
