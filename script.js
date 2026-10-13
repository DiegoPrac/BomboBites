// DOM dan event: menu mobile, katalog dinamis, scroll reveal, dan konfigurasi link.
const config = window.BOMBO_CONFIG || {};
const instagramDefault = "https://instagram.com/bomboo_bites";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Hanya alamat web HTTPS yang digunakan untuk link eksternal.
function safeLink(value, fallback = "") {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : fallback;
  } catch {
    return fallback;
  }
}

const instagramUrl = safeLink(config.INSTAGRAM_URL, instagramDefault);
const formUrl = safeLink(config.FORM_URL);
document.querySelectorAll("[data-instagram]").forEach(link => {
  link.href = instagramUrl;
});
document.getElementById("year").textContent = new Date().getFullYear();

// Link form kosong berarti pre-order belum dibuka, bukan pesanan berhasil.
if (formUrl) {
  const formLink = document.getElementById("form-link");
  formLink.href = formUrl;
  formLink.hidden = false;
  document.getElementById("order-status").textContent = "Form pre-order tersedia";
  document.getElementById("order-description").textContent = "PO ditutup 14 Oktober 2026. Pengambilan 15 Oktober 2026 di FASILKOM.";
  document.getElementById("faq-preorder").textContent = "Pre-order sudah dibuka dan ditutup pada 14 Oktober 2026. Pesanan diambil pada 15 Oktober 2026 di FASILKOM.";
}

const toggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".nav-links");
function closeMenu() {
  navigation.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}
toggle.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    closeMenu();
    toggle.focus();
  }
});

// Fallback membuat menu tetap tampil ketika file dibuka langsung (file://)
// atau fetch gagal. Data utama di hosting tetap dibaca dari data/menu.json.
const fallbackMenu = [
  {id:"choco",name:"Bombo Choco Bites",shortName:"Choco",label:"THE CLASSIC CRUSH",description:"Filling cokelat creamy untuk kamu yang selalu balik ke rasa klasik.",note:"Cokelat · creamy · familiar",className:"choco",price:8000},
  {id:"matcha",name:"Bombo Matcha Bites",shortName:"Matcha",label:"THE GREEN FAVORITE",description:"Karakter matcha dengan filling creamy. Teman jeda buat pencinta green tea.",note:"Matcha · creamy · khas",className:"matcha",price:8000},
  {id:"ube",name:"Bombo Ubi Ungu Bites",shortName:"Ubi Ungu",label:"THE PURPLE PICK",description:"Filling ubi ungu dengan manis khas dan warna yang bikin penasaran.",note:"Ubi ungu · creamy · unik",className:"ube",price:8000}
];
const slider = document.getElementById("flavor-slider");
const previousButton = document.getElementById("prev-flavor");
const nextButton = document.getElementById("next-flavor");
const priceFormat = new Intl.NumberFormat("id-ID", {style:"currency",currency:"IDR",maximumFractionDigits:0});

