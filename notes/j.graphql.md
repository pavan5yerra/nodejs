# GRAPHQL

- GraphQL is an open source server-side technology which was developed by Facebook to optimize RESTful API calls.
-  It is an execution engine and a data query language. In this chapter, we discuss about the advantages of using GraphQL.
-  It is a specification that describes the behavior of a GraphQL server.
- It can be used with any available network protocol like TCP, websocket or any other transport layer protocol.
-  It is also neutral to databases, so you can use it with relational or NoSQL databases.


**Why GraphQL :**

- Ask exactly what you want.
- Get Many resources in single request.
- Strongly typed language , better for debugging


**Architecture :**

- GraphQL server with connected database
- GraphQL server that integrates existing systems
- Hybrid approach


### GraphQL Server with Connected Database:
-  On the receipt of a Query, the server reads the request payload and fetches data from the database. This is called resolving the query


![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/6wbzawIFIk2sdE-HzbOxQ.png?ixlib=js-3.7.0 "image.png")



### GraphQL Server Integrating Existing Systems




![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/PKFD_mge_TP9XypnEVgdf.png?ixlib=js-3.7.0 "image.png")





**Hybrid Approach :**

-  It will either retrieve data from connected database or from the integrated API’s.
![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/sNwXvOPMB2R7oqPwC1gLM.png?ixlib=js-3.7.0 "image.png")







# GraphQL - Application Components


- Server-side Components
- Client-side Components




### Server-Side Components:
**Schema :**

-  Defines the structure of the data available in the GraphQL API.
-  It includes types, queries, mutations, and subscriptions.
**Resolvers**: 

- Functions that handle the logic for fetching the data specified in the schema. They resolve the fields in the schema to actual data.
    - **Queries**: 
        - Define how to read data from the API. Clients use queries to request specific fields and nested data.
    - **Mutations**: 
        - Define how to write or modify data in the API. Clients use mutations to create, update, or delete data


### Client Side Components:
- GraphiQL 
    - Browser based interface for editing and testing Graphql queries & mutation
- Apollo Client
    - Best tool or middleware for building client application


![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/R-SiF5-Yc9tX6cclEcrVr.png?ixlib=js-3.7.0 "image.png")





**Server-side setup :**



```javascript
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        // Add context data like authentication info or database connections
    })
});

// Apply Apollo Server middleware to Express app
server.applyMiddleware({ app });

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
});
```




**Client  Side setup :**

```javascript
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

// Example Query Component
const GET_BOOKS = gql`
    query {
        books {
            id
            title
            author
        }
    }
`;

const Books = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Books</h2>
            <ul>
                {data.books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// App Component
const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h1>My Bookstore</h1>
            <Books />
        </div>
    </ApolloProvider>
);

export default App;
```




### Type System : 
- GraphQL is strongly typed language.
- this type system helps to define schema , which is contract between server and client.
- It supports below types(not data types)
    - Scalar , Object , Query , Mutation, Enum




**Scalar Type :**

- **Int** − Signed 32-bit Integer
- **Float** − Signed double precision floating point value
- **String** − UTF - 8-character sequence
- **Boolean** − True or false
- **ID** − A unique identifier, often used as a unique identifier to fetch an object or as the key for a cache.
```javascript
//field: data_type
greeting: String 
```
**Object Type :**

- It includes a combination of scalar type and even another object
```javascript
--Define an object type--
type Student {
   stud_id:ID
   firstname: String
   age: Int
   score:Float
}

--Defining a GraphQL schema--
type Query
{
   stud_details:[Student]
}
```


**Query Type**:

- The Query type defines the entry points for **data-fetching operations**
```javascript
type Query  {
   greeting: String
}
```


**Mutation Type :**

- Mutations are operations sent to the server to **create, update** or **delete** data. 
- These are analogous to the PUT, POST, PATCH and DELETE verbs to call REST-based APIs.
- Mutation type specifies the entry points for **data-manipulation operations.**
```javascript
type Mutation {
   addStudent(firstName: String, lastName: String): Student
}
```
**Enum Type :**

