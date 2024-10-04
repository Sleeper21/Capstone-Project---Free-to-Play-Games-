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
app.get("/", (req, res) => {
    res.render("index.ejs")
})

// "View All games", "filter by genre" and "game details" route

//if there is a category on the request, it should load "filter by genre page,
// if there is an id on the request, it should load "game details" page,
// if not, show all games

app.get("/games", async (req, res) => {

    const genreSelected = req.query.category; //gets the query category of the request aka genre
    const idOfGameSelected = req.query.id; //gets the query id of the request (in this case when click on any game card)

    if (idOfGameSelected) { // if there is any id on the request
        try {
            const gameSelected = await axios.get(APIurl + "/game?id=" + idOfGameSelected)
            res.render("game_details.ejs", { articles: gameSelected.data})

        } catch (error) {
            console.log(error.response.data)
            console.log(error.data.status)
            console.log(error.message)
        }        
    } else if (genreSelected){ //if there is any genre in the request
        try {
            const genreGames = await axios.get(APIurl + "/games?category=" + genreSelected)
            res.render("genre_filter.ejs", { articles: genreGames.data })
            
        } catch (error) {
            console.log(error.response.data)
            console.log(error.data.status)
            console.log(error.message)
        }

    } else {  // If there are no category on the request is because the user clicked on show all button
        try {
            const allGames = await axios.get(APIurl + "/games")
            res.render("games.ejs", { articles: allGames.data })        
            
        } catch (error) {
            console.log(error.response.data)
            console.log(error.data.status)
            console.log(error.message)       
        }
    }
    
})


// Listening port
app.listen( port, () => {
    console.log(`Server running on port ${port}`);    
});

