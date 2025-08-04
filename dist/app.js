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
// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new App();
});
//# sourceMappingURL=app.js.map