- An Enum is similar to a scalar type. 
- User-defined type.
- Enums are useful in a situation where the value for a field must be from a prescribed list of options.


```javascript
type Days_of_Week{
   SUNDAY
   MONDAY
   TUESDAY
   WEDNESDAY
   THURSDAY
   FRIDAY
   SATURDAY
}
```


**List Type :**

```javascript
**type Query {
   todos: [String]
} **
```


**Non Nullable Type :**

- By default, each of the core scalar types can be set to null.
-  In other words, these types can either return a value of the specified type or they can have no value. 
- To override this default and specify that a field must be defined, an exclamation mark **(!)** can be appended to a type.
```javascript
type Student {
   stud_id:ID!  ---> None Nullable
   firstName:String
   lastName:String
   fullName:String
   college:College
}
```




### Schema : 
 It describes the functionality available to the client applications that connect to it.

```javascript
import { makeExecutableSchema } from 'graphql-tools';

const jsSchema = makeExecutableSchema({
   typeDefs,
   resolvers, // optional
   logger, // optional
   allowUndefinedInResolve = false, // optional
   resolverValidationOptions = {}, // optional
   directiveResolvers = null, // optional
   schemaDirectives = null,  // optional
   parseOptions = {},  // optional
   inheritResolversFromInterfaces = false  // optional
});
```


**TypeDefs :**

```javascript
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        id: ID!
        title: String!
        author: String!
    }

    type Query {
        books: [Book]
        book(id: ID!): Book
    }

    type Mutation {
        addBook(title: String!, author: String!): Book
        updateBook(id: ID!, title: String, author: String): Book
        deleteBook(id: ID!): Book
    }
`;

```
****

**Resolvers | Query  |  Mutations:**



```javascript
const books = [
    { id: 1, title: "Book A", author: "Author A" },
    { id: 2, title: "Book B", author: "Author B" }
];


// Resolvers
const resolvers = {
   
   // Query 
    Query: {
        books: () => books,
        book: (parent, args) => books.find(book => book.id == args.id),
    },
    
    //Mutation
    Mutation: {
        addBook: (parent, args) => {
            const newBook = { id: books.length + 1, title: args.title, author: args.author };
            books.push(newBook);
            return newBook;
        },
        updateBook: (parent, args) => {
            const book = books.find(book => book.id == args.id);
            if (book) {
                if (args.title !== undefined) book.title = args.title;
                if (args.author !== undefined) book.author = args.author;
            }
            return book;
        },
        deleteBook: (parent, args) => {
            const index = books.findIndex(book => book.id == args.id);
            if (index !== -1) {
                const [deletedBook] = books.splice(index, 1);
                return deletedBook;
            }
            return null;
        }
    }
    
}
```




**GraphQL Query Examples :**



```javascript
[
  { "id": "1", "title": "1984", "authorId": "1", "genreId": "1" },
  { "id": "2", "title": "Brave New World", "authorId": "2", "genreId": "1" },
  { "id": "3", "title": "The Great Gatsby", "authorId": "3", "genreId": "2" }
]
```


```
[
  { "id": "1", "name": "George Orwell" },
  { "id": "2", "name": "Aldous Huxley" },
  { "id": "3", "name": "F. Scott Fitzgerald" }
]
```
```
[
  { "id": "1", "name": "Dystopian" },
  { "id": "2", "name": "Classic" }
]
```
**Example GraphQL Queries:**



```javascript
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

query GetBookById($bookId: ID!) {
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

query GetAuthorById($authorId: ID!) {
  author(id: $authorId) {
    id
    name
    books {
      id
      title
    }
  }
}

```


**Example GraphQL Schema:**

```javascript
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

schema {
  query: Query
  mutation: Mutation
}
```
