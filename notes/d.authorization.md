# Authorization
Authorization in Node.js is the process of determining if a user has the necessary permissions to perform a specific action or access a particular resource. This is typically handled after authentication (which verifies the user's identity) and ensures that authenticated users only have access to the resources and actions they are allowed.

Here are some common ways to implement authorization in a Node.js application:

### 1. **Role-Based Access Control (RBAC)**
- **Roles:** Users are assigned roles (e.g., admin, user, guest).
- **Permissions:** Roles are granted specific permissions (e.g., read, write, delete).
- **Implementation:** Check the user's role and permissions before allowing access to certain routes or actions.
  
```javascript
javascriptCopy code// Middleware example for checking roles
function checkRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  };
}

// Use the middleware in routes
app.get('/admin', checkRole('admin'), (req, res) => {
  res.send('Welcome, admin!');
});
```
### 2. **Access Control Lists (ACL)**
- **Lists:** Define specific permissions for each user or group of users.
- **Granularity:** More granular control compared to RBAC.
```javascript
javascriptCopy code// Example ACL configuration
const acl = {
  'admin': ['read', 'write', 'delete'],
  'user': ['read', 'write'],
  'guest': ['read']
};

// Middleware for checking permissions
function checkPermission(permission) {
  return (req, res, next) => {
    const role = req.user.role;
    if (acl[role] && acl[role].includes(permission)) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  };
}

// Use the middleware in routes
app.post('/resource', checkPermission('write'), (req, res) => {
  res.send('Resource created');
});
```
### 3. **JSON Web Tokens (JWT)**
- **Tokens:** JWTs can contain user roles and permissions.
- **Verification:** Tokens are verified and decoded to extract user information.
```javascript
javascriptCopy codeconst jwt = require('jsonwebtoken');

// Middleware to verify JWT and check roles
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized');
    req.user = decoded;
    next();
  });
}

function checkRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  };
}

// Use the middleware in routes
app.get('/admin', verifyToken, checkRole('admin'), (req, res) => {
  res.send('Welcome, admin!');
});
```


