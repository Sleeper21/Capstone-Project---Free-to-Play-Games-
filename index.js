import express from "express"

const app = express()
const port = 3000

// Static Files
app.use(express.static("public"))


// Home Page route
app.get("/", (req, res) => {
    res.render("index.ejs")
})


// Listening port
app.listen( port, () => {
    console.log(`Server running on port ${port}`);    
});

