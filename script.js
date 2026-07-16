document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================
     THEME TOGGLE
     ========================================== */
  const themeToggle = document.getElementById('theme-toggle');
  
  // Set default theme to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  /* ==========================================
     MOBILE NAVIGATION
     ========================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const toggleMobileMenu = () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Prevent scrolling when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  };
  
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  
  // Close menu when clicking link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // Close mobile menu if clicked outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
      toggleMobileMenu();
    }
  });

  /* ==========================================
     HEADER SCROLL EFFECT & BACK TO TOP
     ========================================== */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    if (window.scrollY > 500) {
      backToTop.style.opacity = '1';
      backToTop.style.pointerEvents = 'auto';
      backToTop.style.transform = 'translateY(0)';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.pointerEvents = 'none';
      backToTop.style.transform = 'translateY(15px)';
    }
  });
  
  // Initialize state on load
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  }

  /* ==========================================
     TYPEWRITER EFFECT
     ========================================== */
  const typingText = document.getElementById('typing-text');
  const words = ['Backend Developer', 'FastAPI & Python Developer', 'Laravel & PHP Developer', 'MCA Student'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;
  
  const type = () => {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Remove character
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40; // delete faster
    } else {
      // Add character
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }
    
    // Typing logic transitions
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Cycle to next word
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // brief pause before next word
    }
    
    setTimeout(type, typeSpeed);
  };
  
  // Start the typewriter loop
  if (typingText) {
    type();
  }

  /* ==========================================
     PROJECTS FILTERING
     ========================================== */
  const filterBtns = document.querySelectorAll('.projects-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Clear any existing timeout for this card to prevent race conditions
        if (card.timeoutId) {
          clearTimeout(card.timeoutId);
          card.timeoutId = null;
        }
        
        if (filterValue === 'all' || category === filterValue) {
          // Show card
          card.style.display = 'flex';
          card.timeoutId = setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, 50);
        } else {
          // Hide card
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9) translateY(10px)';
          card.timeoutId = setTimeout(() => {
            card.style.display = 'none';
            card.timeoutId = null;
          }, 300);
        }
      });
    });
  });

  /* ==========================================
     SKILLS FILTERING
     ========================================== */
  const skillsFilterBtns = document.querySelectorAll('.skills-filter-btn');
  const skillBadges = document.querySelectorAll('.skill-badge');
  
  skillsFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      skillsFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      skillBadges.forEach(badge => {
        const category = badge.getAttribute('data-category');
        
        // Clear any existing timeout for this badge to prevent race conditions
        if (badge.timeoutId) {
          clearTimeout(badge.timeoutId);
          badge.timeoutId = null;
        }
        
        if (filterValue === 'all' || category === filterValue) {
          // Show badge
          badge.style.display = 'flex';
          badge.timeoutId = setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1) translateY(0)';
          }, 50);
        } else {
          // Hide badge
          badge.style.opacity = '0';
          badge.style.transform = 'scale(0.9) translateY(10px)';
          badge.timeoutId = setTimeout(() => {
            badge.style.display = 'none';
            badge.timeoutId = null;
          }, 300);
        }
      });
    });
  });

  /* ==========================================
     INTERSECTION OBSERVER - SCROLL ANIMATIONS
     ========================================== */
  
  // 1. Active Section Navigation Highlighter
  const sections = document.querySelectorAll('section');
  
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { 
    rootMargin: '-30% 0px -60% 0px' // Trigger when section occupies mid viewport
  });
  
  sections.forEach(section => navObserver.observe(section));

  // 3. Fade In On Scroll (for sections / cards)
  const fadeElems = document.querySelectorAll('.glass-card, .timeline-item, .skills-category-card, .skills-unified-grid');
  fadeElems.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

  fadeElems.forEach(el => fadeObserver.observe(el));

  /* ==========================================
     CONTACT FORM HANDLING & VALIDATION
     ========================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameGroup = document.getElementById('name-group');
      const emailGroup = document.getElementById('email-group');
      const messageGroup = document.getElementById('message-group');
      
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');
      
      let isValid = true;
      
      // Reset errors
      nameGroup.classList.remove('error');
      emailGroup.classList.remove('error');
      messageGroup.classList.remove('error');
      formStatus.style.display = 'none';
      formStatus.className = 'form-status';
      
      // Validate Name
      if (nameInput.value.trim() === '') {
        nameGroup.classList.add('error');
        isValid = false;
      }
      
      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailGroup.classList.add('error');
        isValid = false;
      }
      
      // Validate Message
      if (messageInput.value.trim() === '') {
        messageGroup.classList.add('error');
        isValid = false;
      }
      
      if (isValid) {
        // Mock Send Animation
        formStatus.innerHTML = '<div class="spinner"></div> Sending your message...';
        formStatus.classList.add('sending');
        formStatus.style.display = 'flex';
        
        // Disable form inputs
        const inputs = contactForm.querySelectorAll('input, textarea, button');
        inputs.forEach(i => i.disabled = true);
        
        setTimeout(() => {
          // Success state
          formStatus.innerHTML = 'Thank you, Yash! Your message has been sent successfully. I will get back to you shortly.';
          formStatus.classList.remove('sending');
          formStatus.classList.add('success');
          
          // Reset form
          contactForm.reset();
          
          // Re-enable form inputs
          inputs.forEach(i => i.disabled = false);
          
          // Fade status out after 5 seconds
          setTimeout(() => {
            formStatus.style.opacity = '0';
            formStatus.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
              formStatus.style.display = 'none';
              formStatus.style.opacity = '1';
            }, 500);
          }, 5000);
          
        }, 1800);
      }
    });
  }


});
