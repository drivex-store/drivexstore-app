export default function sitemap() {
  return [
    {
      url: 'https://drivexstore.shop',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1, 
    },
    {
      url: 'https://drivexstore.shop/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://drivexstore.shop/work',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://drivexstore.shop/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://drivexstore.shop/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
