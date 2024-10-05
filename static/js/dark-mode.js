document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeToggleDesktop = document.getElementById('dark-mode-toggle-desktop');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    const darkModeIconDesktop = document.getElementById('dark-mode-icon-desktop');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.classList.add('dark');
        updateIcons(true);
    } else {
        updateIcons(false);
    }

    // Toggle dark mode function
    function toggleDarkMode() {
        htmlElement.classList.toggle('dark');
        const isDarkMode = htmlElement.classList.contains('dark');

        // Save theme preference
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Update icons
        updateIcons(isDarkMode);

        // Log dark mode state
        console.log('Dark mode toggled:', isDarkMode);
    }

    // Add click event listeners to both toggles
    darkModeToggle.addEventListener('click', toggleDarkMode);
    darkModeToggleDesktop.addEventListener('click', toggleDarkMode);

    // Function to update the icons based on the current mode
    function updateIcons(isDarkMode) {
        const iconHTML = isDarkMode
            ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`
            : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;

        darkModeIcon.innerHTML = iconHTML;
        darkModeIconDesktop.innerHTML = iconHTML;
    }
});