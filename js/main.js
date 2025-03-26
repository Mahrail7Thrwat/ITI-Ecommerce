"use strict";

// Animation for home header
const text = "WHEN YOU NEED";
const speed = 100; // Typing speed in milliseconds
const delay = 1000;
let index = 0;

function typeWriter() {
  if (index < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(() => {
      document.getElementById("typing").innerHTML = "";
      index = 0;
      typeWriter();
    }, delay);
  }
}
window.onload = typeWriter;
//////////////// start cart page////////////////////////////////
// ********************************add to cart functions********************************
// calling all add to cart button in prodducts page and looping over them

updateCartCount();

let addToCart = document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // calling Elements
    let productDiv = button.closest(".product");
    let name = productDiv.querySelector("h1").textContent;
    let subDesc = document.querySelector("h5").textContent;
    let imageSrc = productDiv.querySelector(".image-product img").src;
    let price = productDiv.querySelector("h2").childNodes[1].textContent.trim();

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; //ensures that if there is json has an elmnt called "cartItems" return it and if null it creates an empty array
    cartItems.push({ name, subDesc, imageSrc, price, quantity: "01" }); //pushes product details into cart json object created
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    updateCartCount();
  });
});

function updateCartCount() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let countCart = document.querySelector(".countCart");
  if (countCart) {
    countCart.textContent = cartItems.length;
  }
}
// add to cart in navar function
// ensures that we are in the cart page
if (window.location.pathname.includes("cart.html")) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // gets the container of all products
  let rightSection = document.querySelector(".right-section");

  let bothbuttons = document.querySelector(".buttons-both");

  // gets the container's header
  let header = document.querySelector(".right-row-head");

  // if the cart is empty
  if (cartItems.length === 0) {
    console.log("ur cart is empty");
    header.textContent = "Your cart is Empty";
    header.style.fontSize = "50px";
    bothbuttons.style.display = "none";
  }

  // removes all elemnts in the cart page to replace thm with new elemnts
  document.querySelectorAll(".row-ele").forEach((row) => {
    row.remove();
  });

  // removes all the divider elements in the page
  document.querySelectorAll(".divider").forEach((divider) => {
    divider.remove();
  });

  // sets the counter of the cart Elements to be the length of the cartItems array

  document.querySelector(".cart-price").textContent = cartItems.length
    .toString()
    .padStart(2, "0");

  cartItems.forEach((item) => {
    // creates the div the will hold the new Elements
    let newRow = document.createElement("div");

    // sets the new row with the same calss name of the past row to fill it with the new one
    newRow.className = "row-ele";

    newRow.innerHTML = `
                      <div class="details">
                          <span class="img"><img src="${item.imageSrc}" alt="" class="dynamic-image" ></span>
                              <div class="sub-details">
                                  <h1 style="font-size: 20px;margin-block-start: 0; margin-block-end: 0; white-space: nowrap;">${item.name}</h1>
                                  <h5 style="font-size: 18px; margin-block-start: 0; margin-block-end: 0;">${item.subDesc}</h5>
                              </div>
                      </div>

                      <div class="price" style="margin-right: 150px;">${item.price}</div>
                      <div class="price" style="margin-right: 40px;"><button class="quantity-btn"><i class="fa-solid fa-minus"></i><span class="Quantity">${item.quantity}</span><i class="fa-solid fa-plus" ></i></button></div>
                      <div class="price" style="margin-left:15px ;">${item.price}</div>
                      <div class="price"><i class="fa-solid fa-trash"></i></div>

                  </div>
            `;
    // puts the Elements into the next section container
    rightSection.insertBefore(newRow, header.nextSibling.nextSibling);

    // creates the new divider with the same class name of the prev one to inhirit its features
    let divider = document.createElement("hr");
    divider.className = "divider";
    rightSection.insertBefore(divider, newRow.nextSibling);
  });

  // calculates the subtotal of the elemnts of cart rows
  let subtotal = cartItems.reduce((sum, item) => {
    return (
      sum + parseFloat(item.price.replace("$", "") * parseFloat(item.quantity))
    );
  }, 0);

  document.querySelector(
    ".subtotals-title span"
  ).textContent = `$${subtotal}.00`;

  document.querySelector(
    ".subtotals-title:last-child span.title"
  ).textContent = `$${subtotal + 80 + 5 + 39}.00`;

  document.querySelectorAll(".row-ele").forEach((row, index) => {
    let plusIcon = row.querySelector(".fa-plus");
    let minusIcon = row.querySelector(".fa-minus");
    let trashicon = row.querySelector(".fa-trash");
    let clearAll = document.querySelector(".clear");

    // clears all Elements in the cart
    clearAll.onclick = function () {
      localStorage.clear();
      document.querySelector(".subtotals-title span").textContent = "$00.00";
      document.querySelector(".subtotals-title:last-child span").textContent =
        "$00.00";
      document.querySelector(".cart-price").textContent = "0";

      document.querySelectorAll(".row-ele").forEach((row) => {
        row.remove();
      });

      document.querySelectorAll(".divider").forEach((divider) => {
        divider.remove();
        header.textContent = "Your cart is Empty";
        header.style.fontSize = "50px";
        bothbuttons.style.display = "none";
      });
    };

    // increases new elemnt or itemCount
    plusIcon.onclick = function () {
      let quantityELement =
        this.closest(".quantity-btn").querySelector(".Quantity");
      let quantity = Number(quantityELement.textContent);
      quantity += 1;
      quantityELement.textContent = quantity.toString().padStart(2, "0");

      let unitPrice = parseFloat(
        row.querySelector(".price:nth-child(2)").textContent.replace("$", "")
      );
      row.querySelector(".price:nth-child(4)").textContent = `$${
        unitPrice * quantity
      }.00`;

      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems[index].quantity = quantityELement.textContent;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateTotals();
    };

    // decreases itemCount
    minusIcon.onclick = function () {
      let quantityELement =
        this.closest(".quantity-btn").querySelector(".Quantity");
      let quantity = Number(quantityELement.textContent);
      if (quantity > 1) {
        quantity -= 1;
      }
      quantityELement.textContent = quantity.toString().padStart("2", 0);

      let unitPrice = row
        .querySelector(".price:nth-child(2)")
        .textContent.replace("$", "");
      row.querySelector(".price:nth-child(4)").textContent = `$${
        unitPrice * quantity
      }.00`;

      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems[index].quantity = quantityELement.textContent;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateTotals();
    };

    // deletes elemnt from the cart

    trashicon.onclick = function () {
      let hr = row.nextSibling;
      hr.remove();
      if (hr && hr.tagName === "HR") row.remove();

      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      document.querySelector(".cart-price").textContent = cartItems.length
        .toString()
        .padStart(2, "0");
      updateTotals();

      updateCartCount();
    };
  });

  // updateTotals function
  function updateTotals() {
    let subtotal = 0;

    document.querySelectorAll(".row-ele").forEach((row) => {
      subtotal += parseFloat(
        row.querySelector(".price:nth-child(4)").textContent.replace("$", "")
      );
    });

    document.querySelector(
      ".subtotals-title span"
    ).textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector(
      ".subtotals-title:last-child span"
    ).textContent = `$${(subtotal + 80 + 5 + 39).toFixed(2)}`;
  }
}

