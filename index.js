const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, 'localhost', () => {
  console.log(`Server is listening on port ${port}`);
});