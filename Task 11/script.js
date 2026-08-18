const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic",
    year: 1925,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    description: "A story of ambition, love, and tragedy set in the roaring 1920s on Long Island."
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Classic",
    year: 1813,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
    description: "A classic romance exploring the relationship between Elizabeth Bennet and Mr. Darcy."
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    year: 1949,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    description: "A chilling dystopian novel about totalitarianism, surveillance, and thought control."
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    year: 1988,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    description: "An inspiring fable about following your dreams and listening to your heart."
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    year: 1937,
    image: "https://images.unsplash.com/photo-1629992101753-56d196c8aab5?w=400&q=80",
    description: "Bilbo Baggins sets off on an unexpected journey to help reclaim a lost dwarf kingdom."
  },
  {
    id: 6,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    year: 2018,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80",
    description: "Practical strategies for forming good habits, breaking bad ones, and mastering small behaviors."
  },
  {
    id: 7,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Classic",
    year: 1960,
    image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&q=80",
    description: "A novel taking on racial injustice and moral growth in a small Southern town."
  },
  {
    id: 8,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    year: 2020,
    image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=400&q=80",
    description: "Short stories exploring how behavior, emotions, and psychology affect financial decisions."
  },
  {
    id: 9,
    title: "Harry Potter & The Sorcerer's Stone",
    author: "J.K. Rowling",
    category: "Fantasy",
    year: 1997,
    image: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400&q=80",
    description: "Harry Potter discovers his magical heritage on his 11th birthday and attends Hogwarts."
  },
  {
    id: 10,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    year: 2000,
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&q=80",
    description: "Personal finance principles contrasting the financial mindsets of two father figures."
  }
];

// LocalStorage helpers to get & save book IDs
function getSavedBooks() {
  const saved = localStorage.getItem("my_books");
  return saved ? JSON.parse(saved) : [];
}

function saveBooksToStorage(savedArray) {
  localStorage.setItem("my_books", JSON.stringify(savedArray));
}

// Render main collection grid based on search and category filter
function renderBooks() {
  const grid = document.getElementById("bookGrid");
  const noResults = document.getElementById("noResults");
  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const savedIds = getSavedBooks();

  const filtered = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search);
    const matchesCategory = category === "All" || book.category === category;
    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  grid.innerHTML = filtered.map(book => {
    const isSaved = savedIds.includes(book.id);
    return `
      <div class="book-card">
        <img src="${book.image}" alt="${book.title}">
        <div class="card-body">
          <span class="category-tag">${book.category}</span>
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">${book.author}</p>
          <div class="card-actions">
            <button class="btn btn-outline" onclick="openModal(${book.id})">View</button>
            ${isSaved
        ? `<button class="btn btn-saved" disabled>✓ Saved</button>`
        : `<button class="btn btn-primary" onclick="addBook(${book.id})">+ Save</button>`
      }
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderMyBooks() {
  const grid = document.getElementById("myBooksGrid");
  const emptyMsg = document.getElementById("emptyMyBooks");
  const savedIds = getSavedBooks();

  const savedList = books.filter(book => savedIds.includes(book.id));
  document.getElementById("savedCount").textContent = savedIds.length;

  if (savedList.length === 0) {
    grid.innerHTML = "";
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";
  grid.innerHTML = savedList.map(book => `
    <div class="book-card">
      <img src="${book.image}" alt="${book.title}">
      <div class="card-body">
        <span class="category-tag">${book.category}</span>
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <div class="card-actions">
          <button class="btn btn-outline" onclick="openModal(${book.id})">View</button>
          <button class="btn btn-remove" onclick="removeBook(${book.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join("");
}

function addBook(id) {
  const saved = getSavedBooks();
  if (!saved.includes(id)) {
    saved.push(id);
    saveBooksToStorage(saved);
    renderBooks();
    renderMyBooks();
    showToast("✓ Book added to My Books");
  }
}

function removeBook(id) {
  let saved = getSavedBooks();
  saved = saved.filter(savedId => savedId !== id);
  saveBooksToStorage(saved);
  renderBooks();
  renderMyBooks();
  showToast("✓ Book removed from My Books");

  const modal = document.getElementById("bookModal");
  if (modal.classList.contains("open")) {
    const saveBtn = document.getElementById("modalSaveBtn");
    saveBtn.className = "btn btn-primary";
    saveBtn.textContent = "+ Save to My Books";
    saveBtn.disabled = false;
    saveBtn.onclick = () => addBook(id);
  }
}

function openModal(id) {
  const book = books.find(b => b.id === id);
  if (!book) return;

  const savedIds = getSavedBooks();
  const isSaved = savedIds.includes(book.id);

  document.getElementById("modalCover").src = book.image;
  document.getElementById("modalTitle").textContent = book.title;
  document.getElementById("modalAuthor").textContent = `By ${book.author}`;
  document.getElementById("modalCategory").textContent = book.category;
  document.getElementById("modalYear").textContent = book.year;
  document.getElementById("modalDescription").textContent = book.description;

  const saveBtn = document.getElementById("modalSaveBtn");
  if (isSaved) {
    saveBtn.className = "btn btn-saved";
    saveBtn.textContent = "✓ Saved";
    saveBtn.disabled = true;
    saveBtn.onclick = null;
  } else {
    saveBtn.className = "btn btn-primary";
    saveBtn.textContent = "+ Save to My Books";
    saveBtn.disabled = false;
    saveBtn.onclick = () => {
      addBook(book.id);
      saveBtn.className = "btn btn-saved";
      saveBtn.textContent = "✓ Saved";
      saveBtn.disabled = true;
    };
  }

  document.getElementById("bookModal").classList.add("open");
}

function closeModal() {
  document.getElementById("bookModal").classList.remove("open");
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

document.addEventListener("DOMContentLoaded", () => {
  renderBooks();
  renderMyBooks();

  document.getElementById("searchInput").addEventListener("input", renderBooks);
  document.getElementById("categoryFilter").addEventListener("change", renderBooks);
  document.getElementById("closeModal").addEventListener("click", closeModal);

  document.getElementById("bookModal").addEventListener("click", (e) => {
    if (e.target.id === "bookModal") closeModal();
  });
});
