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
