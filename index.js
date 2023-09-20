
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config();
const router = require('./mainRoutes/routes');
const { geneareteFile } = require('./fileGenerator/generate.file');
const app = express()
const port = process.env.PORT
const fileName =process.env.FILE_NAME 
app.use(express.json())
app.use(cors({
    origin: '*'
}));
geneareteFile(`${fileName}.json`)
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

app.use(router)

app.listen(port, () => {
  console.log(`App listening`)
})
