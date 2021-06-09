const UNCOMPLETED_LIST_BOOK_ID = "books";
const COMPLETED_LIST_BOOK_ID = "completed-books";
const BOOK_ITEMID = "itemId";
document.getElementById('hitung').innerText = 0;

function addBook(cls) {
    const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;

    const book = makeBook(title, author, year, cls, false);
    const bookObject = composeBookObject(title, author, year, cls = "judul", false);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    cek_hitung();
    uncompletedBookList.append(book);
    updateDataToStorage();
}

function makeBook(title, author, year, cls = "judul", isCompleted) {

    const textTitle = document.createElement("h5");
    textTitle.classList.add(cls);
    textTitle.innerText = title;

    const textAuthor = document.createElement("p");
    textAuthor.classList.add("author");
    textAuthor.innerText = author;

    const textYear = document.createElement("p");
    textYear.classList.add("year");
    textYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement("div");
    container.classList.add("container", "mb-4");
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton());
    }

    return container;
}

function createButton(btnColorClass, btnIconClass, btnMargin, eventListener) {
    const button = document.createElement("button");
    button.classList.add("btn", btnColorClass, "fa", btnIconClass, btnMargin);
    button.addEventListener("click", function(event) {
        eventListener(event);
    });
    return button;
}

function addBookToCompleted(bookElement) {
    const bookCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const bookTitle = bookElement.querySelector(".inner > h5").innerText;
    const bookAuthor = bookElement.querySelector(".inner > p").innerText;
    const bookYear = bookElement.getElementsByTagName("p")[1].innerHTML;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, cls = "judul", true);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    bookCompleted.append(newBook);
    bookElement.remove();
    cek_hitung();
    updateDataToStorage();
}

function createCheckButton() {
    return createButton("btn-info", "fa-check", "mb-0", function(event) {
        addBookToCompleted(event.target.parentElement);
    });
}

function removeBookFromCompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    cek_hitung();
    updateDataToStorage();
}

function createTrashButton() {
    return createButton("btn-danger", "fa-trash", "ml-2", function(event) {
        removeBookFromCompleted(event.target.parentElement);
    });
}

function undoBookFromCompleted(bookElement) {
    const bookUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const bookTitle = bookElement.querySelector(".inner > h5").innerText;
    const bookAuthor = bookElement.querySelector(".inner > p").innerText;
    const bookYear = bookElement.getElementsByTagName("p")[1].innerHTML;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, cls = "judul", false);

    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    cek_hitung();
    bookUncompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function createUndoButton() {
    return createButton("btn-warning", "fa-undo", "mr-0", function(event) {
        undoBookFromCompleted(event.target.parentElement);
    });
}