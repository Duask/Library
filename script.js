const add = document.querySelector('.add'); 
const access = document.querySelector('.form-access');
const exit = document.querySelector('.exit');
const upload = document.querySelector('.upload');
const library = document.querySelector('.books');
const books = [];
let i = 0;


add.addEventListener('click', () => access.style.display = 'flex');
exit.addEventListener('click', () => access.style.display = 'none');
upload.addEventListener('click', updateLibrary);

updateButtons();


function createBook() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;

    let book = new Book(title, author, pages, read)
    books.push(book);
}


function loadBookCards() {
    library.innerHTML = '';
    for (let i = 0; i < books.length; i++) {
        let bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        bookCard.innerHTML =`<span>X</span>
                            <div style="display:none;">${books[i].index}</div>
                            <h3>${books[i].title}</h3>
                            <p><i>${books[i].author}</i></p>
                            <p>${books[i].pages} pages</p>
                            <button class="book-read ${(books[i].read) ? 'readed' : ''}">${(books[i].read) ? 'Read' : 'Not Read Yet'}</button>`

        library.appendChild(bookCard);
    }
    updateButtons();
}

function updateLibrary() {
    createBook();
    loadBookCards();
}

function updateButtons() {
    const del = document.querySelectorAll('.book-card span');
    for (let i = 0; i < del.length; i++) {
        del[i].addEventListener('click', deleteBook);
    }

    const readed = document.querySelectorAll('.book-read');
    for (let i = 0; i < readed.length; i++) {
        readed[i].addEventListener('click', toggleRead);
    }
}

function Book(title, author, pages, read) {
    this.index = ++i;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function deleteBook(e) {
    console.log(e.target.nextElementSibling.textContent);
    const index = e.target.nextElementSibling.textContent

    for (let i = 0; i < books.length; i++) {
        if (books[i]["index"] == index) {books.splice(i,1)}
    }
    library.removeChild(e.target.parentElement);
}

function toggleRead(e) {
    e.srcElement.classList.toggle('readed');
    if(e.srcElement.classList.contains('readed')){
        e.target.textContent = 'Read';
    } else {
        e.target.textContent = 'Not Read Yet';
    }
}