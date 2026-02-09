import express from 'express';
import routes from '../routes/index.js';
import errorHandler from '../middlewares/error.js';

const app = express();

app.use(routes);
app.use('/covers', express.static('src/services/covers/files/images'));
app.use(errorHandler);

export default app;