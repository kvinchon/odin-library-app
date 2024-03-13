const container = document.querySelector('.container');

class Library {
  constructor(books) {
    this.books = books;
  }

  addBook(book) {
    this.books.push(book);
  }

  render() {
    container.innerHTML = '';

    this.books.forEach((book, index) => {
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
        this.books[bookIndex].toggleStatus();
        this.render();
      });

      removeBtn.addEventListener('click', () => {
        // remove book from library
        const bookIndex = parseInt(removeBtn.getAttribute('data'));
        this.books.splice(bookIndex, 1);
        this.render();
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
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleStatus() {
    this.read = !this.read;
  }
}

const book1 = new Book('Yoga Training', 'Marie', 450, true);
const book2 = new Book('My Awesome Book', 'Bob', 480, false);
const book3 = new Book('Super Woman', 'Léa', 500, true);
const book4 = new Book('JS for Beginners', 'Michael', 320, false);
const book5 = new Book('Cooking Recipes', 'Kevin', 350, true);
const books = [book1, book2, book3, book4, book5];

const myLibrary = new Library(books);

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

  myLibrary.addBook(myBook);

  newForm.reset();
  newForm.setAttribute('hidden', true);
  newBtn.removeAttribute('hidden');

  myLibrary.render();
});

myLibrary.render();
