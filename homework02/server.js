const express = require('express')
const app = express()
const port = 3000
const people = require('./data.json');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.static("."));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
  res.status(404).send("404: Person not found.");
})

/* Function serves up the user's full name. */
app.get('/people/:id/name', function (req, res) {
  if (people.find(x => x.ID === req.params.id)) {
    var first = people.find(x => x.ID === req.params.id).first;
    var last = people.find(x => x.ID === req.params.id).last;
    res.status(200).json({ "name": first + " " + last });
  }
  res.status(404).send("404: Person not found.");
})

/* Function returns the seniority, rounded down to nearest whole year. */
app.get('/people/:id/years', function (req, res) {
  if (people.find(x => x.ID === req.params.ID)) {
    var today = new Date();
    var startDate = new Date(people.find(x => x.ID === req.params.ID).startDate);
    var duration = today.getYear() - startDate.getYear();
    res.status(200).json({ "seniority": duration });
  }
  res.status(404).send("404: Person not found.");
})

app.get('*', function (req, res) {
  res.status(404).send("404: Page not found.");
})

/* Function POSTs a new person to the data file.  */
app.post('/people', function(req, res) {
  fs.readFile(DATA_FILE, function(err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      var people = JSON.parse(data);
      var newPerson = {
          first: req.body.first,
          last: req.body.last,
          ID: req.body.ID,
          startDate: req.body.startDate
      };
      people.push(newPerson);

      fs.writeFile(DATA_FILE, JSON.stringify(people, null, 4), function(err) {
          if (err) {
              console.error(err);
              process.exit(1);
              res.status(500).send({ msg: "Error!" })
          } else {
              res.status(200).send({ msg: "Success!" });
            }
      });
  });
})

/* Function updates the id of the requested person. */
app.put('/person/:id', function (req, res) {
  if (people.find(x => x.ID === req.params.id)) {
    fs.readFile(DATA_FILE, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        var person = JSON.parse(data);
        var index = person.findIndex(obj => obj.ID === req.params.id);
        person[index].first = req.body.first;
        person[index].last = req.body.last;
        person[index].ID = req.body.ID;
        person[index].startDate = req.body.startDate;

        fs.writeFile(DATA_FILE, JSON.stringify(people, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
                res.status(500).send({ msg: "Error!" })
            } else {
                res.status(200).send(people);
            }
        });
    });
  } else {
    res.status(404).send("404: Person not found.");
    }
})

/* Function DELETES the person matching the given ID. */
app.delete('/person/:id', function (req, res) {
  if (listOfPeople.find(x => x.ID === req.params.id)) {
    fs.readFile(DATA_FILE, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        var person = JSON.parse(data);
        var index = person.findIndex(obj => obj.ID === req.params.id);
        person.splice(index, 1);

        fs.writeFile(DATA_FILE, JSON.stringify(people, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
                res.status(500).send({ msg: "Error!" })
            } else {
                res.status(200).send(people);
            }
        });
    });
  } else {
    res.status(404).send("404: Person not found.");
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
