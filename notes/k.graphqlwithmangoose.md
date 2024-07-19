

### Server Side : 


### 1. Set Up the Project
First, create a new directory for your project and navigate into it. Initialize a new Node.js project:

```bash
bashCopy codemkdir graphql-mongoose-library
cd graphql-mongoose-library
npm init -y
```
Install the necessary dependencies:

```bash
bashCopy codenpm install apollo-server-express express mongoose graphql graphql-tools
```
### 2. Define Mongoose Models
Create a file named `models.js` for the Mongoose models:

```javascript
// models.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  authorId: mongoose.Schema.Types.ObjectId,
  genreId: mongoose.Schema.Types.ObjectId,
});

const authorSchema = new mongoose.Schema({
  name: String,
});

const genreSchema = new mongoose.Schema({
  name: String,
});

const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);
const Genre = mongoose.model('Genre', genreSchema);

module.exports = { Book, Author, Genre };
```
### 3. Define the GraphQL Schema
Create a file named `schema.js` for the GraphQL schema:

```javascript
// schema.js
const { gql } = require('apollo-server-express');
const { Book, Author, Genre } = require('./models');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: Author!
    genre: Genre!
  }

  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Genre {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
    author(id: ID!): Author
    genres: [Genre!]!
    genre(id: ID!): Genre
  }

  type Mutation {
    addBook(title: String!, authorId: ID!, genreId: ID!): Book
    updateBook(id: ID!, title: String, authorId: ID, genreId: ID): Book
    deleteBook(id: ID!): Book
    addAuthor(name: String!): Author
    updateAuthor(id: ID!, name: String): Author
    deleteAuthor(id: ID!): Author
    addGenre(name: String!): Genre
    updateGenre(id: ID!, name: String): Genre
    deleteGenre(id: ID!): Genre
  }
`;

const resolvers = {
  Query: {
    books: async () => await Book.find(),
    book: async (_, { id }) => await Book.findById(id),
    authors: async () => await Author.find(),
    author: async (_, { id }) => await Author.findById(id),
    genres: async () => await Genre.find(),
    genre: async (_, { id }) => await Genre.findById(id),
  },
  Mutation: {
    addBook: async (_, { title, authorId, genreId }) => {
      const book = new Book({ title, authorId, genreId });
      return await book.save();
    },
    updateBook: async (_, { id, title, authorId, genreId }) => {
      return await Book.findByIdAndUpdate(id, { title, authorId, genreId }, { new: true });
    },
    deleteBook: async (_, { id }) => {
      return await Book.findByIdAndRemove(id);
    },
    addAuthor: async (_, { name }) => {
      const author = new Author({ name });
      return await author.save();
    },
    updateAuthor: async (_, { id, name }) => {
      return await Author.findByIdAndUpdate(id, { name }, { new: true });
    },
    deleteAuthor: async (_, { id }) => {
      return await Author.findByIdAndRemove(id);
    },
    addGenre: async (_, { name }) => {
      const genre = new Genre({ name });
      return await genre.save();
    },
    updateGenre: async (_, { id, name }) => {
      return await Genre.findByIdAndUpdate(id, { name }, { new: true });
    },
    deleteGenre: async (_, { id }) => {
      return await Genre.findByIdAndRemove(id);
    },
  },
  Book: {
    author: async (book) => await Author.findById(book.authorId),
    genre: async (book) => await Genre.findById(book.genreId),
  },
  Author: {
    books: async (author) => await Book.find({ authorId: author.id }),
  },
  Genre: {
    books: async (genre) => await Book.find({ genreId: genre.id }),
  },
};

module.exports = { typeDefs, resolvers };
```
### 4. Create the Server
Create a file named `server.js` to set up the server:

```javascript
// server.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schema');

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true, useUnifiedTopology: true });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
```
### 5. Populate the Database
You can create a script to populate the database with some initial data. Create a file named `populate.js`:

```javascript
// populate.js
const mongoose = require('mongoose');
const { Book, Author, Genre } = require('./models');

