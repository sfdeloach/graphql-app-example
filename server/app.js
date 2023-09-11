import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema/schema.js';

const app = express();
app.all('/graphql', createHandler({ schema }));

app.listen(4000, () => {
  console.log(`[${new Date().toLocaleTimeString()}] server listening`);
});

// TODO: https://www.codeconcisely.com/posts/graceful-shutdown-in-express/
// TODO: close mongoDB: await client.close();
