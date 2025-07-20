document.addEventListener('DOMContentLoaded', () => {
    const posts = [
        {
            id: 1,
            title: "Hello World: The First Post",
            excerpt: "This is the first post on my new blog! I'm excited to share my journey into the world of embedded systems, IoT, and more.",
            date: "2025-07-18",
            category: "Introduction",
            readTime: "3 min read",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=400&fit=crop"
        },
        {
            id: 2,
            title: "Understanding Microcontrollers",
            excerpt: "A deep dive into the architecture and programming of microcontrollers, the brains of embedded systems.",
            date: "2025-07-17",
            category: "Embedded Systems",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
        },
        {
            id: 3,
            title: "Building a Smart Home Hub with Raspberry Pi",
            excerpt: "A step-by-step guide to creating your own smart home automation hub using a Raspberry Pi and open-source software.",
            date: "2025-07-16",
            category: "IoT",
            readTime: "15 min read",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
        }
    ];

    const featuredPostContainer = document.getElementById('featured-post');
    const postsGrid = document.getElementById('posts-grid');

    if (featuredPostContainer && postsGrid) {
        // Render featured post (the first one)
        const featuredPost = posts[0];
        const featuredPostElement = document.createElement('div');
        featuredPostElement.className = 'featured-post';
        featuredPostElement.innerHTML = `
            <div class="featured-post-image">
                <img src="${featuredPost.image}" alt="${featuredPost.title}">
            </div>
            <div class="featured-post-content">
                <span class="post-category">${featuredPost.category}</span>
                <h3 class="post-title">${featuredPost.title}</h3>
                <p class="post-excerpt">${featuredPost.excerpt}</p>
                <div class="post-meta">
                    <span class="post-date">${featuredPost.date}</span>
                    <span class="post-read-time">${featuredPost.readTime}</span>
                </div>
            </div>
        `;
        featuredPostElement.addEventListener('click', () => window.location.href = 'hello-world.html');
        featuredPostContainer.appendChild(featuredPostElement);

        // Render the rest of the posts
        const otherPosts = posts.slice(1);
        otherPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post-card';
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="post-image">
                <div class="post-content">
                    <span class="post-category">${post.category}</span>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                     <div class="post-meta">
                        <span class="post-date">${post.date}</span>
                        <span class="post-read-time">${post.readTime}</span>
                    </div>
                </div>
            `;
            postElement.addEventListener('click', () => alert('This post is coming soon!'));
            postsGrid.appendChild(postElement);
        });
    }
});
