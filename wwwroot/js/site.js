// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// Animación suave al cargar cards

document.addEventListener("DOMContentLoaded", () => {

    /* ── PARTÍCULAS ──────────────────────────────── */
    const canvas = document.getElementById("particles-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;

        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.5 + 0.3,
            dx: (Math.random() - 0.5) * 0.25,
            dy: -Math.random() * 0.35 - 0.1,
            alpha: Math.random() * 0.5 + 0.1,
            color: Math.random() > 0.5 ? "124,58,237" : "37,99,235"
        }));

        function drawParticles() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
                if (p.x < -5) p.x = W + 5;
                if (p.x > W + 5) p.x = -5;
            });
            requestAnimationFrame(drawParticles);
        }

        drawParticles();
        window.addEventListener("resize", () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        });
    }

    /* ── NAVBAR SCROLL GLOW ──────────────────────── */
    const navbar = document.getElementById("main-navbar");
    if (navbar) {
        const toggleScroll = () =>
            navbar.classList.toggle("scrolled", window.scrollY > 20);
        window.addEventListener("scroll", toggleScroll, { passive: true });
        toggleScroll();
    }

    /* ── STAGGER CARDS ───────────────────────────── */
    const cards = document.querySelectorAll(".game-card");
    cards.forEach((card, i) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(32px)";
        setTimeout(() => {
            card.style.transition = "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 80 + i * 100);
    });

    /* ── TILT 3D ─────────────────────────────────── */
    cards.forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotY = ((x / rect.width) - 0.5) * 12;
            const rotX = -((y / rect.height) - 0.5) * 10;
            card.style.transform =
                `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.02)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease";
            card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)";
        });

        card.addEventListener("mouseenter", () => {
            card.style.transition = "box-shadow 0.3s ease, border-color 0.3s ease";
        });
    });

    /* ── TYPING PLACEHOLDER ──────────────────────── */
    const titleInput = document.getElementById("Titulo");
    if (titleInput) {
        const hints = [
            "ej. The Legend of Zelda",
            "ej. Dark Souls III",
            "ej. Hades",
            "ej. Hollow Knight",
        ];
        let idx = 0;
        setInterval(() => {
            idx = (idx + 1) % hints.length;
            titleInput.placeholder = hints[idx];
        }, 2800);
    }

    /* ── RIPPLE EN BOTONES ───────────────────────── */
    document.querySelectorAll(".btn-primary, .btn-guardar").forEach(btn => {
        btn.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                position:absolute; border-radius:50%;
                width:${size}px; height:${size}px;
                left:${e.clientX - rect.left - size / 2}px;
                top:${e.clientY - rect.top - size / 2}px;
                background:rgba(255,255,255,0.18);
                transform:scale(0);
                animation:ripple-anim 0.55s ease-out forwards;
                pointer-events:none;
            `;
            if (!document.getElementById("ripple-style")) {
                const s = document.createElement("style");
                s.id = "ripple-style";
                s.textContent = "@keyframes ripple-anim{to{transform:scale(2.5);opacity:0;}}";
                document.head.appendChild(s);
            }
            this.style.position = "relative";
            this.style.overflow = "hidden";
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

});




       