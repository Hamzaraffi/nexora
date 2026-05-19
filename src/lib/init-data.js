import { kvGet, kvSet, KV_KEYS } from './kv-store'

export async function initDefaultData() {
  const initComplete = await kvGet(KV_KEYS.INIT_COMPLETE)
  if (initComplete) return true

  const defaultPages = [
    {
      id: 'page-home',
      slug: 'home',
      title: 'Home',
      path: '/',
      sections: [
        {
          id: 'home-hero',
          type: 'hero',
          order: 0,
          title: 'Hero Section',
          content: {
            headline: 'Transform Your Digital Presence',
            subheadline: 'We craft powerful digital marketing strategies that drive results. From SEO to social media, we help your business grow.',
            ctaText: 'Get Started',
            ctaLink: '/contact',
          },
        },
        {
          id: 'home-features',
          type: 'features',
          order: 1,
          title: 'Why Choose Nexora',
          content: {
            items: [
              { title: 'Data-Driven Strategies', description: 'We use analytics to optimize every campaign for maximum ROI.' },
              { title: 'Expert Team', description: 'Our team has years of experience across all digital channels.' },
              { title: 'Proven Results', description: 'We have helped 200+ clients achieve their digital goals.' },
            ],
          },
        },
        {
          id: 'home-stats',
          type: 'stats',
          order: 2,
          title: 'Our Impact',
          content: {
            items: [
              { number: '500+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '150+', label: 'Happy Clients' },
              { number: '12+', label: 'Years Experience' },
            ],
          },
        },
        {
          id: 'home-cta',
          type: 'cta',
          order: 3,
          title: 'Call to Action',
          content: {
            headline: 'Ready to Grow Your Business?',
            buttonText: 'Contact Us',
            buttonLink: '/contact',
          },
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'page-about',
      slug: 'about',
      title: 'About Us',
      path: '/about',
      sections: [
        {
          id: 'about-hero',
          type: 'hero',
          order: 0,
          title: 'Hero Section',
          content: {
            headline: 'About Nexora',
            subheadline: 'We are a team of passionate digital marketers dedicated to helping businesses grow.',
            ctaText: 'Our Services',
            ctaLink: '/services',
          },
        },
        {
          id: 'about-stats',
          type: 'stats',
          order: 1,
          title: 'Our Impact',
          content: {
            items: [
              { number: '500+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '150+', label: 'Happy Clients' },
              { number: '12+', label: 'Years Experience' },
            ],
          },
        },
        {
          id: 'about-values',
          type: 'features',
          order: 2,
          title: 'Our Values',
          content: {
            items: [
              { title: 'Client First', description: 'Your success is our priority. We build lasting partnerships.' },
              { title: 'Innovation', description: 'Staying ahead with cutting-edge strategies.' },
              { title: 'Excellence', description: 'We strive for excellence in everything we do.' },
              { title: 'Transparency', description: 'Clear reporting and open communication always.' },
            ],
          },
        },
        {
          id: 'about-team',
          type: 'team',
          order: 3,
          title: 'Meet Our Team',
          content: {
            items: [
              { name: 'Sarah Johnson', role: 'CEO & Founder', initials: 'SJ' },
              { name: 'Michael Chen', role: 'Head of Marketing', initials: 'MC' },
              { name: 'Emily Rodriguez', role: 'Creative Director', initials: 'ER' },
              { name: 'David Kim', role: 'Tech Lead', initials: 'DK' },
            ],
          },
        },
        {
          id: 'about-cta',
          type: 'cta',
          order: 4,
          title: 'Call to Action',
          content: {
            headline: 'Want to work with us?',
            buttonText: 'Get in Touch',
            buttonLink: '/contact',
          },
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'page-services',
      slug: 'services',
      title: 'Services',
      path: '/services',
      sections: [
        {
          id: 'services-hero',
          type: 'hero',
          order: 0,
          title: 'Hero Section',
          content: {
            headline: 'Our Services',
            subheadline: 'Comprehensive digital marketing solutions tailored to your needs.',
            ctaText: 'Contact Us',
            ctaLink: '/contact',
          },
        },
        {
          id: 'services-list',
          type: 'services',
          order: 1,
          title: 'What We Offer',
          content: {
            items: [
              { title: 'Search Engine Optimization', description: 'Technical SEO, content strategy, and link building to improve your rankings.', features: ['Keyword Research', 'On-Page SEO', 'Link Building', 'Technical Audit'] },
              { title: 'Social Media Marketing', description: 'Content creation, scheduling, and community management across platforms.', features: ['Content Creation', 'Community Management', 'Paid Social', 'Analytics'] },
              { title: 'Content Marketing', description: 'Engaging content that converts visitors to customers.', features: ['Blog Writing', 'Video Production', 'Infographics', 'Email Campaigns'] },
              { title: 'Web Design', description: 'Modern, responsive websites optimized for conversions.', features: ['UX Design', 'Responsive Dev', 'SEO Optimized', 'Fast Loading'] },
            ],
          },
        },
        {
          id: 'services-cta',
          type: 'cta',
          order: 2,
          title: 'Call to Action',
          content: {
            headline: 'Ready to get started?',
            buttonText: 'Get Free Consultation',
            buttonLink: '/contact',
          },
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'page-portfolio',
      slug: 'portfolio',
      title: 'Portfolio',
      path: '/portfolio',
      sections: [
        {
          id: 'portfolio-hero',
          type: 'hero',
          order: 0,
          title: 'Hero Section',
          content: {
            headline: 'Our Work',
            subheadline: 'See how we\'ve helped businesses achieve their digital marketing goals.',
            ctaText: 'Contact Us',
            ctaLink: '/contact',
          },
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'page-contact',
      slug: 'contact',
      title: 'Contact',
      path: '/contact',
      sections: [
        {
          id: 'contact-hero',
          type: 'hero',
          order: 0,
          title: 'Hero Section',
          content: {
            headline: 'Get in Touch',
            subheadline: 'Have a project in mind? Let\'s talk about how we can help your business grow.',
            ctaText: '',
            ctaLink: '',
          },
        },
        {
          id: 'contact-info',
          type: 'contact',
          order: 1,
          title: 'Contact Information',
          content: {
            email: 'hello@nexora.com',
            phone: '+1 (555) 123-4567',
            address: 'San Francisco, CA 94102',
          },
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  await kvSet(KV_KEYS.PAGES, defaultPages)
  await kvSet(KV_KEYS.MESSAGES, [])
  await kvSet(KV_KEYS.INIT_COMPLETE, true)

  return true
}
