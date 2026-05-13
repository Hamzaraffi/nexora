const data = {
  services: [
    { id: '1', icon: 'TrendingUp', title: 'Digital Marketing', desc: 'Data-driven campaigns that convert visitors into customers', active: true },
    { id: '2', icon: 'Search', title: 'SEO Optimization', desc: 'Rank higher and get discovered by your target audience', active: true },
    { id: '3', icon: 'PenTool', title: 'Content Creation', desc: 'Compelling content that engages and converts', active: true },
    { id: '4', icon: 'Monitor', title: 'Web Design', desc: 'Modern, responsive websites that impress', active: true },
    { id: '5', icon: 'MessageSquare', title: 'Social Media', desc: 'Build your brand presence across all platforms', active: true },
    { id: '6', icon: 'BarChart3', title: 'Analytics', desc: 'Track performance with detailed reporting', active: true },
  ],

  portfolio: [
    { 
      id: '1', 
      title: 'Tech Startup Growth', 
      client: 'CloudScale Inc.', 
      clientLogo: '',
      technologies: ['React', 'Node.js', 'MongoDB'],
      problem: 'Client needed to scale their user base from 1K to 100K with limited infrastructure.',
      solution: 'Implemented cloud-native architecture with auto-scaling capabilities and optimized database queries.',
      results: '+250% leads, 99.9% uptime achieved',
      metrics: { leads: '250%', conversion: '180%', revenue: '$2M+' },
      clientReview: 'Outstanding work! They transformed our platform completely.',
      clientName: 'Sarah Johnson',
      clientRole: 'CEO, TechStart',
      clientAvatar: '',
      rating: 5,
      active: true 
    },
    { 
      id: '2', 
      title: 'E-commerce Success', 
      client: 'StyleBox', 
      clientLogo: '',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
      problem: 'Cart abandonment rate was at 75% due to poor checkout experience.',
      solution: 'Redesigned checkout flow with one-click payments and improved mobile experience.',
      results: '+180% sales, cart abandonment reduced to 25%',
      metrics: { sales: '180%', conversion: '65%', aov: '$120' },
      clientReview: 'Our sales increased dramatically within the first month.',
      clientName: 'Michael Chen',
      clientRole: 'Founder, StyleBox',
      clientAvatar: '',
      rating: 5,
      active: true 
    },
    { 
      id: '3', 
      title: 'B2B Lead Generation', 
      client: 'DataPro Solutions', 
      clientLogo: '',
      technologies: ['Vue.js', 'Python', 'AWS'],
      problem: 'Marketing team struggled with low quality leads and long sales cycles.',
      solution: 'Implemented marketing automation and lead scoring system with multi-channel campaigns.',
      results: '+320% qualified leads, 50% shorter sales cycle',
      metrics: { leads: '320%', quality: '85%', cpl: '-40%' },
      clientReview: 'Game changer for our sales team!',
      clientName: 'Emily Rodriguez',
      clientRole: 'Marketing Director, DataPro',
      clientAvatar: '',
      rating: 5,
      active: true 
    },
  ],

  blogs: [
    { 
      id: '1', 
      title: '10 SEO Strategies That Actually Work in 2026',
      slug: '10-seo-strategies-2026',
      heading: 'Master SEO in 2026',
      subHeading: 'Complete guide to ranking higher on Google',
      content: '<p>SEO is constantly evolving. Here are the strategies that actually work...</p>',
      excerpt: 'Discover the latest SEO techniques that are driving results in 2026.',
      image: '',
      category: 'SEO',
      tags: ['SEO', 'Digital Marketing', 'Content Strategy'],
      metaTitle: '10 SEO Strategies That Actually Work in 2026 | Nexora',
      metaDescription: 'Learn the most effective SEO strategies for 2026. Expert tips from Nexora.',
      metaKeywords: 'SEO, search engine optimization, ranking, Google',
      readTime: '8 min read',
      date: '2026-05-10',
      active: true 
    },
    { 
      id: '2', 
      title: 'The Ultimate Guide to Content Marketing',
      slug: 'ultimate-guide-content-marketing',
      heading: 'Content Marketing Mastery',
      subHeading: 'How to create content that converts',
      content: '<p>Content is king. But what makes content truly effective?</p>',
      excerpt: 'Learn how to create content that converts and builds authority.',
      image: '',
      category: 'Content',
      tags: ['Content Marketing', 'Strategy', 'Copywriting'],
      metaTitle: 'The Ultimate Guide to Content Marketing | Nexora',
      metaDescription: 'Master content marketing with our comprehensive guide.',
      metaKeywords: 'content marketing, content strategy, copywriting',
      readTime: '12 min read',
      date: '2026-05-08',
      active: true 
    },
    { 
      id: '3', 
      title: 'Social Media Trends to Watch',
      slug: 'social-media-trends-2026',
      heading: '2026 Social Media Landscape',
      subHeading: 'Stay ahead with emerging platforms and features',
      content: '<p>Social media never stops changing. Here\'s what\'s coming...</p>',
      excerpt: 'Stay ahead with these emerging social media trends in 2026.',
      image: '',
      category: 'Social Media',
      tags: ['Social Media', 'Trends', 'Marketing'],
      metaTitle: 'Social Media Trends to Watch in 2026 | Nexora',
      metaDescription: 'Discover the top social media trends shaping 2026.',
      metaKeywords: 'social media, trends, platforms, marketing',
      readTime: '6 min read',
      date: '2026-05-05',
      active: true 
    },
  ],

  contacts: [
    { id: '1', name: 'John Doe', email: 'john@example.com', message: 'Interested in SEO services', phone: '', company: '', date: '2026-05-10', read: false },
    { id: '2', name: 'Jane Smith', email: 'jane@company.com', message: 'Need web design services', phone: '+1234567890', company: 'ABC Corp', date: '2026-05-12', read: true },
  ],

  newsletter: [
    { id: '1', email: 'user@example.com', date: '2026-05-01', active: true },
    { id: '2', email: 'subscriber@email.com', date: '2026-05-05', active: true },
  ],

  users: [
    { 
      id: '1', 
      name: 'Admin User', 
      email: 'admin@nexora.com', 
      password: 'admin123',
      role: 'Super Admin',
      permissions: ['all'],
      avatar: '',
      active: true,
      createdAt: '2026-01-01'
    },
    { 
      id: '2', 
      name: 'Content Manager', 
      email: 'content@nexora.com', 
      password: 'content123',
      role: 'Content Manager',
      permissions: ['blogs', 'portfolio', 'services'],
      avatar: '',
      active: true,
      createdAt: '2026-02-15'
    },
    { 
      id: '3', 
      name: 'Marketing Lead', 
      email: 'marketing@nexora.com', 
      password: 'marketing123',
      role: 'Marketing Manager',
      permissions: ['services', 'contacts', 'newsletter'],
      avatar: '',
      active: true,
      createdAt: '2026-03-20'
    },
  ],

  roles: [
    { id: '1', name: 'Super Admin', permissions: ['all'], description: 'Full access to all features' },
    { id: '2', name: 'Content Manager', permissions: ['blogs', 'portfolio', 'services'], description: 'Manage content and portfolio' },
    { id: '3', name: 'Marketing Manager', permissions: ['services', 'contacts', 'newsletter'], description: 'Manage marketing and communications' },
    { id: '4', name: 'Viewer', permissions: ['view'], description: 'Read-only access' },
  ]
}

export default data