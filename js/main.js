// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Lightbox ----
(function () {
  var triggers = Array.prototype.slice.call(
    document.querySelectorAll("[data-full]")
  );
  var lb = document.getElementById("lightbox");
  var img = document.getElementById("lb-img");
  var srcs = triggers.map(function (t) { return t.getAttribute("data-full"); });
  var i = 0;

  function show(n) {
    i = (n + srcs.length) % srcs.length;
    img.src = srcs[i];
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
  }
  function close() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    img.src = "";
  }

  triggers.forEach(function (t, n) {
    t.addEventListener("click", function () { show(n); });
  });
  document.getElementById("lb-close").addEventListener("click", close);
  document.getElementById("lb-next").addEventListener("click", function () { show(i + 1); });
  document.getElementById("lb-prev").addEventListener("click", function () { show(i - 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(i + 1);
    if (e.key === "ArrowLeft") show(i - 1);
  });
})();

// ---- Contact form (no backend: opens the user's email client) ----
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("cf-name").value.trim();
    var email = document.getElementById("cf-email").value.trim();
    var phone = document.getElementById("cf-phone").value.trim();
    var msg = document.getElementById("cf-msg").value.trim();
    var subject = "Website inquiry from " + (name || "a visitor");
    var body =
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Phone: " + phone + "\n\n" +
      msg;
    window.location.href =
      "mailto:contact@petesplaceautoassembly.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
})();
