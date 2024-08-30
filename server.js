const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  const filePath = path.join(__dirname, req.url);
  res.sendFile(filePath);
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});