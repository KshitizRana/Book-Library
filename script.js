async function dataFetch() {
  try {
    const response = await fetch("https://api.freeapi.app/api/v1/public/books");
    const library = await response.json();
    const books = library.data.data;
    // console.log(books);
    // console.log(library);
    // console.log(typeof books);
    return books;
  } catch (error) {
    console.log(error);
  }
}

let contanier = document.querySelector(".container");
const booksData = dataFetch();
booksData.then((res) => {
  res.forEach((book) => {
    console.log(book);
    // const bookCompleteData = {}
    let card = document.createElement("div");
    card.classList = "bookcard";
    const bookVolume = book.volumeInfo;
    const bookTitle = bookVolume.title;
    const thumbnail = bookVolume.imageLinks.smallThumbnail;
    const author = bookVolume.authors;
    const publisher = bookVolume
    const publishedDate = bookVolume.publishedDate;
    card.innerHTML = `
              <img src="${thumbnail}" alt="" height="180" width="128" class="thumbnail" id="cardThumbnail" />

        <title id="bookTitle">${bookTitle}</title>
        <p id="bookAuthor">${author}</>
        <p id="bookPublisher">${publisher}</p>
        <p id="publishedDate">${publishedDate}</p>
    `

    contanier.appendChild(card);
  });
});
