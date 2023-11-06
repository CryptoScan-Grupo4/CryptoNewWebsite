const express = require('express')
const app = express()
const port = 3333

app.use(express.static(__dirname))

app.listen(port, () => {
  console.log(`Site rodando em http://localhost:${port}`);
})

