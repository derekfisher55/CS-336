const express = require('express')
const app = express()
const port = 3000

app.get('/request', function (req, res) {
  res.status(200).send('Got a GET request')
})

app.post('/request', function (req, res) {
  res.status(200).send('Got a POST request')
})

app.put('/request', function (req, res) {
  res.status(200).send('Got a PUT request at /request')
})

app.delete('/request', function (req, res) {
  res.status(200).send('Got a DELETE request at /request')
})

app.head('/request', function (req, res) {
  res.status(200).send('Got a HEAD request at /request')
})

app.all('/request', function (req, res) {
  res.status(200)
})

app.get('*', function(req, res) {
  if (req.url === '/request') | (req.url === '/forms') return res.status(200);
  else res.status(403).send("403 - FORBIDDEN: The server is refusing action.");
})

app.listen(port, () => console.log(`app listening on port ${port}!`))
