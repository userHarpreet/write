// Blog functionality
class BlogApp {
    constructor() {
        this.posts = [];
        this.allPosts = [];
        this.currentPage = 1;
        this.postsPerPage = 6;
        this.isLoading = false;
        this.searchQuery = '';
        this.selectedCategory = 'all';
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.loadPosts();
        this.setupScrollAnimations();
        this.setupLoadMore();
        this.setupSearch();
        this.setupCategoryFilter();
        this.loadTopics();
        this.loadTags();
        this.loadFeaturedPost();
    }

    // Navigation functionality
    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu
                navMenu.classList.remove('active');
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Update active link on scroll
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 100;
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Load and display blog posts
    async loadPosts() {
        if (this.isLoading) return;
        this.isLoading = true;

        const postsGrid = document.getElementById('posts-grid');
        
        // Show loading state
        if (this.currentPage === 1) {
            postsGrid.innerHTML = '<div class="loading">Loading posts...</div>';
        }

        try {
            // Simulate API call - replace with actual API endpoint
            const newPosts = await this.fetchPosts(this.currentPage);
            
            if (this.currentPage === 1) {
                this.posts = newPosts;
                postsGrid.innerHTML = '';
            } else {
                this.posts = [...this.posts, ...newPosts];
            }

            this.renderPosts(newPosts);
            
            // Show/hide load more button
            const loadMoreBtn = document.getElementById('load-more-btn');
            const loadMoreSection = document.querySelector('.load-more');
            
            if (newPosts.length < this.postsPerPage) {
                loadMoreSection.style.display = 'none';
            } else {
                loadMoreSection.style.display = 'block';
            }

        } catch (error) {
            console.error('Error loading posts:', error);
            if (this.currentPage === 1) {
                postsGrid.innerHTML = '<div class="error">Failed to load posts. Please try again later.</div>';
            }
        } finally {
            this.isLoading = false;
        }
    }

    // Simulate fetching posts from an API
    async fetchPosts(page) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sample posts data - replace with actual API call
        const allPosts = [
            {
                id: 1,
                title: "Getting Started with Modern Web Development",
                excerpt: "Learn the fundamentals of modern web development with HTML5, CSS3, and JavaScript ES6+. This comprehensive guide covers everything you need to know.",
                date: "2024-01-15",
                readTime: "5 min read",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
                slug: "getting-started-modern-web-development"
            },
            {
                id: 2,
                title: "Building Responsive Layouts with CSS Grid",
                excerpt: "Master CSS Grid to create beautiful, responsive layouts that work on all devices. Learn advanced techniques and best practices.",
                date: "2024-01-12",
                readTime: "8 min read",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
                slug: "css-grid-responsive-layouts"
            },
            {
                id: 3,
                title: "JavaScript Async/Await: A Complete Guide",
                excerpt: "Understanding asynchronous JavaScript with async/await. Learn how to write cleaner, more readable asynchronous code.",
                date: "2024-01-10",
                readTime: "6 min read",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
                slug: "javascript-async-await-guide"
            },
            {
                id: 4,
                title: "Introduction to React Hooks",
                excerpt: "Discover the power of React Hooks and how they can simplify your component logic. Learn useState, useEffect, and custom hooks.",
                date: "2024-01-08",
                readTime: "10 min read",
                image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
                slug: "react-hooks-introduction"
            },
            {
                id: 5,
                title: "Web Performance Optimization Tips",
                excerpt: "Learn practical techniques to optimize your website's performance. From image optimization to lazy loading and caching strategies.",
                date: "2024-01-05",
                readTime: "7 min read",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
                slug: "web-performance-optimization"
            },
            {
                id: 6,
                title: "Understanding Git and Version Control",
                excerpt: "Master Git version control system with this comprehensive guide. Learn branching, merging, and collaboration workflows.",
                date: "2024-01-03",
                readTime: "9 min read",
                image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=200&fit=crop",
                slug: "git-version-control-guide"
            }
        ];

        const startIndex = (page - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        
        return allPosts.slice(startIndex, endIndex);
    }

    // Render posts to the DOM
    renderPosts(posts) {
        const postsGrid = document.getElementById('posts-grid');
        
        posts.forEach(post => {
            const postCard = this.createPostCard(post);
            postsGrid.appendChild(postCard);
        });
    }

