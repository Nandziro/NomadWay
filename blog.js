// Select elements
const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');

// Load posts from localStorage
let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

// Render posts
function renderPosts() {
  postsContainer.innerHTML = '';
  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <div class="post-meta">
        By ${post.author} on ${post.date}
      </div>
      <button onclick="editPost(${index})">Edit</button>
      <button onclick="deletePost(${index})">Delete</button>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Add new post
postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('postTitle').value;
  const content = document.getElementById('postContent').value;
  const author = document.getElementById('postAuthor').value;

  const newPost = {
    title,
    content,
    author,
    date: new Date().toLocaleDateString(),
  };

  posts.push(newPost);
  localStorage.setItem('blogPosts', JSON.stringify(posts));
  postForm.reset();
  renderPosts();
});

// Edit post
function editPost(index) {
  const post = posts[index];
  const newTitle = prompt('Edit title:', post.title);
  const newContent = prompt('Edit content:', post.content);
  const newAuthor = prompt('Edit author:', post.author);

  if (newTitle && newContent && newAuthor) {
    posts[index] = { ...post, title: newTitle, content: newContent, author: newAuthor };
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    renderPosts();
  }
}

// Delete post
function deletePost(index) {
  if (confirm('Are you sure you want to delete this post?')) {
    posts.splice(index, 1);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    renderPosts();
  }
}

// Initialize
renderPosts();

// LOGIN
document.getElementById('loginRegisterButton').addEventListener('click', () => {
    window.location.href = 'login.html';
});