function titleCase(str) {
    return str
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

$(document).ready(function () 
{
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

    request.onupgradeneeded = function(event) 
    {
      db = event.target.result;
      var objectStore = db.createObjectStore("scores", { keyPath: "id", autoIncrement: true });
      objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("score", "score", { unique: false, integer: true });
      objectStore.createIndex("ageCat", "ageCat", { unique: false });
    };

    request.onsuccess = function(event) 
    {
        db = event.target.result;
        console.log("IndexedDB opened successfully");

        var objectStore = db.transaction("scores").objectStore("scores");
        var index = objectStore.index("score");

        let i = 1;

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

    $("#add-score-form").on("submit", function (event) {
        event.preventDefault();
        let formData = new FormData(this);
        
        addScore(
            formData.get("name"),
            parseInt(formData.get("score")),
            formData.get("ageCat"),
        ).then(newId => {
            console.log(newId);
            sessionStorage.setItem("flashId", newId);
            window.location.href = "./index.html";
        }).catch(error => {
            console.error("Error:", error);
        });
    });
});
