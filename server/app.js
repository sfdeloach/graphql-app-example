import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema/schema.js';

const app = express();
app.all('/graphql', createHandler({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
