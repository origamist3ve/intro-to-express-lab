import express from 'express';


const app = express();

// 1. Be Polite, Greet the User
// Task: Create a route that responds to URLs like /greetings/<username-parameter>.
//
//     Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.
//
//     Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.”


app.get('/greet/:name', (req, res) => {
    const {name} = req.params
    res.send(`<h1>Hello ${name}</h1>`);
})

// 2. Rolling the Dice
// Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.
//
//     Examples: Matches routes like /roll/6 or /roll/20.
//
//     Validation: If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.
//
//     Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. For example, a request to /roll/16 might respond with “You rolled a 14.”
//


app.get('/roll/:number', (req, res) => {
    const number = req.params.number
    const random = Math.floor(Math.random() * number)
    const numInt = parseInt(number)
    console.log(typeof(numInt))

     if (isNaN(numInt)) {
        res.send("<h1>You must specify a number</h1>")
    }
    else  {
        res.send(`<h1>You rolled a ${random}</h1>`);
    }
})



// 3. I Want THAT One!
//     Task: Create a route for URLs like /collectibles/<index-parameter>.
//
//     Examples: Matches routes such as /collectibles/2 or /collectibles/0.
//
//     Data Array:


app.get('/collectibles/:id', (req, res) => {
    const {id} = req.params
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ];

    if (id < collectibles.length) {
        res.send(`<h1>So you want the ${collectibles[id].name}? For ${collectibles[id].price}, it can be yours! </h1>`)

    }
    else {
        res.send(`<h1>This item is not yet in stock. Check back soon!</h1>`)
    }
})






// 5 Filter Shoes by Query Parameters

app.get ('/shoes', (req, res) => {
    const {minPrice, maxPrice, type} = req.query

    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];

    let lowPrices = shoes.filter((x) => {
        return x.price >= Number(minPrice)
    })
    let highPrices = shoes.filter((x) => {
        return x.price <= Number(maxPrice)
    })
    let typeOfShoe = shoes.find((x) => {
        return x.type === type
    })


    if (minPrice) {
        res.send(lowPrices)
    }
    else if (maxPrice) {
        res.send(highPrices)
    }
    else if (typeOfShoe) {
        res.send(typeOfShoe)
    }
    else {
        res.send("No results")
    }

})


app.listen(3000,()=> {
    console.log('Server running on port 3000');
})