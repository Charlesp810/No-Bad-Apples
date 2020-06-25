const express = require('express');
const volleyball = require('volleyball');
const path = require('path');


const app = express();

app.use(volleyball);

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res, next) => {
    res.send('./public/index.html')
})

app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Ooppss something went wrong');
});

const PORT = 8080;
app.listen(process.env.PORT || 8080, () => {
    console.log(` connection established on ${PORT}`);
});