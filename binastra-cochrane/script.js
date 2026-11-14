'use strict';

(() => {
  // Local-only Phase 1. No external tracking code or network requests are loaded.
  const config = {
    advisor: { name: 'Premm', phone: '60198995496' },
    plans: {
      'study-01': { title: 'Layout study 01', image: 'assets/images/layout-01.svg', description: 'An illustrative composition exploring connected spaces. Select another study to preview the interaction.' },
      'study-02': { title: 'Layout study 02', image: 'assets/images/layout-02.svg', description: 'A different illustrative arrangement of shared and private spaces. This is a demonstration drawing, not an available project unit.' },
      'study-03': { title: 'Layout study 03', image: 'assets/images/layout-03.svg', description: 'An alternative schematic composition for exploring the selector. Official layouts and specifications will replace these studies.' }
    },
    locations: {
      cochrane: { category: 'transport', title: 'Cochrane MRT', status: 'Existing transport', description: 'An established station on the Kajang Line, connecting the Cochrane district with the wider city. Walking routes and project access arrangements should be confirmed with your advisor.' },
      trx: { category: 'transport', title: 'Tun Razak Exchange', status: 'Existing district & MRT interchange', description: 'Explore the established TRX district and its MRT interchange. The future Monash campus is a separate announced development and is not an existing university campus here.' },
      mytown: { category: 'lifestyle', title: 'MyTOWN & IKEA Cheras', status: 'Existing retail destinations', description: 'Shopping, dining and everyday essentials in the Cochrane district. The project’s proposed MyTOWN connection is an artist-impression concept here; delivery and access arrangements require confirmation.' },
      velocity: { category: 'lifestyle', title: 'Sunway Velocity Mall', status: 'Existing retail destination', description: 'An established destination for shopping, dining and leisure in the surrounding district. Confirm your preferred route and current access arrangements before travelling.' },
      taylors: { category: 'education', title: 'Taylor’s International School KL', status: 'Existing school', description: 'An established educational institution listed in the project website’s surrounding-area information. Admissions, routes and transport arrangements should be checked directly.' },
      medical: { category: 'healthcare', title: 'Sunway Medical Centre Velocity', status: 'Existing healthcare', description: 'An established healthcare destination in the surrounding district. This explorer makes no travel-time, service-availability or distance claims.' }
    },
    milestones: {
      monash: { index: '01', status: 'Announcement · 28 October 2025', title: 'A new chapter for education at TRX.', description: 'Monash University announced its future Kuala Lumpur campus with TRX City. This milestone records the announcement; it does not indicate an existing campus or guarantee delivery.', source: 'https://www.monash.edu/news/articles/monash-universitys-future-campus-in-malaysia4' },
      ethos: { index: '02', status: 'Verification pending · Future-development reference', title: 'Menara Ethos, in focus.', description: 'Menara Ethos is included as a development to follow in the wider TRX district. Verified project particulars and current delivery status are still required. No completion date is represented.', source: null },
      'cochrane-two': { index: '03', status: 'Verification pending · Future-development reference', title: 'Following Cochrane’s next chapter.', description: 'Binastra Cochrane 2 is included as a future-development reference. Its formal name, relationship to other Cochrane phases, approved particulars and timing require confirmation before factual project copy is published.', source: null }
    },
    enquiries: {
      hero: "I'd like to know more about Binastra Cochrane.",
      facilities: 'Please share the confirmed facilities for Binastra Cochrane.',
      'floor-plans': 'Please share the approved Binastra Cochrane floor plans.',
      location: 'Could you share the verified Binastra Cochrane location and access details?',
      ethos: 'Please share verified updates on Menara Ethos in the wider TRX district.',
      'cochrane-two': 'Please share verified details on Binastra Cochrane 2.',
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
      if (item === 'enquiry') item = $('#enquiry-interest').value;
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
  const desktopQuery = window.matchMedia('(min-width: 761px)');
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
    $('#plan-title').textContent = plan.title;
    $('#plan-description').textContent = plan.description;
    $('#plan-image').src = plan.image;
    $('#plan-image').alt = `Demonstration ${plan.title.toLowerCase()}; illustrative linework, not an approved project floor plan`;
    $('#plan-enquiry').href = whatsapp(`Please share the approved Binastra Cochrane floor plans. I was exploring ${plan.title.toLowerCase()}, a demonstration placeholder on your website, and would like to see the actual available layouts.`);
    track('floor_plan_select', 'floor-plans', selectedPlan);
  }));

  // The explorer is deliberately schematic, with existing amenities only.
  const locationFilters = $$('[data-location-filter]');
  const destinationButtons = $$('[data-destination]');
  function selectDestination(key) {
    const place = config.locations[key];
    pressed(destinationButtons, $(`[data-destination="${key}"]`));
    $('#destination-title').textContent = place.title;
    $('#destination-status').textContent = place.status.toUpperCase();
    $('#destination-description').textContent = place.description;
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

  const milestoneButtons = $$('[data-milestone]');
  milestoneButtons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.milestone;
    const milestone = config.milestones[key];
    pressed(milestoneButtons, button);
    $('#milestone-index').textContent = milestone.index;
    $('#milestone-status').textContent = milestone.status.toUpperCase();
    $('#milestone-title').textContent = milestone.title;
    $('#milestone-description').textContent = milestone.description;
    const source = $('#milestone-source');
    source.hidden = !milestone.source;
    if (milestone.source) source.href = milestone.source;
    else source.removeAttribute('href');
    track('timeline_select', 'timeline', key);
  }));

  // The native dialog supplies focus containment and Escape handling.
  const galleryItems = $$('.gallery-item');
  const galleryFilters = $$('[data-gallery-filter]');
  const dialog = $('#gallery-dialog');
  let galleryIndex = 0;
  let galleryTrigger = null;
  const visibleGallery = () => galleryItems.filter(item => !item.hidden);
  function renderViewer() {
    const items = visibleGallery();
    const item = items[galleryIndex];
    const image = $('img', item);
    $('#viewer-image').src = $('a', item).href;
    $('#viewer-image').alt = image.alt;
    $('#viewer-title').textContent = $('figcaption > span', item).textContent;
    $('#viewer-note').textContent = $('figcaption > small', item).textContent;
    $('#viewer-counter').textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')} — GALLERY`;
    $('#viewer-prev').disabled = items.length < 2;
    $('#viewer-next').disabled = items.length < 2;
  }
  function moveGallery(direction) {
    galleryIndex = (galleryIndex + direction + visibleGallery().length) % visibleGallery().length;
    renderViewer();
  }
  galleryFilters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.galleryFilter;
    pressed(galleryFilters, button);
    galleryItems.forEach(item => { item.hidden = category !== 'all' && item.dataset.galleryCategory !== category; });
    const count = visibleGallery().length;
    $('#gallery-count').textContent = `${count} image${count === 1 ? '' : 's'} · Select an image to explore`;
    track('gallery_filter', 'gallery', category);
  }));
  galleryItems.forEach(item => {
    const link = $('a', item);
    link.addEventListener('click', event => {
      if (typeof dialog.showModal !== 'function' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      galleryTrigger = link;
      galleryIndex = visibleGallery().indexOf(item);
      renderViewer();
      dialog.showModal();
      document.body.classList.add('modal-open');
      $('#viewer-close').focus();
      track('gallery_open', 'gallery', link.dataset.galleryId);
    });
  });
  $('#viewer-close').addEventListener('click', () => dialog.close());
  $('#viewer-prev').addEventListener('click', () => moveGallery(-1));
  $('#viewer-next').addEventListener('click', () => moveGallery(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); moveGallery(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveGallery(-1); }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (galleryTrigger?.isConnected && !galleryTrigger.closest('[hidden]')) galleryTrigger.focus({ preventScroll: true });
  });

  const interest = $('#enquiry-interest');
  interest.addEventListener('change', () => {
    $('#enquiry-link').href = whatsapp(config.interests[interest.value]);
    track('enquiry_topic_select', 'enquiry', interest.value);
  });
  function openPrivacyFromHash() {
    if (window.location.hash === '#privacy') $('#privacy').open = true;
  }
  window.addEventListener('hashchange', openPrivacyFromHash);
  $('a[href="#privacy"]').addEventListener('click', () => { $('#privacy').open = true; });
  openPrivacyFromHash();
  $('#copyright-year').textContent = String(new Date().getFullYear());
  document.documentElement.classList.add('has-js');
})();
