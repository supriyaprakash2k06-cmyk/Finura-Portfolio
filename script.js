/* ==========================================================================
   Finura Agro Tech LLP - Premium Nature-Tech Interactivity Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // STICKY NAVBAR & NAVIGATION HIGHLIGHTS
  // ==========================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('nav-links');
  const menuBtn = document.getElementById('menu-btn');
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  // Add scroll-active class to Navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavItem();
  });

  // Track active section on scroll
  function updateActiveNavItem() {
    let scrollPos = window.scrollY + 150; // Offset for header height

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.querySelector('a').getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // Mobile Hamburger menu toggle
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on clicking any navigation link
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  // ==========================================
  // 3D PARALLAX PICTURES & TILT EFFECT (User Animation Request)
  // ==========================================
  const tiltCards = document.querySelectorAll('.image-wrapper');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
      // Calculate mouse position relative to card center (from -0.5 to 0.5)
      const mouseX = (e.clientX - cardRect.left) / cardWidth - 0.5;
      const mouseY = (e.clientY - cardRect.top) / cardHeight - 0.5;
      
      // Apply slight rotation degrees (max 6 degrees for smooth premium feel)
      const rotateX = -mouseY * 12;
      const rotateY = mouseX * 12;
      
      // Apply transformation to inner image
      const img = card.querySelector('.animated-img');
      if (img) {
        img.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      // Smooth reset on mouse leave
      const img = card.querySelector('.animated-img');
      if (img) {
        img.style.transform = 'scale(1.02) rotateX(0) rotateY(0)';
      }
    });
  });


  // ==========================================
  // DYNAMIC RUNNING STAT COUNTERS
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const statsObserverOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetNumber = entry.target;
        const targetValue = parseInt(targetNumber.getAttribute('data-target'), 10);
        animateCounter(targetNumber, targetValue);
        observer.unobserve(targetNumber); // Stop observing after animation completes
      }
    });
  }, statsObserverOptions);

  statNumbers.forEach(num => statsObserver.observe(num));

  function animateCounter(element, target) {
    const originalTargetStr = element.getAttribute('data-target') || '';
    const suffix = originalTargetStr.replace(/[0-9]/g, ''); // Retain trailing "+", "%", etc.
    let current = 0;
    const duration = 1800; // Total counter animation runtime in ms
    const increment = Math.ceil(target / (duration / 16)); // Target step per frame (approx 60fps)

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = current + suffix;
      }
    }, 16);
  }


  // ==========================================
  // INTERACTIVE TISSUE CULTURE LABORATORY PROCESS
  // ==========================================
  const processSteps = document.querySelectorAll('.process-step');
  const labImage = document.querySelector('.lab-image-wrapper img');
  
  // Custom states/images can map to different stages if desired, currently using nice hover scales
  processSteps.forEach(step => {
    step.addEventListener('click', () => {
      // Remove active class from all steps
      processSteps.forEach(s => s.classList.remove('active'));
      // Add active state to clicked step
      step.classList.add('active');

      // Micro-interactive visual feedback on the main lab image
      if (labImage) {
        labImage.style.filter = 'brightness(0.5) saturate(1.5)';
        setTimeout(() => {
          labImage.style.filter = 'brightness(1) saturate(1)';
        }, 300);
      }
    });
  });


  // ==========================================
  // FILTERABLE PLANTS GALLERY
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const plantCards = document.querySelectorAll('.plant-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active Button Highlight toggle
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      plantCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        // Animate filtering transitions
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95) translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  // ==========================================
  // ACADEMIC INTERNSHIP REQUIREMENT MODAL
  // ==========================================
  const internModal = document.getElementById('intern-modal');
  const openModalBtn = document.getElementById('modal-details-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalCloseAction = document.getElementById('modal-close-action');

  function openModal() {
    internModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Disable background scrolling
  }

  function closeModal() {
    internModal.classList.remove('open');
    document.body.style.overflow = ''; // Enable background scrolling
  }

  if (openModalBtn) openModalBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeModal);

  // Close modal by clicking outside content card
  window.addEventListener('click', (e) => {
    if (e.target === internModal) {
      closeModal();
    }
  });


  // ==========================================
  // CLIENT TESTIMONIAL CAROUSEL SLIDER
  // ==========================================
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  
  let currentSlide = 0;
  let carouselInterval;

  function showSlide(index) {
    // Range protection bounds checks
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Toggle slide visual classes
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Setup control buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }

  // Setup dot controls
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.getAttribute('data-index'), 10);
      showSlide(targetIndex);
      resetInterval();
    });
  });

  // Auto carousel cycling
  function startInterval() {
    carouselInterval = setInterval(nextSlide, 7000); // Cycle every 7 seconds
  }

  function resetInterval() {
    clearInterval(carouselInterval);
    startInterval();
  }

  startInterval();


  // ==========================================
  // HERO MULTIPLE IMAGES SLIDESHOW CAROUSEL
  // ==========================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentHeroSlide = 0;
  let heroSlideshowInterval;

  function showHeroSlide(index) {
    if (heroSlides.length === 0) return;
    
    if (index >= heroSlides.length) currentHeroSlide = 0;
    else if (index < 0) currentHeroSlide = heroSlides.length - 1;
    else currentHeroSlide = index;

    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));

    heroSlides[currentHeroSlide].classList.add('active');
    heroDots[currentHeroSlide].classList.add('active');
  }

  function nextHeroSlide() {
    showHeroSlide(currentHeroSlide + 1);
  }

  // Setup dot controls
  heroDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.getAttribute('data-slide'), 10);
      showHeroSlide(targetIndex);
      resetHeroInterval();
    });
  });

  function startHeroInterval() {
    heroSlideshowInterval = setInterval(nextHeroSlide, 5000); // Cycle every 5 seconds
  }

  function resetHeroInterval() {
    clearInterval(heroSlideshowInterval);
    startHeroInterval();
  }

  if (heroSlides.length > 0) {
    startHeroInterval();
  }


  // ==========================================
  // QUICK CONTACT & NEWSLETTER FORMS SUCCESS FEEDBACK
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.getElementById('newsletter-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Grab inputs to simulate real processing
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      // Premium success card transition
      contactForm.innerHTML = `
        <div style="text-align: center; padding: 3rem 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); border: 2px solid var(--primary-emerald); display: flex; align-items: center; justify-content: center; color: var(--primary-emerald); font-size: 1.75rem; box-shadow: var(--neon-shadow-green); margin-bottom: 0.5rem; animation: pulse-glow 2s infinite alternate;">✓</div>
          <h3 style="font-size: 1.5rem; color: var(--primary-emerald);">Inquiry Received!</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5;">Thank you, <strong>${name}</strong>. Our Bio-Agro team has received your message and will email you at <strong>${email}</strong> within 12 hours.</p>
        </div>
      `;
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      const email = input.value;

      // Mini-success feedback
      newsletterForm.innerHTML = `
        <p style="color: var(--secondary-mint); font-size: 0.9rem; font-weight: 600; margin: 0; padding: 0.75rem 0;">✓ Subscribed! Welcome to Finura Logs.</p>
      `;
    });
  }

});
