const express = require('express')
const app = express()
const port = 3000
const people = require('./data.json');

app.get('/', (req, res) => res.send('Server'))


/* Function returns a list of all people objects. */
app.get('/people', function (req, res) {
  res.status(200).json(people);
})

/* Functions gives the record for the person with the given ID. */
app.get('/people/:id', function (req, res) {
  if (people.find(x => x.ID === req.params.id)) {
    res.status(200).json(people.find(x => x.ID === req.params.id))
  }
  res.status(404).send("404: Person not found");
})

/* Function serves up the user's full name. */
app.get('/people/:id/name', function (req, res) {
  if (people.find(x => x.ID === req.params.id)) {
    var first = people.find(x => x.ID === req.params.id).first;
    var last = people.find(x => x.ID === req.params.id).last;
    res.status(200).json({ "name": first + " " + last });
  }
  res.status(404).send("404: Person not found");
})

/* Function returns the seniority, rounded down to nearest whole year. */
app.get('/people/:id/years', function (req, res) {
  if (people.find(x => x.ID === req.params.ID)) {
    var today = new Date();
    var startDate = new Date(people.find(x => x.ID === req.params.ID).startDate);
    var duration = today.getYear() - startDate.getYear();
    res.status(200).json({ "seniority": duration });
  }
  res.status(404).send("404: Person not found");
})

app.get('*', function (req, res) {
  res.status(404).send("404: Page not found");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