// Menggunakan textContent agar isi JSON diperlakukan sebagai teks biasa.
function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}
function renderMenu(menu) {
  slider.replaceChildren();
  menu.forEach(flavor => {
    const theme = ["choco","matcha","ube"].includes(flavor.className) ? flavor.className : "choco";
    const card = createElement("article", `flavor-card ${theme}`);
    const visual = createElement("div", "flavor-visual");
    const image = createElement("img");
    image.src = "assets/bomboloni.png";
    image.alt = "Trio bomboloni BomboBites dengan isian cokelat, matcha, dan ubi ungu";
    image.width = 1024;
    image.height = 1024;
    image.loading = "lazy";
    visual.append(image, createElement("span", "flavor-tag", flavor.shortName));
    const body = createElement("div", "flavor-body");
    body.append(createElement("p", "flavor-label", flavor.label), createElement("h3", "", flavor.name), createElement("p", "", flavor.description));
    const price = createElement("div", "flavor-price");
    price.append(createElement("strong", "", priceFormat.format(flavor.price)), createElement("small", "", "/ buah"));
    const link = createElement("a", "flavor-link", "Lihat info pre-order");
    link.href = "#preorder";
    body.append(price, link);
    card.append(visual, body);
    slider.append(card);
  });
  // Kartu teaser ikut digeser, tanpa harga atau tombol pesan.
  const upcoming = createElement("article", "flavor-card coming-soon");
  const upcomingVisual = createElement("div", "flavor-visual coming-soon-visual");
  const mystery = createElement("span", "mystery-flavor", "?");
  mystery.setAttribute("aria-hidden", "true");
  upcomingVisual.append(mystery, createElement("span", "flavor-tag", "Rasa baru"));
  const upcomingBody = createElement("div", "flavor-body");
  upcomingBody.append(createElement("p", "flavor-label", "A NEW SWEET SURPRISE"), createElement("h3", "", "Coming soon"), createElement("p", "", "Rasa baru lagi disiapkan. Tunggu kejutan manis berikutnya!"));
  upcoming.append(upcomingVisual, upcomingBody);
  slider.append(upcoming);
  updateSliderButtons();
}
function validMenu(data) {
  return Array.isArray(data) && data.length > 0 && data.every(item =>
    item && ["name","shortName","label","description","note","className"].every(key => typeof item[key] === "string") &&
    Number.isFinite(item.price) && item.price >= 0
  );
}
async function loadMenu() {
  // Menu langsung tersedia; fetch memperbaruinya saat respons selesai.
  renderMenu(fallbackMenu);
  try {
    if (window.location.protocol === "file:") throw new Error("Local preview");
    const response = await fetch("data/menu.json");
    if (!response.ok) throw new Error("Menu belum bisa dimuat");
    const data = await response.json();
    if (!validMenu(data)) throw new Error("Format menu tidak sesuai");
    renderMenu(data);
  } catch (error) {
    // Fallback sudah tampil. Pengunjung tidak perlu melihat error teknis.
    renderMenu(fallbackMenu);
  } finally {
    document.getElementById("menu-status").textContent = "";
  }
}
function updateSliderButtons() {
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  previousButton.disabled = slider.scrollLeft <= 3;
  nextButton.disabled = slider.scrollLeft >= maxScroll - 3;
}
function slideMenu(direction) {
  const firstCard = slider.querySelector(".flavor-card");
  const gap = parseFloat(getComputedStyle(slider).gap) || 0;
  slider.scrollBy({left:direction * ((firstCard?.offsetWidth || 320) + gap),behavior:reducedMotion.matches ? "instant" : "smooth"});
}
previousButton.addEventListener("click", () => slideMenu(-1));
nextButton.addEventListener("click", () => slideMenu(1));
slider.addEventListener("scroll", updateSliderButtons, {passive:true});
slider.addEventListener("keydown", event => {
  if (event.target !== slider) return;
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    slideMenu(event.key === "ArrowRight" ? 1 : -1);
  }
});
window.addEventListener("resize", updateSliderButtons);
loadMenu();

// IntersectionObserver hanya menampilkan animasi saat bagian masuk viewport.
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  document.body.classList.add("motion-ready");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.1});
  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
}

// Parallax dibatasi pada hero, satu pembaruan per frame, tanpa library animasi.
const heroArt = document.querySelector("[data-parallax]");
let framePending = false;
function updateParallax() {
  if (reducedMotion.matches || window.innerWidth <= 700) {
    heroArt.style.setProperty("--parallax", "0px");
  } else {
    const offset = Math.min(window.scrollY * 0.06, 35);
    heroArt.style.setProperty("--parallax", `${offset}px`);
  }
  framePending = false;
}
window.addEventListener("scroll", () => {
  if (!framePending) {
    framePending = true;
    requestAnimationFrame(updateParallax);
  }
}, {passive:true});
reducedMotion.addEventListener("change", updateParallax);
window.addEventListener("resize", updateParallax);
