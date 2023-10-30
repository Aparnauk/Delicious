

// carousel movement
// -----------------

const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging=false, prevePageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value

    // getting max scrollable width
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";

}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        // getting first img width & adding 14 margin value
        let firstImgWidth = firstImg.clientWidth + 20;
        // if checked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left"? -firstImgWidth : firstImgWidth;
        // calling showHideIcons after 60ms
        showHideIcons(()=> showHideIcons(),60);
    });
});

const autoSlide = () => {

    // if there is no image left to scroll then retuen from here
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    // making positiionDiff value to positive
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 20;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft){
        // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;

    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;

}

const dragStart = (e) => {
    // updating global variables value on mouse down event
    isDragStart = true;
    prevePageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault(); 
    isDragging=true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevePageX; 
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging=false;
    autoSlide();
}

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("touchend", dragStop);
carousel.addEventListener("mousedoup", dragStop);
carousel.addEventListener("mouseleave", dragStop);