////////////////end of cart page////////////////////////////////

////////////////////////////////start of wishlist page////////////////////////////////

let lovebtn = document.querySelectorAll(".fa-heart").forEach((btn) => {
  btn.addEventListener("click", () => {
    let name = document.querySelector("h1").textContent;
    let subDesc = document.querySelector("h5").textContent;
    let price = document.querySelector("h2").childNodes[1].textContent.trim();

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push({ name, subDesc, price });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  });
});

if (window.location.pathname.includes("wishlist.html")) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist"));

  let centerSection = document.querySelector(".center-section");
  let header = document.querySelector(".row-head");
  // delete header.
  document.querySelectorAll(".divider").forEach((divider) => {
    divider.remove();
  });

  // delete all products.
  document.querySelectorAll(".row-ele").forEach((row) => {
    row.remove();
  });

  wishlist.forEach((item) => {
    let newrow = document.createElement("div");
    newrow.className = "row-ele";
    newrow.innerHTML = `
                        <div class="details">
                                <div class="sub-details">
                                    <h1 >${item.name}</h1>
                                    <h5 >${item.subDesc}</h5>
                                </div>
                         </div>
                              
                        <div class="price" style="font-size: 25px; font-weight: 500; ">${item.price}</div>
                        <div class="cart"><button class="add-to-cart"> ADD TO CART</button></div>
                              
                        <div class="price"><i class="fa-solid fa-trash"></i></div>
                        `;

    centerSection.insertBefore(newrow, header.nextSibling.nextSibling);
    let divider = document.createElement("hr");
    divider.className = "divider";
    centerSection.insertBefore(divider, newrow.nextSibling);

    let cart = document.querySelectorAll(".cart button");
    cart.forEach((crt) => {
      crt.addEventListener("click", () => {
        let name = document.querySelector(".sub-details h1").textContent;
        let detailsProd = document.querySelector(".sub-details h5").textContent;
        let price = document.querySelector(".row-ele .price").textContent;

        console.log(name, detailsProd, price);
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push({ name, detailsProd, price });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCartCount();
      });
    });

    if (window.location.pathname.includes("cart.html")) {
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      let rightSection = document.querySelector(".right-section");
      let header = document.querySelector(".right-row-head");

      document.querySelectorAll(".divider").forEach((divider) => {
        divider.remove();
      });

      document.querySelectorAll(".row-ele").forEach((row) => {
        row.remove();
      });

      cartItems.forEach((item) => {
        let newRow = document.createElement("div");
        newRow.className = "row-ele";
        newRow.innerHTML = `
        <div class="details">
                                <div class="sub-details">
                                    <h1 >${item.name}</h1>
                                    <h5 >${item.detailsProd}</h5>
                                </div>
                         </div>
                              
                        <div class="price" style="font-size: 25px; font-weight: 500; ">${item.price}</div>
                        <div class="cart"><button class="add-to-cart"> ADD TO CART</button></div>
                              
                        <div class="price"><i class="fa-solid fa-trash"></i></div>
        `;
        rightSection.insertBefore(newRow, header.nextSibling.nextSibling);
        let divider = document.createElement("hr");
        divider.className = "divider";
        rightSection.insertBefore(divider, newRow.nextSibling);
      });
    }

    let bothbuttons = document.querySelector(".buttons-both");
    let clearAll = document.querySelector(".clear");

    clearAll.onclick = function () {
      localStorage.clear();
      document.querySelectorAll(".row-ele").forEach((row) => {
        row.remove();
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        if (wishlist.length === 0) {
          console.log("wish list is empty");
          header.textContent = "Your Wishlist is Empty";
          header.style.fontSize = "50px";
          bothbuttons.style.display = "none";
        }
      });

      document.querySelectorAll(".divider").forEach((divider) => {
        divider.remove();
      });
    };

    document.querySelectorAll(".fa-trash").forEach((trash, index) => {
      trash.onclick = function () {
        let hr = newrow.nextSibling;
        hr.remove();
        if (hr && hr.tagName === "HR") newrow.remove();
        console.log(newrow);
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist.splice(index, 1);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      };
    });
  });
}

