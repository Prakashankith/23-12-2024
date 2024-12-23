const express = require('express')
const app = express()
const morgan = require('morgan')



app.use(morgan('tiny'))

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})
app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!!")
    next();
})

app.use((req, res, next) => {
    console.log(req.query);
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    res.send("YOU NEED A PASSWORD!")
}


// app.use((req, res, next) => {
//     console.log("this is my first middleware!!!");
//     next();
//     console.log("THIS IS MY FIRST MIDDLEWARE - AFTER CALLING NEXT()")

// })

// app.use((req, res, next) => {
//     console.log("this is my second middleware!!!");
//     return next();
// })

// app.use((req, res, next) => {
//     console.log("this is my third middleware!!!");
//     return next();
// })


app.get('/', (req, res,) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send("home page")

})



app.get('/dog', (req, res) => {
    res.send("woff")

})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})


app.listen(3000, () => {
    console.log("appis listening on port 3000");

})