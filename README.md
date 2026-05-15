# Nayan Suryavanshi - Portfolio Prototype

A polished single-page portfolio prototype with cyber/tech-forward design, featuring cinematic loading sequences, cipher text animations, command overlay, and crosshair-driven interactions.

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat-square&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🎬 **Cinematic Loading Sequence** - Elegant cube animation with progress indicator
- ⌨️ **Command Overlay** - Quick navigation with Ctrl+K / Cmd+K
- 🎯 **Crosshair Interactions** - Tactical hover states and focus indicators
- 🔤 **Cipher Text Animations** - Decode/encode text effects for headings
- 📱 **Fully Responsive** - Optimized for all screen sizes
- ♿ **Accessibility First** - Keyboard navigation, focus traps, reduced motion support
- 🎨 **Cyber Aesthetic** - Refined off-white/dark-charcoal design with tech-forward motion

## 🚀 Tech Stack

- **Framework:** Next.js 16.2.6 (App Router)
- **UI Library:** React 19.2.4
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion 12.38.0
- **Database:** Prisma 5 with SQLite (dev) / PostgreSQL (production)
- **Icons:** React Icons, Lucide React

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NAYANSURYAVANSHI/nayan-portfolio.git
   cd nayan-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Set up the database:**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev --name init
   ```

5. **Seed the database:**
   ```bash
   npm run dev
   # Then visit http://localhost:3000/api/seed (POST request)
   # Or use: curl -X POST http://localhost:3000/api/seed
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

7. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
nayan-portfolio/
├── prisma/
│   ├── migrations/          # Database migrations
│   └── schema.prisma        # Database schema
├── public/
│   └── prototype-assets/    # Loading cube, crosshair reference images
├── specs/                   # Feature specifications
│   ├── command-overlay/
│   ├── loading-sequence/
│   ├── motion-accessibility/
│   └── navigation-shell/
├── src/
│   ├── app/
│   │   ├── api/            # API routes (seed, profile, skills, etc.)
│   │   ├── components/     # React components
│   │   │   ├── CipherText.tsx
│   │   │   ├── PortfolioShell.tsx
│   │   │   └── PrototypeIcons.tsx
│   │   ├── globals.css     # Global styles and CSS tokens
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   └── lib/
│       ├── prisma.ts       # Prisma client
│       └── utils.ts        # Utility functions
└── package.json
```

## 🎯 Key Sections

- **Home** - Hero section with cipher text and command prompt
- **About** - Background, current focus, and recent experience
- **Projects** - Featured builds with tech stack and links
- **Writings** - Essays and technical notes
- **Stack** - Technologies grouped by category
- **Hacks** - Side projects and experiments
- **Setups** - Development environment and education

## ⌨️ Keyboard Shortcuts

- `Ctrl+K` / `Cmd+K` - Open command overlay
- `Esc` - Close overlays
- `Tab` - Navigate through interactive elements
- Arrow keys - Navigate command items

## 🎨 Design System

### Colors
- **Background:** `#f3f2ee` (light) / `#090d14` (dark)
- **Accent:** `#0cd7b2` (primary) / `#5973ff` (secondary) / `#ff64ba` (tertiary)
- **Text:** `#121723` (light) / `#eef4ff` (dark)

### Typography
- **Display:** Chakra Petch (headings)
- **Body:** Manrope (content)
- **Mono:** System monospace (technical accents)

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📱 API Routes

- `POST /api/seed` - Seed database with initial data
- `GET /api/profile` - Get profile information
- `GET /api/skills` - Get skills list
- `GET /api/experience` - Get work experience
- `GET /api/projects` - Get projects list

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
4. Deploy!

### Environment Variables for Production

```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Nayan Suryavanshi**

- GitHub: [@NAYANSURYAVANSHI](https://github.com/NAYANSURYAVANSHI)
- LinkedIn: [Nayan Suryavanshi](https://www.linkedin.com/in/nayan-suryavanshi-367688323)
- Email: nayansuryavanshi70@gmail.com

## 🙏 Acknowledgments

- Design inspiration from cyber/tech editorial aesthetics
- Built with Next.js, React, and Tailwind CSS
- Animations powered by Framer Motion

---

⭐ Star this repo if you find it helpful!
