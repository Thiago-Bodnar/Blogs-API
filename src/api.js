const express = require('express');
const usersRoutes = require('./routers/usersRoutes');
const authRoute = require('./routers/authRoute');
const errorMiddleware = require('./errors/errorMiddleware');

// ...

const app = express();

app.use(express.json());

// ...

app.use('/login', authRoute);
app.use('/user', usersRoutes);

app.use(errorMiddleware);
  
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
