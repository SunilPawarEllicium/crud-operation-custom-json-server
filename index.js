
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const router = require('./mainRoutes/routes');
const { geneareteFile } = require('./fileGenerator/generateFile');
const app = express()
const port = process.env.PORT
const fileName =process.env.FILE_NAME 
app.use(express.json())
app.use(cors({
    origin: '*'
}));
geneareteFile(`${fileName}.json`)
app.get('/', (req, res) => {
    res.send('Hello!')
})

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
