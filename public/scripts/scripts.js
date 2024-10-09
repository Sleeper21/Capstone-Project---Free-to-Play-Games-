// Functions

// Function to redirect to the desired endpoint filtering the games
// by Genre with the dropdown buttons. Here it receives something as "genre"

function redirectByGenre(genre) {
    window.location.href = "/games?category=" + genre;
    
    
};

// By id, when the user clicks on a game card

function redirectToRandomGame(title) {
    window.location.href = "/games?id=" + title;
};

// make the dropdown button works on click when in smaller screens

function showContent() {
    
    const hiddenElement = document.getElementById("hidden-content");

        if (hiddenElement.style.display === "block") {  // alternate the display from block to none as the button gets clicked
                
            hiddenElement.style.display = "none";
        } else {
            hiddenElement.style.display = "block";
        }
}

function showSortByOptions() {
    const hiddenContent = document.getElementById("hidden-options");

        if (hiddenContent.style.display === "block") {
            hiddenContent.style.display = "none"
        } else {
            hiddenContent.style.display = "block";
        }
}