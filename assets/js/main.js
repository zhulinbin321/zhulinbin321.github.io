/* ==========================================================================
   个人主页 · 交互脚本（零依赖）
   1 深浅色主题切换   2 移动端菜单   3 导航吸顶与高亮
   4 滚动进入动画     5 返回顶部     6 页脚年份
   ========================================================================== */
(function () {
  "use strict";

  var docEl = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. 主题切换 ---------- */
  var themeBtn = document.getElementById("theme-toggle");
  var STORAGE_KEY = "site-theme";

  function applyTheme(theme) {
    docEl.setAttribute("data-theme", theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* 隐私模式忽略 */ }
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = docEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  // 用户未手动选择过时，跟随系统
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (err) { /* noop */ }
    if (!stored) docEl.setAttribute("data-theme", e.matches ? "dark" : "light");
  });

  /* ---------- 2. 移动端菜单 ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var mobilePanel = document.getElementById("mobile-panel");

  function closeMenu() {
    if (!mobilePanel || !navToggle) return;
    mobilePanel.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && mobilePanel) {
    navToggle.addEventListener("click", function () {
      var open = mobilePanel.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    mobilePanel.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) closeMenu();
    });
  }

  /* ---------- 3. 导航吸顶 + 当前区块高亮 ---------- */
  var nav = document.querySelector(".nav");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav-link]"));

  function onScroll() {
    if (nav) nav.classList.toggle("is-stuck", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window && navLinks.length) {
    var linkMap = {};
    navLinks.forEach(function (link) { linkMap[link.getAttribute("href").slice(1)] = link; });
    var targets = Object.keys(linkMap)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (l) { l.classList.remove("is-active"); });
        var active = linkMap[entry.target.id];
        if (active) active.classList.add("is-active");
      });
    }, { rootMargin: "-72px 0px -70% 0px", threshold: 0 });

    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------- 4. 滚动进入动画 ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (!("IntersectionObserver" in window) || reduceMotion) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      io.observe(el);
    });
  }

  /* ---------- 5. 返回顶部 ---------- */
  var toTop = document.getElementById("to-top");
  if (toTop) {
    toTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- 6. 页脚年份 ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
