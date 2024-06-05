// The image file path and the caption displayed are stored as key:value pairs in this dictionary 
let images = [
    {src: "res/gallery/IMG_00.jpg", caption: "Devon and Cornwall Indoor Championships 2024"},
    {src: "res/gallery/IMG_01.jpg", caption: "Halloween Shoot 2023"},
    {src: "res/gallery/IMG_02.jpg", caption: "Christmas Shoot 2023"},
    {src: "res/gallery/IMG_03.jpg", caption: "YMCA Plymouth Indoor Range"},
    {src: "res/gallery/IMG_04.jpg", caption: "Warming up before the Autumn Gold Competition"},
    {src: "res/gallery/IMG_05.jpg", caption: "Autumn Gold 2023"},
    {src: "res/gallery/IMG_06.jpg", caption: "Frostbite December 2023"},
    {src: "res/gallery/IMG_07.jpg", caption: "St. George's Day Shoot 2023"},
    {src: "res/gallery/IMG_08.jpg", caption: "Redruth Archers WRS Spring Tournament Weekend"},
    {src: "res/gallery/IMG_09.jpg", caption: "Brixham Archers UKRS Open Rose Tournament"},
    {src: "res/gallery/IMG_10.jpg", caption: "Club Target Day: Long Metrics and WA 900"},
    {src: "res/gallery/IMG_11.jpeg", caption: "Beginners Course Comments"},
];

const NUM_IMAGES = images.length; 
let imageSlideNumber = 0; // currently displayed image index

$(document).ready(function () 
{
    function showImage (imageSlideNumber)
    {
        // Use jQuery to set the image src attribute and captions inner HTML content
        $("#gallery-image").attr("src", images[imageSlideNumber]["src"]);
        $("#caption").html(images[imageSlideNumber]["caption"]);

        // Too flashy; not accessible to users with photosensitivity
        // $("#gallery-image").fadeTo(500, 0.1, function() {
        //     $(this).attr("src", imageArray[imageSlideNumber])
        //            .fadeTo(500, 1);
        // });
    }

    // Decrement, wrap around if < 0
    function prevImg()
    {
        imageSlideNumber--;
        if (imageSlideNumber < 0)
        {
            imageSlideNumber = NUM_IMAGES - 1;
        }
        console.log(imageSlideNumber);
        showImage(imageSlideNumber);
    }

    // Increment, wrap around if >= NUM_IMAGES
    function nextImg()
    {
        imageSlideNumber++;
        imageSlideNumber = imageSlideNumber % NUM_IMAGES;
        console.log(imageSlideNumber);
        showImage(imageSlideNumber);
    }

    // Variables to keep track of the interval
    let imageSlideInterval;

    // Function to start or restart the interval
    function startImageSlideInterval() 
    {
        if (imageSlideInterval)     
        {
            clearInterval(imageSlideInterval);
        }
        imageSlideInterval = setInterval(() => nextImg(), 8_000); // CHANGE INTERVAL HERE, ms
    }

    // Event listeners for previous and next image buttons
    $(".prev").on("click", function () 
    {
        prevImg();
        startImageSlideInterval(); // Reset the interval
    });
    $(".next").on("click", function () 
    {
        nextImg();
        startImageSlideInterval(); // Reset the interval
    });

    // Event listener for entire window, watches for left/right arrow key down
    document.addEventListener("keydown", function(event) 
    {
        console.log(event);
        switch (event.key) 
        {
            case "ArrowLeft":
                prevImg();
                startImageSlideInterval(); // Reset the interval
                break;
            case "ArrowRight":
                nextImg();
                startImageSlideInterval(); // Reset the interval
                break;
        }
    });

    showImage(imageSlideNumber); // On page load
    startImageSlideInterval(); // Start the interval initially
});