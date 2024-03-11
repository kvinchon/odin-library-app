const container = document.querySelector('.container');
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.addBookToLibrary = function () {
  myLibrary.push(this);
};

Book.prototype.toggleStatus = function () {
  this.read = !this.read;
};

function displayLibrary() {
  container.innerHTML = '';

  myLibrary.forEach((book, index) => {
    // display book as a new card
    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const read = document.createElement('div');
    const readStatusBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    const bookElement = document.createElement('div');

    title.textContent = book.title;
    author.textContent = `By: ${book.author}`;
    pages.textContent = `${book.pages} pages`;
    read.textContent = book.read ? 'Read' : 'Not read yet';
    readStatusBtn.textContent = 'Change Status';
    removeBtn.textContent = 'Remove Book';
    readStatusBtn.setAttribute('data', index);
    removeBtn.setAttribute('data', index);

    readStatusBtn.addEventListener('click', () => {
      // toggle read status
      const bookIndex = parseInt(readStatusBtn.getAttribute('data'));
      myLibrary[bookIndex].toggleStatus();
      displayLibrary();
    });

    removeBtn.addEventListener('click', () => {
      // remove book from library
      const bookIndex = parseInt(removeBtn.getAttribute('data'));
      myLibrary.splice(bookIndex, 1);
      displayLibrary();
    });

    bookElement.appendChild(title);
    bookElement.appendChild(author);
    bookElement.appendChild(pages);
    bookElement.appendChild(read);
    bookElement.appendChild(readStatusBtn);
    bookElement.appendChild(removeBtn);
    bookElement.classList.add('book');

    container.appendChild(bookElement);
  });
}

const newBtn = document.querySelector('#newBtn');
const newForm = document.querySelector('#newForm');

newBtn.addEventListener('click', () => {
  newForm.removeAttribute('hidden');
  newBtn.setAttribute('hidden', true);
});

newForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // add book to library
  const myBook = new Book(
    newForm.title.value,
    newForm.author.value,
    newForm.pages.value,
    newForm.read.checked
  );

  myBook.addBookToLibrary();

  newForm.reset();
  newForm.setAttribute('hidden', true);
  newBtn.removeAttribute('hidden');

  displayLibrary();
});

const book1 = new Book('Yoga Training', 'Marie', 450, true);
const book2 = new Book('My Awesome Book', 'Bob', 480, false);
const book3 = new Book('Super Woman', 'Léa', 500, true);
const book4 = new Book('JS for Beginners', 'Michael', 320, false);
const book5 = new Book('Cooking Recipes', 'Kevin', 350, true);

book1.addBookToLibrary();
book2.addBookToLibrary();
book3.addBookToLibrary();
book4.addBookToLibrary();
book5.addBookToLibrary();

displayLibrary();
