import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express()
const port = 3000
const APIurl = "https://www.freetogame.com/api"

app.use(bodyParser.urlencoded({ extended: true }))

// Static Files
app.use(express.static("public"))


// Home Page route
app.get("/", async (req, res) => { // get the full length of total games available to be ready to show the random game button

    const totalGames = await axios.get(APIurl + "/games")
    
    var randomPosition = Math.floor(Math.random() * totalGames.data.length); // Stores a random position on the array of objects   
    var getRandomId = JSON.stringify(totalGames.data[randomPosition].id) // gets the id value in the position of the random number
    res.render("index.ejs", { randomId: getRandomId})  
})

// "View All games", "filter by genre" and "game details" route
//if there is a category on the request, it should load "filter by genre page,
// if there is an id on the request, it should load "game details" page,
// if used the search bar , show all games matching the typed text
// if not, show all games

app.get("/games", async (req, res) => {

    const genreSelected = req.query.category; //gets the query category of the request aka genre
    const idOfGameSelected = req.query.id; //gets the query id of the request (in this case when click on any game card)
    const sortBy = req.query["sort-by"]; // gets the query sort-by if exists (only in "sort by" buttons)
    const filterByPlatform = req.query.platform; // gets the query platform if exists (only in "sort by" buttons)
    

    if (idOfGameSelected) { // if there is any id on the request
        try {
            const gameSelected = await axios.get(APIurl + "/game?id=" + idOfGameSelected)
            
            res.render("game_details.ejs", { articles: gameSelected.data})

        } catch (error) {
            console.log(error.message)
            
        }        
    } else if (genreSelected && sortBy){ //if there is a "sort by" and a genre filter
        try {
            const multipleSorts = await axios.get(APIurl + "/games?category=" + genreSelected + "&sort-by=" + sortBy)
                       
            res.render("genre_filter.ejs", {
                articles: multipleSorts.data,
                category: genreSelected,
            })
            
        } catch (error) {
            console.log(error.message)
            console.log(error.data)
        }

    } else if (genreSelected && filterByPlatform){ //if there is a genre filter and a platform filter
        try {
            const multipleSorts = await axios.get(APIurl + "/games?category=" + genreSelected + "&platform=" + filterByPlatform)
                        
            res.render("genre_filter.ejs", {
                articles: multipleSorts.data,
                category: genreSelected,
            })
            
        } catch (error) {
            console.log(error.message)
            console.log(error.data)
        }

    } else if (genreSelected){ //if there is any genre in the request
        try {
            const genreGames = await axios.get(APIurl + "/games?category=" + genreSelected)
            res.render("genre_filter.ejs", {
                articles: genreGames.data,
                category: genreSelected,
             })
            
        } catch (error) {
            console.log(error.message)
        }

    } else if (sortBy){ //if there is a "sort by" in the request
        try {
            const sortedBy = await axios.get(APIurl + "/games?sort-by=" + sortBy)
            res.render("games.ejs", { articles: sortedBy.data })
            
        } catch (error) {
            console.log(error.message)
        }

    } else if (filterByPlatform){ //if there is a "sort by PLATFORM" in the request
        try {
            const sortedBy = await axios.get(APIurl + "/games?platform=" + filterByPlatform)
            res.render("games.ejs", { articles: sortedBy.data })
            
        } catch (error) {
            console.log(error.message)
        }

    } else {  // If there are no category on the request is because the user clicked on show all button
        try {
            const allGames = await axios.get(APIurl + "/games")
            res.render("games.ejs", { articles: allGames.data })        
            
        } catch (error) {
            console.log(error.message)       
        }
    }
    
})


// Listening port
app.listen( port, () => {
    console.log(`Server running on port ${port}`);    
});

