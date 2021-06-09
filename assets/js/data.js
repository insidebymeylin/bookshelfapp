const STORAGE_KEY = "BOOK_APPS";

let books = [];

function isStorageExist() /* boolean */ {
    if (typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null)
        books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function composeBookObject(title, author, year, cls, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

function findBook(bookId) {
    for (book of books) {
        if (book.id === bookId)
            return book;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0
    for (book of books) {
        if (book.id === bookId)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFromBooks() {
    const bookUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let bookCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    let hitung = 0;
    let hitung_read = 0;
    for (book of books) {
        const newBook = makeBook(book.title, book.author, book.year, book.color, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if (book.isCompleted) {
            bookCompleted.append(newBook);
        } else {
            bookUncompleted.append(newBook);
        }
    }
    cek_hitung();
}

function cek_hitung() {
    let hitung_read = 0;
    let hitung = 0;
    for (book of books) {
        if (book.isCompleted) {
            hitung_read++;
        } else {
            hitung++;
        }
    }

    document.getElementById('hitung_read').innerText = hitung_read;
    document.getElementById('hitung').innerText = hitung;
}