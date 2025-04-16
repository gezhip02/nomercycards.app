// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animate hamburger to X
    mobileMenu.classList.toggle('active');
    const spans = mobileMenu.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// Fullscreen functionality
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const gameIframe = document.querySelector('.game-container iframe');

fullscreenBtn.addEventListener('click', () => {
    if (gameIframe.requestFullscreen) {
        gameIframe.requestFullscreen();
    } else if (gameIframe.webkitRequestFullscreen) {
        gameIframe.webkitRequestFullscreen();
    } else if (gameIframe.msRequestFullscreen) {
        gameIframe.msRequestFullscreen();
    }
});

// Social Share Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Attempting to bind share buttons');
    const shareButtons = document.querySelectorAll('.share-buttons .share-btn');
    console.log('Found share buttons:', shareButtons.length);
    
    shareButtons.forEach((button, index) => {
        console.log(`Setting up listener for button ${index}:`, button.className);
        button.addEventListener('click', function(e) {
            console.log(`Button clicked: ${button.className}`);
            e.preventDefault();
            
            // Get current page info
            const url = window.location.href;
            const encodedUrl = encodeURIComponent(url);
            const title = encodeURIComponent(document.title || 'No Mercy Cards - Play Online Card Game');
            console.log('Sharing URL:', url);
            
            let shareUrl;
            
            // Simple sharing URLs without complex parameters
            if (button.classList.contains('twitter')) {
                shareUrl = `https://twitter.com/share?url=${encodedUrl}`;
            } else if (button.classList.contains('facebook')) {
                shareUrl = `https://www.facebook.com/sharer.php?u=${encodedUrl}`;
            } else if (button.classList.contains('linkedin')) {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
            } else if (button.classList.contains('reddit')) {
                shareUrl = `https://reddit.com/submit?url=${encodedUrl}`;
            } else if (button.classList.contains('tiktok')) {
                shareUrl = `https://www.tiktok.com/share?url=${encodedUrl}`;
            }
            
            console.log('Generated share URL:', shareUrl);
            
            if (shareUrl) {
                // Open share window
                try {
                    const shareWindow = window.open(shareUrl, '_blank', 'width=600,height=400,location=0,menubar=0');
                    console.log('Share window opened:', shareWindow);
                    
                    if (!shareWindow || shareWindow.closed || typeof shareWindow.closed === 'undefined') {
                        console.error('Popup was blocked by browser');
                        alert('Your browser blocked the share popup. Please allow popups for this site.');
                    }
                } catch (err) {
                    console.error('Error opening share window:', err);
                }
                
                // Visual feedback
                button.style.backgroundColor = '#4CAF50';
                setTimeout(() => {
                    button.style.backgroundColor = '';
                }, 1000);
            }
        });
    });
    
    // Also add click event to the parent div as a fallback
    const shareButtonsContainer = document.querySelector('.share-buttons');
    if (shareButtonsContainer) {
        console.log('Setting up delegation on share buttons container');
        shareButtonsContainer.addEventListener('click', function(e) {
            const button = e.target.closest('.share-btn');
            if (button) {
                console.log('Delegation caught click on:', button.className);
            }
        });
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                const spans = mobileMenu.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
});

// Add scroll event listener for navbar
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
}); 