const populate = async () => {
  await mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true, useUnifiedTopology: true });

  const authors = [
    new Author({ name: 'George Orwell' }),
    new Author({ name: 'Aldous Huxley' }),
    new Author({ name: 'F. Scott Fitzgerald' }),
  ];
  
  const genres = [
    new Genre({ name: 'Dystopian' }),
    new Genre({ name: 'Classic' }),
  ];

 // inserting to author & Genre database
  await Author.insertMany(authors);
  await Genre.insertMany(genres);

  const books = [
    new Book({ title: '1984', authorId: authors[0].id, genreId: genres[0].id }),
    new Book({ title: 'Brave New World', authorId: authors[1].id, genreId: genres[0].id }),
    new Book({ title: 'The Great Gatsby', authorId: authors[2].id, genreId: genres[1].id }),
  ];

 // inserting into books
  await Book.insertMany(books);

  mongoose.connection.close();
};

populate();
```
Run the script to populate the database:

```bash
 codenode populate.js
```
### 6. Start the Server
Finally, start the server:

```bash
codenode server.js
```
### 7. Querying the Server
You can use a tool like Apollo Studio Explorer or Postman to run GraphQL queries against your server.

#### Fetching All Books with Authors and Genres
```javascript
GetAllBooks {
  books {
    id
    title
    author {
      id
      name
    }
    genre {
      id
      name
    }
  }
}
```
#### Fetching a Specific Book by ID with Author and Genre
```javascript
GetBookById($bookId: ID!) {
  book(id: $bookId) {
    id
    title
    author {
      id
      name
    }
    genre {
      id
      name
    }
  }
}
```
#### Fetching All Authors with Their Books
```graphql
GetAllAuthors {
  authors {
    id
    name
    books {
      id
      title
    }
  }
}
```
#### Fetching All Genres with Their Books
```graphql
 GetAllGenres {
  genres {
    id
    name
    books {
      id
      title
    }
  }
}
```
### Summary
This full implementation demonstrates how to set up a GraphQL server with Apollo Server, connect it to a MongoDB database using Mongoose, define a GraphQL schema, and create resolvers for querying and mutating data. The provided examples show how to fetch and manipulate data from a sample library management system.



**Client Side Implementation : **

### 1. Set Up the Client Project
First, create a new directory for your client project and navigate into it. Initialize a new React project using Create React App:

```bash
codenpx create-react-app graphql-client
cd graphql-client
```
Install the necessary dependencies:

```bash
codenpm install @apollo/client graphql
```
### 2. Configure Apollo Client
Create a file named `ApolloClient.js` in the `src` directory to configure Apollo Client:

```javascript
// src/ApolloClient.js
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import React from 'react';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});

const ApolloClientProvider = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default ApolloClientProvider;
```
### 3. Create Components
Create a directory named `components` in the `src` directory and add the following components:

#### Books Component
This component fetches and displays all books with their authors and genres:

```javascript
// src/components/Books.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_BOOKS = gql`
  query GetAllBooks {
    books {
      id
      title
      author {
        id
        name
      }
      genre {
        id
        name
      }
    }
  }
`;

const Books = () => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {data.books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author.name} (Genre: {book.genre.name})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
```
#### Authors Component
This component fetches and displays all authors with their books:

```javascript
// src/components/Authors.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_AUTHORS = gql`
  query GetAllAuthors {
    authors {
      id
      name
      books {
        id
        title
      }
    }
  }
`;

const Authors = () => {
  const { loading, error, data } = useQuery(GET_ALL_AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Authors</h2>
      <ul>
        {data.authors.map(author => (
          <li key={author.id}>
            {author.name}
            <ul>
              {author.books.map(book => (
                <li key={book.id}>{book.title}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Authors;
```
#### Genres Component
This component fetches and displays all genres with their books:

```javascript
// src/components/Genres.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_GENRES = gql`
  query GetAllGenres {
    genres {
      id
      name
      books {
        id
        title
      }
    }
  }
`;

const Genres = () => {
  const { loading, error, data } = useQuery(GET_ALL_GENRES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Genres</h2>
      <ul>
        {data.genres.map(genre => (
          <li key={genre.id}>
            {genre.name}
            <ul>
              {genre.books.map(book => (
                <li key={book.id}>{book.title}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genres;
```
### 4. Update the App Component
Update the `App.js` file to include the Apollo Client provider and the components:

```javascript
javascriptCopy code// src/App.js
import React from 'react';
import ApolloClientProvider from './ApolloClient';
import Books from './components/Books';
import Authors from './components/Authors';
import Genres from './components/Genres';

const App = () => (
  <ApolloClientProvider>
    <div>
      <h1>Library Management System</h1>
      <Books />
      <Authors />
      <Genres />
    </div>
  </ApolloClientProvider>
);

export default App;
```
### 5. Run the Client Application
Start the React application:

```bash
codenpm start
```


