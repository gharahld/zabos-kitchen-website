# Zabo's Kitchen Restaurant Website

A modern, professional restaurant website built with React, Vite, and Tailwind CSS. Features interactive menus, image galleries, online reservations, and optimized performance for production deployment.

## 🍽️ Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Interactive Menu**: Filterable menu with search and category filtering
- **Image Galleries**: Auto-playing hero carousel and restaurant photo gallery
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **SEO Ready**: Meta tags, structured data, and social media optimization
- **PWA Support**: Progressive Web App capabilities
- **Error Handling**: Comprehensive error boundaries and fallbacks

## 🚀 Quick Start

### Prerequisites

- Node.js 18.10.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd restaurant-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Build for Production

### Development Build
```bash
npm run build
```

### Production Build with Analysis
```bash
npm run build:analyze
```

### Preview Production Build
```bash
npm run preview
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:analyze` - Build with bundle analysis
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run clean` - Clean build directory
- `npm run serve` - Serve production build

## 🌐 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to Netlify

### Other Platforms

The built files in the `dist` directory can be deployed to any static hosting service:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- GitHub Pages

## ⚙️ Configuration

### Environment Variables

Copy `env.example` to `.env.local` and configure:

```env
# Application
VITE_APP_NAME="Zabo's Kitchen"
VITE_APP_URL="https://zaboskitchen.com"

# Restaurant Information
VITE_RESTAURANT_PHONE="+1-954-123-4567"
VITE_RESTAURANT_EMAIL="info@zaboskitchen.com"
VITE_RESTAURANT_ADDRESS="3080 Sheridan St, Hollywood, FL 33021"

# Analytics (Optional)
VITE_GOOGLE_ANALYTICS_ID=""
```

### Customization

1. **Brand Colors**: Update colors in `tailwind.config.js`
2. **Restaurant Info**: Modify data in `src/App.jsx`
3. **Images**: Replace images in `public/` directory
4. **Content**: Update text content in components

## 📱 PWA Features

The website includes Progressive Web App capabilities:

- **Offline Support**: Basic offline functionality
- **Install Prompt**: Users can install the app on their devices
- **App Shortcuts**: Quick access to menu, reservations, and ordering
- **Responsive Design**: Optimized for mobile and desktop

## 🔍 SEO Optimization

- **Meta Tags**: Comprehensive meta tags for social sharing
- **Structured Data**: JSON-LD schema for restaurant information
- **Sitemap**: Auto-generated sitemap for search engines
- **Robots.txt**: Search engine crawling instructions
- **Performance**: Optimized Core Web Vitals

## 🎨 Design System

### Colors
- **Primary Orange**: #F7941D
- **Secondary Blue**: #1A73E8
- **Accent Yellow**: #FFC107
- **Charcoal**: #1F2427
- **Light Gray**: #E5EBEE

### Typography
- **Headings**: Poppins (Google Fonts)
- **Body**: Inter (Google Fonts)

### Components
- **Buttons**: Multiple variants with hover effects
- **Cards**: Consistent styling with shadows and animations
- **Forms**: Accessible form components
- **Navigation**: Responsive navigation with mobile menu

## 🚀 Performance

### Optimizations
- **Code Splitting**: Automatic chunk splitting for better caching
- **Lazy Loading**: Images and components load on demand
- **Tree Shaking**: Unused code elimination
- **Minification**: CSS and JavaScript minification
- **Compression**: Gzip compression for assets

### Bundle Analysis
```bash
npm run build:analyze
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Forms submit successfully
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] Performance metrics

### Performance Testing
- Use Lighthouse for performance audits
- Test on slow networks
- Verify Core Web Vitals

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

2. **Image Loading Issues**
   - Verify image URLs are accessible
   - Check CORS settings for external images

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for CSS conflicts

## 📞 Support

For technical support or questions:
- **Email**: info@zaboskitchen.com
- **Website**: https://zaboskitchen.com

## 📄 License

This project is proprietary software for Zabo's Kitchen Restaurant.

## 🙏 Credits

- **Design**: Custom design for Zabo's Kitchen
- **Development**: Tech Action Studio
- **Images**: Unsplash (with proper attribution)
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Poppins, Inter)

---

**Built with ❤️ for Zabo's Kitchen Restaurant**