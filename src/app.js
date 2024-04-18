import express from 'express';
import routes from './routers/router.js'; 

const app = express();
app.use("/", routes);

export default app; 