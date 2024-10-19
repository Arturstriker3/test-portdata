const express = require('express');
const api = express();
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middlewares/error";
import corsMiddleware from './middlewares/cors';
import routes from './routes';
import swaggerApp from './swagger';

AppDataSource.initialize().then(() => {

    api.use(corsMiddleware);
    api.use(express.json());
    api.use('/api-docs', swaggerApp);
    api.use(routes);
    api.use(errorMiddleware);
    
    api.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    });
});
