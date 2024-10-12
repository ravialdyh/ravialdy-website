document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle-desktop');
    const darkModeIcon = document.getElementById('dark-mode-icon-desktop');
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    // Toggle dark mode function
    function toggleDarkMode() {
        if (htmlElement.classList.contains('dark')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }

    // Enable dark mode
    function enableDarkMode() {
        htmlElement.classList.add('dark');
        bodyElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateIcon(true);
    }

    // Disable dark mode
    function disableDarkMode() {
        htmlElement.classList.remove('dark');
        bodyElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateIcon(false);
    }

    // Update icon based on current mode
    function updateIcon(isDark) {
        if (darkModeIcon) {
            darkModeIcon.innerHTML = isDark
                ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />'
                : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
        }
    }

    // Add click event listener to toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
});