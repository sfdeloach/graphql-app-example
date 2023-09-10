import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} from 'graphql';

// dummy book and author data
let books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorID: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorID: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorID: '3' },
  { name: 'The Hero of Ages', genre: 'Sci-Fi', id: '4', authorID: '2' },
  { name: 'The Color of Magic', genre: 'Fantasy', id: '5', authorID: '3' },
  { name: 'The Light Speed Express', genre: 'Sci-Fi', id: '6', authorID: '3' }
];

let authors = [
  { name: 'Patrick Rathaus', age: 44, id: '1' },
  { name: 'Brandon Andersons', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorID: { type: GraphQLID },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        // code to get data from db/other source
        return authors.find(author => author.id === parent.authorID);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        // code to get data from db/other source
        return books.filter(book => book.authorID === parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        // code to get data from db/other source
        return books.find(book => book.id === args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        // code to get data from db/other source
        return authors.find(author => author.id === args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      args: { max: { type: GraphQLInt } },
      resolve: (parent, args) => {
        // code to get data from db/other source
        if (args.max === undefined) {
          return books;
        }

        return books.slice(0, args.max);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => {
        // code to get data from db/other source
        return authors;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery
});

export default schema;
