// Navigation Manager - TypeScript implementation
interface NavigationState {
  isMobileMenuOpen: boolean;
  currentSection: string;
}

class App {
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

// Carousel functionality
class Carousel {
  private carousel: HTMLElement;
  private prevButton: HTMLElement;
  private nextButton: HTMLElement;
  private dots: NodeListOf<Element>;
  private currentSlide: number = 0;
  private totalSlides: number;

  constructor(
    carouselId: string,
    prevId: string,
    nextId: string,
    dotsClass: string
  ) {
    this.carousel = document.getElementById(carouselId) as HTMLElement;
    this.prevButton = document.getElementById(prevId) as HTMLElement;
    this.nextButton = document.getElementById(nextId) as HTMLElement;
    this.dots = document.querySelectorAll(dotsClass);
    this.totalSlides = this.dots.length;

    if (!this.carousel || !this.prevButton || !this.nextButton) {
      console.error(
        `Failed to initialize carousel ${carouselId}: Missing elements`
      );
      return;
    }

    this.initializeCarousel();
  }

  private initializeCarousel(): void {
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

  private prevSlide(): void {
    this.currentSlide =
      this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateCarousel();
  }

  private nextSlide(): void {
    this.currentSlide =
      this.currentSlide === this.totalSlides - 1 ? 0 : this.currentSlide + 1;
    this.updateCarousel();
  }

  private goToSlide(slideIndex: number): void {
    this.currentSlide = slideIndex;
    this.updateCarousel();
  }

  private updateCarousel(): void {
    // Fixed slide width: w-80 (320px) + px-4 (16px * 2) = 352px
    const slideWidth = 352;
    const translateX = -this.currentSlide * slideWidth;

    console.log(
      `Moving carousel to slide ${this.currentSlide}, translateX: ${translateX}px`
    );

    this.carousel.style.transform = `translateX(${translateX}px)`;

    // Update dots
    this.dots.forEach((dot, index) => {
      if (index === this.currentSlide) {
        dot.classList.add("bg-white");
        dot.classList.remove("bg-white/30");
      } else {
        dot.classList.remove("bg-white");
        dot.classList.add("bg-white/30");
      }
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new App();

  console.log("Initializing Landing Pages carousel...");
  const landingCarousel = new Carousel(
    "landing-carousel",
    "landing-prev",
    "landing-next",
    ".landing-dot"
  );

  console.log("Initializing TypeScript Projects carousel...");
  const typescriptCarousel = new Carousel(
    "typescript-carousel",
    "typescript-prev",
    "typescript-next",
    ".typescript-dot"
  );
});
