import cors from 'cors';

const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;