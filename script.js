'use strict';

(() => {
  // Local Phase 1. No external tracking code is loaded; the contact form posts only when submitted.
  const config = {
    advisor: { name: 'Premm', phone: '60198995496' },
    plans: {
      'study-01': { title: 'Type A', image: 'assets/images/TypeA.webp' },
      'study-02': { title: 'Type B', image: 'assets/images/TypeB.webp' },
      'study-03': { title: 'Type C', image: 'assets/images/TypeC.webp' },
      'study-04': { title: 'Type C1', image: 'assets/images/TypeC1.webp' }
    },
    locations: {
      cochrane: { category: 'transport', categoryLabel: 'Transport', title: 'Cochrane MRT', status: 'Existing transport', distance: '70m', description: 'Enjoy convenient access to Kuala Lumpur via the MRT Kajang Line, connecting Cochrane to TRX, Bukit Bintang and major city destinations.' },
      maluri: { category: 'transport', categoryLabel: 'Transport', title: 'MRT Maluri', status: 'Existing MRT & LRT interchange', distance: '1.1km', description: 'An established MRT and LRT interchange to KL City Centre.' },
      mytown: { category: 'lifestyle', categoryLabel: 'Shopping & Lifestyle', title: 'MyTOWN Shopping Centre & IKEA Cheras', status: 'Existing retail destination', distance: '60m', description: 'A major retail destination with over 400 retail stores offering shopping, dining, entertainment and lifestyle experiences all under one roof.' },
      velocity: { category: 'lifestyle', categoryLabel: 'Shopping & Lifestyle', title: 'Sunway Velocity Mall', status: 'Existing retail destination', distance: '400m', description: 'An integrated shopping destination offering retail, dining, entertainment and everyday services.' },
      berjaya: { category: 'lifestyle', categoryLabel: 'Shopping & Lifestyle', title: 'Berjaya Times Square', status: 'Existing retail destination', distance: '2.6km', description: 'A city-centre shopping and entertainment destination with a broad mix of retail and leisure offerings.' },
      exchange: { category: 'lifestyle', categoryLabel: 'Shopping & Lifestyle', title: 'The Exchange TRX', status: 'Existing retail destination', distance: '3.4km', description: 'A contemporary retail and lifestyle destination within the Tun Razak Exchange financial district.' },
      pavilionKl: { category: 'lifestyle', categoryLabel: 'Shopping & Lifestyle', title: 'Pavilion Kuala Lumpur', status: 'Existing retail destination', distance: '3.6km', description: 'A prominent Bukit Bintang destination offering international retail, dining and entertainment.' },
      suria: { category: 'lifestyle', categoryLabel: 'Shopping & Lifestyle', title: 'Suria KLCC', status: 'Existing retail destination', distance: '4.9km', description: 'An established city-centre mall bringing together retail, dining and cultural attractions at KLCC.' },
      smkCochrane: { category: 'education', categoryLabel: 'Education', title: 'SMK Cochrane', status: 'Existing school', distance: '220m', description: 'An established secondary school serving the Cochrane community.' },
      sunwayCollege: { category: 'education', categoryLabel: 'Education', title: 'Sunway College @ Velocity', status: 'Existing education', distance: '430m', description: 'A city education centre supporting students with a range of academic pathways.' },
      ideasSchool: { category: 'education', categoryLabel: 'Education', title: 'IDEAS International School', status: 'Existing school', distance: '1.1km', description: 'An international school offering a structured learning environment for its student community.' },
      kunMing: { category: 'education', categoryLabel: 'Education', title: 'SJK(C) Kun Ming', status: 'Existing school', distance: '1.6km', description: 'An established Chinese primary school serving families in Kuala Lumpur.' },
      taylors: { category: 'education', categoryLabel: 'Education', title: "Taylor's International School", status: 'Existing school', distance: '2.0km', description: 'An established international school providing education for its student community.' },
      monashTrx: { category: 'education', categoryLabel: 'Education', title: 'Future Monash University TRX Campus', status: 'Announced future campus', distance: '4.0km', description: 'Monash University has announced a future Kuala Lumpur campus at TRX,bringing world-class education to Kuala Lumpur and enhancing the area long-term appeal.'},
      medical: { category: 'healthcare', categoryLabel: 'Healthcare', title: 'Sunway Medical Centre Velocity', status: 'Existing healthcare', distance: '500m', description: 'An established medical centre providing healthcare services within the wider city district.' },
      princeCourt: { category: 'healthcare', categoryLabel: 'Healthcare', title: 'Prince Court Medical Centre', status: 'Existing healthcare', distance: '2.7km', description: 'A private medical centre offering specialist and general healthcare services in Kuala Lumpur.' },
      tungShin: { category: 'healthcare', categoryLabel: 'Healthcare', title: 'Tung Shin Hospital', status: 'Existing healthcare', distance: '4.5km', description: 'An established Kuala Lumpur hospital providing a range of medical and healthcare services.' }
    },
    enquiries: {
      hero: "I'd like to know more about Binastra Cochrane.",
      facilities: 'Please share the confirmed facilities for Binastra Cochrane.',
      'floor-plans': 'Please share the approved Binastra Cochrane floor plans.',
      location: 'Could you share the verified Binastra Cochrane location and access details?',
      ethos: 'Please share verified updates on Menara Ethos in the wider TRX district.',
      advisor: "I'd like your guidance on Binastra Cochrane.",
      mobile: "I'd like to enquire about Binastra Cochrane.",
      enquiry: "I'd like more information about Binastra Cochrane."
    },
    interests: {
      overview: "I'd like more information about Binastra Cochrane.",
      plans: 'Please share the approved floor plans for Binastra Cochrane.',
      viewing: 'Could you advise on available viewing arrangements for Binastra Cochrane?',
      future: 'Please share verified future-development updates around Cochrane and TRX.'
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  window.dataLayer = window.dataLayer || [];
  // Only controlled identifiers enter the queue. Never enqueue messages or personal data.
  function track(event, section, item = '') {
    window.dataLayer.push({ event, section, item });
  }
  function whatsapp(message) {
    return `https://wa.me/${config.advisor.phone}?text=${encodeURIComponent(`Hi ${config.advisor.name}, ${message}`)}`;
  }
  function pressed(buttons, selected) {
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button === selected)));
  }

  $$('[data-wa]').forEach(link => {
    link.href = whatsapp(config.enquiries[link.dataset.wa]);
    link.addEventListener('click', () => {
      let item = link.dataset.wa;
      if (item === 'floor-plans') item = selectedPlan;
      track('whatsapp_click', link.dataset.wa, item);
    });
  });

  // Navigation works as ordinary section links without JavaScript.
  const menu = $('.menu-toggle');
  const nav = $('#primary-nav');
  const navLinks = $$('a[href^="#"]', nav);
  function closeMenu(returnFocus = false) {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (returnFocus) menu.focus();
  }
  menu.addEventListener('click', () => {
    const isOpen = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(isOpen));
    nav.classList.toggle('is-open', isOpen);
  });
  navLinks.forEach(link => link.addEventListener('click', () => {
    const mobileMenuWasOpen = menu.getAttribute('aria-expanded') === 'true';
    closeMenu();
    if (mobileMenuWasOpen) {
      const section = $(link.getAttribute('href'));
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    }
    track('section_navigation', 'navigation', link.hash.slice(1));
  }));
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  const desktopQuery = window.matchMedia('(min-width: 901px)');
  desktopQuery.addEventListener('change', () => closeMenu());
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    navLinks.forEach(link => { const section = $(link.hash); if (section) observer.observe(section); });
  }

  // Demonstration plans: intentionally no project dimensions or room specifications.
  let selectedPlan = 'study-01';
  const planButtons = $$('[data-plan]');
  planButtons.forEach(button => button.addEventListener('click', () => {
    selectedPlan = button.dataset.plan;
    const plan = config.plans[selectedPlan];
    pressed(planButtons, button);
    $('#plan-image').src = plan.image;
    $('#plan-image').alt = `${plan.title} floor plan`;
    track('floor_plan_select', 'floor-plans', selectedPlan);
  }));

  // Existing destinations and the announced future Monash campus are labelled distinctly.
  const locationFilters = $$('[data-location-filter]');
  const destinationButtons = $$('[data-destination]');
  function selectDestination(key) {
    const place = config.locations[key];
    pressed(destinationButtons, $(`[data-destination="${key}"]`));
    $('#destination-category').textContent = place.categoryLabel.toUpperCase();
    $('#destination-title').textContent = place.title;
    $('#destination-status').textContent = place.status.toUpperCase();
    $('#destination-description').textContent = place.description;
    const distance = $('#destination-distance');
    distance.textContent = place.distance ? `${place.distance} from Binastra Cochrane` : 'Distance to be confirmed';
    $$('[data-map]').forEach(marker => marker.classList.toggle('is-active', marker.dataset.map === key));
  }
  function filterLocations(category) {
    const visible = destinationButtons.filter(button => config.locations[button.dataset.destination].category === category);
    destinationButtons.forEach(button => { button.hidden = !visible.includes(button); });
    selectDestination(visible[0].dataset.destination);
  }
  locationFilters.forEach(button => button.addEventListener('click', () => {
    pressed(locationFilters, button);
    filterLocations(button.dataset.locationFilter);
    track('location_filter', 'location', button.dataset.locationFilter);
  }));
  destinationButtons.forEach(button => button.addEventListener('click', () => {
    // Hidden controls are never reached through normal UI navigation.
    selectDestination(button.dataset.destination);
    track('location_select', 'location', button.dataset.destination);
  }));
  filterLocations('transport');

  const gallerySlider = $('.property-slider');
  const gallerySlides = $$('.gallery-slide', gallerySlider);
  const galleryDots = $$('[data-gallery-slide]', gallerySlider);
  let galleryIndex = 0;
  let swipeStartX = null;
  function renderGallery(index, trackSelection = false) {
    galleryIndex = (index + gallerySlides.length) % gallerySlides.length;
    gallerySlides.forEach((slide, slideIndex) => {
      const active = slideIndex === galleryIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    pressed(galleryDots, galleryDots[galleryIndex]);
    const activeSlide = gallerySlides[galleryIndex];
    const title = $('figcaption strong', activeSlide).textContent.trim();
    $('#gallery-status').textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(gallerySlides.length).padStart(2, '0')} — ${title}`;
    if (trackSelection) track('gallery_slide', 'gallery', activeSlide.dataset.galleryId);
  }
  function moveGallery(direction) {
    renderGallery(galleryIndex + direction, true);
  }
  $('#gallery-prev').addEventListener('click', () => moveGallery(-1));
  $('#gallery-next').addEventListener('click', () => moveGallery(1));
  galleryDots.forEach(button => button.addEventListener('click', () => renderGallery(Number(button.dataset.gallerySlide), true)));
  gallerySlider.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); moveGallery(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveGallery(-1); }
  });
  gallerySlider.addEventListener('pointerdown', event => {
    if (event.target.closest('button')) return;
    swipeStartX = event.clientX;
  });
  gallerySlider.addEventListener('pointerup', event => {
    if (swipeStartX === null) return;
    const distance = event.clientX - swipeStartX;
    swipeStartX = null;
    if (Math.abs(distance) > 45) moveGallery(distance < 0 ? 1 : -1);
  });
  gallerySlider.addEventListener('pointercancel', () => { swipeStartX = null; });
  renderGallery(0);

  const contactForm = $('#contact-form');
  if (contactForm) {
    const submitButton = $('button[type="submit"]', contactForm);
    const submitLabel = $('.submit-label', contactForm);
    const formStatus = $('#form-status');
    let isSubmitting = false;

    contactForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (isSubmitting || !contactForm.reportValidity()) return;

      isSubmitting = true;
      submitButton.disabled = true;
      submitLabel.textContent = 'SENDING…';
      formStatus.className = 'form-status';
      formStatus.textContent = 'Sending your enquiry…';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.success === 'false' || result.success === false) {
          throw new Error('Submission was not accepted.');
        }

        contactForm.reset();
        formStatus.className = 'form-status is-success';
        formStatus.textContent = 'Thank you. Your enquiry has been sent successfully.';
        track('enquiry_submit', 'contact', 'success');
      } catch (error) {
        formStatus.className = 'form-status is-error';
        formStatus.textContent = 'We could not send your enquiry. Please try again or contact us on WhatsApp.';
        track('enquiry_submit', 'contact', 'error');
      } finally {
        isSubmitting = false;
        submitButton.disabled = false;
        submitLabel.textContent = 'SUBMIT';
      }
    });
  }

  function openPrivacyFromHash() {
    if (window.location.hash === '#privacy') $('#privacy').open = true;
  }
  window.addEventListener('hashchange', openPrivacyFromHash);
  $('a[href="#privacy"]').addEventListener('click', () => { $('#privacy').open = true; });
  openPrivacyFromHash();
  $('#copyright-year').textContent = String(new Date().getFullYear());
  document.documentElement.classList.add('has-js');
})();