////////////////end of wishlist page////////////////////////////////

////////////////////////////////////////////////search function////////////////////////////////

function search() {
  let searchboxVal = document.getElementById("searchBox").value.toUpperCase();
  let products = document.querySelectorAll(".product");
  for (let i = 0; i < products.length; i++) {
    let pname = products[i].getElementsByTagName("h1")[0];
    if (pname) {
      let pnameValue = pname.textContent;
      if (pnameValue.toUpperCase().indexOf(searchboxVal) > -1) {
        products[i].style.display = "";
      } else products[i].style.display = "none";
    }
  }
}

search();
////////////////////////////////////////////////search function////////////////////////////////

/////////////////////////start of filter using category function////////////////////////////////
let productsFilter = document.querySelectorAll(".product");
let buttonsFilter = document.querySelectorAll(".filter-cat");
buttonsFilter.forEach((btn) => {
  btn.addEventListener("click", () => {
    showElements(btn);
  });
});
window.addEventListener("DomContentLoaded", () => {
  buttonsFilter[0].classList.add("active");
});
function showElements(btn) {
  productsFilter.forEach((item) => {
    if (item.classList.contains(btn.id)) {
      resetActivebutton(btn);
      btn.classList.add("active");
      item.style.display = "block";
    } else item.style.display = "none";
  });
}

function resetActivebutton(btn) {
  buttonsFilter.forEach((btn) => {
    btn.classList.remove("active");
  });
}
console.log(buttonsFilter[0].classList);
