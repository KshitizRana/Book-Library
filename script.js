// Features
// Implement a search bar to filter books by title or author
// Implement a sort feature to list books in Alphabetical order based on their title, date of release (publishedDate)
let page = 1;
async function dataFetch(page) {
  try {
    const response = await fetch(
      `https://api.freeapi.app/api/v1/public/books?page=${page}&limit=10`
    );
    const library = await response.json();
    return library;
  } catch (error) {
    console.log(error);
  }
}

const lib = await dataFetch(page);
let contanier = document.querySelector(".container");
function renderCards(books) {
  contanier.innerHTML = "";
  books.forEach((book) => {
    let card = document.createElement("div");
    card.classList = "bookcard";
    const bookVolume = book.volumeInfo;
    card.innerHTML = `
               <a href="${bookVolume.infoLink}" target="blank"> <img src="${bookVolume.imageLinks.smallThumbnail}" alt="" height="180" width="128"  class="thumbnail" id="cardThumbnail" />
          
          <p  class="cardText" id="bookTitle">Title: ${bookVolume.title}</p> 
          <p class="cardText" id="bookAuthor">Author: ${bookVolume.authors}</> 
          <p class="cardText" id="bookPublisher">Publisher: ${bookVolume.publisher}</p>
          <p class="cardText" id="publishedDate">Published Date: ${bookVolume.publishedDate}</p> </a>
      `;
    contanier.appendChild(card);
  });
}
renderCards(lib.data.data);

// toggle functionality
let grid = false;
const gridBtn = document.getElementById("grid");
const bookCard = document.getElementsByClassName("bookcard");
gridBtn.addEventListener("click", () => {
  if (grid) {
    contanier.style.display = "flex";
    // bookCard.style.width = `15%`;
    grid = false;
  } else {
    contanier.style.display = "block";
    // bookCard.style.width = `100%`;
    grid = true;
  }
});

//search
const searchbar = document.getElementById("searchbar");
function search() {
  const value = this.value.toLowerCase().trim();
  let authors = document.querySelectorAll("#bookAuthor");
  let title = document.querySelectorAll("#bookTitle");
  console.log(title);
  console.log(authors);
  if (value in authors || value in title) {
  }
}
// console.log(authors);
searchbar.addEventListener("input", search);

//pagination
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");
prevBtn.addEventListener("click", async () => {
  if (page > 1) {
    page--;
    pageNumber.innerText = page;
    const lib = await dataFetch(page);
    renderCards(lib.data.data);
  }
});
nextBtn.addEventListener("click", async () => {
  page++;
  pageNumber.innerText = page;
  const lib = await dataFetch(page);
  renderCards(lib.data.data);
});

// sort functionality
const sortBtn = document.getElementById("sort");
sortBtn.addEventListener("click", async () => {
  const lib = await dataFetch(page);
  const sorteddata = lib.data.data.sort((a, b) =>
    a.volumeInfo.title > b.volumeInfo.title ? 1 : -1
  );
  renderCards(sorteddata);
});

const sortDateBtn = document.getElementById("sortDate");
sortDateBtn.addEventListener("click", async () => {
  const lib = await dataFetch(page);
  const sorteddata = lib.data.data.sort((a, b) =>
    a.volumeInfo.publishedDate > b.volumeInfo.publishedDate ? 1 : -1
  );
  renderCards(sorteddata);
});
