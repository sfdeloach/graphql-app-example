import db from '../conn.mjs';
import { ObjectId } from 'mongodb';
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
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
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
    _id: { type: GraphQLID },
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
  name: 'RootQuery',
  fields: {
    book: {
      type: BookType,
      args: { _id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        let collection = await db.collection('books');
        let result = await collection.findOne({ _id: args._id });
        console.log(`[${new Date().toLocaleTimeString()}] query book`);
        return result;
      }
    },
    author: {
      type: AuthorType,
      args: { _id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        let collection = await db.collection('authors');
        let result = await collection.findOne({ _id: new ObjectId(args._id) });
        console.log(`[${new Date().toLocaleTimeString()}] query author`);
        return result;
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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        let collection = await db.collection('authors');
        let newDocument = { name: args.name, age: args.age };
        let result = await collection.insertOne(newDocument);

        if (result.acknowledged) {
          console.log(`[${new Date().toLocaleTimeString()}] added author`);
          return await collection.findOne({ _id: result.insertedId });
        } else {
          console.error(result);
        }
      }
    }
    // TODO: addBook, update, and delete, (insertMany and deleteAll for testing)
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

export default schema;
