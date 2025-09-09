// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// CC Chains Tab Functionality
const ccTabBtns = document.querySelectorAll('.tab-btn');
const ccTabContents = document.querySelectorAll('.tab-content');

ccTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        ccTabBtns.forEach(b => b.classList.remove('active'));
        ccTabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const targetTab = btn.getAttribute('data-tab');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Class Progression Tab Functionality
const classTabBtns = document.querySelectorAll('.class-tab-btn');
const classTabContents = document.querySelectorAll('.class-content');

classTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        classTabBtns.forEach(b => b.classList.remove('active'));
        classTabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const targetClass = btn.getAttribute('data-class');
        document.getElementById(targetClass).classList.add('active');
    });
});

// Smooth scrolling for navigation links (only for same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle cross-page navigation with smooth transitions
document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', function (e) {
        // Add loading effect
        document.body.style.opacity = '0.7';
        document.body.style.transition = 'opacity 0.3s ease';
        
        // Small delay for visual feedback
        setTimeout(() => {
            window.location.href = this.href;
        }, 150);
    });
});

// Class search and filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('classSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const classCategories = document.querySelectorAll('.class-category');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterClasses(searchTerm, getActiveFilter());
        });
    }
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter classes
                const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
                filterClasses(searchTerm, this.getAttribute('data-filter'));
            });
        });
    }
    
    function getActiveFilter() {
        const activeBtn = document.querySelector('.filter-btn.active');
        return activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    }
    
    function filterClasses(searchTerm, filter) {
        classCategories.forEach(category => {
            const categoryType = category.getAttribute('data-category');
            const classCards = category.querySelectorAll('.class-card');
            let hasVisibleCards = false;
            
            classCards.forEach(card => {
                const className = card.querySelector('h3').textContent.toLowerCase();
                const classDescription = card.querySelector('p').textContent.toLowerCase();
                const matchesSearch = searchTerm === '' || className.includes(searchTerm) || classDescription.includes(searchTerm);
                const matchesFilter = filter === 'all' || categoryType === filter;
                
                if (matchesSearch && matchesFilter) {
                    card.style.display = 'block';
                    hasVisibleCards = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide category based on visible cards
            if (hasVisibleCards) {
                category.classList.remove('hidden');
            } else {
                category.classList.add('hidden');
            }
        });
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.cc-card, .class-card, .behavior-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Rating bar animation on scroll
const ratingBars = document.querySelectorAll('.rating-fill');
const ratingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0%';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 200);
        }
    });
}, { threshold: 0.5 });

ratingBars.forEach(bar => {
    ratingObserver.observe(bar);
});

// Add hover effects to CC combo steps
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateX(10px)';
            step.style.background = 'rgba(0, 212, 255, 0.2)';
        });
        
        step.addEventListener('mouseleave', () => {
            step.style.transform = 'translateX(0)';
            step.style.background = 'rgba(0, 212, 255, 0.1)';
        });
    });
});

// Add click effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cc-card, .class-card, .behavior-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            setTimeout(() => {
                card.style.transform = 'translateY(-5px) scale(1)';
            }, 150);
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add tooltip functionality for rating items
document.addEventListener('DOMContentLoaded', () => {
    const ratingItems = document.querySelectorAll('.rating-item');
    ratingItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.background = 'rgba(0, 212, 255, 0.15)';
            item.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = 'rgba(255, 255, 255, 0.03)';
            item.style.transform = 'scale(1)';
        });
    });
});

// Add search functionality (placeholder for future enhancement)
function searchContent(query) {
    const searchableElements = document.querySelectorAll('.cc-card, .class-card, .behavior-card');
    const results = [];
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            results.push(element);
        }
    });
    
    return results;
}

// Add copy to clipboard functionality for CC chains
document.addEventListener('DOMContentLoaded', () => {
    const ccCards = document.querySelectorAll('.cc-card');
    ccCards.forEach(card => {
        card.addEventListener('dblclick', () => {
            const combo = card.querySelector('.cc-combo');
            const result = card.querySelector('.cc-result');
            const textToCopy = `${card.querySelector('h3').textContent}\n\n${combo.textContent}\n\n${result.textContent}`;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show feedback
                const originalBg = card.style.background;
                card.style.background = 'rgba(0, 255, 136, 0.2)';
                setTimeout(() => {
                    card.style.background = originalBg;
                }, 1000);
            });
        });
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + 1-4 for quick navigation
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '4') {
        e.preventDefault();
        const sections = ['#home', '#cc-chains', '#progression', '#r1-behaviors'];
        const targetSection = document.querySelector(sections[parseInt(e.key) - 1]);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}, 16));

// Add active section highlighting in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', throttle(() => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 100));

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #00d4ff !important;
        text-shadow: 0 0 5px #00d4ff !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);
