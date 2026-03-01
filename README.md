# Kashyap Sharma — Android Developer Portfolio

A modern, responsive portfolio website showcasing Android development projects, skills, and professional experience. Built with **React**, **Tailwind CSS**, and a sophisticated **CSS variables-based theming system** for seamless dark/light mode switching.

## ✨ Features

### Core Functionality
- **Responsive Single-Page Design** — Optimized for mobile, tablet, and desktop with Tailwind CSS
- **Dark/Light Theme Toggle** — CSS variables-powered theming with smooth 0.3s transitions
- **Smooth Animations** — Scroll-reveal effects, typing animations, and hover interactions
- **Navigation** — Fixed navbar with smooth scrolling to sections and mobile menu support
- **Contact Form** — Input validation and submission handling

### Sections
- **Hero** — Animated typing introduction, call-to-action buttons, and profile image
- **About** — Brief bio with location, company, and experience highlights
- **Skills** — Organized by category (Languages, UI, Architecture, Networking, Database) with color-coded accent groups
- **Projects** — Showcase of Android and web projects with descriptions and external links
- **Experience** — Timeline view of work history with bullet points
- **Education** — Academic credentials and certifications
- **Hobbies** — Personal interests displayed as emoji cards
- **Contact** — Email, phone, social links, and contact form

## 🎨 Theme System

Uses **CSS custom properties (variables)** for complete theme flexibility:

### Dark Mode (Default)
- Background: `#0d0f14` (dark navy)
- Cards: Semi-transparent white with blur
- Text: Slate-gray to light slate
- Accent: Bright green (`#3ddc84`)

### Light Mode
- Background: `#f0f4f8` (light blue-gray)
- Cards: Off-white with subtle shadows
- Text: Dark navy to slate-gray
- Accent: Forest green (`#16a34a`)

### Semantic Classes
All color styling uses semantic utility classes that reference CSS variables:
- `.t-heading` — Primary headings
- `.t-body` — Body text
- `.t-muted` — Secondary/supporting text
- `.t-accent` — Accent color
- `.t-card` / `.t-card2` — Card backgrounds
- `.t-tag` — Badge/tag styling
- `.t-input` — Form inputs
- `.t-btn-primary` / `.t-btn-secondary` — Button styling
- `.t-nav` / `.t-nav-link` — Navigation
- `.sec-title` — Section titles with accent underline
- `.sg-*` — Skill group color accents (green, blue, purple, yellow, red)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18+ |
| **Styling** | Tailwind CSS + CSS Variables |
| **Icons** | lucide-react |
| **Build** | Vite |
| **Fonts** | JetBrains Mono, Syne |
| **Animations** | CSS transitions + keyframes |

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── kashyap.jpg               # Profile image
│   ├── password-manager.png      # Password Manager screenshot
│   ├── playstore-screenshot.png  # Play Store app screenshot
│   └── portfolio-screenshot.png  # Portfolio screenshot
├── src/
│   ├── Portfolio.jsx             # Main component (all-in-one)
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind directives
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── tailwind.config.cjs           # Tailwind configuration
├── postcss.config.cjs            # PostCSS configuration
├── vite.config.js                # Vite configuration
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kashyapsharma2902/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Development

### Build for Production
```bash
npm run build
```
Outputs optimized files to `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Development Workflow
- Edit `src/Portfolio.jsx` to modify content or components
- CSS variables defined in the injected `<style>` block (lines ~525–650)
- Tailwind utilities available for spacing, sizing, flex, grid, and more
- Theme state managed via React hooks; persisted to `localStorage`

## 🎯 Customization

### Change Theme Colors
Edit the CSS variables in the injected style block within `src/Portfolio.jsx` (~line 525):

```javascript
:root {
  --bg: #0d0f14;                    // Dark mode background
  --accent: #3ddc84;                // Dark mode accent
  --text-head: #ffffff;
  // ... other variables
}

:root[data-theme='light'] {
  --bg: #f0f4f8;                    // Light mode background
  --accent: #16a34a;                // Light mode accent
  // ... other variables
}
```

### Update Content
- **Navigation links**: Edit `NAV_LINKS` constant
- **Typing phrases**: Edit `TYPING_PHRASES` constant
- **Projects**: Edit the `projects` array in the `Projects()` function
- **Skills**: Edit the `groups` array in the `Skills()` function
- **Experience & Education**: Edit the respective arrays in those components

### Add New Sections
1. Create a new function component (e.g., `function Blog() {...}`)
2. Import icons from `lucide-react` if needed
3. Apply semantic theme classes to elements
4. Add to the `NAV_LINKS` array
5. Include in the render order within `<main>` in `App()`

## 📱 Responsive Breakpoints

Uses Tailwind's default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🌐 Deployment

### GitHub Pages
1. Add `ghpages` package: `npm install --save-dev gh-pages`
2. Update `package.json`:
   ```json
   {
     "homepage": "https://kashyapsharma2902.github.io/portfolio",
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```
3. Run: `npm run deploy`

### Netlify
1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import project from GitHub
2. Build settings auto-detected from `vite.config.js`
3. Deploy with one click

## 📝 Resume
Download link points to `/KASHYAP_SHARMA_ANDROID-DEVELOPER_RESUME.pdf`. Replace with your actual resume file in the `public/` directory.

## 🔗 Links
- **Email**: kashyapsharma2902@gmail.com
- **LinkedIn**: [kashyap-sharma-232b83258](https://www.linkedin.com/in/kashyap-sharma-232b83258)
- **GitHub**: [kashyapsharma2902](https://github.com/kashyapsharma2902)

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome! Feel free to open an issue or submit a pull request.

---

**Built with ❤️ and React enthusiasm** — Last updated March 2026