    // Create a post card element
    createPostCard(post) {
        const card = document.createElement('article');
        card.className = 'post-card fade-in';
        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy">
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span class="post-date">${this.formatDate(post.date)}</span>
                    <span class="post-read-time">${post.readTime}</span>
                </div>
            </div>
        `;

        // Add click event to navigate to full post
        card.addEventListener('click', () => {
            // For now, just log the post slug
            // In a real application, you would navigate to the full post
            console.log('Navigate to post:', post.slug);
            // window.location.href = `/posts/${post.slug}`;
        });

        return card;
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Setup scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Observer for new posts
        this.observer = observer;
    }

    // Setup load more functionality
    setupLoadMore() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.loadPosts();
            });
        }
    }

    // Observe new elements for animations
    observeNewElements() {
        document.querySelectorAll('.post-card:not(.visible)').forEach(el => {
            this.observer.observe(el);
        });
    }

    // Setup search functionality
    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', utils.debounce(() => {
                this.searchQuery = searchInput.value.toLowerCase().trim();
                this.filterPosts();
            }, 300));
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.searchQuery = searchInput.value.toLowerCase().trim();
                this.filterPosts();
            });
        }
    }

    // Setup category filtering
    setupCategoryFilter() {
        const categoryFilter = document.getElementById('category-filter');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.selectedCategory = e.target.value;
                this.filterPosts();
            });
        }
    }

    // Filter posts based on search and category
    filterPosts() {
        const postsGrid = document.getElementById('posts-grid');
        postsGrid.innerHTML = '';
        
        let filteredPosts = this.allPosts;
        
        // Apply search filter
        if (this.searchQuery) {
            filteredPosts = filteredPosts.filter(post => 
                post.title.toLowerCase().includes(this.searchQuery) ||
                post.excerpt.toLowerCase().includes(this.searchQuery)
            );
        }
        
        // Apply category filter
        if (this.selectedCategory !== 'all') {
            filteredPosts = filteredPosts.filter(post => 
                post.category === this.selectedCategory
            );
        }
        
        // Display filtered posts
        filteredPosts.forEach(post => {
            const postCard = this.createPostCard(post);
            postsGrid.appendChild(postCard);
        });
        
        // Show "no results" message if no posts found
        if (filteredPosts.length === 0) {
            postsGrid.innerHTML = '<div class="no-results">No posts found matching your criteria.</div>';
        }
    }

    // Load featured post
    async loadFeaturedPost() {
        const featuredPostContainer = document.getElementById('featured-post');
        
        // Sample featured post - use the first post
        const featuredPost = {
            id: 1,
            title: "Getting Started with Modern Web Development",
            excerpt: "Learn the fundamentals of modern web development with HTML5, CSS3, and JavaScript ES6+. This comprehensive guide covers everything you need to know to build modern, responsive web applications.",
            date: "2024-01-15",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop",
            slug: "getting-started-modern-web-development",
            category: "Web Development"
        };
        
        const featuredCard = document.createElement('article');
        featuredCard.className = 'post-card fade-in';
        featuredCard.innerHTML = `
            <img src="${featuredPost.image}" alt="${featuredPost.title}" class="post-image" loading="lazy">
            <div class="post-content">
                <span class="category-badge">${featuredPost.category}</span>
                <h3 class="post-title">${featuredPost.title}</h3>
                <p class="post-excerpt">${featuredPost.excerpt}</p>
                <div class="post-meta">
                    <span class="post-date">${this.formatDate(featuredPost.date)}</span>
                    <span class="post-read-time">${featuredPost.readTime}</span>
                </div>
            </div>
        `;
        
        featuredCard.addEventListener('click', () => {
            console.log('Navigate to featured post:', featuredPost.slug);
        });
        
        featuredPostContainer.appendChild(featuredCard);
    }

    // Load topics
    loadTopics() {
        const topicsGrid = document.getElementById('topics-grid');
        
        const topics = [
            { name: 'Web Development', description: 'Frontend and backend development', count: 15 },
            { name: 'JavaScript', description: 'Modern JavaScript techniques', count: 12 },
            { name: 'Performance', description: 'Optimization and best practices', count: 8 },
            { name: 'React', description: 'Component-based development', count: 10 }
        ];
        
        topics.forEach(topic => {
            const topicCard = document.createElement('div');
            topicCard.className = 'topic-card fade-in';
            topicCard.innerHTML = `
                <h3>${topic.name}</h3>
                <p>${topic.description}</p>
                <span class="topic-count">${topic.count} posts</span>
            `;
            
            topicCard.addEventListener('click', () => {
                // Filter posts by topic
                const categoryFilter = document.getElementById('category-filter');
                if (categoryFilter) {
                    categoryFilter.value = topic.name;
                    this.selectedCategory = topic.name;
                    this.filterPosts();
                    
                    // Scroll to posts section
                    const postsSection = document.getElementById('posts');
                    if (postsSection) {
                        postsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
            
            topicsGrid.appendChild(topicCard);
        });
    }

    // Load tags
    loadTags() {
        const tagsCloud = document.getElementById('tags-cloud');
        
        const tags = [
            { name: 'HTML5', popularity: 'popular' },
            { name: 'CSS3', popularity: 'very-popular' },
            { name: 'JavaScript', popularity: 'very-popular' },
            { name: 'React', popularity: 'popular' },
            { name: 'Node.js', popularity: 'normal' },
            { name: 'MongoDB', popularity: 'normal' },
            { name: 'Express', popularity: 'normal' },
            { name: 'Git', popularity: 'popular' },
            { name: 'Webpack', popularity: 'normal' },
            { name: 'API', popularity: 'popular' },
            { name: 'Performance', popularity: 'normal' },
            { name: 'Responsive', popularity: 'popular' }
        ];
        
        tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = `tag ${tag.popularity}`;
            tagElement.textContent = tag.name;
            
            tagElement.addEventListener('click', () => {
                // Search for posts with this tag
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.value = tag.name;
                    this.searchQuery = tag.name.toLowerCase();
                    this.filterPosts();
                    
                    // Scroll to posts section
                    const postsSection = document.getElementById('posts');
                    if (postsSection) {
                        postsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
            
            tagsCloud.appendChild(tagElement);
        });
    }

    // Enhanced fetchPosts with categories and tags
    async fetchPostsEnhanced(page) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const allPosts = [
            {
                id: 1,
                title: "Getting Started with Modern Web Development",
                excerpt: "Learn the fundamentals of modern web development with HTML5, CSS3, and JavaScript ES6+. This comprehensive guide covers everything you need to know.",
                date: "2024-01-15",
                readTime: "5 min read",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
                slug: "getting-started-modern-web-development",
                category: "Web Development",
                tags: ["HTML5", "CSS3", "JavaScript"]
            },
            {
                id: 2,
                title: "Building Responsive Layouts with CSS Grid",
                excerpt: "Master CSS Grid to create beautiful, responsive layouts that work on all devices. Learn advanced techniques and best practices.",
                date: "2024-01-12",
                readTime: "8 min read",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
                slug: "css-grid-responsive-layouts",
                category: "Web Development",
                tags: ["CSS3", "Responsive", "Layout"]
            },
            {
                id: 3,
                title: "JavaScript Async/Await: A Complete Guide",
                excerpt: "Understanding asynchronous JavaScript with async/await. Learn how to write cleaner, more readable asynchronous code.",
                date: "2024-01-10",
                readTime: "6 min read",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
                slug: "javascript-async-await-guide",
                category: "JavaScript",
                tags: ["JavaScript", "Async", "API"]
            },
            {
                id: 4,
                title: "Introduction to React Hooks",
                excerpt: "Discover the power of React Hooks and how they can simplify your component logic. Learn useState, useEffect, and custom hooks.",
                date: "2024-01-08",
                readTime: "10 min read",
                image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
                slug: "react-hooks-introduction",
                category: "React",
                tags: ["React", "Hooks", "JavaScript"]
            },
            {
                id: 5,
                title: "Web Performance Optimization Tips",
                excerpt: "Learn practical techniques to optimize your website's performance. From image optimization to lazy loading and caching strategies.",
                date: "2024-01-05",
                readTime: "7 min read",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
                slug: "web-performance-optimization",
                category: "Performance",
                tags: ["Performance", "Optimization", "Caching"]
            },
            {
                id: 6,
                title: "Understanding Git and Version Control",
                excerpt: "Master Git version control system with this comprehensive guide. Learn branching, merging, and collaboration workflows.",
                date: "2024-01-03",
                readTime: "9 min read",
                image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=200&fit=crop",
                slug: "git-version-control-guide",
                category: "Web Development",
                tags: ["Git", "Version Control", "Collaboration"]
            }
        ];
        
        // Store all posts for filtering
        this.allPosts = allPosts;
        
        const startIndex = (page - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        
        return allPosts.slice(startIndex, endIndex);
    }
}

// Utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Smooth scroll to element
    scrollTo(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize the blog app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogApp();
});

// Handle window resize
window.addEventListener('resize', utils.debounce(() => {
    // Handle any resize-specific logic here
    console.log('Window resized');
}, 250));

// Handle scroll events
window.addEventListener('scroll', utils.debounce(() => {
    // Handle scroll-specific logic here
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // You can add a reading progress bar here
    // updateReadingProgress(scrollPercent);
}, 10));
