/**
 * CONTENT DATA — Bilingual Source of Truth for iqbaldf Portfolio
 * Owner: Iqbal Dwi Fathonah
 * Role: Data Analyst (Fresh Graduate)
 *
 * Strictly permitted stack: SQL, MySQL, Excel, Looker Studio, Git.
 * Verified metrics only: 21,350+, $817K+, 238,000+, 12–13 & 17–18, Top 5 SKU, 3 projects.
 */

export type Language = 'in' | 'en';

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
  dashboardUrl?: string;
}

export interface SkillCardItem {
  id: 'sql' | 'excel' | 'bi';
  title: string;
  description: string;
  pills: string[];
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
    sectionLabel: string;
    headline: string;
    subtitle: string;
    items: SkillCardItem[];
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
      sectionLabel: 'Keahlian Inti',
      headline: 'Perangkat & Fokus Analisis',
      subtitle: 'Fondasi teknis untuk ekstraksi data, pembersihan dataset, hingga pelaporan KPI interaktif.',
      items: [
        {
          id: 'sql',
          title: 'SQL & Database',
          description: 'Ekstraksi data relasional, agregasi, dan validasi query terstruktur.',
          pills: ['SQL', 'MySQL', 'Data Extraction', 'Relational Query'],
        },
        {
          id: 'excel',
          title: 'Spreadsheet & Reporting',
          description: 'Pembersihan dataset skala besar, PivotTable, XLOOKUP, dan ringkasan bisnis kerangka PAR.',
          pills: ['Excel', 'PivotTable', 'XLOOKUP', 'Data Cleaning'],
        },
        {
          id: 'bi',
          title: 'Dashboard & BI',
          description: 'Visualisasi metrik operasional, pelacakan KPI, dan dashboard interaktif untuk pengambilan keputusan.',
          pills: ['Looker Studio', 'Interactive BI', 'KPI Reporting', 'Git'],
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
        previous: 'Sebelumnya',
        next: 'Berikutnya',
      },
      items: [
        {
          id: 'pizza-sales',
          index: '01',
          title: 'Pizza Sales Performance & Operational Dashboard',
          category: 'Business Intelligence Project',
          tools: ['Excel', 'Looker Studio'],
          shortSummary:
            'Rekonsiliasi 21,350+ transaksi ($817K+ revenue), pola jam sibuk 12–13 & 17–18, kategori menu, serta Top 5 SKU dalam dashboard BI interaktif.',
          description:
            'Analisis rekonsiliasi penjualan dan efisiensi operasional dari 21,350+ transaksi dengan total revenue $817K+. Memetakan pola jam sibuk (12–13 dan 17–18), kontribusi kategori menu, serta Top 5 SKU ke dalam dashboard BI interaktif.',
          previewSubtitle: 'Excel · Looker Studio',
          highlights: [
            'Memvalidasi dan merekonsiliasi lebih dari 21,350+ transaksi penjualan dengan total revenue $817K+ menggunakan Microsoft Excel dan Google Looker Studio.',
            'Mengidentifikasi pola jam sibuk operasional pada pukul 12–13 dan 17–18 sebagai dasar rekomendasi penjadwalan staf (staggered shift).',
            'Menganalisis performa empat kategori menu (Classic, Supreme, Chicken, Veggie) dan memetakan Top 5 SKU untuk mendukung kontrol inventaris.',
            'Merancang dashboard BI interaktif untuk memantau kinerja produk dan tren pesanan secara berkala.',
          ],
        },
        {
          id: 'superstore-sales',
          index: '02',
          title: 'Superstore Sales & Profitability Analysis',
          category: 'Commercial Analytics Project',
          tools: ['Excel'],
          shortSummary:
            'Analisis tren penjualan, profitabilitas lintas wilayah, dan dampak diskon terhadap margin laba dengan ringkasan kerangka PAR.',
          description:
            'Evaluasi menyeluruh atas tren penjualan musiman dan profitabilitas lintas wilayah. Berfokus pada pengukuran dampak diskon terhadap margin laba bersih yang dirangkum menggunakan kerangka PAR (Problem, Action, Result).',
          previewSubtitle: 'Microsoft Excel',
          highlights: [
            'Menganalisis tren penjualan musiman serta perbandingan profitabilitas lintas wilayah pada dataset transaksi ritel.',
            'Membangun pelaporan interaktif menggunakan PivotTable, Calculated Fields, dan Slicers untuk menelusuri dampak diskon terhadap margin laba.',
            'Menyusun ringkasan analisis terstruktur berbasis kerangka PAR (Problem, Action, Result) guna mendukung evaluasi strategi harga.',
          ],
        },
        {
          id: 'nyc-traffic',
          index: '03',
          title: 'NYC Traffic Safety Analysis',
          category: 'Public Data Analytics Project',
          tools: ['Excel'],
          shortSummary:
            'Pembersihan dan validasi 238,000+ catatan kecelakaan lalu lintas untuk root cause analysis serta pemetaan pola insiden.',
          description:
            'Pembersihan, normalisasi, dan validasi dataset publik berskala besar mencakup 238,000+ catatan kecelakaan lalu lintas untuk melakukan root cause analysis terhadap faktor risiko utama dan pola kejadian.',
          previewSubtitle: 'Microsoft Excel',
          highlights: [
            'Membersihkan dan memvalidasi lebih dari 238,000+ catatan kecelakaan lalu lintas guna menjaga konsistensi analisis.',
            'Melakukan root cause analysis menggunakan XLOOKUP, INDEX/MATCH, dan PivotTable untuk memetakan faktor risiko utama serta pola waktu insiden.',
            'Menyajikan ringkasan temuan terstruktur sebagai landasan rekomendasi peningkatan keselamatan operasional.',
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
        { value: '3', label: 'Proyek Analisis & BI' },
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
      sectionLabel: 'Core Skills',
      headline: 'Analytical Stack & Focus',
      subtitle: 'Technical foundation for relational extraction, dataset cleaning, and interactive KPI reporting.',
      items: [
        {
          id: 'sql',
          title: 'SQL & Database',
          description: 'Relational data extraction, aggregation, and structured query validation.',
          pills: ['SQL', 'MySQL', 'Data Extraction', 'Relational Query'],
        },
        {
          id: 'excel',
          title: 'Spreadsheet & Reporting',
          description: 'Large-scale dataset cleaning, PivotTables, XLOOKUP, and PAR-framework business summaries.',
          pills: ['Excel', 'PivotTable', 'XLOOKUP', 'Data Cleaning'],
        },
        {
          id: 'bi',
          title: 'Dashboard & BI',
          description: 'Operational metric visualization, KPI tracking, and interactive dashboards for decision-making.',
          pills: ['Looker Studio', 'Interactive BI', 'KPI Reporting', 'Git'],
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
        previous: 'Previous',
        next: 'Next',
      },
      items: [
        {
          id: 'pizza-sales',
          index: '01',
          title: 'Pizza Sales Performance & Operational Dashboard',
          category: 'Business Intelligence Project',
          tools: ['Excel', 'Looker Studio'],
          shortSummary:
            'Reconciliation of 21,350+ transactions ($817K+ revenue), peak hours 12–13 & 17–18, menu categories, and Top 5 SKUs in an interactive BI dashboard.',
          description:
            'Sales reconciliation and operational efficiency analysis across 21,350+ transactions generating $817K+ in revenue. Mapped rush-hour demand (12–13 and 17–18), menu category contribution, and Top 5 SKUs in an interactive BI dashboard.',
          previewSubtitle: 'Excel · Looker Studio',
          highlights: [
            'Validated and reconciled 21,350+ sales transactions totaling $817K+ in revenue using Microsoft Excel and Google Looker Studio.',
            'Identified peak operational hours at 12–13 and 17–18 to guide staggered staff scheduling recommendations.',
            'Evaluated four menu categories (Classic, Supreme, Chicken, Veggie) and identified Top 5 SKUs to support inventory control.',
            'Built an interactive BI dashboard to monitor product performance and order patterns continuously.',
          ],
        },
        {
          id: 'superstore-sales',
          index: '02',
          title: 'Superstore Sales & Profitability Analysis',
          category: 'Commercial Analytics Project',
          tools: ['Excel'],
          shortSummary:
            'Sales trend evaluation, cross-regional profitability, and discount impact on net margin summarized with the PAR framework.',
          description:
            'Comprehensive review of seasonal sales trends and cross-regional profitability. Focused on measuring how discount policies impact net profit margins, summarized through the PAR (Problem, Action, Result) framework.',
          previewSubtitle: 'Microsoft Excel',
          highlights: [
            'Analyzed seasonal retail sales trends and profitability differences across regions.',
            'Built interactive reporting with PivotTables, Calculated Fields, and Slicers to evaluate discount impact on net profit margin.',
            'Structured executive findings using the PAR (Problem, Action, Result) framework to inform pricing strategy reviews.',
          ],
        },
        {
          id: 'nyc-traffic',
          index: '03',
          title: 'NYC Traffic Safety Analysis',
          category: 'Public Data Analytics Project',
          tools: ['Excel'],
          shortSummary:
            'Cleaning and validation of 238,000+ traffic accident records for root cause analysis and incident pattern mapping.',
          description:
            'Large-scale data cleaning, normalization, and validation covering 238,000+ traffic accident records to perform root cause analysis on primary risk factors and incident patterns.',
          previewSubtitle: 'Microsoft Excel',
          highlights: [
            'Cleaned and validated 238,000+ public traffic accident records to ensure analytical consistency.',
            'Performed root cause analysis using XLOOKUP, INDEX/MATCH, and PivotTables to pinpoint primary risk factors and peak incident windows.',
            'Delivered structured summaries of incident patterns to support operational safety recommendations.',
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
        { value: '3', label: 'Analytics & BI Projects' },
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
