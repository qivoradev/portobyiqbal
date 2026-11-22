/**
 * CONTENT DATA — Bilingual Source of Truth for iqbaldf Portfolio
 * Owner: Iqbal Dwi Fathonah
 * Role: Data Analyst (Fresh Graduate)
 *
 * Strictly permitted stack: SQL, MySQL, Excel, Looker Studio, Git.
 * Verified metrics only: 21,350+, $817K+, 238,000+, 12–13 & 17–18, Top 5 SKU, 3 projects.
 */

export type Language = 'in' | 'en';

export interface ProjectMetric {
  label: string;
  value: string;
  subtext?: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  tools: string[];
  shortSummary: string;
  description: string;
  previewSubtitle: string;
  highlights: string[];
  image: string;
  liveDashboardUrl?: string;
  workbookInfo?: string;
  metrics?: ProjectMetric[];
  businessContext?: {
    heading: string;
    body: string;
  };
  keyFindings?: {
    heading: string;
    items: string[];
  };
  recommendations?: {
    heading: string;
    items: string[];
  };
  parFramework?: {
    heading: string;
    problem: string;
    action: string;
    result: string;
  };
  actionFramework?: {
    heading: string;
    items: {
      title: string;
      what: string;
      soWhat: string;
      nowWhat: string;
    }[];
  };
}

export interface SkillWorkflowItem {
  id: 'sql' | 'excel' | 'bi';
  index: string;
  shortTitle: string;
  title: string;
  role: string;
  stepLabel: string;
  focus: string;
  capabilities: [string, string, string];
  keyOutput: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  field: string;
  date: string;
  validity: string;
  verification?: {
    site: string;
    code: string;
    url: string;
  };
  fileType: 'pdf' | 'image';
  fileUrl: string;
  thumbnailUrl: string;
}

export interface PortfolioContent {
  brand: string;
  monogram: string;
  nav: {
    home: string;
    skills: string;
    projects: string;
    about: string;
    contact: string;
    menuLabel: string;
    closeMenuLabel: string;
    toggleLangLabel: string;
  };
  hero: {
    headline: string;
    ctaProjects: string;
    ctaCv: string;
    location: string;
    circularBadgeText: string;
    photoPlaceholderLabel: string;
  };
  skills: {
    headline: string;
    subtitle: string;
    keyOutputLabel: string;
    items: SkillWorkflowItem[];
  };
  projects: {
    headline: string;
    subtitle: string;
    viewCaseButton: string;
    previewLabel: string;
    modalLabels: {
      overview: string;
      tools: string;
      highlights: string;
      close: string;
      openDashboard: string;
      openLiveDashboard: string;
      workbookFile: string;
      metricsHeading: string;
      businessContextHeading: string;
      keyFindingsHeading: string;
      recommendationsHeading: string;
      parHeading: string;
      whatSoWhatHeading: string;
      previous: string;
      next: string;
    };
    items: ProjectItem[];
  };
  about: {
    headingLine1: string;
    headingLine2: string;
    paragraphLead: string;
    paragraphBody: string;
    paragraphClosing: string;
    stats: StatItem[];
    education: {
      degree: string;
      university: string;
      badge: string;
      period: string;
    };
    credentials: {
      viewCertButton: string;
      verifyLinkText: string;
      items: CertificationItem[];
    };
  };
  contact: {
    headline: string;
    subheading: string;
    availablePill: string;
    email: string;
    copyButton: string;
    copiedButton: string;
    connectLabel: string;
    backToTop: string;
    footerCopy: string;
    socials: {
      whatsapp: { label: string; url: string };
      linkedin: { label: string; url: string };
      github: { label: string; url: string };
    };
    form: {
      nameLabel: string;
      namePlaceholder: string;
      nameError: string;
      emailLabel: string;
      emailPlaceholder: string;
      emailError: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      subjectError: string;
      messageLabel: string;
      messagePlaceholder: string;
      messageError: string;
      sendButton: string;
      sendingButton: string;
      successTitle: string;
      successMessage: string;
      sendAnotherButton: string;
      fallbackNotice: string;
      errorMessage: string;
      emailDirectly: string;
    };
  };
  cvModal: {
    title: string;
    subtitle: string;
    downloadButton: string;
    closeButton: string;
    zoomIn: string;
    zoomOut: string;
    openNewTab: string;
    fallbackText: string;
  };
  certModal: {
    closeButton: string;
    downloadButton: string;
    zoomIn: string;
    zoomOut: string;
    openNewTab: string;
    verification: string;
    code: string;
    fallbackText: string;
  };
}

