/**
 * CONTENT DATA — Bilingual Source of Truth for iqbaldf Portfolio
 * Owner: Iqbal Dwi Fathonah
 * Role: Data Analyst (Fresh Graduate)
 *
 * Stack mastered strictly limited to: SQL, MySQL, Excel, Looker Studio, Git.
 */

export type Language = 'in' | 'en';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tools: string[];
  toolsText: string;
  description: string;
  fact: string;
  previewLabel: string;
  highlights: string[];
  dashboardUrl?: string;
}

export interface SkillItem {
  title: string;
  description: string;
  tools: string[];
  toolsText: string;
  scope: string;
  levelOrUsageLabel: string;
  levelOrUsageValue: string;
}

export interface MetricItem {
  value: number;
  suffix: string;
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
}

export interface PortfolioContent {
  brand: string;
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    credentials: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    ctaProjects: string;
    ctaCv: string;
    cursorLeft: string;
    cursorRight: string;
    bottomLinks: {
      projects: string;
      skills: string;
      credentials: string;
      contact: string;
    };
  };
  console: {
    sampleData: string;
    modeLabel: string;
    modes: {
      sql: string;
      excel: string;
      dashboard: string;
    };
    metrics: {
      sales: string;
      orders: string;
      customers: string;
      growth: string;
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
  about: {
    sectionLabel: string;
    headline: string;
    story: string;
    metrics: MetricItem[];
    approach: {
      label: string;
      steps: string[];
    };
  };
  projects: {
    sectionLabel: string;
    headline: string;
    subtitle: string;
    viewCase: string;
    viewDetails: string;
    modalLabels: {
      overview: string;
      context: string;
      tools: string;
      highlights: string;
      close: string;
      openDashboard: string;
      previous: string;
      next: string;
    };
    items: ProjectItem[];
  };
  skills: {
    sectionLabel: string;
    headline: string;
    metaLabels: {
      scope: string;
      tools: string;
    };
    items: SkillItem[];
    softSkillsLabel: string;
    softSkills: string[];
  };
  credentials: {
    sectionLabel: string;
    headline: string;
    educationTitle: string;
    degree: string;
    university: string;
    period: string;
    certificationsTitle: string;
    viewCertButton: string;
    verifyLinkText: string;
    certifications: CertificationItem[];
  };
  contact: {
    sectionLabel: string;
    heading: string;
    subheading: string;
    email: string;
    copyButton: string;
    copiedButton: string;
    socials: {
      label: string;
      url: string;
    }[];
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
    footerCopy: string;
    footerLocation: string;
  };
}

export const content: Record<Language, PortfolioContent> = {
  in: {
    brand: 'iqbaldf',
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      projects: 'Proyek',
      skills: 'Keahlian',
      credentials: 'Kredensial',
      contact: 'Kontak',
    },
    hero: {
      eyebrow: 'Data Analyst',
      headlineLine1: 'Mengolah data mentah',
      headlineLine2: 'menjadi keputusan bisnis yang jelas',
      ctaProjects: 'Lihat Proyek',
      ctaCv: 'Lihat CV',
      cursorLeft: 'SQL · MySQL',
      cursorRight: 'Excel · Looker Studio',
      bottomLinks: {
        projects: 'Proyek',
        skills: 'Keahlian',
        credentials: 'Kredensial',
        contact: 'Kontak',
      },
    },
    console: {
      sampleData: 'Data contoh',
      modeLabel: 'MODE',
      modes: {
        sql: 'Kueri SQL',
        excel: 'Laporan Excel',
        dashboard: 'Dashboard',
      },
      metrics: {
        sales: 'Penjualan',
        orders: 'Pesanan',
        customers: 'Pelanggan',
        growth: 'Pertumbuhan',
      },
    },
    cvModal: {
      title: 'Curriculum Vitae',
      subtitle: 'Iqbal Dwi Fathonah · Data Analyst (Fresh Graduate)',
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
    about: {
      sectionLabel: 'Tentang Saya',
      headline: 'Mengolah data menjadi keputusan bisnis yang jelas.',
      story:
        'Fresh graduate Teknologi Informasi UMY dengan fokus pada analisis data bisnis, pemodelan data relasional, dan Business Intelligence. Menggunakan Microsoft Excel tingkat lanjut (PivotTable, XLOOKUP, Data Modeling) dan Google Looker Studio untuk dashboard interaktif. Memiliki pemahaman di bidang Artificial Intelligence (Certiport) dan Web Development (BNSP). Terbiasa mengolah dan memvalidasi puluhan ribu baris data transaksi untuk mengidentifikasi tren, mengevaluasi performa produk, dan mendukung keputusan bisnis.',
      metrics: [
        {
          value: 21350,
          suffix: '+',
          label: 'transaksi diolah',
        },
        {
          value: 238000,
          suffix: '+',
          label: 'data dibersihkan',
        },
        {
          value: 3,
          suffix: '',
          label: 'proyek BI',
        },
      ],
      approach: {
        label: '5-Step Analytical Approach',
        steps: [
          'Memahami konteks & rumusan masalah bisnis',
          'Pembersihan, normalisasi, dan validasi data transaksi',
          'Ekstraksi relasional dengan query SQL terstruktur',
          'Penyusunan ringkasan pelaporan & visualisasi metrik',
          'Menyampaikan insight rekomendasi yang aplikatif',
        ],
      },
    },
    projects: {
      sectionLabel: 'Karya Pilihan',
      headline: 'Proyek Pilihan',
      subtitle: '3 Studi Kasus Bisnis & Data Publik',
      viewCase: 'Lihat Kasus',
      viewDetails: 'Lihat detail →',
      modalLabels: {
        overview: 'Ringkasan',
        context: 'Konteks & Lingkup',
        tools: 'Tools',
        highlights: 'Sorotan Implementasi',
        close: 'Tutup',
        openDashboard: 'Buka Dashboard',
        previous: '← Sebelumnya',
        next: 'Berikutnya →',
      },
      items: [
        {
          id: 'pizza-sales',
          title: 'Pizza Sales Performance & Operational Dashboard',
          category: 'Business Intelligence Project',
          tools: ['Excel', 'Looker Studio'],
          toolsText: 'Excel · Looker Studio',
          description:
            'Rekonsiliasi penjualan dan analisis jam sibuk dari 21.350+ transaksi, dengan dashboard BI interaktif.',
          fact: '21.350+ transaksi · pendapatan $817K+',
          previewLabel: 'Pola jam sibuk',
          highlights: [
            'Mengolah dan memvalidasi rekonsiliasi data lebih dari 21.350 transaksi penjualan tahunan ($817K+) menggunakan Microsoft Excel dan Google Looker Studio.',
            'Mengidentifikasi pola jam sibuk operasional pada 12.00–13.00 dan 17.00–18.00 untuk rekomendasi penjadwalan staf (staggered shift).',
            'Menganalisis kontribusi kategori menu (Classic, Supreme, Chicken, Veggie) dan memetakan 5 produk terlaris (Top 5 SKU) untuk mendukung visibilitas supply chain dan inventory control.',
            'Merancang dashboard BI interaktif untuk memantau Average Order Value (AOV) dan kinerja produk secara berkala.',
          ],
        },
        {
          id: 'superstore-sales',
          title: 'Superstore Sales & Profitability Analysis',
          category: 'Commercial Analytics Project',
          tools: ['Excel'],
          toolsText: 'Excel',
          description:
            'Analisis tren penjualan musiman dan profitabilitas wilayah, berfokus pada dampak diskon terhadap margin laba bersih.',
          fact: 'Ribuan baris data transaksi',
          previewLabel: 'Margin per wilayah',
          highlights: [
            'Menganalisis tren penjualan ritel musiman dan profitabilitas lintas wilayah dari ribuan baris data transaksi.',
            'Membangun dashboard interaktif dengan PivotTable, Calculated Fields, dan Slicers untuk mengevaluasi dampak diskon terhadap penurunan margin laba bersih.',
            'Menyusun ringkasan wawasan dengan kerangka PAR (Problem, Action, Result) untuk evaluasi efektivitas promosi dan rekomendasi strategi harga.',
          ],
        },
        {
          id: 'nyc-traffic',
          title: 'NYC Traffic Safety Analysis',
          category: 'Public Data Analytics Project',
          tools: ['Excel'],
          toolsText: 'Excel',
          description:
            'Pembersihan dan validasi 238.000+ catatan kecelakaan lalu lintas untuk menemukan faktor risiko utama dan pola insiden.',
          fact: '238.000+ catatan insiden lalu lintas',
          previewLabel: 'Insiden per jam',
          highlights: [
            'Mengolah, membersihkan, dan memvalidasi dataset lebih dari 238.000 catatan kecelakaan lalu lintas.',
            'Merancang dashboard berbasis formula lanjutan (XLOOKUP, INDEX/MATCH) dan Pivot Charts untuk Root Cause Analysis atas faktor risiko utama dan konsentrasi waktu insiden.',
            'Menghasilkan visualisasi terstruktur untuk mengidentifikasi pola insiden sebagai dasar rekomendasi keselamatan operasional.',
          ],
        },
      ],
    },
    skills: {
      sectionLabel: 'Kemampuan Inti',
      headline: 'Keahlian & Tools',
      metaLabels: {
        scope: 'Cakupan',
        tools: 'Tools',
      },
      items: [
        {
          title: 'SQL & Database',
          description:
            'Dasar pemodelan relasional dan ekstraksi query terstruktur (JOIN, Grouping, Having, Filtering).',
          tools: ['SQL', 'MySQL'],
          toolsText: 'SQL · MySQL (dasar: JOIN, Grouping, Having, Filtering)',
          scope: 'JOIN · Grouping · Having · Filtering',
          levelOrUsageLabel: 'Tingkat',
          levelOrUsageValue: 'Dasar',
        },
        {
          title: 'Spreadsheet & Reporting',
          description:
            'Pengolahan data tingkat lanjut (PivotTable, XLOOKUP, INDEX/MATCH, Data Modeling) serta pembersihan data.',
          tools: ['Microsoft Excel'],
          toolsText: 'Microsoft Excel (PivotTable, XLOOKUP, INDEX/MATCH, Data Modeling) · Data Cleaning',
          scope: 'PivotTable · XLOOKUP · INDEX/MATCH · Data Modeling · Data Cleaning',
          levelOrUsageLabel: 'Tingkat',
          levelOrUsageValue: 'Lanjut',
        },
        {
          title: 'Dashboard & BI',
          description:
            'Pembuatan dashboard analitis interaktif, visualisasi metrik bisnis, dan manajemen version control.',
          tools: ['Google Looker Studio', 'Git'],
          toolsText: 'Google Looker Studio · Visualisasi Data · Business Intelligence · Git',
          scope: 'Dashboard design · Data visualization · Business intelligence',
          levelOrUsageLabel: 'Diterapkan di',
          levelOrUsageValue: 'Pizza Sales Performance Dashboard',
        },
      ],
      softSkillsLabel: 'Kemampuan Interpersonal & Kolaboratif',
      softSkills: [
        'Analytical Thinking & Problem Solving',
        'Kolaborasi Lintas Divisi',
        'Komunikasi Data',
      ],
    },
    credentials: {
      sectionLabel: 'Kredensial',
      headline: 'Pendidikan & Sertifikasi',
      educationTitle: 'Pendidikan Akademik',
      degree: 'S1 Teknologi Informasi',
      university: 'Universitas Muhammadiyah Yogyakarta',
      period: 'Sep 2022 – Jun 2026',
      certificationsTitle: 'Sertifikasi',
      viewCertButton: 'Lihat Sertifikat',
      verifyLinkText: 'Verify ↗',
      certifications: [
        {
          id: 'certiport-ai',
          title: 'Artificial Intelligence',
          issuer: 'Certiport (IT Specialist)',
          field: 'Artificial Intelligence',
          date: '18 Jun 2026',
          validity: 'berlaku 5 tahun (hingga 2031)',
          verification: {
            site: 'verify.certiport.com',
            code: 'hd9z-4wLu',
            url: 'https://verify.certiport.com',
          },
          fileType: 'pdf',
          fileUrl: '/certificates/certiport-ai.pdf',
        },
        {
          id: 'bnsp-web-developer',
          title: 'Certified Web Developer (CWDev)',
          issuer: 'BNSP (LSP Informatika)',
          field: 'Programming and Software Development',
          date: '17 Mar 2026',
          validity: 'berlaku 3 tahun (hingga 2029)',
          fileType: 'image',
          fileUrl: '/certificates/bnsp-web-developer.jpg',
        },
      ],
    },
    contact: {
      sectionLabel: 'Kontak',
      heading: 'Mari berkolaborasi dengan data Anda.',
      subheading:
        'Terbuka untuk kesempatan kerja Data Analyst purnawaktu, proyek pengolahan data, dan visualisasi Business Intelligence.',
      email: 'iqbalfathonah10@gmail.com',
      copyButton: 'Salin Email',
      copiedButton: 'Tersalin ✓',
      socials: [
        {
          label: 'WhatsApp',
          url: 'https://wa.me/6285726168917',
        },
        {
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/iqbal-dwi-fathonah-56ba2a3b0',
        },
        {
          label: 'GitHub',
          url: 'https://github.com/qivoradev',
        },
      ],
      form: {
        nameLabel: 'Nama Lengkap',
        namePlaceholder: 'Nama Anda',
        nameError: 'Nama wajib diisi',
        emailLabel: 'Email',
        emailPlaceholder: 'nama@perusahaan.com',
        emailError: 'Alamat email tidak valid',
        subjectLabel: 'Subjek',
        subjectPlaceholder: 'Peluang Kerja / Proyek Analisis Data',
        subjectError: 'Subjek wajib diisi',
        messageLabel: 'Pesan',
        messagePlaceholder: 'Ceritakan kebutuhan analisis data atau peran yang tersedia...',
        messageError: 'Pesan minimal 10 karakter',
        sendButton: 'Kirim pesan',
        sendingButton: 'Mengirim...',
        successTitle: 'Pesan terkirim. Terima kasih.',
        successMessage: 'Pesan Anda telah berhasil dikirim. Saya akan segera menghubungi Anda kembali.',
        sendAnotherButton: 'Kirim pesan lain',
        fallbackNotice: 'Kunci API belum diatur. Mengalihkan ke email langsung...',
        errorMessage: 'Gagal mengirim pesan. Silakan coba lagi atau kirim via email.',
        emailDirectly: 'Kirim email langsung',
      },
      footerCopy: `© ${new Date().getFullYear()} iqbaldf · Iqbal Dwi Fathonah. Data Analyst.`,
      footerLocation: 'Universitas Muhammadiyah Yogyakarta · Yogyakarta, Indonesia',
    },
  },
  en: {
    brand: 'iqbaldf',
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      credentials: 'Credentials',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Data Analyst',
      headlineLine1: 'I turn raw data',
      headlineLine2: 'into clear decisions',
      ctaProjects: 'View Projects',
      ctaCv: 'View CV',
      cursorLeft: 'SQL · MySQL',
      cursorRight: 'Excel · Looker Studio',
      bottomLinks: {
        projects: 'Projects',
        skills: 'Skills',
        credentials: 'Credentials',
        contact: 'Contact',
      },
    },
    console: {
      sampleData: 'Sample data',
      modeLabel: 'MODE',
      modes: {
        sql: 'SQL Query',
        excel: 'Excel Report',
        dashboard: 'Dashboard',
      },
      metrics: {
        sales: 'Sales',
        orders: 'Orders',
        customers: 'Customers',
        growth: 'Growth',
      },
    },
    cvModal: {
      title: 'Curriculum Vitae',
      subtitle: 'Iqbal Dwi Fathonah · Data Analyst (Fresh Graduate)',
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
    about: {
      sectionLabel: 'About Me',
      headline: 'Turning data into clear business decisions.',
      story:
        'Information Technology fresh graduate from UMY focused on business data analytics, relational data modeling, and Business Intelligence. Proficient in advanced Microsoft Excel (PivotTable, XLOOKUP, Data Modeling) and Google Looker Studio for interactive dashboards. Possessing foundational literacy in Artificial Intelligence (Certiport) and Web Development (BNSP). Adept at processing and validating tens of thousands of transaction records to identify trends, evaluate product performance, and support business decisions.',
      metrics: [
        {
          value: 21350,
          suffix: '+',
          label: 'transactions processed',
        },
        {
          value: 238000,
          suffix: '+',
          label: 'records cleaned',
        },
        {
          value: 3,
          suffix: '',
          label: 'BI projects',
        },
      ],
      approach: {
        label: '5-Step Analytical Approach',
        steps: [
          'Understand business context & define problem statement',
          'Clean, normalize, and validate transactional datasets',
          'Relational extraction using structured SQL queries',
          'Compile structured reporting & visualize key metrics',
          'Deliver actionable and practical recommendations',
        ],
      },
    },
    projects: {
      sectionLabel: 'Featured Work',
      headline: 'Selected Work',
      subtitle: '3 Business & Public Data Case Studies',
      viewCase: 'View Case',
      viewDetails: 'View details →',
      modalLabels: {
        overview: 'Overview',
        context: 'Context & Scope',
        tools: 'Tools',
        highlights: 'Key Highlights',
        close: 'Close',
        openDashboard: 'Open Dashboard',
        previous: '← Previous',
        next: 'Next →',
      },
      items: [
        {
          id: 'pizza-sales',
          title: 'Pizza Sales Performance & Operational Dashboard',
          category: 'Business Intelligence Project',
          tools: ['Excel', 'Looker Studio'],
          toolsText: 'Excel · Looker Studio',
          description:
            'Sales reconciliation and rush-hour analysis of 21,350+ transactions, with an interactive BI dashboard.',
          fact: '21,350+ transactions · $817K+ revenue',
          previewLabel: 'Rush hour pattern',
          highlights: [
            'Processed and validated reconciliation data of more than 21,350 annual sales transactions ($817K+) using Microsoft Excel and Google Looker Studio.',
            'Identified operational rush hour patterns at 12:00–13:00 and 17:00–18:00 to recommend staggered staff scheduling.',
            'Analyzed menu category contribution (Classic, Supreme, Chicken, Veggie) and mapped Top 5 SKUs to enhance supply chain visibility and inventory control.',
            'Designed an interactive BI dashboard to track Average Order Value (AOV) and product performance regularly.',
          ],
        },
        {
          id: 'superstore-sales',
          title: 'Superstore Sales & Profitability Analysis',
          category: 'Commercial Analytics Project',
          tools: ['Excel'],
          toolsText: 'Excel',
          description:
            'Seasonal sales and regional profitability analysis, focused on how discounts affect net profit margin.',
          fact: 'Thousands of transaction rows',
          previewLabel: 'Margin by region',
          highlights: [
            'Analyzed seasonal retail sales trends and cross-regional profitability across thousands of transaction rows.',
            'Built interactive dashboards utilizing PivotTables, Calculated Fields, and Slicers to assess discount impact on net margin decline.',
            'Formulated insights using the PAR framework (Problem, Action, Result) for promotional effectiveness evaluation and pricing strategy recommendations.',
          ],
        },
        {
          id: 'nyc-traffic',
          title: 'NYC Traffic Safety Analysis',
          category: 'Public Data Analytics Project',
          tools: ['Excel'],
          toolsText: 'Excel',
          description:
            'Cleaning and validating 238,000+ traffic accident records to find root causes and incident patterns.',
          fact: '238,000+ accident records',
          previewLabel: 'Incidents by hour',
          highlights: [
            'Processed, cleaned, and validated large-scale datasets exceeding 238,000 traffic collision records.',
            'Designed analytical dashboards with advanced formulas (XLOOKUP, INDEX/MATCH) and Pivot Charts for Root Cause Analysis on primary risk factors and peak incident hours.',
            'Produced structured data visualizations to identify incident patterns as a foundation for operational safety recommendations.',
          ],
        },
      ],
    },
    skills: {
      sectionLabel: 'Core Capabilities',
      headline: 'Skills & Tools',
      metaLabels: {
        scope: 'Scope',
        tools: 'Tools',
      },
      items: [
        {
          title: 'SQL & Database',
          description:
            'Relational data modeling and structured query extraction (JOIN, Grouping, Having, Filtering).',
          tools: ['SQL', 'MySQL'],
          toolsText: 'SQL · MySQL (foundational: JOIN, Grouping, Having, Filtering)',
          scope: 'JOIN · Grouping · Having · Filtering',
          levelOrUsageLabel: 'Level',
          levelOrUsageValue: 'Basic',
        },
        {
          title: 'Spreadsheet & Reporting',
          description:
            'Advanced spreadsheet modeling (PivotTable, XLOOKUP, INDEX/MATCH, Data Modeling) and data cleaning.',
          tools: ['Microsoft Excel'],
          toolsText: 'Microsoft Excel (PivotTable, XLOOKUP, INDEX/MATCH, Data Modeling) · Data Cleaning',
          scope: 'PivotTable · XLOOKUP · INDEX/MATCH · Data Modeling · Data Cleaning',
          levelOrUsageLabel: 'Level',
          levelOrUsageValue: 'Advanced',
        },
        {
          title: 'Dashboard & BI',
          description:
            'Designing interactive visual dashboards, business metric visualization, and Git version control.',
          tools: ['Google Looker Studio', 'Git'],
          toolsText: 'Google Looker Studio · Data Visualization · Business Intelligence · Git',
          scope: 'Dashboard design · Data visualization · Business intelligence',
          levelOrUsageLabel: 'Used in',
          levelOrUsageValue: 'Pizza Sales Performance Dashboard',
        },
      ],
      softSkillsLabel: 'Soft Skills & Collaborative Strengths',
      softSkills: [
        'Analytical Thinking & Problem Solving',
        'Cross-Divisional Collaboration',
        'Data Communication',
      ],
    },
    credentials: {
      sectionLabel: 'Credentials',
      headline: 'Education & Certifications',
      educationTitle: 'Academic Degree',
      degree: 'Bachelor of Information Technology (S1)',
      university: 'Universitas Muhammadiyah Yogyakarta',
      period: 'Sep 2022 – Jun 2026',
      certificationsTitle: 'Certifications',
      viewCertButton: 'View Certificate',
      verifyLinkText: 'Verify ↗',
      certifications: [
        {
          id: 'certiport-ai',
          title: 'Artificial Intelligence',
          issuer: 'Certiport (IT Specialist)',
          field: 'Artificial Intelligence',
          date: 'Jun 18, 2026',
          validity: 'Valid for 5 years (until 2031)',
          verification: {
            site: 'verify.certiport.com',
            code: 'hd9z-4wLu',
            url: 'https://verify.certiport.com',
          },
          fileType: 'pdf',
          fileUrl: '/certificates/certiport-ai.pdf',
        },
        {
          id: 'bnsp-web-developer',
          title: 'Certified Web Developer (CWDev)',
          issuer: 'BNSP (LSP Informatika)',
          field: 'Programming and Software Development',
          date: 'Mar 17, 2026',
          validity: 'Valid for 3 years (until 2029)',
          fileType: 'image',
          fileUrl: '/certificates/bnsp-web-developer.jpg',
        },
      ],
    },
    contact: {
      sectionLabel: 'Contact',
      heading: "Let's work with your data.",
      subheading:
        'Open for full-time Data Analyst opportunities, data processing projects, and Business Intelligence visualization.',
      email: 'iqbalfathonah10@gmail.com',
      copyButton: 'Copy Email',
      copiedButton: 'Copied ✓',
      socials: [
        {
          label: 'WhatsApp',
          url: 'https://wa.me/6285726168917',
        },
        {
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/iqbal-dwi-fathonah-56ba2a3b0',
        },
        {
          label: 'GitHub',
          url: 'https://github.com/qivoradev',
        },
      ],
      form: {
        nameLabel: 'Full Name',
        namePlaceholder: 'Your name',
        nameError: 'Name is required',
        emailLabel: 'Email',
        emailPlaceholder: 'name@company.com',
        emailError: 'Valid email is required',
        subjectLabel: 'Subject',
        subjectPlaceholder: 'Job Opportunity / Data Analytics Project',
        subjectError: 'Subject is required',
        messageLabel: 'Message',
        messagePlaceholder: 'Describe your data analytics needs or open opportunity...',
        messageError: 'Message must be at least 10 characters',
        sendButton: 'Send message',
        sendingButton: 'Sending...',
        successTitle: 'Message sent. Thank you.',
        successMessage: 'Your message has been sent successfully. I will get back to you shortly.',
        sendAnotherButton: 'Send another',
        fallbackNotice: 'API key not configured. Redirecting to direct email...',
        errorMessage: 'Failed to send message. Please try again or email directly.',
        emailDirectly: 'Email me directly',
      },
      footerCopy: `© ${new Date().getFullYear()} iqbaldf · Iqbal Dwi Fathonah. Data Analyst.`,
      footerLocation: 'Universitas Muhammadiyah Yogyakarta · Yogyakarta, Indonesia',
    },
  },
};
