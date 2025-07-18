// Theme toggle functionality
class ThemeToggle {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Apply saved theme on page load
        this.applyTheme(this.theme);

        // Add event listener to toggle button
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        localStorage.setItem('theme', this.theme);

        // Add a subtle animation to the toggle button
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                toggleButton.style.transform = 'scale(1)';
            }, 150);
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.theme = theme;
        
        // Update button accessibility
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.setAttribute('aria-label', 
                theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            );
        }
    }

    // Get current theme
    getCurrentTheme() {
        return this.theme;
    }

    // Set theme programmatically
    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.theme = theme;
            this.applyTheme(theme);
            localStorage.setItem('theme', theme);
        }
    }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeToggle;
}
