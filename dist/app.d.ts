interface NavigationState {
    isMobileMenuOpen: boolean;
    currentSection: string;
}
declare class App {
    private state;
    private mobileMenuButton;
    private mobileMenu;
    private navLinks;
    private sections;
    private navbar;
    constructor();
    private initializeElements;
    private setupEventListeners;
    private toggleMobileMenu;
    private closeMobileMenu;
    private scrollToSection;
    private updateActiveNavLink;
}
declare class Carousel {
    private carousel;
    private prevButton;
    private nextButton;
    private dots;
    private currentSlide;
    private totalSlides;
    constructor(carouselId: string, prevId: string, nextId: string, dotsClass: string);
    private initializeCarousel;
    private prevSlide;
    private nextSlide;
    private goToSlide;
    private updateCarousel;
}
