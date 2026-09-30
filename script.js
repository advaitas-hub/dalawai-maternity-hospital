// Dalawai Hospital Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  // 0. Minimal Blended Logo Intro
  const introPreloader = document.getElementById('intro-preloader');

  if (introPreloader) {
    document.body.style.overflow = 'hidden'; // lock scrolling during intro

    let isHidden = false;
    const hideIntro = () => {
      if (isHidden) return;
      isHidden = true;
      introPreloader.classList.add('hidden');
      document.body.style.overflow = '';
    };

    // Click anywhere on splash screen to reveal immediately
    introPreloader.addEventListener('click', hideIntro);

    // Quick Auto Transition after 1.2 seconds
    setTimeout(hideIntro, 1200);
  }

  // 1. Mobile Menu Drawer Toggle & Close Outside
  const mobileMenuBtns = document.querySelectorAll('.mobile-menu-btn');
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');

  if (mobileNavDrawer) {
    const closeDrawer = () => {
      mobileNavDrawer.classList.remove('open');
      mobileMenuBtns.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      document.body.style.overflow = '';
    };

    mobileMenuBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileNavDrawer.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
    });

    // Close mobile menu when any nav link or CTA inside drawer is clicked
    const drawerNavLinks = mobileNavDrawer.querySelectorAll('a, button');
    drawerNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Close mobile menu when user clicks anywhere outside the nav drawer and toggle buttons
    document.addEventListener('click', (e) => {
      if (mobileNavDrawer.classList.contains('open')) {
        let isClickOnBtn = false;
        mobileMenuBtns.forEach(btn => {
          if (btn.contains(e.target)) isClickOnBtn = true;
        });

        if (!mobileNavDrawer.contains(e.target) && !isClickOnBtn) {
          closeDrawer();
        }
      }
    });

    // Close on touchstart outside for touch devices
    document.addEventListener('touchstart', (e) => {
      if (mobileNavDrawer.classList.contains('open')) {
        let isClickOnBtn = false;
        mobileMenuBtns.forEach(btn => {
          if (btn.contains(e.target)) isClickOnBtn = true;
        });

        if (!mobileNavDrawer.contains(e.target) && !isClickOnBtn) {
          closeDrawer();
        }
      }
    }, { passive: true });
  }

  // 2. Navbar Scroll Shadow Effect
  const navbar = document.querySelector('.site-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Smooth Navigation Scroll & Active Section Highlight
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Appointment Form Handling
  const bookingForm = document.getElementById('appointmentForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your appointment request has been submitted. Our team will contact you shortly.');
      bookingForm.reset();
    });
  }

  // 5. Specialities Page Category Filtering
  const filterPills = document.querySelectorAll('.filter-pill');
  const specCards = document.querySelectorAll('.spec-detail-card');

  if (filterPills.length > 0 && specCards.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filterValue = pill.getAttribute('data-filter');

        specCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. FAQ Accordion Toggle for Speciality Detail Pages
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-accordion-header');
      if (header) {
        header.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');

          // Close other accordion items in the same container
          const accordionContainer = item.closest('.faq-accordion');
          if (accordionContainer) {
            accordionContainer.querySelectorAll('.faq-accordion-item').forEach(otherItem => {
              otherItem.classList.remove('active');
              const otherHeader = otherItem.querySelector('.faq-accordion-header');
              if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
            });
          }

          if (!isOpen) {
            item.classList.add('active');
            header.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });
  }

  // 7. Scroll-Triggered Animations for Facilities Page
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .fac-detail-card, .safety-card, .about-hero-content, .section-eyebrow-wrap, .section-title');

  if (animatedElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((element) => {
      animationObserver.observe(element);
    });
  }
});

