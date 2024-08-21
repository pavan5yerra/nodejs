### 1. **Plan Your API**
- **Define Purpose and Scope:** Clearly understand the problem your API solves and its scope.
- **Identify Resources:** Determine the main entities/resources your API will manage.
### 2. **Design Your API**
- **Use Proper HTTP Methods:**
    - `GET`  to retrieve resources.
    - `POST`  to create new resources.
    - `PUT`  to update/replace resources.
    - `PATCH`  to update/modify resources.
    - `DELETE`  to delete resources.
- **Use Proper Status Codes:**
    - `200 OK`  for successful GET, PUT, PATCH, DELETE operations.
    - `201 Created`  for successful POST operations.
    - `204 No Content`  for successful operations that don't return data.
    - `400 Bad Request`  for client-side input errors.
    - `401 Unauthorized`  for authentication issues.
    - `403 Forbidden`  for authorization issues.
    - `404 Not Found`  for non-existent resources.
    - `500 Internal Server Error`  for server-side errors.
- **Organize URIs:**
    - Use nouns to represent resources.
    - Use plurals for resource collections.
    - Nested resources for hierarchical data.
- **Versioning:** Include versioning in the URI (e.g., `/api/v1/`  ).
- **Pagination, Filtering, and Sorting:** Implement pagination to manage large datasets, and allow filtering and sorting of results.
### 3. **Implement Security**
- **Use HTTPS:** Always use HTTPS to encrypt data.
- **Authentication and Authorization:**
    - Use OAuth2 or JWT for secure authentication.
    - Implement role-based access control (RBAC).
- **Input Validation and Sanitization:** Validate and sanitize all inputs to prevent SQL injection and other attacks.
- **Rate Limiting:** Implement rate limiting to prevent abuse and ensure fair usage.
### 4. **Implement Error Handling**
- **Consistent Error Responses:** Use a standard format for error responses (e.g., JSON with error code and message).
- **Meaningful Error Messages:** Provide clear and actionable error messages.
### 5. **Documentation**
- **Auto-generate Documentation:** Use tools like Swagger/OpenAPI to generate interactive API documentation.
- **Examples:** Provide examples of request and response payloads.
### 6. **Testing**
- **Unit Testing:** Test individual components of your API.
- **Integration Testing:** Test how components work together.
- **End-to-End Testing:** Test the entire workflow from start to finish.
- **Use Tools:** Utilize tools like Postman for manual testing and Jenkins for automated testing.
### 7. **Monitoring and Logging**
- **Logging:** Implement logging to track API usage and errors.
- **Monitoring:** Use monitoring tools to keep track of API performance and uptime.
### 8. **Guiding principles of rest API**
- **stateless **
    - server should store any data related to client
    - it should act as pure functions
    - client can send data via request header or body / url params
- **Caching **
    - Caching the data is very important , it reduces the load and request for databases
- **Resource identifictaion **
    - identification need to very specific to single entity of a reosurce.
    - api/get/book/1





npm install express jsonwebtoken bcryptjs mongoose body-parser

``` javascript
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/rest-api-example', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

// Todo Schema
const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Todo = mongoose.model('Todo', TodoSchema);

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, 'your_jwt_secret_key');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

// Rate limiter for all routes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

app.use(apiLimiter);

// Rate limiter for authentication routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many authentication requests from this IP, please try again later.'
});

// Register
app.post('/register', authLimiter, async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).send('User already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully');
});

// Login
app.post('/login', authLimiter, async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('User not found');

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    res.header('Authorization', token).send({ token });
});

// Get all todos
app.get('/todos', authenticateJWT, async (req, res) => {
    const todos = await Todo.find({ user: req.user._id });
    res.send(todos);
});

// Create new todo
app.post('/todos', authenticateJWT, async (req, res) => {
    const { title, description } = req.body;
    const todo = new Todo({
        title,
        description,
        user: req.user._id
    });
    await todo.save();
    res.status(201).send(todo);
});

// Get single todo
app.get('/todos/:id', authenticateJWT, async (req, res) => {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) return res.status(404).send('Todo not found');
    res.send(todo);
});

// Update todo
app.put('/todos/:id', authenticateJWT, async (req, res) => {
    const { title, description } = req.body;
    const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { title, description },
        { new: true }
    );
    if (!todo) return res.status(404).send('Todo not found');
    res.send(todo);
});

// Delete todo
app.delete('/todos/:id', authenticateJWT, async (req, res) => {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!todo) return res.status(404).send('Todo not found');
    res.send('Todo deleted');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```




```
curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpassword"}' http://localhost:3000/register
```
```
curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpassword"}' http://localhost:3000/login
```
```
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/todos
```
### Improvements
- **Input Validation:** Use `express-validator`  to validate and sanitize inputs.
- **Rate Limiting:** Use `express-rate-limit`  to prevent abuse.
- **Documentation:** Use Swagger to generate API documentation.
- **Error Handling:** Create a middleware for consistent error handling.


