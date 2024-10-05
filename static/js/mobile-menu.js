document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Function to close the mobile menu
    const closeMobileMenu = () => {
        mobileMenu.classList.add('hidden');
    };

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            closeMobileMenu();
        }
    });

    // Close mobile menu when a link is clicked
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when window is resized to desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });
});