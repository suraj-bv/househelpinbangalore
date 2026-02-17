# 🏠 House Help in Bengaluru

> **Instant Maid Services | 1–2 Hour Slots | Fixed Hourly Pricing**

A modern, responsive web application for booking on-demand maid services in Bengaluru. Get quick home help for daily cleaning, dishwashing, laundry, and packing — no long-term commitment required.

---

## ✨ Features

- **Instant Booking** — Book trained maids for 1–2 hour slots on demand
- **Service Catalog** — Daily home cleaning, kitchen & dishwashing, laundry assistance, packing & unpacking, and basic bathroom cleaning
- **Fixed Hourly Pricing** — Transparent rates with no hidden charges
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile devices
- **Blog Section** — Cleaning tips, eco-friendly guides, and expert advice
- **FAQ Section** — Comprehensive answers to common questions
- **Testimonials** — Real customer reviews and ratings
- **App Download Badges** — Links to upcoming Google Play Store and Apple App Store apps

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible UI components (built on Radix UI) |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [TanStack React Query](https://tanstack.com/query) | Data fetching & caching |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Recharts](https://recharts.org/) | Charts & data visualization |

---

## 📁 Project Structure

```
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   ├── ui/              # shadcn/ui components (Button, Dialog, Toast, etc.)
│   │   ├── AnimatedSection.tsx
│   │   ├── BlogCard.tsx
│   │   ├── FAQItem.tsx
│   │   ├── NavLink.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ServiceDetail.tsx
│   │   └── TestimonialCard.tsx
│   ├── data/
│   │   ├── blogs.ts         # Blog post data
│   │   └── testimonials.ts  # Customer testimonial data
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/
│   │   ├── Index.tsx        # Home page (Hero, Services, Why Us, Blog, Testimonials, FAQ)
│   │   ├── Blogs.tsx        # Blog listing page
│   │   ├── SingleBlog.tsx   # Individual blog post page
│   │   └── NotFound.tsx     # 404 page
│   ├── test/                # Test files
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── index.html               # HTML entry point
├── tailwind.config.ts       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Build for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📄 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero section, services overview, detailed service breakdown, exclusions, why choose us, blog highlights, testimonials, and FAQ |
| `/blogs` | Blogs | Full listing of all blog articles |
| `/blogs/:slug` | Single Blog | Individual blog post view |
| `*` | 404 | Not found page |

---

## 🧹 Services Offered

- **Daily Home Cleaning** — Sweeping, mopping, dusting, table cleaning, room tidying
- **Kitchen & Dishwashing** — Dish washing, slab/sink wiping, stove cleaning, general upkeep
- **Laundry Assistance** — Machine washing, drying, folding (no hand washing)
- **Packing & Unpacking** — Shifting support, organizing essentials, arranging items
- **Bathroom & Utility Cleaning** — Basic toilet, sink, floor, and utility area cleaning

---

## 📱 Mobile App

The mobile application is coming soon on:

- **Google Play Store** (Android)
- **Apple App Store** (iOS)

---

## 📝 License

This project is private and proprietary.
