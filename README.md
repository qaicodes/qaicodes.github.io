# 🚀 Qurratulain Saleem - AI Engineer Portfolio

A modern, high-performance portfolio website showcasing AI/ML expertise and professional experience. Built with cutting-edge web technologies for optimal performance and scalability.

## ✨ Features

### 🎨 **Modern Design**
- **Dark terminal aesthetic** with gold accents
- **Glassmorphism effects** and smooth animations
- **Fully responsive** design for all devices
- **Accessibility-first** approach (WCAG compliant)

### ⚡ **Performance Optimized**
- **Vite build system** for lightning-fast development
- **TypeScript** for type safety and better DX
- **SCSS modular architecture** with design tokens
- **Core Web Vitals monitoring** with Lighthouse CI
- **Lazy loading** and optimized assets

### 🔧 **Developer Experience**
- **Hot module replacement** for instant updates
- **Component-based architecture** for maintainability
- **Automated CI/CD** with GitHub Actions
- **Performance monitoring** and analytics
- **SEO optimized** with meta tags and sitemap

### 🌐 **Production Ready**
- **GitHub Pages deployment** with custom domain support
- **PWA capabilities** with service worker
- **Security headers** and CSP policies
- **Analytics integration** (Google Analytics 4)
- **Contact form** with validation and Formspree integration

## 🛠️ Tech Stack

### **Frontend**
- **HTML5** - Semantic markup
- **SCSS** - Modular styling with design tokens
- **TypeScript** - Type-safe JavaScript
- **Vite** - Modern build tool

### **Build & Deploy**
- **GitHub Actions** - CI/CD automation
- **GitHub Pages** - Static hosting
- **Lighthouse CI** - Performance monitoring

### **Analytics & Monitoring**
- **Google Analytics 4** - User behavior tracking
- **Core Web Vitals** - Performance metrics
- **Error tracking** - Production monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/qaicodes/qaicodes.github.io.git
cd qaicodes.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands

```bash
# Development server with hot reload
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 📁 Project Structure

```
qaicodes.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── public/
│   ├── robots.txt              # SEO configuration
│   ├── sitemap.xml             # Search engine sitemap
│   └── site.webmanifest        # PWA manifest
├── src/
│   ├── components/             # Reusable components
│   │   ├── scripts/
│   │   │   ├── components/         # TypeScript modules
│   │   │   │   ├── animations.ts   # Scroll animations
│   │   │   │   ├── contact-form.ts # Form handling
│   │   │   │   └── navigation.ts   # Navigation logic
│   │   │   ├── utils/              # Utility functions
│   │   │   │   ├── analytics.ts    # Analytics tracking
│   │   │   │   └── performance.ts  # Performance monitoring
│   │   │   └── main.ts             # Entry point
│   │   └── styles/
│   │       ├── variables.scss      # Design tokens
│   │       ├── base.scss           # Reset & base styles
│   │       ├── layout.scss         # Layout components
│   │       ├── components.scss     # UI components
│   │       └── main.scss           # Main stylesheet
│   └── index.html                  # Main HTML file
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── lighthouserc.js             # Lighthouse CI config
└── package.json                # Dependencies & scripts
```

## 🎯 Performance Targets

This portfolio is optimized for excellent Core Web Vitals:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Lighthouse Score**: 95+ across all categories

## 🔧 Configuration

### Analytics Setup
1. Replace `G-XXXXXXXXXX` in `src/scripts/utils/analytics.ts` with your GA4 measurement ID
2. Update tracking events as needed for your use case

### Contact Form Setup
1. Sign up for [Formspree](https://formspree.io/)
2. Replace `YOUR_FORM_ID` in `index.html` with your Formspree form ID
3. Test form submission in production

### Custom Domain (Optional)
1. Add `CNAME` file to `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Update URLs in configuration files

## 🚀 Deployment

### Automatic Deployment
Every push to `main` branch automatically:
1. **Builds** the project with Vite
2. **Runs** type checking and tests
3. **Deploys** to GitHub Pages
4. **Monitors** performance with Lighthouse CI

### Manual Deployment
```bash
npm run build
npm run deploy
```

## 📊 Analytics & Monitoring

### Built-in Tracking
- **Page views** and user sessions
- **Navigation clicks** and user flow
- **Contact form** submissions
- **Project link** clicks
- **Scroll depth** and engagement
- **Performance metrics** and Core Web Vitals

### Performance Monitoring
- **Real User Monitoring** (RUM) with Core Web Vitals
- **Lighthouse CI** for automated performance testing
- **Error tracking** for production issues
- **Memory usage** monitoring

## 🔒 Security

### Security Headers
- **Content Security Policy** (CSP) configured
- **HTTPS enforcement** on GitHub Pages
- **XSS protection** with sanitized inputs
- **CSRF protection** on contact forms

### Privacy
- **GDPR compliant** analytics setup
- **No tracking** in development mode
- **Minimal data collection** approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♀️ Contact

**Qurratulain Saleem**
- 📧 Email: saleemqurratulain@gmail.com
- 💼 LinkedIn: [qurratulain-saleem](https://www.linkedin.com/in/qurratulain-saleem/)
- 🔗 GitHub: [@qaicodes](https://github.com/qaicodes)
- 📱 Phone: +91-9899843703

---

⭐ **Star this repo** if you found it helpful!

Built with ❤️ using modern web technologies 