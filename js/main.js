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

// ******delete, add functions********************************
let increase = document.querySelectorAll(".row-ele .fa-plus");
let decrease = document.querySelectorAll(".row-ele .fa-minus");

increase.forEach(
  (plusIcon) =>
    (plusIcon.onclick = function () {
      let quantityContent =
        this.closest(".quantity-btn").querySelector(".Quantity");
      let quantitytoNum = Number(quantityContent.textContent);

      quantitytoNum += 1;
      quantityContent.textContent = quantitytoNum.toString().padStart(2, "0");
    })
);

decrease.forEach(
  (minusIcon) =>
    (minusIcon.onclick = function () {
      let quantityContent =
        this.closest(".quantity-btn").querySelector(".Quantity");
      let quantitytoNum = Number(quantityContent.textContent);
      if (quantitytoNum > 1) {
        quantitytoNum--;
        quantityContent.textContent = quantitytoNum.toString().padStart(2, "0");
      } else quantitytoNum = "0";
    })
);

// *****************************calculations********************************

// let quantityContent = this.closest(".quantity-btn").querySelector(".Quantity");

// let quantity = document.querySelector(".Quantity");
// let totalPrice = document.getElementById("total-price");
// let quantitytoNum = Number(quantityContent.textContent);
// let totalPriceContent = parseFloat(totalPrice.textContent.replace("$", ""));
// totalPrice.textContent = `$${totalPriceContent * quantitytoNum}.00`;
// console.log(totalPriceContent);

////////////////calculations////////////////////////////////

// function updateQuantity(action, button) {
//   let quantityContent = button.closest(".quantity-btn").querySelector(".Quantity");
//   let quantitytoNum = Number(quantityContent.textContent);
//   let totalPrice = document.getElementById("total-price");
//   let totalPriceContent = parseFloat(totalPrice.textContent.replace("$", ""));

//   if (action === "increase" || (action === "decrease" && quantitytoNum > 1)) {
//     quantitytoNum = action === "increase" ? quantitytoNum + 1 : quantitytoNum - 1;
//     let unitPrice = totalPriceContent / quantitytoNum; // Approx unit price
//     totalPrice.textContent = `$${unitPrice * quantitytoNum}.00`;
//   }

//   quantityContent.textContent = quantitytoNum.toString().padStart(2, "0");
// }

// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll('.increase').forEach(plusIcon => {
//     plusIcon.onclick = function() { updateQuantity("increase", this); };
//   });

//   document.querySelectorAll('.decrease').forEach(minusIcon => {
//     minusIcon.onclick = function() { updateQuantity("decrease", this); };
//   });
// });

// ********************************add to cart functions********************************
let addToCart = document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
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

if (window.location.pathname.includes("cart.html")) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  let rightSection = document.querySelector(".right-section");
  let header = document.querySelector(".right-row-head");

  document.querySelectorAll(".row-ele").forEach((row) => {
    row.remove();
  });

  document.querySelectorAll(".divider").forEach((divider) => {
    divider.remove();
  });

  document.querySelector(".cart-price").textContent = cartItems.length
    .toString()
    .padStart(2, "0");

  cartItems.forEach((item, index) => {
    let newRow = document.createElement("div");
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
    rightSection.insertBefore(newRow, header.nextSibling.nextSibling);
    let divider = document.createElement("hr");
    divider.className = "divider";
    rightSection.insertBefore(divider, newRow.nextSibling);
  });

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
