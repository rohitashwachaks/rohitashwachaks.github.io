// Intersection Observer for fade-in animations on scroll
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add 'hidden' class to sections and cards
document.querySelectorAll('.section, .card').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrollPos = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundPositionY = `${scrollPos * 0.5}px`;
  }
});

// Modal functionality
const modal = document.getElementById('modal');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.querySelector('.modal-body');

// Dummy content for dynamic modals
const modalContent = {
  resume: `
    <h2>Resume</h2>
    <p>This is a placeholder resume content. Replace with your own detailed resume or embed a PDF viewer here.</p>
  `,
  project1: `
    <h2>Project Title 1</h2>
    <p>Detailed information about Project 1. Include features, technologies used, challenges faced, and any links to live demos or case studies.</p>
    <a href="https://github.com/yourusername/project1" target="_blank" class="btn">View Code</a>
  `,
  project2: `
    <h2>Project Title 2</h2>
    <p>Detailed information about Project 2. This area can include images, links, and more in-depth descriptions of your work.</p>
    <a href="https://github.com/yourusername/project2" target="_blank" class="btn">View Code</a>
  `
};

// Open modal with given content key
function openModal(key) {
  if (modalContent[key]) {
    modalBody.innerHTML = modalContent[key];
    modal.style.display = 'block';
  }
}

// Close modal when clicking on close button or outside the modal content
modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Event listener for "View Resume" button
document.getElementById('viewResumeBtn').addEventListener('click', () => {
  openModal('resume');
});

// Event listeners for project detail buttons
document.querySelectorAll('.details-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-project');
    openModal(key);
  });
});

// Live Widget: Rotate through placeholder travel quotes
const quotes = [
  "Travel far, travel wide, and always be curious.",
  "Adventure awaits those who dare to explore.",
  "The world is full of wonders waiting to be discovered.",
  "Keep exploring, keep dreaming, keep coding."
];
const liveWidget = document.getElementById('liveWidget');
let quoteIndex = 0;

function updateLiveWidget() {
  liveWidget.textContent = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
}

// Update live widget every 5 seconds
updateLiveWidget();
setInterval(updateLiveWidget, 5000);

/* --- Instagram API Integration --- */
// Replace 'YOUR_INSTAGRAM_ACCESS_TOKEN' with your actual access token
function loadInstagramFeed() {
  const token = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
  const endpoint = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=${token}`;

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const feed = document.getElementById('instagramFeed');
      // Clear any existing content
      feed.innerHTML = "";
      if (data.data && Array.isArray(data.data)) {
        data.data.forEach(post => {
          const postElement = document.createElement('a');
          postElement.href = post.permalink;
          postElement.target = '_blank';
          postElement.classList.add('instagram-post');

          const img = document.createElement('img');
          img.src = post.media_url;
          img.alt = post.caption ? post.caption.substring(0, 100) : 'Instagram post';

          postElement.appendChild(img);
          feed.appendChild(postElement);
        });
      } else {
        feed.innerHTML = '<p>Unable to load Instagram posts.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading Instagram feed:', error);
      document.getElementById('instagramFeed').innerHTML = '<p>Error loading Instagram posts.</p>';
    });
}

// Call the function to load Instagram posts after the page loads
document.addEventListener('DOMContentLoaded', loadInstagramFeed);