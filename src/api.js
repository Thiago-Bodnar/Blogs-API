const express = require('express');
const usersRoutes = require('./routers/usersRoutes');
const authRoute = require('./routers/authRoute');

// ...

const app = express();

app.use(express.json());

// ...

app.use('/login', authRoute);
app.use('/users', usersRoutes);

app.use((err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message });      
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'UnprocessableError':
      res.status(422).json({ message });
      break;
      case 'UnauthorizedError':
        res.status(401).json({ message });
        break;
    default:
      console.warn(err); res.sendStatus(500);
      break;
  }
});
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
