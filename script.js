/* ============================================================
   COMMERCIAL REFRIGERATION LANDING PAGES — SHARED SCRIPT
   No build step, no dependencies. Vanilla JS for speed.
   ============================================================ */

(function(){
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  var overlay = document.querySelector(".nav-overlay");

  function closeNav(){
    if(!navLinks) return;
    navLinks.classList.remove("is-open");
    overlay && overlay.classList.remove("is-open");
    toggle && toggle.setAttribute("aria-expanded","false");
  }
  if(toggle && navLinks){
    toggle.addEventListener("click",function(){
      var isOpen = navLinks.classList.toggle("is-open");
      overlay && overlay.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    overlay && overlay.addEventListener("click", closeNav);
    navLinks.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", closeNav); });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  if(header){
    window.addEventListener("scroll", function(){
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }, {passive:true});
  }

  /* ---------- Readout panel cycling stat ---------- */
  var screen = document.querySelector("[data-readout]");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(screen){
    var stats = [];
    try { stats = JSON.parse(screen.getAttribute("data-readout")); } catch(e){ stats = []; }
    var valueEl = screen.querySelector(".ro-value");
    var labelEl = screen.querySelector(".ro-label");
    var subEl = screen.querySelector(".ro-sub");
    var dots = screen.querySelectorAll(".readout-dots span");
    var idx = 0;
    function paint(i){
      if(!stats[i]) return;
      valueEl.style.opacity = 0;
      setTimeout(function(){
        labelEl.textContent = stats[i].label;
        valueEl.textContent = stats[i].value;
        if(subEl) subEl.textContent = stats[i].sub || "";
        valueEl.style.opacity = 1;
        dots.forEach(function(d,di){ d.classList.toggle("active", di===i); });
      }, 180);
    }
    if(stats.length){
      paint(0);
      if(!reduceMotion && stats.length > 1){
        setInterval(function(){
          idx = (idx+1) % stats.length;
          paint(idx);
        }, 3600);
      }
    }
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if(revealEls.length && "IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.12});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("is-visible"); });
  }

  /* ---------- Conversion tracking hooks (Google Ads / GA4) ----------
     This sends events to window.dataLayer, which is safe even if no
     analytics tag is installed yet (it just becomes a plain array).
     Once you add your Google Tag (GA4) or Google Ads tag to <head>,
     these events will be picked up automatically. To wire a specific
     Google Ads conversion action, replace 'AW-CONVERSION_ID/LABEL'
     below with the values from your Google Ads conversion action. */
  window.dataLayer = window.dataLayer || [];

  document.querySelectorAll('a[href^="tel:"]').forEach(function(link){
    link.addEventListener("click", function(){
      window.dataLayer.push({
        event: "phone_click",
        click_location: link.getAttribute("data-cta-location") || "unspecified"
      });
      // Example Google Ads phone-call conversion (uncomment & fill in once tag is installed):
      // if(typeof gtag === "function"){
      //   gtag('event', 'conversion', {'send_to': 'AW-CONVERSION_ID/LABEL'});
      // }
    });
  });

  /* ---------- Quote form (demo submit) ----------
     This form currently shows an on-page success state only.
     To go live, either:
     (a) point the <form> "action" at your form backend / Elementor form, or
     (b) replace this handler with a fetch() POST to your endpoint, or
     (c) if rebuilt in Elementor, use Elementor's native form widget instead
         and discard this script block for the form. */
  var form = document.querySelector("[data-quote-form]");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var requiredOk = true;
      form.querySelectorAll("[required]").forEach(function(field){
        if(!field.value.trim()){ requiredOk = false; field.style.borderColor = "#D14A00"; }
        else { field.style.borderColor = ""; }
      });
      if(!requiredOk) return;

      window.dataLayer.push({event:"quote_form_submit"});
      // Example Google Ads form-submission conversion (uncomment once tag is installed):
      // if(typeof gtag === "function"){
      //   gtag('event', 'conversion', {'send_to': 'AW-CONVERSION_ID/LABEL'});
      // }

      var card = form.closest(".quote-form-card");
      var success = card.querySelector(".form-success");
      form.style.display = "none";
      if(success) success.classList.add("is-visible");
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

})();
