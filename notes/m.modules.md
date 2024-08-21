**Guiding principles of rest API**

- stateless  
    - server should store any data related to client
    - it should act as pure functions
    - client can send data via request header or body / url params
- security 
    - using authentication and authorization to API's resources
    - using JWT token for stateless authentications
    - using role based and access list based authorizations
- client - server (seperation)
    - client should handle UI
    - server should handle data model and business logic
- Uniform API's
    - using of proper methods  such get , post , put , delete
    - use proper versionings from the start
- Caching 
    - Caching the data is very important , it reduces the  load and request for databases
- Resource identifictaion : 
    - identification need to very  specific to single entity of a reosurce.
    - api/get/book/1














