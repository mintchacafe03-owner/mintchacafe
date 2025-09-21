// ========================================
// 1️⃣ Dark Mode Toggle
// ========================================
const toggle = document.getElementById('darkModeToggle');

if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
  });
}

// Persist dark mode on page load
if (localStorage.getItem('dark-mode') === 'true') {
  document.body.classList.add('dark-mode');
}

// ========================================
// 2️⃣ Smooth Scroll for Navbar Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ========================================
// 3️⃣ Load Sections Dynamically
// ========================================
const sections = ['home','menu','about','events','charity','testimony','contact'];

sections.forEach(sec => {
  const container = document.getElementById(sec);
  if(!container) return;

  fetch(`sections/${sec}.html`)
    .then(resp => resp.text())
    .then(html => container.innerHTML = html)
    .catch(err => console.error(`Error loading ${sec}:`, err));
});

// ========================================
// 4️⃣ Initialize Features After Sections Load
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Delay to ensure all sections loaded
  setTimeout(() => {

    // ----------------------
    // 4.1 Menu Data
    // ----------------------
    const drinks = [
      { name: "Mintcha Bloom", desc: "Refreshing matcha latte infused with cooling mint syrup.", img: "menu/mintcha-bloom.jpg", category: "matcha", badge: "Signature" },
      { name: "Ichigo Shortcha", desc: "Creamy matcha latte blended with strawberry purée and ice cream.", img: "menu/ichigo-shortcha.jpg", category: "matcha", badge: "Premium" },
      { name: "Shiro Mint Latte", desc: "Smooth white chocolate mint latte with velvety cold foam.", img: "menu/shiro-mint.jpg", category: "matcha" },
      { name: "Matcha Muse", desc: "Classic matcha latte.", img: "menu/matcha-muse.jpg", category: "matcha" },
      { name: "Kinako Brûlée", desc: "Rich matcha latte with caramelized banana and kinako.", img: "menu/kinako-brulee.jpg", category: "matcha" },
      { name: "Coming Soon Seasonal Drinks", desc: "Stay tuned for our limited-time collabs and festive specials!", img: "menu/seasonal-placeholder.jpg", category: "seasonal" }
      // Add more drinks if needed
    ];

    // ----------------------
    // 4.2 Populate Drinks in Menu
    // ----------------------
    const drinkGrid = document.querySelector('.drink-grid');
    function renderDrinks(filter = 'all') {
      if(!drinkGrid) return;
      drinkGrid.innerHTML = "";
      drinks.forEach(d => {
        if(filter !== 'all' && d.category !== filter) return;

        const card = document.createElement('div');
        card.className = "drink-card";
        card.dataset.category = d.category;
        if(d.category === 'seasonal') card.classList.add('premium');

        card.innerHTML = `
          ${d.badge ? `<div class="badge">${d.badge}</div>` : ""}
          <img src="${d.img}" alt="${d.name}">
          <h4>${d.name}</h4>
          <p>${d.desc}</p>
        `;
        drinkGrid.appendChild(card);
      });
    }
    renderDrinks(); // initial render

    // ----------------------
    // 4.3 Menu Filter Buttons
    // ----------------------
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        renderDrinks(category);
      });
    });

    // ----------------------
    // 4.4 Testimonial Carousel Auto-Scroll
    // ----------------------
    const carouselWrapper = document.querySelector('.testimonial-carousel-wrapper');
    const carousel = document.querySelector('.testimonial-carousel');

    if(carousel && carouselWrapper) {
      // Duplicate carousel content for seamless loop
      carousel.innerHTML += carousel.innerHTML;

      let scrollAmount = 0;
      const step = 2; // px per frame
      const speed = 16; // ms per frame

      function autoScroll() {
        scrollAmount += step;
        if(scrollAmount >= carousel.scrollWidth / 2) scrollAmount = 0;
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(autoScroll);
      }

      autoScroll();
    }

  }, 300); // wait 300ms for sections to load
});

// ========================================
// 5️⃣ WhatsApp Link Tracking
// ========================================
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
  whatsappBtn.addEventListener('click', () => {
    console.log("User clicked WhatsApp button.");
  });
}

// ==========================
// Charity Calendar
// ==========================
const calendarGrid = document.querySelector('.calendar-grid');
const monthYearLabel = document.getElementById('monthYear');
let currentDate = new Date();

function renderCalendar(date) {
  if (!calendarGrid || !monthYearLabel) return;

  const year = date.getFullYear();
  const month = date.getMonth();

  // Update month-year label
  monthYearLabel.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Remove previous days but keep day labels
  calendarGrid.querySelectorAll('.calendar-day').forEach(d => d.remove());

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Blank slots for offset
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'calendar-day empty';
    calendarGrid.appendChild(emptyDiv);
  }

  // Populate actual days
  let fridayCount = 0;
  for (let i = 1; i <= lastDate; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    dayDiv.textContent = i;

    const day = new Date(year, month, i);
    if (day.getDay() === 5) { // Friday
      fridayCount++;
      if (fridayCount === 3) {
        // 3rd Friday: greyed out for charity
        dayDiv.classList.add('friday-charity');
      }
    }

    calendarGrid.appendChild(dayDiv);
  }
}

// Initial render
renderCalendar(currentDate);

// Month navigation
document.getElementById('prevMonth')?.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

document.getElementById('nextMonth')?.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});
