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

        if ((!mobileNavDrawer.contains(e.target) || e.target === mobileNavDrawer) && !isClickOnBtn) {
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

        if ((!mobileNavDrawer.contains(e.target) || e.target === mobileNavDrawer) && !isClickOnBtn) {
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

  // 4. Appointment Form Handling with Smooth Inline Confirmation
  
  const dateInput = document.getElementById('prefDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  const bookingForm = document.getElementById('appointmentForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const card = bookingForm.closest('.booking-form-card');
      if (card) {
        card.innerHTML = `
          <div style="text-align: center; padding: 40px 20px;">
            <div style="width: 64px; height: 64px; background: #d1fae5; color: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: #0f172a; margin-bottom: 10px;">Appointment Slot Requested!</h3>
            <p style="color: #475569; font-size: 1rem; line-height: 1.6; margin-bottom: 24px;">Thank you. Our care coordination team will reach out to you within 15 minutes to confirm your time slot.</p>
            <button onclick="window.location.reload()" style="background: #059669; color: #fff; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 0.95rem; cursor: pointer;">Book Another Slot</button>
          </div>
        `;
      } else {
        alert('Thank you! Your appointment request has been submitted. Our team will contact you shortly.');
        bookingForm.reset();
      }
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

  // 8. Hospital Photo Carousel Controls & Swap Navigation
  const galleryTrack = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('galleryPrevBtn');
  const nextBtn = document.getElementById('galleryNextBtn');
  const dotsContainer = document.getElementById('galleryDots');
  const galleryModal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeGalleryModal = document.getElementById('closeGalleryModal');

  if (galleryTrack) {
    const slides = galleryTrack.querySelectorAll('.gallery-slide-card');
    
    // Generate Dot Indicators
    if (dotsContainer && slides.length > 0) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `dot-pill ${idx === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
          const slideWidth = slides[0].offsetWidth + 24;
          galleryTrack.scrollTo({ left: slideWidth * idx, behavior: 'smooth' });
        });
        dotsContainer.appendChild(dot);
      });
    }

    const updateDots = () => {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.dot-pill');
      if (dots.length === 0 || slides.length === 0) return;

      const slideWidth = slides[0].offsetWidth + 24;
      const scrollPosition = galleryTrack.scrollLeft;
      const activeIdx = Math.round(scrollPosition / slideWidth);

      dots.forEach((dot, idx) => {
        if (idx === activeIdx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    galleryTrack.addEventListener('scroll', updateDots, { passive: true });

    // Next Button Click
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const slideWidth = slides[0].offsetWidth + 24;
        galleryTrack.scrollBy({ left: slideWidth, behavior: 'smooth' });
      });
    }

    // Prev Button Click
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const slideWidth = slides[0].offsetWidth + 24;
        galleryTrack.scrollBy({ left: -slideWidth, behavior: 'smooth' });
      });
    }

    // Lightbox modal trigger on slide click
    slides.forEach(slide => {
      slide.addEventListener('click', () => {
        const img = slide.querySelector('img');
        const title = slide.querySelector('.slide-title');
        const desc = slide.querySelector('.slide-desc');

        if (img && galleryModal && modalImg) {
          modalImg.src = img.src;
          modalImg.alt = img.alt || '';
          if (modalTitle && title) modalTitle.textContent = title.textContent;
          if (modalDesc && desc) modalDesc.textContent = desc.textContent;
          galleryModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (closeGalleryModal && galleryModal) {
      closeGalleryModal.addEventListener('click', () => {
        galleryModal.classList.remove('open');
        document.body.style.overflow = '';
      });

      galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
          galleryModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  }
});

