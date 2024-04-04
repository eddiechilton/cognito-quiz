const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.get('/quiz/:quizId', (req, res) => {
  res.send('Successful response.'+req.params.quizId);
});

app.listen(3000, () => console.log('listening on port 3000.'));
