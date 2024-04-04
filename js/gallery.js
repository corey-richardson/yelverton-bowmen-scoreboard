// The image file path and the caption displayed are stored as key:value pairs in this dictionary 
let images = [
    {src: "res/gallery/IMG_0.jpg", caption: "Devon and Cornwall Indoor Championships 2024"},
    {src: "res/gallery/IMG_1.jpg", caption: "Halloween Shoot 2023"},
    {src: "res/gallery/IMG_2.jpg", caption: "Christmas Shoot 2023"},
    {src: "res/gallery/IMG_3.jpg", caption: "Warming up before the Autumn Gold Competition"},
    {src: "res/gallery/IMG_4.jpg", caption: "Autumn Gold 2023"},
    {src: "res/gallery/IMG_5.jpg", caption: "Frostbite - December 2023"},
    {src: "res/gallery/IMG_6.jpg", caption: "St. George's Day Shoot 2023"},
    {src: "res/gallery/IMG_7.jpg", caption: "YMCA Plymouth Indoor Range"},
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

    // Event listeners for previous and next image buttons
    $(".prev").on("click", function () {
        prevImg();
    });
    $(".next").on("click", function () {
        nextImg();
    });

    // Event listener for entire window, watches for left/right arrow key down
    document.addEventListener("keydown", function(event) {
        console.log(event);
        switch (event.key)
        {
            case ("ArrowLeft"):
                prevImg();
                break;
            case ("ArrowRight"):
                nextImg();
                break;
        }
    })

    showImage(imageSlideNumber); // on page load
    setInterval(() => nextImg(), 8_000); // every 8 seconds, goto next image
});