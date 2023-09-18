import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema/schema.js';
import cors from 'cors';

const url = 'http://localhost:5173'; // only process requests from this url
const app = express();

app.use(cors({ origin: url }));
app.use('/graphql', createHandler({ schema }));

app.listen(4000, () => {
  console.log(`[${new Date().toLocaleTimeString()}] server listening`);
});
