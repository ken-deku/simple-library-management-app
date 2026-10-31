const openModalBtn = document.querySelector(".add-book-btn");
const modalForm = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-modal-btn");
const submitFormBtn = document.querySelector(".submit-modal-btn");
const form = document.querySelector(".add-book-form form");
const booksContainer = document.querySelector(".books-container");
const bookHTML = document.querySelector(".book");
const buttonsContainer = document.querySelector(".buttons-container");

class Book {
  constructor(title, author, pages, read, id = crypto.randomUUID()) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

const library = loadLibrary();

displayBook();

function saveLibrary() {
  localStorage.setItem("library", JSON.stringify(library));
}

function loadLibrary() {
  const saved = localStorage.getItem("library");
  if (!saved) return [];

  const plainBooks = JSON.parse(saved);
  return plainBooks.map(
    (b) => new Book(b.title, b.author, b.pages, b.read, b.id),
  );
  localStorage.setItem("library", JSON.stringify(library));
}

function addBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  console.log(book);
  library.push(book);
  saveLibrary();
  return library;
}

function displayBook() {
  booksContainer.innerHTML = "";
  library.forEach((book) => {
    //elements for the HTML
    const div = document.createElement("div");
    const bookTitle = document.createElement("h2");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("p");
    const bookId = document.createElement("p");
    const bookButtonContainer = document.createElement("div");
    const isReadBtn = document.createElement("button");
    const deleteBookBtn = document.createElement("button");
    const deleteI = document.createElement("i");
    const readI = document.createElement("i");

    //contejnts of the book from the form
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = `Pages: ${book.pages}`;
    if (book.read === true) {
      bookRead.textContent = "read";
    } else {
      bookRead.textContent = "unread";
    }

    bookId.textContent = `Book ID: ${book.id}`;
    div.dataset.id = book.id;

    // elements styling classes / ids
    bookTitle.classList.add("book-title");
    bookAuthor.classList.add("book-author");

    bookPages.classList.add("book-pages");
    bookRead.classList.add("book-status");

    bookId.classList.add("book-id");
    div.classList.add("book");

    readI.classList.add("fa-brands", "fa-readme");
    deleteI.classList.add("fa-solid", "fa-trash-can");

    isReadBtn.classList.add("read-book-btn", "btn");
    deleteBookBtn.classList.add("delete-book-btn", "btn");

    bookButtonContainer.classList.add("buttons-container");

    //appending elements to html page

    deleteBookBtn.append(deleteI);
    isReadBtn.append(readI);

    bookButtonContainer.append(isReadBtn, deleteBookBtn);

    div.append(
      bookTitle,
      bookAuthor,
      bookPages,
      bookRead,
      bookId,
      bookButtonContainer,
    );

    booksContainer.append(div);
  });
}

openModalBtn.addEventListener("click", () => {
  modalForm.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modalForm.classList.add("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#status").checked;

  addBook(title, author, pages, read);
  displayBook();
  form.reset();
  modalForm.classList.add("hidden");
});

booksContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".book");
  if (!card) return;

  const id = card.dataset.id;

  if (e.target.closest(".read-book-btn")) {
    const book = library.find((b) => b.id === card.dataset.id);
    book.toggleRead();
    displayBook();
  } else if (e.target.closest(".delete-book-btn")) {
    deleteBook(id);
  }

  saveLibrary();
  displayBook();
});

function deleteBook(id) {
  const foundBookIndex = library.findIndex((b) => b.id === id);
  if (foundBookIndex === -1) return;

  library.splice(foundBookIndex, 1);
}
