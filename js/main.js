//////////////// start cart page////////////////////////////////
// ********************************add to cart functions********************************
// calling all add to cart button in prodducts page and looping over them
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
  });
});

// ensures that we are in the cart page
if (window.location.pathname.includes("cart.html")) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // gets the container of all products
  let rightSection = document.querySelector(".right-section");

  // gets the container's header
  let header = document.querySelector(".right-row-head");

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
      // let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      localStorage.clear();
      document.querySelector(".subtotals-title span").textContent = "$00.00";
      document.querySelector(".subtotals-title:last-child span").textContent =
        "$00.00";
      document.querySelector(".cart-price").textContent = "00.00";

      document.querySelectorAll(".row-ele").forEach((row) => {
        row.remove();
      });

      document.querySelectorAll(".divider").forEach((divider) => {
        divider.remove();
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
