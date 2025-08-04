// import "../scss/styles.scss";
// import Swiper and styles if needed
// import Swiper from "swiper";
// import "swiper/css";


// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initTestimonialSlider();
  initHeader();
  initGallerySlider();
  initInnerHeroSlider();
  initTextIconSlider();
  initBrightFutureSlider();
  initHeroSlider();
  initMainImgSlider();
  initGalleryLightbox();
  
  const expanderButtons = document.querySelectorAll('.btn-expander');
  
  expanderButtons.forEach(button => {
    button.addEventListener('click', function() {
      const submenu = this.closest('li').querySelector('.sidenav-sub');
      const icon = this.querySelector('.glyphicon');
      
      // Toggle submenu visibility
      if (submenu) {
        submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
      }
      
      // Toggle plus/minus icon
      if (icon) {
        icon.classList.toggle('glyphicon-plus');
        icon.classList.toggle('glyphicon-minus');
      }
    });
  });

  // Accordion for .main-dropdown > .btn-expander
  const mainDropdownExpanders = document.querySelectorAll('.main-dropdown > .btn-expander');
  mainDropdownExpanders.forEach(btn => {
    btn.addEventListener('click', function() {
      const menu = btn.parentElement.nextElementSibling;
      if (menu && menu.classList.contains('sidenav-sub-menu')) {
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
        btn.querySelector('.plus-minus-btn').classList.toggle('minus-btn', menu.style.display === 'block');
      }
    });
    // Set initial state
    const menu = btn.parentElement.nextElementSibling;
    if (menu && menu.classList.contains('sidenav-sub-menu')) {
      menu.style.display = 'none';
    }
  });

  // Header search dropdown toggle
  const searchBtn = document.querySelector('.search__btn');
  const searchDropdown = document.querySelector('.header-search-dropdown');
  if (searchBtn && searchDropdown) {
    searchBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      searchDropdown.classList.toggle('d-none');
      if (!searchDropdown.classList.contains('d-none')) {
        const input = searchDropdown.querySelector('.search-input');
        if (input) input.focus();
      }
    });
    document.addEventListener('click', function(e) {
      if (!searchDropdown.classList.contains('d-none') && !searchDropdown.contains(e.target) && e.target !== searchBtn) {
        searchDropdown.classList.add('d-none');
      }
    });
  }
});

// Swiper Sliders
function initTestimonialSlider() {
  new Swiper(".testimonial-slider", {
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    autoplay: { delay: 2500, disableOnInteraction: false },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function initGallerySlider() {
  new Swiper(".image-gallery-slider", {
    slidesPerView: 1.2,
    spaceBetween: 4,
    breakpoints: {
      640: { slidesPerView: 2.1 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next.swiper-button-next-new",
      prevEl: ".swiper-button-prev.swiper-button-prev-new",
    },
  });
}

function initInnerHeroSlider() {
  new Swiper(".hero-full-swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next.swiper-btn",
      prevEl: ".swiper-button-prev.swiper-btn",
    },
  });
}

function initTextIconSlider() {
  new Swiper(".text-icon-slider", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    breakpoints: {
      640: { slidesPerView: 2.1 },
      768: { slidesPerView: 3 },
    },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next.swiper-button-next-new",
      prevEl: ".swiper-button-prev.swiper-button-prev-new",
    },
  });
}

function initBrightFutureSlider() {
  new Swiper(".bright-future-swiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    breakpoints: {
      100: { slidesPerView: 1.2 },
      640: { slidesPerView: 2.2 },
      1024: { slidesPerView: 3 },
    },
  });
}

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slider .swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  if (!hasMultipleSlides) {
    const group = document.querySelector(".swiper-button-group");
    if (group) group.style.display = "none";
  }

  new Swiper(".hero-slider", {
    navigation: hasMultipleSlides
      ? {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      : false,
  });
}

