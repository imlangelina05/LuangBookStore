const books = [
  {
    title: "The Great Novel",
    category: "novel",
    price: 15,
    image: "https://picsum.photos/200/300?1",
  },
  {
    title: "Modern JavaScript",
    category: "technology",
    price: 25,
    image: "https://picsum.photos/200/300?2",
  },
  {
    title: "Business Strategy",
    category: "business",
    price: 22,
    image: "https://picsum.photos/200/300?3",
  },
  {
    title: "World History",
    category: "history",
    price: 18,
    image: "https://picsum.photos/200/300?4",
  },
  {
    title: "Healthy Living Guide",
    category: "health",
    price: 20,
    image: "https://picsum.photos/200/300?5",
  },
  {
    title: "Political Systems",
    category: "politics",
    price: 24,
    image: "https://picsum.photos/200/300?6",
  },
  {
    title: "Art & Creativity",
    category: "art",
    price: 19,
    image: "https://picsum.photos/200/300?7",
  },
  {
    title: "Cultural Studies",
    category: "culture",
    price: 17,
    image: "https://picsum.photos/200/300?8",
  },
  {
    title: "Social Science Basics",
    category: "social",
    price: 16,
    image: "https://picsum.photos/200/300?9",
  },
  {
    title: "Religious Philosophy",
    category: "religion",
    price: 21,
    image: "https://picsum.photos/200/300?10",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cart-count").innerText = cart.length;

function displayBooks(filteredBooks) {
  const container = document.getElementById("book-container");
  let html = "";

  filteredBooks.forEach((book) => {
    html += `
            <div class="book-card">
                <img src="${book.image}" loading="lazy" width="200" height="300">
                <h3>${book.title}</h3>
                <p>Category: ${book.category}</p>
                <p>$${book.price}</p>
                <button data-title="${book.title}" data-price="${book.price}">
                    Add to Cart
                </button>
            </div>
        `;
  });

  container.innerHTML = html;
}

function filterBooks(category) {
  if (category === "all") {
    displayBooks(books);
  } else {
    displayBooks(books.filter((book) => book.category === category));
  }
}

function addToCart(title, price) {
  cart.push({ title, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cart-count").innerText = cart.length;
}

document
  .getElementById("book-container")
  .addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const title = e.target.dataset.title;
      const price = parseFloat(e.target.dataset.price);
      addToCart(title, price);
    }
  });

function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const phoneNumber = "6281244785528"; // Replace with your WhatsApp number

  let message = "Hello, I would like to order the following books:%0A%0A";
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.title} - $${item.price}%0A`;
    total += item.price;
  });

  message += `%0A💰 Total: $${total}%0A`;
  message += "%0AThank you.";

  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}

displayBooks(books);
