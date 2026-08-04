document.addEventListener('DOMContentLoaded', () => {
    // Core Navigation Selectors
    const header = document.getElementById('header');
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-actions-mobile .btn');

    // Controls Selectors
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDropdown = document.getElementById('notification-dropdown');
    const notificationBadge = document.getElementById('notification-badge');
    const markReadBtn = document.getElementById('mark-read-btn');

    // Search Selectors
    const searchBox = document.getElementById('search-box');
    const searchInput = document.getElementById('search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');
    const searchResultsDropdown = document.getElementById('search-results-dropdown');
    const searchResultsList = document.getElementById('search-results-list');
    const mobileSearchInput = document.querySelector('.mobile-search-input');

    // Search Index Database
    const searchableItems = [
        { name: 'Home Section', href: '#home', tag: 'Section' },
        { name: 'About Us', href: '#about', tag: 'Section' },
        { name: 'Our Services', href: '#services', tag: 'Section' },
        { name: 'Portfolio Showcase', href: '#portfolio', tag: 'Section' },
        { name: 'Contact Us', href: '#contact', tag: 'Section' },
        { name: 'Dark Mode & Light Theme', href: '#theme', action: 'toggle-theme', tag: 'Feature' },
        { name: 'Notifications Center', href: '#notifications', action: 'open-notifications', tag: 'Feature' },
        { name: 'Login Account', href: '#login', tag: 'Action' }
    ];
    // Mobile Menu Drawer
    function toggleMobileMenu() {
        const isExpanded = hamburgerToggle.getAttribute('aria-expanded') === 'true';
        hamburgerToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburgerToggle.setAttribute('aria-expanded', !isExpanded);

        closeNotificationDropdown();
        closeSearchResults();
    }

    function closeMobileMenu() {
        if (navMenu && navMenu.classList.contains('active')) {
            hamburgerToggle.classList.remove('active');
            navMenu.classList.remove('active');
            hamburgerToggle.setAttribute('aria-expanded', 'false');
        }
    }

    if (hamburgerToggle) {
        hamburgerToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    // Dark & Light Theme Switcher
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply saved or system preferred theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }

    function toggleTheme() {
        // Rotate button icon for smooth visual feedback
        if (themeToggleBtn) {
            themeToggleBtn.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggleBtn.style.transform = '';
            }, 400);
        }

        // Toggle dark-theme CSS class on body
        document.body.classList.toggle('dark-theme');

        // Persist setting in localStorage
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    // Live Search Functionality & Results Popup
    function renderSearchResults(query, targetList, targetDropdown) {
        const cleanQuery = query.trim().toLowerCase();
        targetList.innerHTML = '';

        if (!cleanQuery) {
            targetDropdown.classList.remove('active');
            return;
        }

        const filtered = searchableItems.filter(item =>
            item.name.toLowerCase().includes(cleanQuery) ||
            item.tag.toLowerCase().includes(cleanQuery)
        );

        if (filtered.length === 0) {
            targetList.innerHTML = `<li class="no-results-msg">No results found for "${query}"</li>`;
        } else {
            filtered.forEach(item => {
                const li = document.createElement('li');
                li.className = 'search-result-item';
                li.innerHTML = `
                    <span>${item.name}</span>
                    <span class="result-tag">${item.tag}</span>
                `;
                li.addEventListener('click', () => {
                    if (item.action === 'toggle-theme') {
                        toggleTheme();
                    } else if (item.action === 'open-notifications') {
                        toggleNotificationDropdown();
                    } else {
                        const targetEl = document.querySelector(item.href);
                        if (targetEl) {
                            targetEl.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                    closeSearchResults();
                    closeMobileMenu();
                });
                targetList.appendChild(li);
            });
        }

        targetDropdown.classList.add('active');
    }

    function closeSearchResults() {
        if (searchResultsDropdown) {
            searchResultsDropdown.classList.remove('active');
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value) {
                searchBox.classList.add('has-text');
            } else {
                searchBox.classList.remove('has-text');
            }
            renderSearchResults(value, searchResultsList, searchResultsDropdown);
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim()) {
                searchResultsDropdown.classList.add('active');
            }
        });
    }

    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchBox.classList.remove('has-text');
            closeSearchResults();
            searchInput.focus();
        });
    }

    // Mobile Search Input Handler
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (query) {
                const match = searchableItems.find(item => item.name.toLowerCase().includes(query));
                if (match && match.href) {
                    const navMatchLink = document.querySelector(`.nav-link[href="${match.href}"]`);
                    if (navMatchLink) {
                        navMatchLink.style.fontWeight = '700';
                        navMatchLink.style.color = 'var(--primary-color)';
                    }
                }
            }
        });
    }
    // Notification Bell Dropdown & Clear Handler
    function toggleNotificationDropdown() {
        const isExpanded = notificationBtn.getAttribute('aria-expanded') === 'true';
        notificationDropdown.classList.toggle('active');
        notificationBtn.setAttribute('aria-expanded', !isExpanded);

        closeMobileMenu();
        closeSearchResults();
    }

    function closeNotificationDropdown() {
        if (notificationDropdown && notificationDropdown.classList.contains('active')) {
            notificationDropdown.classList.remove('active');
            notificationBtn.setAttribute('aria-expanded', 'false');
        }
    }

    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleNotificationDropdown();
        });
    }

    if (markReadBtn && notificationBadge) {
        markReadBtn.addEventListener('click', () => {
            notificationBadge.style.transform = 'scale(0)';
            setTimeout(() => {
                notificationBadge.style.display = 'none';
            }, 200);

            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => item.classList.remove('unread'));
        });
    }
    // Global Click-Outside & Keyboard Escape Listeners
    document.addEventListener('click', (e) => {
        if (header && !header.contains(e.target)) {
            closeMobileMenu();
            closeNotificationDropdown();
            closeSearchResults();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeNotificationDropdown();
            closeSearchResults();
        }
    });
    // Scroll Header Shadow Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = document.body.classList.contains('dark-theme')
                ? '0 6px 24px -2px rgba(0, 0, 0, 0.6)'
                : '0 6px 24px -2px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'var(--shadow-nav)';
        }
    });
});
