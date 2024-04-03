imageArray = [
    "res/gallery/IMG_0.jpg",
    "res/gallery/IMG_1.jpg",
    "res/gallery/IMG_2.jpg",
    "res/gallery/IMG_3.jpg",
    "res/gallery/IMG_4.jpg",
    "res/gallery/IMG_5.jpg",
]

imageCaptions = [
    "Devon and Cornwall Indoor Championships 2024",
    "Halloween Shoot 2023",
    "Christmas Shoot 2023",
    "Warming up before the Autumn Gold Competition",
    "Autumn Gold 2023",
    "Frostbite - December 2023",
]

const NUM_IMAGES = imageArray.length;
let imageSlideNumber = 0;

$(document).ready(function () 
{
    function showImage (imageSlideNumber)
    {
        $("#gallery-image").fadeTo(500, 0.1, function() {
            $(this).attr("src", imageArray[imageSlideNumber])
                   .fadeTo(500, 1);
        });

        $("#caption").html(imageCaptions[imageSlideNumber]);
    }

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

    function nextImg()
    {
        imageSlideNumber++;
        imageSlideNumber = imageSlideNumber % NUM_IMAGES;
        console.log(imageSlideNumber);
        showImage(imageSlideNumber);
    }

    $(".prev").on("click", function () {
        prevImg();
    });

    $(".next").on("click", function () {
        nextImg();
    });

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

    showImage(imageSlideNumber);
    setInterval(() => nextImg(), 8000);
});