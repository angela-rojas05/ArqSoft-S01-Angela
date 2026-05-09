document.addEventListener("DOMContentLoaded", () => {

    /* ── NAVBAR SCROLL ───────────────────────────── */
    const navbar = document.getElementById("main-navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 20);
        }, { passive: true });
    }

    /* ── ENTRADA DE CARDS ────────────────────────── */
    document.querySelectorAll(".game-card").forEach((card, i) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(16px)";
        setTimeout(() => {
            card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, i * 80);
    });

    /* ── TILT 3D (suavizado) ─────────────────────── */
    document.querySelectorAll(".game-card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transition = "transform 0.4s ease";
            card.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
        });
        card.addEventListener("mouseenter", () => {
            card.style.transition = "none";
        });
    });

});