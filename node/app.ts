import express from 'express';
import bodyparser from 'body-parser'

const app = express();
const port = 3000;
app.get('/api/', (req, res) => {
  res.send('test');
});
app.use(bodyparser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
app.use(bodyparser.json())
app.post('/api/test', (req, res) => {
  console.log(req.body)
  res.send('test');
});


var server = app.listen(port, function () {
    console.log("app running on port.");
});