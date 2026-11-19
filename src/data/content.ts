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
  description: string;
  highlights: string[];
  dashboardUrl?: string;
}

export interface SkillItem {
  title: string;
  description: string;
  tools: string[];
  toolsText: string;
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
    academicBaseLabel: string;
    academicBaseValue: string;
    metrics: MetricItem[];
    approach: {
      label: string;
      steps: string[];
    };
    toolkit: {
      label: string;
      tools: string[];
    };
  };
  projects: {
    sectionLabel: string;
    headline: string;
    subtitle: string;
    viewCase: string;
    modalLabels: {
      context: string;
      tools: string;
      highlights: string;
      close: string;
      openDashboard: string;
    };
    items: ProjectItem[];
  };
  skills: {
    sectionLabel: string;
    headline: string;
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
      academicBaseLabel: 'Pendidikan:',
      academicBaseValue:
        'Universitas Muhammadiyah Yogyakarta · S1 Teknologi Informasi · Sep 2022 – Jun 2026',
      metrics: [
        {
          value: 21350,
          suffix: '+',
          label: 'transaksi penjualan diolah dan divalidasi',
        },
        {
          value: 238000,
          suffix: '+',
          label: 'catatan data dibersihkan dan divalidasi',
        },
        {
          value: 3,
          suffix: '',
          label: 'project BI & analytics',
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
      toolkit: {
        label: 'Core Stack & Toolkit',
        tools: ['SQL', 'MySQL', 'Excel', 'Looker Studio', 'Git'],
      },
    },
    projects: {
      sectionLabel: 'Karya Pilihan',
      headline: 'Studi Kasus Analisis Data Terpilih',
      subtitle: '3 Studi Kasus Bisnis & Data Publik',
      viewCase: 'Lihat Kasus',
      modalLabels: {
        context: 'Konteks & Lingkup',
        tools: 'Alat Bantu',
        highlights: 'Sorotan Implementasi',
        close: 'Tutup Detail',
        openDashboard: 'Buka Dashboard',
      },
      items: [
        {
          id: 'pizza-sales',
          title: 'Pizza Sales Performance & Operational Dashboard',
          category: 'Business Intelligence Project',
          tools: ['Excel', 'Looker Studio'],
          description:
            'Rekonsiliasi dan analisis performa penjualan tahunan serta pemetaan pola operasional restoran berbasis dashboard interaktif.',
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
          description:
            'Evaluasi profitabilitas komersial dan analisis pengaruh diskon terhadap penurunan margin keuntungan ritel.',
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
          description:
            'Pembersihan dataset skala besar serta analisis akar masalah insiden keselamatan lalu lintas perkotaan.',
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
      headline: 'Spesialisasi Analisis & Pengolahan Data',
      items: [
        {
          title: 'SQL & Database',
          description:
            'Dasar pemodelan relasional dan ekstraksi query terstruktur (JOIN, Grouping, Having, Filtering).',
          tools: ['SQL', 'MySQL'],
          toolsText: 'SQL · MySQL (dasar: JOIN, Grouping, Having, Filtering)',
        },
        {
          title: 'Spreadsheet & Reporting',
          description:
            'Pengolahan data tingkat lanjut (PivotTable, XLOOKUP, INDEX/MATCH, Data Modeling) serta pembersihan data.',
          tools: ['Microsoft Excel', 'Data Cleaning'],
          toolsText: 'Microsoft Excel (PivotTable, XLOOKUP, INDEX/MATCH, Data Modeling) · Data Cleaning',
        },
        {
          title: 'Dashboard & BI',
          description:
            'Pembuatan dashboard analitis interaktif, visualisasi metrik bisnis, dan manajemen version control.',
          tools: ['Google Looker Studio', 'Visualisasi Data', 'Business Intelligence', 'Git'],
          toolsText: 'Google Looker Studio · Visualisasi Data · Business Intelligence · Git',
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
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/iqbal-dwi-fathonah-56ba2a3b0',
        },
        {
          label: 'GitHub',
          url: 'https://github.com/qivoradev',
        },
      ],
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
      academicBaseLabel: 'Education:',
      academicBaseValue:
        'Universitas Muhammadiyah Yogyakarta · Bachelor of Information Technology · Sep 2022 – Jun 2026',
      metrics: [
        {
          value: 21350,
          suffix: '+',
          label: 'sales transactions processed & validated',
        },
        {
          value: 238000,
          suffix: '+',
          label: 'data records cleaned & validated',
        },
        {
          value: 3,
          suffix: '',
          label: 'BI & analytics projects',
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
      toolkit: {
        label: 'Core Stack & Toolkit',
        tools: ['SQL', 'MySQL', 'Excel', 'Looker Studio', 'Git'],
      },
    },
    projects: {
      sectionLabel: 'Featured Work',
      headline: 'Selected Data Analytics Case Studies',
      subtitle: '3 Business & Public Data Case Studies',
      viewCase: 'View Case',
      modalLabels: {
        context: 'Context & Scope',
        tools: 'Tools Used',
        highlights: 'Key Highlights',
        close: 'Close Details',
        openDashboard: 'Open Dashboard',
      },
      items: [
        {
          id: 'pizza-sales',
          title: 'Pizza Sales Performance & Operational Dashboard',
          category: 'Business Intelligence Project',
          tools: ['Excel', 'Looker Studio'],
          description:
            'Annual sales performance reconciliation and operational rush hour pattern mapping built with interactive dashboards.',
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
          description:
            'Commercial profitability evaluation and cross-regional retail margin discount impact analysis.',
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
          description:
            'Large-scale dataset cleaning and root cause analysis of urban traffic safety incidents.',
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
      headline: 'Analytical Specialties & Methodologies',
      items: [
        {
          title: 'SQL & Database',
          description:
            'Relational data modeling and structured query extraction (JOIN, Grouping, Having, Filtering).',
          tools: ['SQL', 'MySQL'],
          toolsText: 'SQL · MySQL (foundational: JOIN, Grouping, Having, Filtering)',
        },
        {
          title: 'Spreadsheet & Reporting',
          description:
            'Advanced spreadsheet modeling (PivotTable, XLOOKUP, INDEX/MATCH, Data Modeling) and data cleaning.',
          tools: ['Microsoft Excel', 'Data Cleaning'],
          toolsText: 'Microsoft Excel (PivotTable, XLOOKUP, INDEX/MATCH, Data Modeling) · Data Cleaning',
        },
        {
          title: 'Dashboard & BI',
          description:
            'Designing interactive visual dashboards, business metric visualization, and Git version control.',
          tools: ['Google Looker Studio', 'Data Visualization', 'Business Intelligence', 'Git'],
          toolsText: 'Google Looker Studio · Data Visualization · Business Intelligence · Git',
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
      heading: 'Let’s work with your data.',
      subheading:
        'Open for full-time Data Analyst opportunities, data processing projects, and Business Intelligence visualization.',
      email: 'iqbalfathonah10@gmail.com',
      copyButton: 'Copy Email',
      copiedButton: 'Copied ✓',
      socials: [
        {
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/iqbal-dwi-fathonah-56ba2a3b0',
        },
        {
          label: 'GitHub',
          url: 'https://github.com/qivoradev',
        },
      ],
      footerCopy: `© ${new Date().getFullYear()} iqbaldf · Iqbal Dwi Fathonah. Data Analyst.`,
      footerLocation: 'Universitas Muhammadiyah Yogyakarta · Yogyakarta, Indonesia',
    },
  },
};
