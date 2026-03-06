
alert("JS running");
// ================= MENU TABS (FINAL) =================
const tabs = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".menu-card");

function showCategory(category) {
  cards.forEach(card => {
    card.style.display =
      card.dataset.category === category ? "block" : "none";
  });
}

// default show starters
showCategory("starters");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    showCategory(tab.dataset.category);
  });

  // keyboard support
  tab.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      tab.click();
    }
  });
});


// ================= LIGHTBOX =================
const galleryImages = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-content");
const closeBtn = document.querySelector(".close");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});


// ================= COUNTDOWN TIMER =================
function startCountdown() {

  let endTime = new Date().getTime() + 3600000;

  const timer = setInterval(() => {

    const now = new Date().getTime();
    const distance = endTime - now;

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerText =
      minutes + "m " + seconds + "s";

    if (distance < 0) {
      clearInterval(timer);
      document.getElementById("countdown").innerText = "Expired";
    }

  }, 1000);

}

startCountdown();


// BOOKING FORM VALIDATION

const form = document.getElementById("bookingForm");

if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

let valid = true;

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const guests = document.getElementById("guests").value;
const date = document.getElementById("date").value;
const time = document.getElementById("time").value;

document.querySelectorAll(".error").forEach(el=>el.innerText="");

if(name===""){
document.getElementById("nameError").innerText="Enter name";
valid=false;
}

if(email===""){
document.getElementById("emailError").innerText="Enter email";
valid=false;
}

if(phone.length<10){
document.getElementById("phoneError").innerText="Enter valid phone";
valid=false;
}

if(guests===""){
document.getElementById("guestError").innerText="Enter guests";
valid=false;
}

let today = new Date().toISOString().split("T")[0];

if(date < today){
document.getElementById("dateError").innerText="Select future date";
valid=false;
}

if(time < "10:00" || time > "22:00"){
document.getElementById("timeError").innerText="Restaurant open 10AM-10PM";
valid=false;
}

if(valid){
  const booking = {
name: name,
email: email,
phone: phone,
date: date,
time: time,
guests: guests
};

// save to localStorage
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

bookings.push(booking);

localStorage.setItem("bookings", JSON.stringify(bookings));

// show on page
addBookingToPage(booking);
document.getElementById("successMsg").innerText="Table booked successfully!";
form.reset();
}

});

}
// ================= BOOKINGS STORAGE =================

const bookingList = document.getElementById("bookingList");

// load saved bookings
window.onload = function () {

let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

bookings.forEach(addBookingToPage);

};

// add booking to page
function addBookingToPage(booking){

const li = document.createElement("li");

li.className = "list-group-item d-flex justify-content-between align-items-center";

li.innerText =
booking.name + " | " + booking.guests + " Guests | " + booking.date + " | " + booking.time;


// delete button
const delBtn = document.createElement("button");

delBtn.innerText = "Delete";

delBtn.className = "btn btn-danger btn-sm";

delBtn.onclick = function(){

li.remove();

let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

bookings = bookings.filter(b =>
b.name !== booking.name ||
b.date !== booking.date ||
b.time !== booking.time
);

localStorage.setItem("bookings", JSON.stringify(bookings));

};

li.appendChild(delBtn);

bookingList.appendChild(li);

}