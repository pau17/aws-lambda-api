import express from 'express';
import routes from './routers/router'

const app = express();
app.use("/", routes);

module.exports = app;