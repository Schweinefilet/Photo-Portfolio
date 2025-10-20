# Photo Portfolio Website

A modern, responsive photography portfolio website built with HTML, CSS, and JavaScript. Perfect for photographers who want to showcase their work online.

## 🌟 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Image Gallery**: Organized gallery with category filtering (Nature, Portrait, Urban, Abstract)
- **Lightbox Viewer**: Click on any image to view it in full-screen mode with navigation
- **Smooth Animations**: Beautiful fade-in effects and smooth transitions
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Easy Customization**: Simple structure for adding your own photos and content

## 🚀 Quick Start

### Hosting on GitHub Pages

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Under "Source", select the branch you want to deploy (usually `main` or `master`)
   - Click "Save"
   - Your site will be published at `https://[your-username].github.io/Photo-Portfolio/`

2. **Your website is now live!** 🎉

## 📝 Customization Guide

### Adding Your Own Photos

1. **Create an `images` folder** in the root directory
2. **Add your photos** to this folder
3. **Update the gallery items** in `index.html`:

```html
<div class="gallery-item" data-category="nature">
    <img src="images/your-photo.jpg" alt="Photo Description">
    <div class="overlay">
        <h3>Photo Title</h3>
        <p>Photo description</p>
    </div>
</div>
```

### Personalizing Content

#### Update Site Title and Header
Edit the `<title>` tag in `index.html`:
```html
<title>Your Name - Photography Portfolio</title>
```

Update the logo in the navigation:
```html
<div class="logo">YOUR NAME</div>
```

#### Modify Hero Section
Change the hero text in `index.html`:
```html
<h1>Your Custom Heading</h1>
<p>Your custom tagline</p>
```

#### Update About Section
Edit your bio in the About section of `index.html`:
```html
<section id="about" class="about">
    <div class="about-content">
        <h2>About Me</h2>
        <p>Your personal story and photography journey...</p>
    </div>
</section>
```

#### Add Contact Information
Update the contact email and social links:
```html
<a href="mailto:your-email@example.com" class="contact-btn">Email Me</a>
<div class="social-links">
    <a href="https://instagram.com/yourusername" target="_blank">Instagram</a>
    <a href="https://twitter.com/yourusername" target="_blank">Twitter</a>
</div>
```

### Customizing Colors

Edit the color variables in `style.css`:
```css
:root {
    --primary-color: #2c3e50;      /* Main dark color */
    --secondary-color: #34495e;     /* Secondary dark color */
    --accent-color: #3498db;        /* Accent/link color */
    --text-color: #333;             /* Body text color */
    --light-bg: #ecf0f1;            /* Light background */
    --white: #ffffff;               /* White */
}
```

### Adding New Gallery Categories

1. Add a new filter button in `index.html`:
```html
<button class="filter-btn" data-filter="your-category">Your Category</button>
```

2. Add gallery items with the new category:
```html
<div class="gallery-item" data-category="your-category">
    <!-- Your image content -->
</div>
```

## 🎨 Gallery Categories

The default gallery includes these categories:
- **All**: Shows all photos
- **Nature**: Landscape and nature photography
- **Portrait**: People and portrait photography
- **Urban**: City and street photography
- **Abstract**: Creative and abstract photography

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px
- **Mobile**: < 480px

## 🔧 File Structure

```
Photo-Portfolio/
│
├── index.html          # Main HTML file
├── style.css           # CSS styling
├── script.js           # JavaScript functionality
├── README.md           # Documentation
└── images/             # Your photo directory (create this)
    ├── photo1.jpg
    ├── photo2.jpg
    └── ...
```

## 💡 Tips

- **Optimize your images**: Compress photos before uploading to improve loading times
- **Recommended image size**: 1200-1600px on the longest side
- **Image format**: Use JPG for photos, PNG for graphics with transparency
- **Alt text**: Always add descriptive alt text for accessibility

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

Feel free to use this template for your personal or commercial projects!

## 🤝 Contributing

Feel free to fork this repository and customize it for your needs. If you make improvements, consider sharing them back!

---

**Happy Photography! 📸**