function initMainImgSlider() {
  new Swiper(".main-img-slider", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}



// Tabbing loops inside sidebar

// ✅ Shift+Tab loops backward

// ✅ Escape closes sidebar and returns focus to trigger button

// ✅ Focus doesn’t leak outside
// Header Menu & Scroll Effects
function trapFocus(container) {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ];

  let focusableElements = Array.from(container.querySelectorAll(focusableSelectors.join(', ')))
    .filter(el => el.offsetParent !== null); // filter visible elements

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleKeyDown(e) {
    if (e.key === 'Tab') {
      if (focusableElements.length === 0) return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    if (e.key === 'Escape') {
      closeSidebar();
    }
  }

  container.addEventListener('keydown', handleKeyDown);

  // Save a cleanup function to remove this trap when closing
  container._removeFocusTrap = () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}



function initHeader() {
  const menuBtn = document.querySelector(".menu-btn");
  const menuBtnMobile = document.getElementById("menuToggleMobile");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay-header");
  const closeBtn = document.querySelector(".close-btn");
  const closeBtnMobile = document.querySelector(".close-btn-mobile");
  const body = document.body;
  const header = document.querySelector(".main-header");
  let lastScrollTop = 0;

  function trapFocus(container) {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];

    let focusableElements = Array.from(container.querySelectorAll(focusableSelectors.join(', ')))
      .filter(el => el.offsetParent !== null); // only visible ones

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleKeyDown(e) {
      if (e.key === 'Tab') {
        if (focusableElements.length === 0) return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown);
    container._removeFocusTrap = () => container.removeEventListener('keydown', handleKeyDown);
  }

  function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("show");
    body.classList.add("sidebar-open", "no-scroll");

    menuBtn?.setAttribute("aria-expanded", "true");
    menuBtnMobile?.setAttribute("aria-expanded", "true");

    trapFocus(sidebar);

    const firstFocusable = sidebar.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
    body.classList.remove("sidebar-open", "no-scroll");

    menuBtn?.setAttribute("aria-expanded", "false");
    menuBtnMobile?.setAttribute("aria-expanded", "false");

    sidebar._removeFocusTrap?.();

    menuBtn?.focus();
  }

  [menuBtn, menuBtnMobile].forEach(btn => btn?.addEventListener("click", openSidebar));
  [overlay, closeBtn, closeBtnMobile].forEach(el => el?.addEventListener("click", closeSidebar));

  // Global ESC listener
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebar();
    }
  });

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle("header-color", scrollTop > 10);
    header.classList.toggle("upwards", scrollTop > lastScrollTop && scrollTop > 10);
    lastScrollTop = Math.max(scrollTop, 0);
  });
}



const dropdownBtn = document.querySelector('#dropdownMenuButton1');
const dropdown = dropdownBtn.closest('.custom-dropdown');

dropdownBtn.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown.classList.toggle('show');
});



