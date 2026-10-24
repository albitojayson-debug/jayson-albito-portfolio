// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Close the mobile menu after choosing a link
const navbar = document.getElementById("navbarNav");
if (navbar && typeof bootstrap !== "undefined") {
  navbar.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      const menu = bootstrap.Collapse.getInstance(navbar);
      if (menu) menu.hide();
    })
  );
}

// Profile photo: try .jpg, then .png, then keep the alt-text frame
const profile = document.getElementById("profile-img");
if (profile) profile.addEventListener("error", () => {
  if (!profile.dataset.tried) { profile.dataset.tried = "1"; profile.src = "images/profile.png"; }
}, false);

const works = document.querySelectorAll(".work");

// Show a labeled placeholder when a project image is missing
works.forEach((work) => {
  const img = work.querySelector("img");
  const mark = () => work.classList.add("is-placeholder");
  img.addEventListener("error", mark);
  if (img.complete && img.naturalWidth === 0) mark();
});

// Category filters
const filters = document.querySelectorAll(".filter");
filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.toggle("is-active", b === btn));
    works.forEach((w) => {
      w.hidden = btn.dataset.filter !== "all" && w.dataset.category !== btn.dataset.filter;
    });
  })
);

// Lightbox preview
const box = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbTitle = document.getElementById("lb-title");
const lbDesc = document.getElementById("lb-desc");
const lbLink = document.getElementById("lb-link");

works.forEach((work) =>
  work.querySelector(".work-thumb").addEventListener("click", () => {
    if (work.classList.contains("is-placeholder")) return;
    const img = work.querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbTitle.textContent = work.dataset.title;
    lbDesc.textContent = work.dataset.desc;
    document.getElementById("lb-cat").textContent = work.querySelector(".tag").textContent;
    document.getElementById("lb-tools").textContent = work.dataset.tools;
    document.getElementById("lb-process").textContent = work.dataset.process;
    const link = work.dataset.link;
    lbLink.hidden = !link;
    if (link) lbLink.href = link;
    box.showModal();
  })
);

box.querySelector(".lb-close").addEventListener("click", () => box.close());
box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
