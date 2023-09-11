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

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author_id: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: async (parent, args) => {
        let result = await db
          .collection('authors')
          .findOne({ _id: new ObjectId(parent.author_id) });
        return result;
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
      resolve: async (parent, args) => {
        //return books.filter(book => book.authorID === parent.id);
        let result = await db.collection('books').find({ author_id: parent._id });
        console.log(result);
        return result;
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
        let result = await db.collection('books').findOne({ _id: new ObjectId(args._id) });
        console.log(`[${new Date().toLocaleTimeString()}] query book`);
        return result;
      }
    },
    author: {
      type: AuthorType,
      args: { _id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        let result = await db.collection('authors').findOne({ _id: new ObjectId(args._id) });
        console.log(`[${new Date().toLocaleTimeString()}] query author`);
        return result;
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (parent, args) => {
        let result = await db.collection('books').find({});
        console.log(`[${new Date().toLocaleTimeString()}] query all books`);
        return result;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: async (parent, args) => {
        let result = await db.collection('authors').find({});
        console.log(`[${new Date().toLocaleTimeString()}] query all authors`);
        return result;
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
          return result;
        }
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author_id: { type: GraphQLID }
      },
      resolve: async (parent, args) => {
        let collection = await db.collection('books');
        let newDocument = { name: args.name, genre: args.genre, author_id: args.author_id };
        let result = await collection.insertOne(newDocument);

        if (result.acknowledged) {
          console.log(`[${new Date().toLocaleTimeString()}] added book`);
          return await collection.findOne({ _id: result.insertedId });
        } else {
          console.error(result);
          return result;
        }
      }
    }
    // TODO: update, and delete, (insertMany and deleteAll for testing)
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

export default schema;