// Lightbox Gallery
function initGalleryLightbox() {
  const html = document.documentElement;
  html.setAttribute("data-bs-theme", "dark");

  const galleryGrid = document.querySelector(".gallery-grid");
  if (!galleryGrid) return; // Exit if no gallery grid found

  const links = galleryGrid.querySelectorAll("a");
  const lightboxModal =
    document.getElementById("lightbox-modal-home") ||
    document.getElementById("lightbox-modal-interior");
  const modalBody = lightboxModal?.querySelector(".lightbox-content");
  const bsModal = lightboxModal ? new bootstrap.Modal(lightboxModal) : null;

  // Store references to iframes for proper control
  let currentIframes = [];
  let youtubePlayers = [];

  function createCaption(caption) {
    return caption ? `<div class="carousel-caption d-none d-md-block"><h5 class="m-0">${caption}</h5></div>` : '';
  }

  function createIndicators(activeIndex) {
    return [...links].map((_, i) =>
      `<button type="button" data-bs-target="#lightboxCarousel" data-bs-slide-to="${i}" 
        ${i === activeIndex ? 'class="active" aria-current="true"' : ''} 
        aria-label="Slide ${i + 1}"></button>`
    ).join("");
  }

  function createSlides(activeIndex) {
    return [...links].map((link, i) => {
      const videoUrl = link.getAttribute('data-video-url');
      const img = link.querySelector('img');
      const imgAlt = img ? img.getAttribute('alt') || "" : "";
      const isActive = i === activeIndex ? " active" : "";
      
      if (videoUrl) {
        // Only add autoplay to the active slide
        const autoplayParam = i === activeIndex ? "&autoplay=1" : "";
        const videoId = extractYouTubeId(videoUrl);
        return `
          <div class="carousel-item${isActive}">
            <div class="ratio ratio-16x9">
              <iframe id="youtube-player-${i}" src="${videoUrl}?enablejsapi=1${autoplayParam}" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>
            </div>
          </div>
        `;
      } else if (img) {
        const imgSrc = link.getAttribute("href");
        return `
          <div class="carousel-item${isActive}">
            <img class="d-block img-fluid w-100" src="${imgSrc}" alt="${imgAlt}">
            ${createCaption(imgAlt)}
          </div>
        `;
      }
      return '';
    }).join("");
  }

  function extractYouTubeId(url) {
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/);
    return match ? match[1] : null;
  }

  function pauseAllVideos() {
    // Pause all YouTube players
    youtubePlayers.forEach(player => {
      if (player && typeof player.pauseVideo === 'function') {
        try {
          player.pauseVideo();
        } catch (e) {
          console.log('Could not pause YouTube player:', e);
        }
      }
    });

    // Also handle iframes directly as fallback
    currentIframes.forEach(iframe => {
      if (iframe && iframe.contentWindow) {
        try {
          // Try to pause using postMessage for YouTube videos
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        } catch (e) {
          // Fallback: reload the iframe without autoplay
          const currentSrc = iframe.src;
          iframe.src = currentSrc.replace(/&autoplay=1/, '');
        }
      }
    });
  }

  function playVideoAtIndex(index) {
    const iframes = modalBody.querySelectorAll('iframe');
    if (iframes[index]) {
      const iframe = iframes[index];
      const currentSrc = iframe.src;
      
      // Remove autoplay from all iframes first
      iframes.forEach((frame, idx) => {
        if (idx !== index) {
          frame.src = frame.src.replace(/&autoplay=1/, '');
        }
      });
      
      // Add autoplay to the target iframe
      if (!currentSrc.includes('autoplay=1')) {
        iframe.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + 'autoplay=1';
      }

      // Try to play using YouTube API if available
      if (youtubePlayers[index] && typeof youtubePlayers[index].playVideo === 'function') {
        try {
          youtubePlayers[index].playVideo();
        } catch (e) {
          console.log('Could not play YouTube player:', e);
        }
      }
    }
  }

  function initializeYouTubePlayers() {
    // Clear existing players
    youtubePlayers = [];
    
    // Initialize YouTube players for each iframe
    currentIframes.forEach((iframe, index) => {
      if (iframe.src.includes('youtube.com')) {
        // YouTube iframe will handle its own API
        // We'll use postMessage for control
        youtubePlayers[index] = {
          pauseVideo: () => {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          },
          playVideo: () => {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          }
        };
      }
    });
  }

  function createCarousel(link) {
    if (!modalBody || !link) return;
    
    // Find the index of the clicked link
    const parentSlide = link.closest(".swiper-slide");
    const activeIndex = parentSlide
      ? [...parentSlide.parentElement.children].indexOf(parentSlide)
      : 0;

    modalBody.innerHTML = `
      <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="false">
        <div class="carousel-indicators">${createIndicators(activeIndex)}</div>
        <div class="carousel-inner justify-content-center mx-auto">${createSlides(activeIndex)}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;

    // Store references to iframes and initialize YouTube players
    currentIframes = modalBody.querySelectorAll('iframe');
    initializeYouTubePlayers();

    // Handle slide changes
    const carousel = modalBody.querySelector('#lightboxCarousel');
    if (carousel) {
      carousel.addEventListener('slide.bs.carousel', function (event) {
        // Pause all videos first
        pauseAllVideos();
        
        // Play the video on the new slide
        setTimeout(() => {
          playVideoAtIndex(event.to);
        }, 300); // Small delay to ensure slide transition is complete
      });
    }
  }

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      if (!lightboxModal) return;
      createCarousel(link);
      bsModal?.show();
    });
  });

  // Fullscreen functionality
  const fsEnlarge = document.querySelector(".btn-fullscreen-enlarge");
  const fsExit = document.querySelector(".btn-fullscreen-exit");

  fsEnlarge?.addEventListener("click", e => {
    e.preventDefault();
    if (!lightboxModal) return;
    lightboxModal.requestFullscreen()
      .then(() => {
        fsEnlarge.classList.toggle("d-none");
        fsExit.classList.toggle("d-none");
      })
      .catch(err => console.error(`Error enabling fullscreen: ${err.message}`));
  });

  fsExit?.addEventListener("click", e => {
    e.preventDefault();
    document.exitFullscreen();
    fsExit.classList.toggle("d-none");
    fsEnlarge.classList.toggle("d-none");
  });

  // Clean up modal when closed
  lightboxModal.addEventListener('hidden.bs.modal', function () {
    // Pause all videos before closing
    pauseAllVideos();
    
    // Clear modal content
    if (modalBody) {
      modalBody.innerHTML = '';
    }
    
    // Clear iframe references and YouTube players
    currentIframes = [];
    youtubePlayers = [];
  });
}
// Lightbox Gallery End