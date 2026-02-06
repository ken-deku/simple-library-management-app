// DOM references handlers
const addBookBtn = document.querySelector(".add-book-btn");
const modalForm = document.querySelector(".modal");
const closeFormBtn = document.querySelector(".close-modal-btn");
const submitModalBtn = document.querySelector(".submit-modal-btn");
const form = document.querySelector("#new-book-form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const cards = document.querySelector(".cards");
const readBtn = document.querySelector(".read-btn");
const libraryContainer = document.querySelector(".library");

// Default Library storage with sample data
const myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 295,
    readStatus: "Finished",
    id: "c45d7876-4869-4b80-a607-1a78338d1905",
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
    readStatus: "Currently Reading",
    id: "a91e6d44-8c4a-4f91-bfc0-3a6c0cbdc812",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    pages: 464,
    readStatus: "Will Read",
    id: "f3b2c3ad-2c4b-4a77-9d23-9c8e6d8e1a44",
  },
];

// Generate the default array of books
myLibrary.forEach((book) => {
  createCards(book);
});

// prototype Book constructor
function Book(title, author, pages, readStatus, id = crypto.randomUUID()) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = id;
}

// Get form data and add new book to library
function addBookToLibrary() {
  const usersTitle = title.value;
  const authorsValue = author.value;
  const pagesValue = pages.value;
  const bookID = crypto.randomUUID();
  const readStatus = document.querySelector(
    'input[name="book-status"]:checked',
  )?.value;

  const book = new Book(
    usersTitle,
    authorsValue,
    pagesValue,
    readStatus,
    bookID,
  );

  myLibrary.push(book);
  return book;
}

// Create and render a book card to the DOM for each form filled
function createCards(book) {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book-card", "card");

  const bookTitle = document.createElement("h1");
  bookTitle.textContent = book.title;

  const bookAuthor = document.createElement("h2");
  bookAuthor.textContent = `by ${book.author}`;

  const bookPages = document.createElement("p");
  bookPages.textContent = `Pages: ${book.pages}`;

  const bookStatus = document.createElement("p");
  bookStatus.textContent = `Status: ${book.readStatus}`;

  const bookID = document.createElement("p");
  bookID.textContent = `Book ID:${book.id} `;
  bookID.classList.add("book-id");

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  // Cycles through read statuses
  const readBtn = document.createElement("button");
  readBtn.classList.add("read-btn", "btn");
  readBtn.innerHTML = `<span class="fa-regular fa-bookmark"></span>`;
  readBtn.addEventListener("click", () => {
    if (book.readStatus === "Will Read") {
      book.readStatus = "Currently Reading";
    } else if (book.readStatus === "Currently Reading") {
      book.readStatus = "Finished";
    } else {
      book.readStatus = "Will Read";
    }
    bookStatus.textContent = `Status: ${book.readStatus}`;
  });

  // Delete button - removes from DOM and array
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn", "btn");
  deleteBtn.innerHTML = `<span class="fa-regular fa-trash-can"></span>`;
  deleteBtn.addEventListener("click", () => {
    bookDiv.classList.add("fade-out");
    setTimeout(() => bookDiv.remove(), 300);
    const index = myLibrary.findIndex((b) => b.id === book.id);
    if (index !== -1) myLibrary.splice(index, 1);
  });

  actionsDiv.appendChild(readBtn);
  actionsDiv.appendChild(deleteBtn);

  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(bookPages);
  bookDiv.appendChild(bookStatus);
  bookDiv.appendChild(bookID);
  bookDiv.appendChild(actionsDiv);

  libraryContainer.appendChild(bookDiv);
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newBook = addBookToLibrary();
  createCards(newBook);
  form.reset();
  modalForm.classList.add("hidden");
});

// Toggle modal visibility
addBookBtn.addEventListener("click", () => {
  modalForm.classList.toggle("hidden");
});

// Close modal
closeFormBtn.addEventListener("click", () => {
  modalForm.classList.add("hidden");
});

function findBookByTitle() {
  const userSearch = prompt("Name of book please");
  const foundBook = myLibrary.find((book) => book.title === userSearch);

  if (foundBook) {
    console.log(foundBook);
    return foundBook;
  } else {
    console.log(`Unable to find what you searched: ${userSearch}`);
    return;
  }
}
