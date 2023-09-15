import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema/schema.js';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  accessControlAllowOrigin: '*',
  accessControlAllowCredentials: true
};

app.use(cors(corsOptions));

app.use('/graphql', createHandler({ schema }));

app.listen(4000, () => {
  console.log(`[${new Date().toLocaleTimeString()}] server listening`);
});

// TODO: https://www.codeconcisely.com/posts/graceful-shutdown-in-express/
// TODO: close mongoDB: await client.close();
