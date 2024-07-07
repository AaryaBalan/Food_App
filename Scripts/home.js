// Function to fetch from the backend
getFoodCategory();

function closeContainer() {
   document.querySelector(".top-nav").style.opacity = 1;
   document.querySelector(".category-section-container-head").style.opacity = 1;
   document.querySelector(".info-box-container").style.opacity = 0;
   document.querySelector(".info-box-container").style.zIndex = -100;
}

function openNav() {
   const sideNav = document.querySelector(".side-nav");
   sideNav.style.display = "flex";
   sideNav.style.width = "250px";
   sideNav.style.paddingLeft = "20px";
}

function closeNav() {
   const sideNav = document.querySelector(".side-nav");
   sideNav.style.display = "none";
   sideNav.style.width = 0;
   sideNav.style.paddingLeft = 0;
}
