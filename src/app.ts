// Navigation Manager - TypeScript implementation
interface NavigationState {
  isMobileMenuOpen: boolean;
  currentSection: string;
}

export class App {
  private state: NavigationState = {
    isMobileMenuOpen: false,
    currentSection: "main",
  };

  private mobileMenuButton: HTMLElement | null = null;
  private mobileMenu: HTMLElement | null = null;
  private navLinks: NodeListOf<Element> | null = null;
  private sections: NodeListOf<Element> | null = null;
  private navbar: HTMLElement | null = null;

  constructor() {
    this.initializeElements();
    this.setupEventListeners();
    this.updateActiveNavLink();
  }

  private initializeElements(): void {
    this.mobileMenuButton = document.getElementById("mobile-menu-button");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.sections = document.querySelectorAll("a[id]");
    this.navbar = document.querySelector("nav");
  }

  private setupEventListeners(): void {
    // Mobile menu toggle
    this.mobileMenuButton?.addEventListener("click", () => {
      this.toggleMobileMenu();
    });

    // Navigation links
    this.navLinks?.forEach((link) => {
      link.addEventListener("click", (e: Event) => {
        e.preventDefault();
        const targetId = (link as HTMLElement).getAttribute("href");
        if (targetId) {
          this.scrollToSection(targetId);
          this.closeMobileMenu();
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        !this.mobileMenuButton?.contains(target) &&
        !this.mobileMenu?.contains(target)
      ) {
        this.closeMobileMenu();
      }
    });

    // Update active nav link on scroll
    window.addEventListener("scroll", () => {
      this.updateActiveNavLink();
    });
  }

  private toggleMobileMenu(): void {
    this.state.isMobileMenuOpen = !this.state.isMobileMenuOpen;
    if (this.mobileMenu) {
      this.mobileMenu.classList.toggle("hidden", !this.state.isMobileMenuOpen);
    }
  }

  private closeMobileMenu(): void {
    this.state.isMobileMenuOpen = false;
    if (this.mobileMenu) {
      this.mobileMenu.classList.add("hidden");
    }
  }

  private scrollToSection(targetId: string): void {
    const targetSection = document.querySelector(targetId);
    if (targetSection && this.navbar) {
      const navbarHeight = this.navbar.offsetHeight;
      const targetPosition =
        (targetSection as HTMLElement).offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  private updateActiveNavLink(): void {
    if (!this.sections || !this.navLinks || !this.navbar) return;

    const navbarHeight = this.navbar.offsetHeight;
    let currentSection = "";

    this.sections.forEach((section) => {
      const sectionTop =
        (section as HTMLElement).offsetTop - navbarHeight - 100;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id") || "";
      }
    });

    this.navLinks.forEach((link) => {
      link.classList.remove("active");
      if ((link as HTMLElement).getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
