# EventEmitter

In Node.js, an event emitter is a pattern that allows objects (emitters) to communicate asynchronously. It is a core feature of Node.js and is used extensively throughout its APIs.



```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a listener
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit the event
emitter.emit('greet', 'Alice');
```
- **on(eventName, listener)** : Adds a listener for the specified event.
- **emit(eventName, [...args])**  : Synchronously calls each of the listeners registered for the event named `eventName`  , in the order they were registered, passing the supplied arguments to each.
- **once(eventName, listener)**  : Adds a one-time listener for the event named `eventName`  . This listener is invoked only the next time the event is fired, after which it is removed.
- **removeListener(eventName, listener)**  : Removes the specified listener from the listener array for the event named `eventName`  .
- **removeAllListeners([eventName])**  : Removes all listeners or those of the specified event name.


```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

const listener = (name) => {
  console.log(`Hello, ${name}!`);
};

// Register a one-time listener
emitter.once('greetOnce', listener);

// Emit the event (listener will be called)
emitter.emit('greetOnce', 'Bob');

// Emit the event again (listener won't be called)
emitter.emit('greetOnce', 'Bob');

// Register a regular listener
emitter.on('greet', listener);

// Remove the listener
emitter.removeListener('greet', listener);

// Emit the event (listener won't be called)
emitter.emit('greet', 'Charlie');
```


Imagine you have a Node.js server that needs to perform several actions whenever a user logs in:

1. **Log the login activity.**
2. **Send a welcome email.**
3. **Update the user's last login timestamp in the database.**


1. **Setup EventEmitter and Event Listeners:**
```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Listener for logging the login activity
emitter.on('userLogin', (user) => {
  console.log(`User ${user.name} logged in at ${new Date()}`);
  // Additional logging logic...
});

// Listener for sending a welcome email
emitter.on('userLogin', (user) => {
  console.log(`Sending welcome email to ${user.email}`);
  // Email sending logic...
});

// Listener for updating the last login timestamp
emitter.on('userLogin', (user) => {
  console.log(`Updating last login timestamp for ${user.name}`);
  // Database update logic...
});
```
1. **Emit the Event When a User Logs In:**
Assume you have a login function that is called when a user successfully logs in:

```javascript
function loginUser(user) {
  // Perform login logic...
  
  // Emit the userLogin event
  emitter.emit('userLogin', user);
}

// Example user object
const user = {
  name: 'Alice',
  email: 'alice@example.com'
};

// Call the login function to simulate a user login
loginUser(user);
```
1. **Output:**
When the `loginUser` the function is called with the user object, the `userLogin` event is emitted, triggering all registered listeners:

```sql
User Alice logged in at Tue Jul 09 2024 10:00:00 GMT+0000 (UTC)
Sending welcome email to alice@example.com
Updating last login timestamp for Alice
```


