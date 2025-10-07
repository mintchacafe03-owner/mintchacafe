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
  setTimeout(() => {

    // ----------------------
    // 4.1 Drinks Data with Categories + Subcategories
    // ----------------------
    const drinks = [
      // 🌿 Signature
      { name: "Mintcha Bloom", desc: "Refreshing matcha latte infused with cooling mint syrup.", img: "assets/images/menu/mintcha-bloom.jpg", category: "matcha", subcategory: "matcha", badge: "Signature" },

      // 🌟 Premium
      { name: "Ichigo Shortcha", desc: "Creamy matcha latte blended with strawberry purée and topped with ice cream.", img: "assets/images/menu/ichigo-shortcha.jpg", category: "matcha", subcategory: "matcha", badge: "Premium" },
      { name: "Shiro Mint Latte", desc: "Smooth white chocolate mint latte finished with velvety cold foam.", img: "assets/images/menu/shiro-mint.jpg", category: "mint", badge: "Premium" },

      // 🍵 Matcha Latte Series
      { name: "Matcha Muse", desc: "Our classic and balanced matcha latte.", img: "assets/images/menu/matcha-muse.jpg", category: "matcha", subcategory: "matcha" },
      { name: "Kinako Brûlée", desc: "Toasty kinako layered with creamy brûlée and matcha.", img: "assets/images/menu/kinako-brulee.jpg", category: "matcha", subcategory: "matcha" },
      { name: "Gula Kabung Matcha Latte", desc: "Rich matcha latte sweetened with authentic palm sugar (gula kabung).", img: "assets/images/menu/gula-kabung.jpg", category: "matcha", subcategory: "matcha" },

      // 🌱 Mint Creations
      { name: "Mint Majesty", desc: "Cool and uplifting mint-infused latte with smooth balance.", img: "assets/images/menu/mint-majesty.jpg", category: "mint" },
      { name: "Frosted Mintcha", desc: "Icy blended drink with refreshing mint and creamy finish.", img: "assets/images/menu/frosted-mintcha.jpg", category: "mint" },
      { name: "Ichigo Mint Fizz", desc: "Sparkling strawberry and mint refresher, light and bubbly.", img: "assets/images/menu/ichigo-mint-fizz.jpg", category: "mint" },

      // 🍵 Toasted Harmony
      { name: "Batang Buruk Genmaicha", desc: "Nutty roasted rice tea with nostalgic batang buruk dessert twist.", img: "assets/images/menu/batang-buruk-genmaicha.jpg", category: "matcha", subcategory: "genmaicha" },

      // 🧊 Iced Brews
      { name: "Cold Brew", desc: "Slow-steeped cold brew coffee with smooth and bold flavor.", img: "assets/images/menu/cold-brew.jpg", category: "coffee" },
      { name: "Vanilla Sweet Cream Cold Brew", desc: "Cold brew topped with silky vanilla sweet cream.", img: "assets/images/menu/vanilla-cold-brew.jpg", category: "coffee" },

      // 💧 Others
      { name: "Spritzer Mineral Water", desc: "Refreshing bottled mineral water.", img: "assets/images/menu/spritzer.jpg", category: "others" },

      // 🌸 Seasonal
      { name: "Coming Soon Seasonal Drinks", desc: "Stay tuned for our limited-time collabs and festive specials!", img: "assets/images/menu/seasonal-placeholder.jpg", category: "seasonal" }
    ];

    // ----------------------
    // 4.2 Render Drinks
    // ----------------------
    const drinkGrid = document.querySelector('.drink-grid');
    let selectedCategory = "all";
    let selectedSubCategory = "all";

    function renderDrinks() {
      if(!drinkGrid) return;
      drinkGrid.innerHTML = "";
      drinks.forEach(d => {
        if (
          (selectedCategory === "all" || d.category === selectedCategory) &&
          (selectedSubCategory === "all" || !d.subcategory || d.subcategory === selectedSubCategory)
        ) {
          const card = document.createElement('div');
          card.className = "drink-card";
          if(d.category === 'seasonal') card.classList.add('premium');

          card.innerHTML = `
            ${d.badge ? `<div class="badge">${d.badge}</div>` : ""}
            <img src="${d.img}" alt="${d.name}">
            <h4>${d.name}</h4>
            <p>${d.desc}</p>
          `;
          drinkGrid.appendChild(card);
        }
      });
    }
    renderDrinks();

    // ----------------------
    // 4.3 Main Filter Buttons
    // ----------------------
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const subFilterContainer = document.querySelector('.sub-filter-buttons');
    const subFilterButtons = subFilterContainer ? subFilterContainer.querySelectorAll('button') : [];

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedCategory = btn.dataset.category;
        selectedSubCategory = "all";

        // Show sub-filters only if category = "matcha"
        if (selectedCategory === "matcha" && subFilterContainer) {
          subFilterContainer.style.display = "flex";
        } else {
          if (subFilterContainer) subFilterContainer.style.display = "none";
        }

        renderDrinks();
      });
    });

    // ----------------------
    // 4.4 Sub-Filter Buttons (for matcha series)
    // ----------------------
    subFilterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        subFilterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSubCategory = btn.dataset.subcategory;
        renderDrinks();
      });
    });

    // ----------------------
    // 4.5 Testimonial Carousel
    // ----------------------
    const carouselWrapper = document.querySelector('.testimonial-carousel-wrapper');
    const carousel = document.querySelector('.testimonial-carousel');

    if(carousel && carouselWrapper) {
      carousel.innerHTML += carousel.innerHTML;
      let scrollAmount = 0;
      function autoScroll() {
        scrollAmount += 2;
        if(scrollAmount >= carousel.scrollWidth / 2) scrollAmount = 0;
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(autoScroll);
      }
      autoScroll();
    }

  }, 300);
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

// ========================================
// 6️⃣ Charity Calendar
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const calendarGrid = document.getElementById('calendarDays');
  const monthYearLabel = document.getElementById('monthYear');
  const prevBtn = document.getElementById('prevMonth');
  const nextBtn = document.getElementById('nextMonth');
  let currentDate = new Date();

  function renderCalendar(date) {
    if (!calendarGrid || !monthYearLabel) return;
    const year = date.getFullYear();
    const month = date.getMonth();
    monthYearLabel.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    calendarGrid.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // empty slots before month start
    for (let i = 0; i < firstDay; i++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'calendar-day empty';
      calendarGrid.appendChild(emptyDiv);
    }

    let fridayCount = 0;
    for (let i = 1; i <= lastDate; i++) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'calendar-day';
      dayDiv.textContent = i;

      const day = new Date(year, month, i);
      const today = new Date();

      // highlight today
      if (
        day.getDate() === today.getDate() &&
        day.getMonth() === today.getMonth() &&
        day.getFullYear() === today.getFullYear()
      ) {
        dayDiv.classList.add('today');
        dayDiv.title = "Today";
      }

      // highlight 3rd Friday
      if (day.getDay() === 5) { 
        fridayCount++;
        if (fridayCount === 3) {
          dayDiv.classList.add('friday-charity');
          dayDiv.title = "Charity Day (FFG)";
        }
      }

      calendarGrid.appendChild(dayDiv);
    }
  }

  // initial render
  renderCalendar(currentDate);

  // navigation
  prevBtn?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextBtn?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });
});
