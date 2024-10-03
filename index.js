import express from "express"
import axios from "axios"

const app = express()
const port = 3000
const APIurl = "https://www.freetogame.com/api"

// Static Files
app.use(express.static("public"))


// Home Page route
app.get("/", (req, res) => {
    res.render("index.ejs")
})

// "View All games" route
app.get("/games", async (req, res) => {
    try {
        const allGames = await axios.get(APIurl + "/games")
        res.render("games.ejs", { articles: allGames.data })        
        
    } catch (error) {
        console.log(error.response.data)
        console.log(error.data.status)
        console.log(error.message)       
    }
})


// Listening port
app.listen( port, () => {
    console.log(`Server running on port ${port}`);    
});

