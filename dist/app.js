export class App {
    constructor() {
        this.state = {
            isMobileMenuOpen: false,
            currentSection: "main",
        };
        this.mobileMenuButton = null;
        this.mobileMenu = null;
        this.navLinks = null;
        this.sections = null;
        this.navbar = null;
        this.initializeElements();
        this.setupEventListeners();
        this.updateActiveNavLink();
    }
    initializeElements() {
        this.mobileMenuButton = document.getElementById("mobile-menu-button");
        this.mobileMenu = document.getElementById("mobile-menu");
        this.navLinks = document.querySelectorAll(".nav-link");
        this.sections = document.querySelectorAll("a[id]");
        this.navbar = document.querySelector("nav");
    }
    setupEventListeners() {
        // Mobile menu toggle
        this.mobileMenuButton?.addEventListener("click", () => {
            this.toggleMobileMenu();
        });
        // Navigation links
        this.navLinks?.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = link.getAttribute("href");
                if (targetId) {
                    this.scrollToSection(targetId);
                    this.closeMobileMenu();
                }
            });
        });
        // Close mobile menu when clicking outside
        document.addEventListener("click", (e) => {
            const target = e.target;
            if (!this.mobileMenuButton?.contains(target) &&
                !this.mobileMenu?.contains(target)) {
                this.closeMobileMenu();
            }
        });
        // Update active nav link on scroll
        window.addEventListener("scroll", () => {
            this.updateActiveNavLink();
        });
    }
    toggleMobileMenu() {
        this.state.isMobileMenuOpen = !this.state.isMobileMenuOpen;
        if (this.mobileMenu) {
            this.mobileMenu.classList.toggle("hidden", !this.state.isMobileMenuOpen);
        }
    }
    closeMobileMenu() {
        this.state.isMobileMenuOpen = false;
        if (this.mobileMenu) {
            this.mobileMenu.classList.add("hidden");
        }
    }
    scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection && this.navbar) {
            const navbarHeight = this.navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        }
    }
    updateActiveNavLink() {
        if (!this.sections || !this.navLinks || !this.navbar)
            return;
        const navbarHeight = this.navbar.offsetHeight;
        let currentSection = "";
        this.sections.forEach((section) => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop &&
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id") || "";
            }
        });
        this.navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }
}
// Carousel functionality
class Carousel {
    constructor(carouselId, prevId, nextId, dotsClass) {
        this.currentSlide = 0;
        this.carousel = document.getElementById(carouselId);
        this.prevButton = document.getElementById(prevId);
        this.nextButton = document.getElementById(nextId);
        this.dots = document.querySelectorAll(dotsClass);
        this.totalSlides = this.dots.length;
        if (!this.carousel || !this.prevButton || !this.nextButton) {
            console.error(`Failed to initialize carousel ${carouselId}: Missing elements`);
            return;
        }
        this.initializeCarousel();
    }
    initializeCarousel() {
        this.prevButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.prevSlide();
        });
        this.nextButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.nextSlide();
        });
        this.dots.forEach((dot, index) => {
            dot.addEventListener("click", () => this.goToSlide(index));
        });
        this.updateCarousel();
    }
    prevSlide() {
        this.currentSlide =
            this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.updateCarousel();
    }
    nextSlide() {
        this.currentSlide =
            this.currentSlide === this.totalSlides - 1 ? 0 : this.currentSlide + 1;
        this.updateCarousel();
    }
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
    }
    updateCarousel() {
        // Fixed slide width: w-80 (320px) + px-4 (16px * 2) = 352px
        const slideWidth = 352;
        const translateX = -this.currentSlide * slideWidth;
        this.carousel.style.transform = `translateX(${translateX}px)`;
        // Update dots
        this.dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.add("bg-white");
                dot.classList.remove("bg-white/30");
            }
            else {
                dot.classList.remove("bg-white");
                dot.classList.add("bg-white/30");
            }
        });
    }
}
// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new App();
    new Carousel("landing-carousel", "landing-prev", "landing-next", ".landing-dot");
    new Carousel("typescript-carousel", "typescript-prev", "typescript-next", ".typescript-dot");
});
//# sourceMappingURL=app.js.map