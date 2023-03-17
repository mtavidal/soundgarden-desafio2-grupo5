let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block"; 
}


function scrollEsq(elementos) {
  const left = document.querySelector("." + elementos);
  left.scrollBy(-450, 0);
  if (left.scrollLeft <= 0) {
      document.getElementById("esquerdo").style.visibility = "hidden";
  } else {
      document.getElementById("esquerdo").style.visibility = "visible";
  }
  document.getElementById("direito").style.visibility = "visible";
}

function scrollDir(elementos) {
  const right = document.querySelector("." + elementos);
  right.scrollBy(450, 0);
  if (right.scrollLeft >= (right.scrollWidth + 350 - document.documentElement.clientWidth)) {
      document.getElementById("direito").style.visibility = "hidden";
  } else {
      document.getElementById("direito").style.visibility = "visible";
  }
  document.getElementById("esquerdo").style.visibility = "visible";
}