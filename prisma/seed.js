import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['error'],
})

async function main() {
  console.log('Seeding database...')

  const pages = [
    {
      slug: 'home',
      title: 'Home',
      status: 'published',
      sections: [
        {
          key: 'hero',
          type: 'hero',
          orderIndex: 0,
          content: JSON.stringify({
            headline: 'Transform Your Digital Presence',
            subheadline: 'Strategic digital marketing that drives measurable growth. We don\'t just market—we build lasting connections with your audience.',
            ctaText: 'Get Started',
            ctaLink: '/#contact',
            backgroundImage: ''
          })
        },
        {
          key: 'features',
          type: 'card-grid',
          orderIndex: 1,
          content: JSON.stringify({
            title: 'Why Choose Us',
            cards: [
              { icon: 'Zap', title: 'Fast & Efficient', desc: 'Quick turnaround without compromise' },
              { icon: 'Shield', title: 'Transparent', desc: 'Clear reporting always' },
              { icon: 'Users', title: 'Dedicated Team', desc: 'Your own support squad' }
            ],
            columns: 3
          })
        },
        {
          key: 'stats',
          type: 'stats',
          orderIndex: 2,
          content: JSON.stringify({
            items: [
              { number: '500+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '150+', label: 'Happy Clients' },
              { number: '12+', label: 'Years Experience' }
            ]
          })
        },
        {
          key: 'cta',
          type: 'cta',
          orderIndex: 3,
          content: JSON.stringify({
            headline: 'Ready to Start Your Project?',
            subheadline: 'Let\'s work together to transform your digital presence.',
            buttonText: 'Get in Touch',
            buttonLink: '/#contact'
          })
        }
      ],
      seo: {
        metaTitle: 'Nexora | Digital Marketing Agency',
        metaDescription: 'Professional digital marketing, SEO, and content creation services. Transform your online presence with Nexora.',
        metaKeywords: 'digital marketing, SEO, content creation, marketing agency'
      }
    },
    {
      slug: 'about',
      title: 'About',
      status: 'published',
      sections: [
        {
          key: 'hero',
          type: 'hero',
          orderIndex: 0,
          content: JSON.stringify({
            headline: 'We\'re Nexora',
            subheadline: 'A team of passionate digital marketers, creative designers, and tech innovators dedicated to transforming your digital presence.',
            ctaText: 'Learn More',
            ctaLink: '/#contact'
          })
        },
        {
          key: 'stats',
          type: 'stats',
          orderIndex: 1,
          content: JSON.stringify({
            items: [
              { number: '500+', label: 'Projects Completed' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '150+', label: 'Happy Clients' },
              { number: '12+', label: 'Years Experience' }
            ]
          })
        },
        {
          key: 'values',
          type: 'card-grid',
          orderIndex: 2,
          content: JSON.stringify({
            title: 'What Drives Us',
            cards: [
              { icon: 'Target', title: 'Results-Driven', desc: 'We focus on measurable outcomes and ROI for every campaign.' },
              { icon: 'Users', title: 'Client-Centric', desc: 'Your success is our priority. We build lasting partnerships.' },
              { icon: 'Award', title: 'Excellence', desc: 'We strive for excellence in everything we do.' },
              { icon: 'Heart', title: 'Innovation', desc: 'Staying ahead with cutting-edge strategies.' }
            ],
            columns: 4
          })
        },
        {
          key: 'cta',
          type: 'cta',
          orderIndex: 3,
          content: JSON.stringify({
            headline: 'Ready to Start Your Project?',
            subheadline: 'Let\'s work together to transform your digital presence.',
            buttonText: 'Get in Touch',
            buttonLink: '/#contact'
          })
        }
      ],
      seo: {
        metaTitle: 'About Us | Nexora',
        metaDescription: 'Learn about Nexora\'s team of passionate digital marketers and designers.',
        metaKeywords: 'about us, team, digital marketing experts'
      }
    },
    {
      slug: 'services',
      title: 'Services',
      status: 'published',
      sections: [
        {
          key: 'hero',
          type: 'hero',
          orderIndex: 0,
          content: JSON.stringify({
            headline: 'Digital Marketing Services',
            subheadline: 'Comprehensive digital solutions tailored to your unique business needs. We help you grow, engage, and convert.',
            ctaText: 'Contact Us',
            ctaLink: '/#contact'
          })
        },
        {
          key: 'services-list',
          type: 'card-grid',
          orderIndex: 1,
          content: JSON.stringify({
            title: 'Our Services',
            cards: [
              { icon: 'TrendingUp', title: 'Digital Marketing', desc: 'Data-driven campaigns that convert visitors into customers.' },
              { icon: 'Search', title: 'SEO Optimization', desc: 'Rank higher and get discovered by your target audience.' },
              { icon: 'PenTool', title: 'Content Creation', desc: 'Compelling content that engages and converts.' },
              { icon: 'Monitor', title: 'Web Design', desc: 'Modern, responsive websites that impress.' },
              { icon: 'MessageSquare', title: 'Social Media', desc: 'Build your brand presence across all platforms.' },
              { icon: 'BarChart3', title: 'Analytics', desc: 'Track performance with detailed reporting.' }
            ],
            columns: 3
          })
        },
        {
          key: 'cta',
          type: 'cta',
          orderIndex: 2,
          content: JSON.stringify({
            headline: 'Ready to Start Your Project?',
            subheadline: 'Schedule a free consultation today.',
            buttonText: 'Book a Call',
            buttonLink: '/#contact'
          })
        }
      ],
      seo: {
        metaTitle: 'Services | Nexora',
        metaDescription: 'Explore Nexora\'s digital marketing services including SEO, content creation, and web design.',
        metaKeywords: 'services, digital marketing, SEO, web design, content'
      }
    },
    {
      slug: 'portfolio',
      title: 'Portfolio',
      status: 'published',
      sections: [
        {
          key: 'hero',
          type: 'hero',
          orderIndex: 0,
          content: JSON.stringify({
            headline: 'Success Stories',
            subheadline: 'Explore our latest projects and see how we\'ve helped businesses achieve their digital marketing goals.',
            ctaText: 'View All',
            ctaLink: '/#contact'
          })
        },
        {
          key: 'cta',
          type: 'cta',
          orderIndex: 1,
          content: JSON.stringify({
            headline: 'Want to Be Our Next Success Story?',
            subheadline: 'Let\'s discuss how we can help transform your business.',
            buttonText: 'Start Your Project',
            buttonLink: '/#contact'
          })
        }
      ],
      seo: {
        metaTitle: 'Portfolio | Nexora',
        metaDescription: 'See Nexora\'s portfolio of successful digital marketing projects.',
        metaKeywords: 'portfolio, case studies, success stories'
      }
    }
  ]

  for (const pageData of pages) {
    const { seo, sections, ...page } = pageData

    const existingPage = await prisma.page.findUnique({ where: { slug: page.slug } })
    
    if (!existingPage) {
      const createdPage = await prisma.page.create({ data: page })

      for (const section of sections) {
        await prisma.section.create({
          data: { ...section, pageId: createdPage.id }
        })
      }

      if (seo) {
        await prisma.seoMeta.create({
          data: { ...seo, pageId: createdPage.id }
        })
      }

      console.log(`Created page: ${page.title}`)
    } else {
      console.log(`Page already exists: ${page.title}`)
    }
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })