// Global variables
let currentProjectIndex = 0;
const projects = [
  {
    title: "Full-Stack Blog Application with Go and Next JS",
    year: "2025",
    type: "Full Stack",
    description: "Built a comprehensive blog platform using Go clean architecture and Next.js. Implemented RESTful API with JWT authentication, database migrations, and modern responsive UI components using Material-UI, Tailwind CSS, and React Query for efficient data fetching.",
    technologies: ["Go", "Next.js", "GORM", "PostgreSQL", "JWT", "React", "Material-UI", "Tailwind CSS", "React Query"],
    highlights: ["Clean architecture implementation", "RESTful API development", "JWT authentication", "Database migrations", "Responsive UI design"]
  },
  {
    title: "AI Product Advisor Mobile App",
    year: "2025",
    type: "Mobile Application",
    description: "React Native mobile application helping users discover, compare, and get personalized recommendations for AI tools and products. Features conversational AI advisor chat and modern UI/UX design with cross-platform compatibility.",
    technologies: ["React Native", "AI Integration", "Cross-platform"],
    highlights: ["Cross-platform compatibility", "AI-powered recommendations", "Conversational interface", "Modern UI/UX", "Scalable architecture"]
  },
  {
    title: "AI Dashboard & Reporting Platform",
    year: "2025",
    type: "No-Code Platform",
    description: "AI-powered dashboard generator creating interactive data visualizations using natural language prompts. Features no-code analytics UI with secure onboarding and early-access deployment for businesses and individuals.",
    technologies: ["Framer", "AI Integration", "Data Visualization"],
    highlights: ["Natural language prompts", "Interactive visualizations", "No-code interface", "Secure onboarding", "AI-powered generation"]
  },
  {
    title: "Gold Rate Analysis and Prediction",
    year: "2023",
    type: "Data Science",
    description: "Comprehensive analysis of 20 years of gold market data using multiple regression algorithms. Applied various ML techniques including Linear Regression, Decision Tree, Random Forest, and XGBoost with Random Forest achieving highest accuracy for price forecasting.",
    technologies: ["Python", "Machine Learning", "XGBoost", "Random Forest", "Data Visualization"],
    highlights: ["20-year dataset analysis", "Multiple ML algorithms", "Data visualization", "Model performance evaluation", "Trend forecasting"]
  },
  {
    title: "Digital Marketing Campaign for Elite Builders",
    year: "2023",
    type: "Digital Marketing",
    description: "Designed and executed comprehensive digital marketing strategy to enhance brand visibility. Utilized SEO, social media campaigns, and analytics-driven optimization to improve customer engagement and lead generation with measurable ROI improvements.",
    technologies: ["SEO", "Social Media Marketing", "Google Analytics", "Technical SEO"],
    highlights: ["Brand visibility enhancement", "Multi-channel campaigns", "Performance analytics", "Customer behavior analysis", "ROI optimization"]
  }
];

const typewriterTexts = [
"Software Engineer",
"Frontend Developer",
"Product Designer",
"Product UI Innovator",
"AI-Powered UI Designer",
"Machine Learning Enthusiast",
"UI/UX Designer",
];

let typewriterIndex = 0;
let charIndex = 0;
let isDeleting = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupNavigation();
  setupCustomCursor();
  setupTypewriter();
  setupScrollAnimations();
  setupSkillsAnimation();
  setupProjectInteractions();
  setupProjectModals();
  setupContactForm();
  setupMobileNavigation();
}

// Custom Cursor
function setupCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  
  if (!cursor || !follower) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  
  // Animate follower with delay
  function animateFollower() {
    const delay = 0.1;
    followerX += (mouseX - followerX) * delay;
    followerY += (mouseY - followerY) * delay;
    
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
  
  // Cursor interactions
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      follower.style.transform = 'scale(1.2)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      follower.style.transform = 'scale(1)';
    });
  });
}

// Navigation
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero');
  
  // Smooth scrolling
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Active nav link highlighting
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Mobile Navigation
function setupMobileNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }
}

// Typewriter Effect
function setupTypewriter() {
  const typewriterElement = document.querySelector('.typewriter-text');
  
  if (!typewriterElement) return;
  
  function typewriterEffect() {
    const currentText = typewriterTexts[typewriterIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      
      if (charIndex === 0) {
        isDeleting = false;
        typewriterIndex = (typewriterIndex + 1) % typewriterTexts.length;
        setTimeout(typewriterEffect, 500);
        return;
      }
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typewriterEffect, 2000);
        return;
      }
    }
    
    setTimeout(typewriterEffect, isDeleting ? 50 : 100);
  }
  
  typewriterEffect();
}

// Scroll Animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);
  
  // Add reveal class to animated elements
  const animatedElements = document.querySelectorAll('.section-header, .about-content, .skill-card, .project-card, .timeline-item, .cert-card, .contact-item');
  
  animatedElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// Skills Animation
function setupSkillsAnimation() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.progress-bar');
        const progress = progressBar.getAttribute('data-progress');
        
        setTimeout(() => {
          progressBar.style.width = progress + '%';
        }, 300);
      }
    });
  }, { threshold: 0.5 });
  
  skillCards.forEach(card => {
    skillsObserver.observe(card);
  });
}

// Project interactions (no filtering needed)
function setupProjectInteractions() {
  // Project cards are now displayed without filtering
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

// Project Modals
function setupProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal-close');
  const projectDetailsButtons = document.querySelectorAll('.project-details-btn');
  
  if (!modal) return;
  
  projectDetailsButtons.forEach(button => {
    button.addEventListener('click', () => {
      const projectIndex = parseInt(button.getAttribute('data-project'));
      showProjectModal(projectIndex);
    });
  });
  
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.style.display = 'none';
    }
  });
}

function showProjectModal(index) {
  const modal = document.getElementById('project-modal');
  const project = projects[index];
  
  if (!project || !modal) return;
  
  // Populate modal content
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-year').textContent = project.year;
  document.getElementById('modal-type').textContent = project.type;
  document.getElementById('modal-description').textContent = project.description;
  
  // Populate highlights
  const highlightsList = document.getElementById('modal-highlights-list');
  highlightsList.innerHTML = '';
  project.highlights.forEach(highlight => {
    const li = document.createElement('li');
    li.textContent = highlight;
    highlightsList.appendChild(li);
  });
  
  // Populate technologies
  const techTags = document.getElementById('modal-tech-tags');
  techTags.innerHTML = '';
  project.technologies.forEach(tech => {
    const tag = document.createElement('span');
    tag.className = 'tech-tag';
    tag.textContent = tech;
    techTags.appendChild(tag);
  });
  
  modal.style.display = 'block';
}

// Contact Form
function setupContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Create mailto link
    const mailtoLink = `mailto:johanthomas1357@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
    
    setTimeout(() => {
      // Open email client
      window.location.href = mailtoLink;
      
      // Reset form
      contactForm.reset();
      
      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      
      // Show success message
      showNotification('Thank you for your message! Your email client should open shortly.', 'success');
    }, 1000);
  });
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: type === 'success' ? '#00d4ff' : '#ff6b35',
    color: '#0a0a0a',
    padding: '1rem 1.5rem',
    borderRadius: '0.5rem',
    zIndex: '10000',
    fontWeight: '500',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    animation: 'slideInRight 0.3s ease-out'
  });
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Add CSS for notification animations
const notificationStyles = `
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Parallax Effect
function setupParallaxEffect() {
  const shapes = document.querySelectorAll('.shape');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    shapes.forEach((shape, index) => {
      const speed = parallaxSpeed * (index + 1) * 0.1;
      shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
  });
}

// Initialize parallax after DOM is loaded
setTimeout(setupParallaxEffect, 100);

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  const smoothScrollPolyfill = document.createElement('script');
  smoothScrollPolyfill.src = 'https://polyfill.io/v3/polyfill.min.js?features=smoothscroll';
  document.head.appendChild(smoothScrollPolyfill);
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Any scroll-based animations can be optimized here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Loading Animation
window.addEventListener('load', () => {
  const loadingAnimation = document.createElement('div');
  loadingAnimation.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    transition: opacity 0.5s ease-out;
  `;
  
  const loader = document.createElement('div');
  loader.style.cssText = `
    width: 50px;
    height: 50px;
    border: 3px solid rgba(0, 212, 255, 0.3);
    border-top: 3px solid #00d4ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  `;
  
  loadingAnimation.appendChild(loader);
  document.body.appendChild(loadingAnimation);
  
  // Add spin animation
  const spinKeyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  
  const spinStyle = document.createElement('style');
  spinStyle.textContent = spinKeyframes;
  document.head.appendChild(spinStyle);
  
  setTimeout(() => {
    loadingAnimation.style.opacity = '0';
    setTimeout(() => {
      loadingAnimation.remove();
    }, 500);
  }, 1500);
});