export const content: Record<Language, PortfolioContent> = {
  in: {
    brand: 'iqbaldf',
    monogram: 'ID',
    nav: {
      home: 'Beranda',
      skills: 'Keahlian',
      projects: 'Proyek',
      about: 'Tentang',
      contact: 'Kontak',
      menuLabel: 'Buka menu navigasi',
      closeMenuLabel: 'Tutup menu navigasi',
      toggleLangLabel: 'Ganti ke Bahasa Inggris',
    },
    hero: {
      headline: 'Mengolah data mentah menjadi keputusan bisnis yang jelas.',
      ctaProjects: 'Lihat Proyek',
      ctaCv: 'Lihat CV',
      location: 'Berdomisili di Yogyakarta, Indonesia',
      circularBadgeText: 'DATA ANALYST • IQBAL DWI FATHONAH • ',
      photoPlaceholderLabel: 'iqbaldf',
    },
    skills: {
      headline: 'Alur Kerja & Perangkat',
      subtitle: 'Tiga perangkat utama yang saya gunakan dari ekstraksi data mentah hingga keputusan operasional.',
      keyOutputLabel: 'Fokus Output',
      items: [
        {
          id: 'sql',
          index: '01',
          shortTitle: 'SQL',
          title: 'SQL',
          role: 'Ekstraksi & Validasi Data',
          stepLabel: 'STEP 01 · EXTRACT',
          focus:
            'Mengambil, menggabungkan, dan memvalidasi dataset relasional secara terstruktur sebelum masuk tahap analisis.',
          capabilities: [
            'Penggabungan multi-tabel (JOIN) dan pemfilteran kondisi transaksi (WHERE, HAVING)',
            'Agregasi metrik operasional menggunakan GROUP BY dan fungsi agregat',
            'Pengecekan konsistensi skema, duplikasi, serta anomali nilai kosong pada database',
          ],
          keyOutput: 'Dataset relasional bersih & tervalidasi',
        },
        {
          id: 'excel',
          index: '02',
          shortTitle: 'Excel',
          title: 'Microsoft Excel',
          role: 'Pembersihan, Pemodelan & Analisis',
          stepLabel: 'STEP 02 · ANALYZE',
          focus:
            'Mengolah dataset skala besar menjadi model analisis terstruktur, tabel ringkasan dinamis, dan temuan bisnis yang terukur.',
          capabilities: [
            'Pembersihan data dan standarisasi atribut skala ratusan ribu baris',
            'Pemodelan analisis dengan PivotTable, PivotChart, XLOOKUP, dan INDEX/MATCH',
            'Penyusunan narasi temuan berbasis kerangka PAR (Problem–Action–Result)',
          ],
          keyOutput: 'Diterapkan pada analisis 238.421 catatan kecelakaan lalu lintas NYC',
        },
        {
          id: 'bi',
          index: '03',
          shortTitle: 'Looker Studio',
          title: 'Google Looker Studio',
          role: 'Dashboard BI & Pelaporan KPI',
          stepLabel: 'STEP 03 · VISUALIZE',
          focus:
            'Merancang dashboard Business Intelligence interaktif agar pemangku kepentingan dapat memantau tren dan mengambil keputusan dengan cepat.',
          capabilities: [
            'Pelacakan KPI utama (Revenue, Volume Pesanan, Average Order Value, dan Jam Sibuk)',
            'Pembuatan calculated fields, filter rentang tanggal, dan segmentasi kategori dinamis',
            'Hierarki visual bersih yang langsung menyorot pola puncak dan produk kontributor utama',
          ],
          keyOutput: 'Diterapkan pada dashboard interaktif 21.350 transaksi ($817.860,05 omzet)',
        },
      ],
    },
    projects: {
      headline: 'Proyek Pilihan',
      subtitle: 'Studi kasus analisis data bisnis dan publik untuk menghasilkan insight operasional yang terukur.',
      viewCaseButton: 'Lihat Detail',
      previewLabel: 'Dashboard Preview',
      modalLabels: {
        overview: 'Ringkasan Proyek',
        tools: 'Perangkat',
        highlights: 'Temuan & Implementasi',
        close: 'Tutup',
        openDashboard: 'Buka Dashboard',
        openLiveDashboard: 'Buka Dashboard Interaktif',
        workbookFile: 'Info File',
        metricsHeading: '4 Metrik Kunci',
        businessContextHeading: 'Latar Belakang Bisnis',
        keyFindingsHeading: 'Temuan Utama',
        recommendationsHeading: 'Rekomendasi Strategis',
        parHeading: 'Kerangka PAR (Problem – Action – Result)',
        whatSoWhatHeading: 'Kerangka What – So What – Now What',
        previous: 'Sebelumnya',
        next: 'Berikutnya',
      },
      items: [
        {
          id: 'pizza-sales',
          index: '01',
          title: 'Pizza Sales Performance & Operational Analytics Dashboard',
          category: 'Business Intelligence',
          tools: ['Excel', 'Looker Studio'],
          image: '/images/projects/pizza-dashboard.png',
          liveDashboardUrl: 'https://datastudio.google.com/reporting/81574dad-5d2d-4a15-aafb-eefb54548a3e',
          shortSummary:
            'Evaluasi penjualan tahunan ($817.860,05 dari 21.350 transaksi), pola jam sibuk operasional, distribusi kategori menu, dan Top 5 SKU dalam dashboard BI interaktif.',
          description:
            'Evaluasi menyeluruh penjualan tahunan ($817.860,05 dari 21.350 transaksi), pola jam sibuk operasional (lunch rush 12.00–13.00 & dinner rush 17.00–18.00), distribusi kategori menu, dan Top 5 SKU dalam dashboard BI interaktif.',
          previewSubtitle: 'Excel · Looker Studio',
          metrics: [
            { label: 'Total Revenue', value: '$817.860,05', subtext: 'Penjualan kotor tahunan' },
            { label: 'Total Pizzas Sold', value: '49.574', subtext: 'Loyang pizza terjual' },
            { label: 'Total Orders', value: '21.350', subtext: 'Pesanan unik terproses' },
            { label: 'Average Order Value', value: '$38,31', subtext: '~2,3 loyang/pesanan' },
          ],
          businessContext: {
            heading: 'Latar Belakang Bisnis',
            body: 'Menjawab kebutuhan visibilitas efisiensi operasional jam sibuk, menu penggerak omzet & keseimbangan kategori, serta optimasi AOV dan jam sepi.',
          },
          keyFindings: {
            heading: 'Temuan Utama',
            items: [
              'Pola Jam Sibuk: Lunch Rush mulai 11.00 dan memuncak 12.00–13.00 (~2.500 pesanan/jam); Afternoon Dip 14.00–16.00 (~1.400 pesanan/jam); Dinner Rush memuncak 17.00–18.00 hingga tutup pukul 23.00.',
              'Distribusi Kategori (seimbang): Classic 26,9%, Supreme 25,5%, Chicken 24,0%, Veggie 23,7%.',
              'Top 5 SKU by Revenue: (1) The Thai Chicken Pizza $43.434,25, (2) The Barbecue Chicken Pizza $42.768,00, (3) The California Chicken Pizza $41.409,50, (4) The Classic Deluxe Pizza $38.180,50, (5) The Spicy Italian Pizza $34.831,25.',
            ],
          },
          recommendations: {
            heading: 'Rekomendasi Strategis',
            items: [
              'Penjadwalan staf bertahap (Staggered Shift) di jam 11.30–13.30 dan 16.30–18.30 untuk merespons lonjakan pesanan.',
              'Promo paket hemat personal / slice & minuman di jam sepi 14.00–16.00 untuk mendongkrak utilisasi dapur.',
              'Pengamanan stok (safety stock) bahan baku fillet ayam serta saus Thai & BBQ demi mencegah risiko kekurangan stok.',
            ],
          },
          highlights: [
            'Memvalidasi dan merekonsiliasi 21.350 transaksi penjualan ($817.860,05) menggunakan Microsoft Excel dan Google Looker Studio.',
            'Mengidentifikasi jam sibuk operasional (12.00–13.00 dan 17.00–18.00) sebagai landasan jadwal kerja bergiliran (staggered shift).',
            'Menganalisis 4 kategori menu berimbang (Classic 26,9%, Supreme 25,5%, Chicken 24,0%, Veggie 23,7%) dan memetakan Top 5 SKU.',
            'Merancang dashboard interaktif Looker Studio dengan filter kategori dan rentang tanggal untuk pemantauan KPI.',
          ],
        },
        {
          id: 'nyc-traffic',
          index: '02',
          title: 'NYC Traffic Safety Analysis',
          category: 'Public Data Analytics',
          tools: ['Excel'],
          image: '/images/projects/nyc-traffic-dashboard.png',
          workbookInfo: 'Workbook: NYC_Collisions_Analysis_Dashboard_v1.xlsx',
          shortSummary:
            'Analisis 238.421 catatan kecelakaan lalu lintas NYC (2021–2023) untuk memetakan wilayah rawan, jam puncak, dan akar penyebab utama berbasis kerangka PAR.',
          description:
            'Analisis 238.421 catatan kecelakaan lalu lintas NYC (2021–2023) untuk memetakan wilayah rawan, jam puncak, dan akar penyebab utama berbasis kerangka PAR.',
          previewSubtitle: 'Microsoft Excel',
          metrics: [
            { label: 'Total Kecelakaan', value: '238.421', subtext: 'Catatan insiden terverifikasi' },
            { label: 'Korban Luka', value: '116.227', subtext: 'Pengemudi, pejalan, pesepeda' },
            { label: 'Korban Meninggal', value: '268', subtext: 'Total fatalitas kota' },
            { label: 'Rasio Cedera', value: '48,7%', subtext: '487 cedera per 1.000 kecelakaan' },
          ],
          parFramework: {
            heading: 'Kerangka PAR (Problem – Action – Result)',
            problem:
              'Tingginya kecelakaan di NYC membutuhkan pemetaan lokasi rawan, waktu puncak, dan penyebab utama agar alokasi patroli & intervensi keselamatan tepat sasaran.',
            action:
              'Pembersihan nilai kosong & standarisasi nama borough, ekstraksi jam/bulan & rasio keparahan di Excel (PivotTable, PivotChart, Data Modeling), lalu membangun 4 sudut pandang analisis (Di Mana, Kapan Musiman, Kapan Jam, Kenapa).',
            result:
              'Brooklyn (76.416 / 32%) & Queens (63.751) menyumbang ±59% insiden; puncak musiman di bulan Maret (25.099 kasus); puncak harian sore 16.00–17.00; akar masalah dominan Driver Inattention/Distraction (58.308 kasus / ±25%), disusul Failure to Yield Right-of-Way dan Following Too Closely.',
          },
          actionFramework: {
            heading: 'Kerangka What – So What – Now What',
            items: [
              {
                title: '1. Faktor Manusia (Distraksi)',
                what: '1 dari 4 kecelakaan disebabkan oleh kelalaian atau distraksi pengemudi (58.308 kasus / ±25%).',
                soWhat: 'Faktor perilaku pengemudi jauh lebih mematikan dan dominan dibandingkan faktor kerusakan teknis kendaraan.',
                nowWhat: 'Prioritaskan kampanye edukasi anti-distraksi serta penegakan tilang elektronik di titik padat.',
              },
              {
                title: '2. Konsentrasi Wilayah (Brooklyn & Queens)',
                what: '±59% dari total insiden terkonsentrasi di 2 borough: Brooklyn (76.416) dan Queens (63.751).',
                soWhat: 'Intervensi keselamatan kota yang terfokus pada kedua wilayah ini menyelesaikan lebih dari separuh masalah.',
                nowWhat: 'Perkuat rambu peringatan, pos pantau, dan patroli aktif di persimpangan rawan kedua area.',
              },
              {
                title: '3. Waktu Sibuk Sore (14.00–18.00)',
                what: 'Lonjakan stabil sore hari yang memuncak pada jam 16.00–17.00 akibat arus komuter pulang kerja.',
                soWhat: 'Kombinasi volume kendaraan tinggi dan akumulasi kelelahan pengendara meningkatkan risiko tabrakan.',
                nowWhat: 'Perketat rekayasa lalu lintas dan siagakan unit patroli aktif pada jam 14.00–18.00.',
              },
            ],
          },
          highlights: [
            'Membersihkan dan memvalidasi 238.421 catatan kecelakaan lalu lintas NYC (2021–2023) menggunakan Microsoft Excel.',
            'Menemukan konsentrasi 59% insiden kota berpusat di Brooklyn (76.416) dan Queens (63.751).',
            'Mengidentifikasi Driver Inattention/Distraction sebagai faktor akar masalah terbesar (58.308 kasus / 24,5%).',
            'Membangun kerangka aksi What – So What – Now What untuk rekomendasi mitigasi risiko lalu lintas.',
          ],
        },
      ],
    },
    about: {
      headingLine1: 'Sedikit',
      headingLine2: 'tentang saya',
      paragraphLead: 'Halo, saya Iqbal Dwi Fathonah,',
      paragraphBody:
        ' fresh graduate S1 Teknologi Informasi Universitas Muhammadiyah Yogyakarta (2026) yang berdedikasi mengolah data mentah menjadi insight bisnis yang rapi dan terukur. ',
      paragraphClosing:
        'Saya berfokus sebagai Data Analyst menggunakan SQL, MySQL, Excel, dan Looker Studio untuk mendukung keputusan operasional.',
      stats: [
        { value: '21,350+', label: 'Transaksi Diolah' },
        { value: '238,000+', label: 'Catatan Dibersihkan' },
        { value: '2', label: 'Proyek Analisis & BI' },
      ],
      education: {
        degree: 'S1 Teknologi Informasi',
        university: 'Universitas Muhammadiyah Yogyakarta',
        badge: 'Lulus 2026',
        period: 'Sep 2022 – 2026',
      },
      credentials: {
        viewCertButton: 'Lihat Sertifikat',
        verifyLinkText: 'Verify',
        items: [
          {
            id: 'certiport-ai',
            title: 'Artificial Intelligence',
            issuer: 'Certiport (IT Specialist)',
            field: 'Artificial Intelligence',
            date: '18 Jun 2026',
            validity: 'Berlaku hingga 2031',
            verification: {
              site: 'verify.certiport.com',
              code: 'hd9z-4wLu',
              url: 'https://verify.certiport.com',
            },
            fileType: 'pdf',
            fileUrl: '/certificates/certiport-ai.pdf',
            thumbnailUrl: '/certificates/certiport-thumb.png',
          },
          {
            id: 'bnsp-web-developer',
            title: 'Certified Web Developer (CWDev)',
            issuer: 'BNSP (LSP Informatika)',
            field: 'Programming and Software Development',
            date: '17 Mar 2026',
            validity: 'Berlaku hingga 2029',
            fileType: 'image',
            fileUrl: '/certificates/bnsp-web-developer.jpg',
            thumbnailUrl: '/certificates/bnsp-web-developer.jpg',
          },
        ],
      },
    },
    contact: {
      headline: 'Siap mengolah data Anda? Mari berdiskusi.',
      subheading:
        'Terbuka untuk peran Data Analyst purnawaktu maupun kolaborasi proyek analisis dan visualisasi data.',
      availablePill: 'Tersedia untuk kerja',
      email: 'iqbalfathonah20@gmail.com',
      copyButton: 'Salin Email',
      copiedButton: 'Tersalin ✓',
      connectLabel: 'Terhubung di',
      backToTop: 'Kembali ke Atas',
      footerCopy: '© 2026 iqbaldf · Iqbal Dwi Fathonah · Yogyakarta, Indonesia',
      socials: {
        whatsapp: {
          label: 'WhatsApp',
          url: 'https://wa.me/6285726168917',
        },
        linkedin: {
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/iqbal-dwi-fathonah-56ba2a3b0',
        },
        github: {
          label: 'GitHub',
          url: 'https://github.com/qivoradev',
        },
      },
      form: {
        nameLabel: 'Nama Lengkap',
        namePlaceholder: 'Nama lengkap Anda',
        nameError: 'Nama lengkap wajib diisi',
        emailLabel: 'Email',
        emailPlaceholder: 'nama@perusahaan.com',
        emailError: 'Masukkan alamat email yang valid',
        subjectLabel: 'Subjek',
        subjectPlaceholder: 'Peluang Kerja / Kolaborasi Analisis Data',
        subjectError: 'Subjek wajib diisi',
        messageLabel: 'Pesan',
        messagePlaceholder: 'Ceritakan kebutuhan analisis data atau peran yang tersedia...',
        messageError: 'Pesan minimal 10 karakter',
        sendButton: 'Kirim Pesan →',
        sendingButton: 'Mengirim...',
        successTitle: 'Pesan terkirim. Terima kasih.',
        successMessage: 'Terima kasih telah menghubungi saya. Pesan Anda telah diterima dan akan segera saya balas.',
        sendAnotherButton: 'Kirim Pesan Lain',
        fallbackNotice: 'Kunci API belum aktif. Mengarahkan ke aplikasi email Anda...',
        errorMessage: 'Gagal mengirim pesan. Silakan coba lagi atau kirim email langsung.',
        emailDirectly: 'Kirim email langsung',
      },
    },
    cvModal: {
      title: 'Curriculum Vitae',
      subtitle: 'Iqbal Dwi Fathonah · Data Analyst',
      downloadButton: 'Unduh PDF',
      closeButton: 'Tutup',
      zoomIn: 'Perbesar 2×',
      zoomOut: 'Pas Layar',
      openNewTab: 'Buka tab baru',
      fallbackText: 'Gagal merender dokumen secara langsung.',
    },
    certModal: {
      closeButton: 'Tutup',
      downloadButton: 'Unduh Berkas',
      zoomIn: 'Perbesar 2×',
      zoomOut: 'Pas Layar',
      openNewTab: 'Buka tab baru',
      verification: 'Verifikasi Resmi',
      code: 'Kode',
      fallbackText: 'Buka berkas di tab baru',
    },
  },
  en: {
    brand: 'iqbaldf',
    monogram: 'ID',
    nav: {
      home: 'Home',
      skills: 'Skills',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      menuLabel: 'Open navigation menu',
      closeMenuLabel: 'Close navigation menu',
      toggleLangLabel: 'Switch to Indonesian',
    },
    hero: {
      headline: 'Turning raw data into clear business decisions.',
      ctaProjects: 'View Projects',
      ctaCv: 'View CV',
      location: 'Based in Yogyakarta, Indonesia',
      circularBadgeText: 'DATA ANALYST • IQBAL DWI FATHONAH • ',
      photoPlaceholderLabel: 'iqbaldf',
    },
    skills: {
      headline: 'Workflow & Stack',
      subtitle: 'Three core tools I rely on from raw data extraction to clear operational decisions.',
      keyOutputLabel: 'Key Output',
      items: [
        {
          id: 'sql',
          index: '01',
          shortTitle: 'SQL',
          title: 'SQL',
          role: 'Data Extraction & Validation',
          stepLabel: 'STEP 01 · EXTRACT',
          focus:
            'Querying, joining, and validating structured relational datasets prior to business analysis.',
          capabilities: [
            'Multi-table joins (JOIN) and conditional transaction filtering (WHERE, HAVING)',
            'Operational metric aggregation using GROUP BY and summary functions',
            'Schema consistency checks, deduplication, and null-value validation',
          ],
          keyOutput: 'Clean, validated relational datasets',
        },
        {
          id: 'excel',
          index: '02',
          shortTitle: 'Excel',
          title: 'Microsoft Excel',
          role: 'Cleaning, Modeling & Analysis',
          stepLabel: 'STEP 02 · ANALYZE',
          focus:
            'Transforming large raw datasets into structured analytical models, dynamic summaries, and measurable findings.',
          capabilities: [
            'Large-scale data cleaning and attribute standardization across hundreds of thousands of rows',
            'Analytical modeling using PivotTable, PivotChart, XLOOKUP, and INDEX/MATCH',
            'Structured business takeaways using the PAR (Problem–Action–Result) framework',
          ],
          keyOutput: 'Applied to 238,421 NYC motor vehicle collision records',
        },
        {
          id: 'bi',
          index: '03',
          shortTitle: 'Looker Studio',
          title: 'Google Looker Studio',
          role: 'BI Dashboards & KPI Reporting',
          stepLabel: 'STEP 03 · VISUALIZE',
          focus:
            'Designing interactive Business Intelligence dashboards so stakeholders can monitor trends and act quickly.',
          capabilities: [
            'Core KPI tracking (Revenue, Order Volume, Average Order Value, and Peak Hours)',
            'Calculated fields, date-range filters, and dynamic category segmentation',
            'Clean visual hierarchy highlighting peak patterns and top-performing products',
          ],
          keyOutput: 'Applied to an interactive dashboard covering 21,350 orders ($817,860.05 revenue)',
        },
      ],
    },
    projects: {
      headline: 'Selected Work',
      subtitle: 'Business and public data analytics case studies built to deliver measurable operational clarity.',
      viewCaseButton: 'View Case Study',
      previewLabel: 'Dashboard Preview',
      modalLabels: {
        overview: 'Project Overview',
        tools: 'Tools',
        highlights: 'Key Findings & Implementation',
        close: 'Close',
        openDashboard: 'Open Dashboard',
        openLiveDashboard: 'Open Live Dashboard',
        workbookFile: 'File Info',
        metricsHeading: '4 Key Metrics',
        businessContextHeading: 'Business Context',
        keyFindingsHeading: 'Key Findings',
        recommendationsHeading: 'Strategic Recommendations',
        parHeading: 'PAR Framework (Problem – Action – Result)',
        whatSoWhatHeading: 'What – So What – Now What Framework',
        previous: 'Previous',
        next: 'Next',
      },
      items: [
        {
          id: 'pizza-sales',
          index: '01',
          title: 'Pizza Sales Performance & Operational Analytics Dashboard',
          category: 'Business Intelligence',
          tools: ['Excel', 'Looker Studio'],
          image: '/images/projects/pizza-dashboard.png',
          liveDashboardUrl: 'https://datastudio.google.com/reporting/81574dad-5d2d-4a15-aafb-eefb54548a3e',
          shortSummary:
            'Annual sales evaluation ($817,860.05 across 21,350 orders), operational peak-hour patterns, menu category mix, and Top 5 SKUs in an interactive BI dashboard.',
          description:
            'Comprehensive annual sales evaluation ($817,860.05 across 21,350 orders), operational rush-hour mapping (lunch rush 12:00–13:00 & dinner rush 17:00–18:00), menu category mix, and Top 5 SKUs in an interactive BI dashboard.',
          previewSubtitle: 'Excel · Looker Studio',
          metrics: [
            { label: 'Total Revenue', value: '$817,860.05', subtext: 'Annual gross revenue' },
            { label: 'Total Pizzas Sold', value: '49,574', subtext: 'Units sold citywide' },
            { label: 'Total Orders', value: '21,350', subtext: 'Unique processed orders' },
            { label: 'Average Order Value', value: '$38.31', subtext: '~2.3 pizzas per order' },
          ],
          businessContext: {
            heading: 'Business Context',
            body: 'Addressing the need for operational peak-hour visibility, revenue-driving menu items & category balance, and optimizing AOV during off-peak hours.',
          },
          keyFindings: {
            heading: 'Key Findings',
            items: [
              'Peak Ordering Patterns: Lunch Rush begins at 11:00 peaking at 12:00–13:00 (~2,500 orders/hr); Afternoon Dip at 14:00–16:00 (~1,400 orders/hr); Dinner Rush peaks at 17:00–18:00 until closing at 23:00.',
              'Category Distribution (Balanced Mix): Classic 26.9%, Supreme 25.5%, Chicken 24.0%, Veggie 23.7%.',
              'Top 5 SKUs by Revenue: (1) The Thai Chicken Pizza $43,434.25, (2) The Barbecue Chicken Pizza $42,768.00, (3) The California Chicken Pizza $41,409.50, (4) The Classic Deluxe Pizza $38,180.50, (5) The Spicy Italian Pizza $34,831.25.',
            ],
          },
          recommendations: {
            heading: 'Strategic Recommendations',
            items: [
              'Staggered staff scheduling during peak windows (11:30–13:30 and 16:30–18:30) to absorb volume spikes without labor overhead.',
              'Targeted off-peak bundle promotions (single slice combo + drink) during 14:00–16:00 to lift kitchen utilization.',
              'Safety stock procurement buffers for chicken fillets and proprietary Thai & BBQ sauces to prevent revenue stockouts on top performers.',
            ],
          },
          highlights: [
            'Validated and reconciled 21,350 sales transactions ($817,860.05) using Microsoft Excel and Google Looker Studio.',
            'Pinpointed operational peak hours (12:00–13:00 and 17:00–18:00) to optimize staggered shift workforce allocations.',
            'Analyzed four balanced menu categories (Classic 26.9%, Supreme 25.5%, Chicken 24.0%, Veggie 23.7%) and identified Top 5 SKUs.',
            'Designed an interactive Looker Studio dashboard with category and date-range filters for active KPI monitoring.',
          ],
        },
        {
          id: 'nyc-traffic',
          index: '02',
          title: 'NYC Traffic Safety Analysis',
          category: 'Public Data Analytics',
          tools: ['Excel'],
          image: '/images/projects/nyc-traffic-dashboard.png',
          workbookInfo: 'Workbook: NYC_Collisions_Analysis_Dashboard_v1.xlsx',
          shortSummary:
            'Analysis of 238,421 NYC motor vehicle collision records (2021–2023) mapping high-risk boroughs, peak hours, and root causes using the PAR framework.',
          description:
            'Analysis of 238,421 NYC motor vehicle collision records (2021–2023) mapping high-risk boroughs, peak hours, and root causes using the PAR framework.',
          previewSubtitle: 'Microsoft Excel',
          metrics: [
            { label: 'Total Collisions', value: '238,421', subtext: 'Verified collision records' },
            { label: 'Total Injuries', value: '116,227', subtext: 'Motorists, pedestrians, cyclists' },
            { label: 'Fatalities', value: '268', subtext: 'Citywide fatal outcomes' },
            { label: 'Injury Rate', value: '48.7%', subtext: '487 injuries per 1,000 crashes' },
          ],
          parFramework: {
            heading: 'PAR Framework (Problem – Action – Result)',
            problem:
              'High frequency of traffic collisions in NYC required spatial, temporal, and root-cause mapping to prioritize patrol allocations and safety interventions effectively.',
            action:
              'Data cleaning of missing values and borough name standardization, temporal extraction (hour/month) and severity ratio modeling in Excel (PivotTables, PivotCharts, Data Modeling) across 4 dimensions (Where, When Seasonally, When Hourly, Why).',
            result:
              'Brooklyn (76,416 / 32%) & Queens (63,751) account for ~59% of incidents; seasonal peak in March (25,099 cases); daily peak during evening rush 16:00–17:00; dominant root cause is Driver Inattention/Distraction (58,308 cases / ~25%), followed by Failure to Yield Right-of-Way and Following Too Closely.',
          },
          actionFramework: {
            heading: 'What – So What – Now What Framework',
            items: [
              {
                title: '1. Human Factors (Distraction)',
                what: '1 in 4 accidents stem from driver inattention or distraction (58,308 cases / ~25%).',
                soWhat: 'Behavioral negligence is drastically more lethal and prevalent than mechanical vehicle failure.',
                nowWhat: 'Prioritize targeted anti-distraction public campaigns and automated camera enforcement at dense corridors.',
              },
              {
                title: '2. Geographic Concentration (Brooklyn & Queens)',
                what: '~59% of all collisions occur in just two boroughs: Brooklyn (76,416) and Queens (63,751).',
                soWhat: 'Targeted municipal intervention resolves over half the citywide issue.',
                nowWhat: 'Reinforce signage, monitoring posts, and patrol visibility at critical intersections in both boroughs.',
              },
              {
                title: '3. Evening Rush Peak (14:00–18:00)',
                what: 'Steady afternoon surge peaking between 16:00–17:00 driven by commuter volume and driver fatigue.',
                soWhat: 'High traffic volume compounded by operator fatigue sharply increases collision probability.',
                nowWhat: 'Optimize signal timing and deploy active traffic safety patrols between 14:00 and 18:00.',
              },
            ],
          },
          highlights: [
            'Cleaned and validated 238,421 NYC collision records (2021–2023) using Microsoft Excel.',
            'Pinpointed that 59% of incidents are concentrated in Brooklyn (76,416) and Queens (63,751).',
            'Identified Driver Inattention/Distraction as the leading root cause (58,308 cases / 24.5%).',
            'Structured actionable What – So What – Now What takeaways for municipal traffic mitigation.',
          ],
        },
      ],
    },
    about: {
      headingLine1: 'A little bit',
      headingLine2: 'about me',
      paragraphLead: "Hi, I'm Iqbal Dwi Fathonah,",
      paragraphBody:
        ' an Information Technology graduate from Universitas Muhammadiyah Yogyakarta (2026) dedicated to transforming raw datasets into clear, measurable business insights. ',
      paragraphClosing:
        'I specialize as a Data Analyst using SQL, MySQL, Excel, and Looker Studio to support operational decisions.',
      stats: [
        { value: '21,350+', label: 'Transactions Analyzed' },
        { value: '238,000+', label: 'Records Cleaned' },
        { value: '2', label: 'Analytics & BI Projects' },
      ],
      education: {
        degree: 'Bachelor of Information Technology (S1)',
        university: 'Universitas Muhammadiyah Yogyakarta',
        badge: 'Graduated 2026',
        period: 'Sep 2022 – 2026',
      },
      credentials: {
        viewCertButton: 'View Certificate',
        verifyLinkText: 'Verify',
        items: [
          {
            id: 'certiport-ai',
            title: 'Artificial Intelligence',
            issuer: 'Certiport (IT Specialist)',
            field: 'Artificial Intelligence',
            date: 'Jun 18, 2026',
            validity: 'Valid until 2031',
            verification: {
              site: 'verify.certiport.com',
              code: 'hd9z-4wLu',
              url: 'https://verify.certiport.com',
            },
            fileType: 'pdf',
            fileUrl: '/certificates/certiport-ai.pdf',
            thumbnailUrl: '/certificates/certiport-thumb.png',
          },
          {
            id: 'bnsp-web-developer',
            title: 'Certified Web Developer (CWDev)',
            issuer: 'BNSP (LSP Informatika)',
            field: 'Programming and Software Development',
            date: 'Mar 17, 2026',
            validity: 'Valid until 2029',
            fileType: 'image',
            fileUrl: '/certificates/bnsp-web-developer.jpg',
            thumbnailUrl: '/certificates/bnsp-web-developer.jpg',
          },
        ],
      },
    },
    contact: {
      headline: "Ready to turn data into clarity? Let's talk.",
      subheading:
        'Open for full-time Data Analyst opportunities as well as data analytics and visualization collaborations.',
      availablePill: 'Available for work',
      email: 'iqbalfathonah20@gmail.com',
      copyButton: 'Copy Email',
      copiedButton: 'Copied ✓',
      connectLabel: 'Connect on',
      backToTop: 'Back to Top',
      footerCopy: '© 2026 iqbaldf · Iqbal Dwi Fathonah · Yogyakarta, Indonesia',
      socials: {
        whatsapp: {
          label: 'WhatsApp',
          url: 'https://wa.me/6285726168917',
        },
        linkedin: {
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/iqbal-dwi-fathonah-56ba2a3b0',
        },
        github: {
          label: 'GitHub',
          url: 'https://github.com/qivoradev',
        },
      },
      form: {
        nameLabel: 'Full Name',
        namePlaceholder: 'Your full name',
        nameError: 'Full name is required',
        emailLabel: 'Email Address',
        emailPlaceholder: 'name@company.com',
        emailError: 'Please enter a valid email address',
        subjectLabel: 'Subject',
        subjectPlaceholder: 'Job Opportunity / Data Analytics Collaboration',
        subjectError: 'Subject is required',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell me about your data analytics needs or open role...',
        messageError: 'Message must be at least 10 characters',
        sendButton: 'Send Message →',
        sendingButton: 'Sending...',
        successTitle: 'Message sent. Thank you.',
        successMessage: 'Thank you for reaching out. Your message has been received and I will reply shortly.',
        sendAnotherButton: 'Send Another Message',
        fallbackNotice: 'API key not configured. Opening your email client...',
        errorMessage: 'Failed to send message. Please try again or email directly.',
        emailDirectly: 'Email directly',
      },
    },
    cvModal: {
      title: 'Curriculum Vitae',
      subtitle: 'Iqbal Dwi Fathonah · Data Analyst',
      downloadButton: 'Download PDF',
      closeButton: 'Close',
      zoomIn: 'Zoom 2×',
      zoomOut: 'Fit to View',
      openNewTab: 'Open in new tab',
      fallbackText: 'Failed to render document directly.',
    },
    certModal: {
      closeButton: 'Close',
      downloadButton: 'Download File',
      zoomIn: 'Zoom 2×',
      zoomOut: 'Fit to View',
      openNewTab: 'Open in new tab',
      verification: 'Official Verification',
      code: 'Code',
      fallbackText: 'Open file in new tab',
    },
  },
};
