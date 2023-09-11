# graphql-app-example

Many thanks to [Net Ninja](https://www.youtube.com/@NetNinja 'pretty awesome guy') for his
[GraphQL Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f). This
is codebase is not exactly the same as provided in the tutorial:

- [graphql-http](https://www.npmjs.com/package/graphql-http) is used instead of
  [express-graphql](https://www.npmjs.com/package/express-graphql)
- [Postman](https://www.postman.com/) was used to test the API instead of using
  [graphiql](https://github.com/graphql/graphiql)
- ES Modules were used instead of CommonJS Modules
- [MongoDB Atlas](https://www.mongodb.com/) was used in place of the now defunct
  [mLab](https://en.wikipedia.org/wiki/MLab)
- [mongoose](https://npmjs.com/package/mongoose) was not used. The native MongoDB driver was
  sufficient for this project.
- [vite](https://vitejs.dev/) was used instead of [create react app](https://create-react-app.dev/)
