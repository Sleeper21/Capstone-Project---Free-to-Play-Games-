// Functions

// Function to redirect to the desired endpoint filtering the games
// by Genre with the dropdown buttons. Here it receives something as "genre"

function redirectByGenre(genre) {
    window.location.href = "/games?category=" + genre;
};

function redirectToRandomGame(title) {
    window.location.href = "/games?id=" + title;
};