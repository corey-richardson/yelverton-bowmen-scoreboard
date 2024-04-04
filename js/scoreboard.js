function titleCase(str) {
    return str
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

$(document).ready(function () 
{
    // Check the local browser storage for a "flashId"
    // This ID is represents the most recent entry to the scoreboard.
    // It is set when the add score form is submitted.
    // The CSS style class "flash" is applied, and later removed.
    const flashId = sessionStorage.getItem("flashId");
    if (flashId)
    {
        setTimeout(function() {
            $("#" + flashId).addClass("flash");
        }, 500);

        setTimeout(function() {
            $("#" + flashId).removeClass("flash");
        }, 3000);

        // sessionStorage.removeItem("flashId");
    }

    var request = window.indexedDB.open('archery_scores', 1);
    var db;

    // Error handling: DB won't open
    request.onerror = function(event) 
    {
      console.error("IndexedDB error:", event.target.errorCode);
    };

    // The `upgradeneeded` event is fired when an attempt was made to open a 
    // database with a version number higher than its current version.
    request.onupgradeneeded = function(event) 
    {
      db = event.target.result;
      var objectStore = db.createObjectStore("scores", { keyPath: "id", autoIncrement: true });
      objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("score", "score", { unique: false, integer: true });
      objectStore.createIndex("ageCat", "ageCat", { unique: false });
    };

    // The `success` event is fired when an `IDBRequest` succeeds.
    request.onsuccess = function(event) 
    {
        db = event.target.result;
        console.log("IndexedDB opened successfully");

        let i = 1; // for enumeration; represents the score ranking

        var objectStore = db.transaction("scores").objectStore("scores");
        var index = objectStore.index("score"); // Index array by 'score' column

        //                      desc
        index.openCursor(null, "prev").onsuccess = function(event) 
        {
            var cursor = event.target.result;

            if (cursor)
            {
                while (cursor)
                {
                    $("#scoreboard-table").append(`
                        <tr id="${cursor.value.id}">
                            <td> <b> ${i} </b> </td>
                            <td> ${titleCase(cursor.value.name)} </td>
                            <td> ${cursor.value.score} </td>
                            <td> ${cursor.value.ageCat} </td>
                        </tr>
                    `);

                    i++;
                    cursor = cursor.continue();
                }
            }
        };
    };

    // Returns a promise the resolves with the primary key ID of the added score 
    function addScore(name, score, ageCat)
    {
        var transaction = db.transaction(["scores"], "readwrite");
        var objectStore = transaction.objectStore("scores");
        var request = objectStore.add({ name: name, score: score, ageCat: ageCat });

        return new Promise((resolve, reject) => {
            request.onsuccess = function(event) 
            {
                console.log("Score added successfully");
                console.log(event.target.result);
                resolve(event.target.result);
            };

            request.onerror = function(event) 
            {
                console.error("Error adding score:", event.target.error);
                reject(event.target.error);
            };
        });
    }

    // Event listener for "add-score-form"
    $("#add-score-form").on("submit", function (event) {
        event.preventDefault(); // Prevent the form from being submitted in the default way
        let formData = new FormData(this);
        
        // Call the addScore function on the submitted form data
        // The score must be passed as an integer for proper sorting
        addScore(
            formData.get("name"),
            parseInt(formData.get("score")),
            formData.get("ageCat"),
        ).then(newId => {
            // Save the flashId into session storage. This is the ID of the newly added score.
            // We do this because when we redirect to the index page, all JavaScript variables are reset,
            // and all scripts start from scratch. By saving the flashId to session storage, we can
            // access it after the page load to highlight the newly added score or perform some other action.
            // Redirect to the index page
            sessionStorage.setItem("flashId", newId);
            window.location.href = "./index.html";
        }).catch(error => {
            console.error("Error:", error);
        });
    });
});
