# Modern Tech Blog

![Modern Tech Blog](https://imgix.cosmicjs.com/874645e0-fe25-11f0-a969-0bcd7c3c4c42-photo-1633356122544-f134324a6cee-1769809758408.jpg?w=1200&h=400&fit=crop&auto=format,compress)

A beautifully designed, modern blog platform built with Next.js 16 and Tailwind CSS. Features a clean, minimalist aesthetic with responsive design, category filtering, author pages, and dynamic content powered by Cosmic CMS.

## Features

- ✨ **Modern UI** - Clean, minimalist design with Inter font
- 📱 **Fully Responsive** - Mobile-first design that looks great on all devices
- 🏷️ **Category System** - Filter posts by category with dynamic color badges
- 👤 **Author Pages** - Individual pages for each author with their posts
- ⭐ **Featured Posts** - Highlight your best content on the homepage
- ⏱️ **Reading Time** - Estimated read time for each article
- 📝 **Markdown Support** - Full markdown rendering for blog content
- 🖼️ **Optimized Images** - Automatic image optimization via imgix
- 🔗 **Social Links** - Twitter integration for authors

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=697d27074678c20337c84372&clone_repository=697d6078706389f7552a9f18)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Blog site, modern clean UI, tailwind CSS, inter font, mobile responsive.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Typography**: [Inter Font](https://fonts.google.com/specimen/Inter) - Clean, modern typeface
- **CMS**: [Cosmic](https://www.cosmicjs.com/docs) - Headless content management
- **Language**: TypeScript - Type-safe development
- **Markdown**: react-markdown with remark-gfm - Rich content rendering

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the blog content model

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Blog Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post

```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'blog-posts', slug: 'my-post' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This blog uses three content types from Cosmic:

- **Blog Posts** - Articles with content, excerpts, featured images, authors, and categories
- **Authors** - Writer profiles with names, bios, avatars, and social links
- **Categories** - Topic organization with names, descriptions, and colors

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in Netlify
3. Add environment variables
4. Set build command to `bun run build`
5. Deploy

<!-- README_END -->