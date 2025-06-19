<!-- README_START -->
# LFG Cosmic

A modern, responsive e-commerce website built with Next.js 15, TypeScript, and Tailwind CSS, powered by [Cosmic](https://www.cosmicjs.com) CMS. This application showcases products, collections, and customer reviews with a clean, professional design.

## ✨ Features

- **Product Catalog**: Browse products with detailed pages and high-quality images
- **Collections**: Organized product collections (Tech Accessories, Summer Essentials)
- **Customer Reviews**: Display verified customer reviews with star ratings
- **Responsive Design**: Mobile-first design that works on all devices
- **Search & Filter**: Filter products by collection and search functionality
- **Optimized Images**: Automatic image optimization using imgix
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean design with Tailwind CSS and Inter font

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=ecommerce-site-production)

## Original Prompt

This application was built based on the following request:

> Build a Next.js website that uses my existing objects in this bucket. Add apiEnvironment: "staging" to the cosmic config

The app has been tailored to work with your existing Cosmic content structure including Products, Collections, and Reviews, and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [Cosmic](https://www.cosmicjs.com)
- **Runtime**: [Bun](https://bun.sh/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter)

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- A Cosmic account with bucket access

### Installation

1. **Clone and install dependencies:**
   ```bash
   bun install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

3. **Run the development server:**
   ```bash
   bun dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching Products
```typescript
import { cosmic } from '@/lib/cosmic'

export async function getProducts() {
  const response = await cosmic.objects
    .find({ type: 'products' })
    .props(['id', 'title', 'slug', 'metadata'])
    .depth(1)
  return response.objects
}
```

### Fetching Product Reviews
```typescript
export async function getProductReviews(productId: string) {
  const response = await cosmic.objects
    .find({ 
      type: 'reviews',
      'metadata.product': productId 
    })
    .props(['id', 'title', 'metadata'])
    .depth(1)
  return response.objects
}
```

## 🔗 Cosmic CMS Integration

This application integrates with [Cosmic](https://www.cosmicjs.com) using the following content types:

- **Products**: E-commerce products with images, pricing, and inventory
- **Collections**: Product categories and groupings
- **Reviews**: Customer reviews with ratings and verification status

For more information on the Cosmic SDK, visit the [Cosmic Docs](https://www.cosmicjs.com/docs).

## 🚀 Deployment Options

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy automatically

### Deploy to Netlify
1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Add your environment variables in the Netlify dashboard
4. Set build command to `bun run build`
5. Set publish directory to `.next`

### Environment Variables for Production
Make sure to set these environment variables in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
<!-- README_END -->