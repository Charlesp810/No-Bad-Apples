const express = require('express');
const volleyball = require('volleyball');
const path = require('path');


const app = express();

app.use(volleyball);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, './public')));

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// app.get('/', (req, res, next) => {
//     res.send('./public/index.html')
// })

app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Ooppss something went wrong');
});

const PORT = 8080;
app.listen(process.env.PORT || 8080, () => {
    console.log(` connection established on ${PORT}`);
});
