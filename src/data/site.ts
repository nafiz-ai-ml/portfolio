import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Muhammad Nafiz',
  nameBengali: 'মুহাম্মদ নাফিজ',
  title: 'Muhammad Nafiz — Web Developer & Aspiring AI Engineer',
  tagline: "I'm Muhammad Nafiz. Web developer today, AI engineer in the making.",
  subTagline: 'I turn real problems into working products.',
  location: 'Mymensingh, Bangladesh',
  domain: 'muhammadnafiz.dev',
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      handle: 'github.com/nafiz-ai-ml',
      url: 'https://github.com/nafiz-ai-ml',
      isExternal: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: 'linkedin.com/in/nafiz-ai',
      url: 'https://www.linkedin.com/in/nafiz-ai/',
      isExternal: true,
    },
    {
      id: 'email',
      label: 'Email',
      handle: 'me@muhammadnafiz.dev',
      url: 'mailto:me@muhammadnafiz.dev',
      isExternal: false,
    },
    {
      id: 'x',
      label: 'X (Twitter)',
      handle: 'x.com/MUHAMMADNA70418',
      url: 'https://x.com/MUHAMMADNA70418',
      isExternal: true,
    },
  ],
  stats: [
    {
      value: '01',
      label: 'Live platform',
      detail: 'RoktoFinder',
    },
    {
      value: '02',
      label: 'In development',
      detail: 'JaniBD & Global SaaS',
    },
    {
      value: 'DL',
      label: 'Learning',
      detail: 'Deep Learning',
    },
  ],
  techStack: [
    'TypeScript',
    'Next.js',
    'React',
    'Tailwind CSS',
    'Python',
    'PyTorch',
    'Scikit-Learn',
    'Node.js',
    'PostgreSQL',
    'GSAP',
    'Framer Motion',
    'Git',
    'REST APIs',
    'Deep Learning',
  ],
  projects: [
    {
      id: 'roktofinder',
      slug: 'roktofinder',
      title: 'RoktoFinder',
      subtitle: 'Bangla-first blood donor platform // Mymensingh',
      description:
        'A Bangla-first blood donor platform for Mymensingh. Find donors by blood group and area, connect in one click via phone call or WhatsApp, post emergency blood requests, and browse the donor directory.',
      communityContext:
        'Started as a community initiative with Al Fatih Islamic Pathagar.',
      status: 'live',
      statusLabel: 'Live',
      url: 'https://roktofinder.com',
      isExternal: true,
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Full-Stack', 'Bangla-First'],
      images: [
        '/images/projects/roktofinder-1.png',
        '/images/projects/roktofinder-2.png',
        '/images/projects/roktofinder-3.png',
        '/images/projects/roktofinder-4.png',
      ],
      icon: {
        type: 'image',
        imageSrc: '/images/projects/roktofinder-logo.jpg',
        bgVariant: 'off-white',
        alt: 'RoktoFinder Logo',
      },
    },
    {
      id: 'janibd',
      slug: 'janibd',
      title: 'JaniBD',
      subtitle: 'Bangla-first everyday SaaS & learning platform',
      description:
        'A Bangla-first web platform built for everyday digital needs in Bangladesh. Combines utility tools, quizzes and games, a learning library, and a Tech Skill Map with shareable progress cards and public profiles.',
      status: 'in-development',
      statusLabel: 'In development',
      isExternal: false,
      tags: ['SaaS Architecture', 'Next.js', 'Interactive Web', 'Bangla-First'],
      images: [],
      icon: {
        type: 'image',
        imageSrc: '/images/projects/janibd-logo.png',
        bgVariant: 'off-white',
        alt: 'JaniBD Logo',
      },
    },
    {
      id: 'global-saas',
      slug: 'global-saas',
      title: 'Global SaaS Product',
      subtitle: 'In-development international SaaS platform',
      description:
        'An international SaaS platform currently in active development. Built with modern full-stack architecture, focusing on high reliability, clean workflows, and global scalability. Official name and details to be announced.',
      status: 'in-development',
      statusLabel: 'In development',
      isExternal: false,
      tags: ['SaaS Architecture', 'Full-Stack', 'Global Platform', 'In Active Development'],
      images: [],
      icon: {
        type: 'monogram',
        monogramText: 'GS',
        bgVariant: 'brand',
        alt: 'Global SaaS Monogram',
      },
    },
  ],
  journey: {
    introStatement:
      'I started with frontend and full-stack web applications for real community problems. Today, with Python and Machine Learning fundamentals completed, I am learning Deep Learning to build intelligent software.',
    milestones: [
      {
        phase: 'Phase 01',
        title: 'Web Application Development & Founding',
        status: 'solidified',
        statusLabel: 'Solidified',
        description:
          'Building full-stack web applications, component systems, and community tools. Founded RoktoFinder and JaniBD.',
        technologies: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'PostgreSQL'],
      },
      {
        phase: 'Phase 02',
        title: 'SaaS Engineering & System Architecture',
        status: 'in-progress',
        statusLabel: 'Active build',
        description:
          'Engineering scalable SaaS architectures and full-stack web platforms, currently building an international SaaS product alongside community tools.',
        technologies: ['SaaS Architecture', 'Cloud Services', 'System Design', 'Next.js', 'PostgreSQL'],
      },
      {
        phase: 'Phase 03',
        title: 'Python & Machine Learning Fundamentals',
        status: 'solidified',
        statusLabel: 'Complete',
        description:
          'Thorough grounding in Python, NumPy, Pandas, Scikit-Learn, data analysis, and classical machine learning algorithms.',
        technologies: ['Python', 'NumPy', 'Pandas', 'Scikit-Learn', 'Statistical Learning'],
      },
      {
        phase: 'Phase 04',
        title: 'Deep Learning Specialization',
        status: 'in-progress',
        statusLabel: 'Current focus',
        description:
          'Currently learning neural network architectures, backpropagation, CNNs for computer vision, RNNs, and modeling in PyTorch.',
        technologies: ['PyTorch', 'Neural Networks', 'CNNs', 'Backpropagation', 'Model Training'],
      },
      {
        phase: 'Phase 05',
        title: 'AI Engineering Roadmap',
        status: 'roadmap',
        statusLabel: 'Roadmap',
        description:
          'Next focus areas: Natural Language Processing (NLP), Computer Vision, Generative AI, Transformers, and AI agent development.',
        technologies: ['Transformers', 'NLP', 'Computer Vision', 'Generative AI', 'AI Agents'],
      },
    ],
  },
  about: {
    bio: 'I am a web application developer and founder based in Mymensingh, Bangladesh. I build tools for real community needs like RoktoFinder and JaniBD. My goal is to become an AI engineer, progressing from machine learning foundations into deep learning, transformers, and autonomous AI agents.',
    statement:
      'I turn real problems into working products. Whether that means building a blood donor network for my hometown or learning neural networks, my approach is steady execution from first principles.',
    facts: [
      { label: 'Name', value: 'Muhammad Nafiz (মুহাম্মদ নাফিজ)', source: 'Official' },
      { label: 'Location', value: 'Mymensingh, Bangladesh', source: 'Location' },
      { label: 'Current Role', value: 'Web Application Developer & Founder', source: 'Active' },
      { label: 'Main Goal', value: 'AI Engineer', source: 'Focus' },
      { label: 'Completed', value: 'Python & Machine Learning Fundamentals', source: 'Done' },
      { label: 'Currently Learning', value: 'Deep Learning (Neural Networks & PyTorch)', source: 'In progress' },
      { label: 'Roadmap', value: 'NLP, Computer Vision, GenAI, Transformers, AI Agents', source: 'Planned' },
      { label: 'Live Platform', value: 'RoktoFinder (roktofinder.com)', source: 'Live' },
      { label: 'In Development', value: 'JaniBD (Bangla-first SaaS companion)', source: 'In dev' },
      { label: 'Upcoming SaaS', value: 'Global SaaS (in development)', source: 'In dev' },
      { label: 'Domain', value: 'muhammadnafiz.dev', source: 'Official' },
      { label: 'Language', value: 'English only (Portfolio)', source: 'Standard' },
    ],
  },
};
