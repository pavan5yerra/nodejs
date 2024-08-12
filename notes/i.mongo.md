

**What is MongoDB ..?**

MongoDB is a cross-platform, document-oriented database provides, high performance, high availability, and easy scalability.



**Database in MongoDB:** It's a Physical container for collections, Each database gets its own set of files called collections.



**Collections **: Collections is table in Mongo DB , Its is similar to RDBMS table



**Document**:  Its key-value pair.

|  |  |
| ----- | ----- |
| **RDBMS** | **MongoDB** |
| Database | Database |
| Table | Collection |
| Tuple/Row | Document |
| column | Field |
| Table Join | Embedded Documents |
| Primary Key | Primary Key (Default key _id provided by MongoDB itself) |


| **Database Server and Client** |  |
| ----- | ----- |
| mysqld/Oracle | mongod |
| mysql/sqlplus | mongo |


**Sample Document :**



```javascript
{
   _id: ObjectId(7df78ad8902c)
   title: 'MongoDB Overview', 
   description: 'MongoDB is no sql database',
   by: 'tutorials point',
   url: 'http://www.tutorialspoint.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100, 
   comments: [	
      {
         user:'user1',
         message: 'My first comment',
         dateCreated: new Date(2011,1,20,2,15),
         like: 0 
      },
      {
         user:'user2',
         message: 'My second comments',
         dateCreated: new Date(2011,1,25,7,45),
         like: 5
      }
   ]
}
```


## Why MongoDB over RDBMS?


**schema-less**: The number of fields, content, and size of the document can differ from one document to another.

**No Complex Joins:  **Instead of joins we have embedded documents.

**Deep Query ability: It** uses document-based Query language.

**Easy of scale-out**:  replication and high availability, Auto-Sharding can be done at ease.

**Index on any attribute: **



## Where to Use MongoDB?
- BigData.
- Content Management and Delivery (CMS).
- Mobile and social infra.
- User Data Management.


## Data Modelling 


There are two types of data models 

- Embedded data model - All related data will be in a single document
- Normalized data model - you can refer the sub-documents using references


### Embedded Data Model:
```javascript
{
	_id: ,
	Emp_ID: "10025AE336"
	Personal_details:{
		First_Name: "Radhika",
		Last_Name: "Sharma",
		Date_Of_Birth: "1995-09-26"
	},
	Contact: {
		e-mail: "radhika_sharma.123@gmail.com",
		phone: "9848022338"
	},
	Address: {
		city: "Hyderabad",
		Area: "Madapur",
		State: "Telangana"
	}
}
```


### Normalized Data Model:


**Employee:**

```javascript
{
	_id: <**ObjectId101**>,
	Emp_ID: "10025AE336"
}
```
**Personal_details:**

```javascript
{
	_id: <ObjectId102>,
	empDocID: " **ObjectId101**",
	First_Name: "Radhika",
	Last_Name: "Sharma",
	Date_Of_Birth: "1995-09-26"
}
```
**Contact:**

```javascript
{
	_id: <ObjectId103>,
	empDocID: " **ObjectId101**",
	e-mail: "radhika_sharma.123@gmail.com",
	phone: "9848022338"
}
```




## Considerations while designing Schema in MongoDB:


- Design your schema as per user requirements.
- Combine documents, if you want to use them together.
- While using normalized data model make sure **you won't use joins.**
- Duplicate the data (but limited) because disk space is cheaper than computation.
- Do joins while writing not read.


In RDBMS schema, the design for the above requirements will have a minimum three tables.

![RDBMS Schema Design](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/pXYpoQHUezQEtmsbdoze4.png?ixlib=js-3.7.0 "")

While in MongoDB schema, the design will have one collection post and the following structure −

```javascript
{
   _id: POST_ID
   title: TITLE_OF_POST, 
   description: POST_DESCRIPTION,
   by: POST_BY,
   url: URL_OF_POST,
   tags: [TAG1, TAG2, TAG3],
   likes: TOTAL_LIKES, 
   comments: [	
      {
         user:'COMMENT_BY',
         message: TEXT,
         dateCreated: DATE_TIME,
         like: LIKES 
      },
      {
         user:'COMMENT_BY',
         message: TEXT,
         dateCreated: DATE_TIME,
         like: LIKES
      }
   ]
}
```
So while showing the data, in RDBMS you need to join three tables and in MongoDB, data will be shown from one collection only.



**Starting MongoDB Server : **

**mongod**



**Open MongoDB shell : **

mongosh



How do we see how many databases are present in the server?

```javascript
>show dbs
local     0.78125GB
test      0.23012GB
```
How to use a specific database or create database?

```javascript
>use mydb
switched to db mydb
```
To display a database, you need to insert at least one document into it.

```javascript
>db.movie.insert({"name":"tutorials point"})

>show dbs
local      0.78125GB
mydb       0.23012GB
test       0.23012GB
```


**Drop Database :**

```javascript
>use mydb
switched to db mydb

>db.dropDatabase()
>{ "dropped" : "mydb", "ok" : 1 }
```




**Create Collections : **

```javascript

>db.createCollection("mycollection")
{ "ok" : 1 }
```
using options: 

```javascript
> db.createCollection("mycol", { capped : true, autoIndexID : true, size : 6142800, max : 10000 } ){
"ok" : 0,
"errmsg" : "BSON field 'create.autoIndexID' is an unknown field.",
"code" : 40415,
"codeName" : "Location40415"
}
```
**capped:** A capped collection is a fixed-size collection that automatically overwrites its older entries when it reaches maximum size.

**autoIndexId:** If true, it will automatically create an index on _id, default value is false.

**size: **If capped is true, then we need to set the collection size.

**max:** Specifies the maximum number of documents allowed in the capped collection





**Dropping collection :**



```javascript
>show collections
mycol
mycollection
system.indexes
tutorialspoint

>db.mycollection.drop()
true
```


## Datatypes MongoDB Supports:
**String**: String in MongoDB must be UTF-8.

**Integer** : Integer can be 32 bit or 64 bit based on server

**Double** : to store float values

**Boolean **: true/false

**Arrays **:  Store arrays of objects

**Object** :  Store plain javascript objects

**Null**: Store null value

**Date** :  used to store the current date or time in UNIX time format

**Object ID** : store the document’s ID.

**BInary data** :  store binary data.

**Regular expression** : store regular expression.





## CURD OPERATIONS:


**Inserting :**



- insert({}); --> inserting single document
- insert([{},{}]); --> inserting multiple documents.
- insertOne({}); --> inserting single documents.
- insertMany([]); --> Inserting multiple documents.
```javascript
> db.createCollection("post")
> db.post.insert(
                {
		title: "MongoDB Overview",
		description: "MongoDB is no SQL database",
		by: "tutorials point",
		url: "http://www.tutorialspoint.com",
		tags: ["mongodb", "database", "NoSQL"],
		likes: 100
 }
		);
```


```javascript
> db.createCollection("empDetails")
{ "ok" : 1 }
```
```javascript
> db.empDetails.insertOne(
	{
		First_Name: "Radhika",
		Last_Name: "Sharma",
		Date_Of_Birth: "1995-09-26",
		e_mail: "radhika_sharma.123@gmail.com",
		phone: "9848022338"
	})
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5dd62b4070fb13eec3963bea")
}
```


```javascript
> db.empDetails.insertMany(
	[
		{
			First_Name: "Radhika",
			Last_Name: "Sharma",
			Date_Of_Birth: "1995-09-26",
			e_mail: "radhika_sharma.123@gmail.com",
			phone: "9000012345"
		},
		{
			First_Name: "Rachel",
			Last_Name: "Christopher",
			Date_Of_Birth: "1990-02-16",
			e_mail: "Rachel_Christopher.123@gmail.com",
			phone: "9000054321"
		},
		{
			First_Name: "Fathima",
			Last_Name: "Sheik",
			Date_Of_Birth: "1990-02-16",
			e_mail: "Fathima_Sheik.123@gmail.com",
			phone: "9000054321"
		}
	]
)
{
	"acknowledged" : true,
	"insertedIds" : [
		ObjectId("5dd631f270fb13eec3963bed"),
		ObjectId("5dd631f270fb13eec3963bee"),
		ObjectId("5dd631f270fb13eec3963bef")
	]
}
```


**Reading:**



find() --> It shows all the documents in the collection

find().pretty();  --> It shows all the documents with beautify.

findOne({key:value}); -->  It only get the one document.



**Querying using find:**

```javascript
// Using where

﻿--> where by = 'tutorials point'
db.mycol.find({"by":"tutorials point"})

--> where likes < 50
db.mycol.find({"likes" : {$lt : 50}}).pretty();

--> where likes <= 50
db.mycol.find({"likes" : {$lte : 50}}).pretty();

--> where likes > 50
db.mycol.find({"likes" : {$gt : 50}}).pretty();

--> where likes >= 50
db.mycol.find({"likes" : {$gte : 50}}).pretty();

--> where likes != 50
db.mycol.find({"likes" : {$ne : 50}}).pretty();

--> where name matches any of the value in :["Raj", "Ram", "Raghu"]
db.mycol.find({"name" : {$in : ["Raj", "Ram", "Raghu"]}}).pretty();

--> where name values is not in the array :["Ramu", "Raghav"] or, doesn’t exist at all
db.mycol.find({"name" : {$nin : ["Raj", "Ram", "Raghu"]}}).pretty();
```


```javascript
// Using AND | OR
--> where by = 'tutorials point' AND title = 'MongoDB Overview'
db.mycol.find({ $and : [{"by" :'tutorials point'} , {"title" : "MongoDB Overview"}]}).pretty();

--> where by = 'tutorials point' OR title = 'MongoDB Overview'
db.mycol.find({$or : [{"by" :'tutorials point'} , {"title" : "MongoDB Overview"}]}).pretty();

--> where likes>10 AND (by = 'tutorials point' OR title = 'MongoDB Overview')
db.mycol.find({"likes":{"$gt":10} , $or :  [{"by" :'tutorials point'} , {"title" : "MongoDB Overview"}]}).pretty();

--> whose age is not greater than 25
db.mycol.find("age" : {$not: {$gt:25}});

--> whose first name is not "Radhika" and last name is not "Christopher"
db.mycol.find($nor : [{"first_name": "Radhika"},{"last_name":"Christopher"}]}).pretty();
```




**Update the Document :** 

- Update and save methods are used to update the document in MongoDB.
- Update will update/modify the existing document.
- Save will replace the existing document.


- update({key:value}{$set})  --> updates single document;
- update({key:value},{$set : {key:value}},{"multi": true )  --> updates multiple document;
- updateOne({key:value} , {$set:{key:value}}); --> updates single document;
- updateMany({key:value} , {$set:{key:value}});  --> updates multiple document
- findOneAndUpdate({key:value} , {$set:{key:value}});--> updates single document;




Set the new title **'New MongoDB Tutorial'** of the documents whose **title is 'MongoDB Overview'.**

```javascript
﻿db.myCol.update({"title":"MongoDB"}, {$set : {"title":"New Mongo"}});
db.myCol.updateOne({"title":"MongoDB"}, {$set : {"title":"New Mongo"}});
db.myCol.findOneAndUpdate({"title":"MongoDB"}, {$set : {"title":"New Mongo"}});

//updating multiple docs
db.myCol.update({"title":"MongoDB"}, {$set : {"title":"New Mongo"}} , {multi: true});
db.myCol.updateMany({age: {$gt : "25"}} , {$set: {age: 100}});

```
 



**Deleting the Document :**



remove({})  --> remove all the records in collections

remove({key:value}) --> remove only one

```javascript
-->remove all the documents whose title is 'MongoDB Overview'.
db.mycol.remove({'title':'MongoDB Overview'})

--> remove all docs
db.mycol.remove({})
```


**Projections:**

- Projections mean only necessary data rather than selecting whole data in docs.
- To set we need to set fields with 1 & 0 .  1 to visible and 0 is invisible.
   

Consider the collection mycol has the following data −

```javascript
{_id : ObjectId("507f191e810c19729de860e1"), title: "MongoDB Overview"},
{_id : ObjectId("507f191e810c19729de860e2"), title: "NoSQL Overview"},
{_id : ObjectId("507f191e810c19729de860e3"), title: "Tutorials Point Overview"}
```
```javascript
>db.mycol.find({},{"title":1,_id:0})
{"title":"MongoDB Overview"}
{"title":"NoSQL Overview"}
{"title":"Tutorials Point Overview"}
```


**Limit the Records :**

```javascript
>db.mycol.find({},{"title":1,_id:0}).limit(2)
{"title":"MongoDB Overview"}
{"title":"NoSQL Overview"}

```
**Skip the records :** 

```javascript
>db.mycol.find({},{"title":1,_id:0}).limit(1).skip(1)
{"title":"NoSQL Overview"}

```


**Sorting the documents :**

- To specify sorting order 1 and -1 are used. 
- 1 is used for ascending order while -1 is used for descending order.
```javascript
>db.mycol.find({},{"title":1,_id:0}).sort({"title":-1})
{"title":"Tutorials Point Overview"}
{"title":"NoSQL Overview"}
{"title":"MongoDB Overview"}
```




### Indexing : 
- In a general scenario, mongo db should go through every doc to query filtering. and its inefficient when having large volume data.
- Index support efficient resolution of queries.
- Index are special data structure, and store small portion about feilds which we mention for indexing 
- key is the name of the field on which you want to create index 
- 1 is for ascending order. -1 for  descending order.
- you can compare like index page of book.


**Creating an index on a single field.**

```javascript
>db.mycol.createIndex({"title":1})
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
```


**Creating an index on multiple fields.**

```javascript
db.mycol.createIndex({"title":1,"description":-1})
```


**Optional accepting in CreateIndex method.**

```javascript
db.users.createIndex(
  { lastName: 1, firstName: 1 },
  {
    unique: true,
    background: true,
    sparse: true,
    expireAfterSeconds: 3000
  }
)
```
**unique**:  when it's true, the collection won't accept the insertion of documents with the same key.

**background** : so that building an index does not block other database activities

**sparse** :  the index only references documents with the specified field. These indexes use less space but behave differently in some situations (particularly sorts).

****


**Aggregations :**

- It processes data records and return computed results.
- It groups values from multiple documents and performs various operations, providing single result.
- similar to group by operation in sql.


**Sample data : **

```
{
   _id: ObjectId(7df78ad8902c)
   title: 'MongoDB Overview', 
   description: 'MongoDB is no sql database',
   by_user: 'tutorials point',
   url: 'http://www.tutorialspoint.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100
},
{
   _id: ObjectId(7df78ad8902d)
   title: 'NoSQL Overview', 
   description: 'No sql database is very fast',
   by_user: 'tutorials point',
   url: 'http://www.tutorialspoint.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 10
},
{
   _id: ObjectId(7df78ad8902e)
   title: 'Neo4j Overview', 
   description: 'Neo4j is no sql database',
   by_user: 'Neo4j',
   url: 'http://www.neo4j.com',
   tags: ['neo4j', 'database', 'NoSQL'],
   likes: 750
},
```


```javascript
-> how many tutorials are written by each user
db.mycol.aggregate([{$group : {_id : "$by_user" , num_tutorials : {$sum:1}}}]);

{ "_id" : "tutorials point", "num_tutorial" : 2 }
{ "_id" : "Neo4j", "num_tutorial" : 1 }

--> number of likes  for each user
db.mycol.aggregate([{$group: {$id:"$by_user" , likes : {$sum : "$likes"}} } ]);

{ "_id" : "tutorials point", "likes" : 110 }
{ "_id" : "Neo4j", "likes" : 750 }

--> average likes for each user
db.mycol.aggregate([{$group: {$id:"$by_user" , likes : {$avg: "$likes"}} } ]);

{ "_id" : "tutorials point", "likes" : 55}
{ "_id" : "Neo4j", "likes" : 750 }

--> minimum likes for each user
db.mycol.aggregate([{$group: {$id:"$by_user" , likes : {$min: "$likes"}} } ]);

{ "_id" : "tutorials point", "likes" : 10}
{ "_id" : "Neo4j", "likes" : 750 }

--> maximum likes for each user
db.mycol.aggregate([{$group: {$id:"$by_user" , likes : {$max: "$likes"}} } ]);

{ "_id" : "tutorials point", "likes" : 100}
{ "_id" : "Neo4j", "likes" : 750 }

--> using first 

db.orders.aggregate([
    {
        $sort: { date: 1 }
    },
    {
        $group: {
            _id: "$customer",
            firstOrder: { $first: "$$ROOT" }
        }
    }
])


```




**Aggregation methods : **



- **$project** − Used to select some specific fields from a collection.
- **$match** − This is a filtering operation and thus this can reduce the amount of documents that are given as input to the next stage.
- **$group** − This does the actual aggregation as discussed above.
- **$sort** − Sorts the documents.
- **$skip** − With this, it is possible to skip forward in the list of documents for a given amount of documents.
- **$limit** − This limits the amount of documents to look at, by the given number starting from the current positions.
- **$unwind** − This is used to unwind document that are using arrays. When using an array, the data is kind of pre-joined and this operation will be undone with this to have individual documents again. Thus with this stage we will increase the amount of documents for the next stage.






**Example: Simple Aggregation with $match and $group**



```javascript
[
    { "_id": 1, "item": "A", "quantity": 10, "price": 5 },
    { "_id": 2, "item": "B", "quantity": 5, "price": 10 },
    { "_id": 3, "item": "A", "quantity": 15, "price": 8 },
    { "_id": 4, "item": "C", "quantity": 3, "price": 20 },
    { "_id": 5, "item": "B", "quantity": 8, "price": 12 }
]

--> Total revenue for each item where qty > 5
db.sales.aggregate([
    { $match: { quantity: { $gt: 5 } } },
    {
        $group: {
            _id: "$item",
            totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } }
        }
    }
])


[
    { "_id": "A", "totalRevenue": 200 },
    { "_id": "B", "totalRevenue": 176 }
]


--> Sort by quantity in descending order and limit to 3 documents:
db.sales.aggregate([
    { $sort: { quantity: -1 } },
    { $limit: 3 }
])

//output
[
    { "_id": 3, "item": "A", "quantity": 15, "price": 8 },
    { "_id": 5, "item": "B", "quantity": 8, "price": 12 },
    { "_id": 1, "item": "A", "quantity": 10, "price": 5 }
]

--> Project only item and total fields,
 where total is the calculated total amount:

db.sales.aggregate([
    {
        $project: {
            _id: 0,
            item: 1,
            total: { $multiply: ["$quantity", "$price"] }
        }
    }
])

//output

[
    { "item": "A", "total": 50 },
    { "item": "B", "total": 50 },
    { "item": "A", "total": 120 },
    { "item": "C", "total": 60 },
    { "item": "B", "total": 96 }
]


```


**Example : Aggregation with $project, $sort, and $limit**

```javascript
->Get the Highest salary employees in each department , along with name.
db.employees.insertMany(
  [
    { "_id": 1, "name": "Alice", "department": "HR", "salary": 50000 },
    { "_id": 2, "name": "Bob", "department": "Engineering", "salary": 70000 },
    { "_id": 3, "name": "Charlie", "department": "Sales", "salary": 60000 },
    { "_id": 4, "name": "David", "department": "Engineering", "salary": 75000 },
     { "_id": 5, "name": "Davids", "department": "Engineering", "salary": 76000 },
    { "_id": 6, "name": "Eve", "department": "HR", "salary": 55000 }
]);

db.employees.aggregate([
  { $group : 
    {
      _id : "$department" , 
      highestSal : {$max : "$salary"} , 
      employee: {$push: {name: "$name" , salary : "$salary"}}
    }
    
  },
  {
    $unwind: "$employee"
  },
    
  {
        "$match": {
            "$expr": {
                "$eq": ["$employee.salary", "$highestSal"]
            }
        }
    },

  
  { $sort: { highestSalary: -1 } },
  
  {
        "$project": {
            "_id": 0,
            "department": "$_id",
            "name": "$employee.name",
            "salary": "$employee.salary"
        }
    }
  
  ])

{ "department" : "Engineering", "name" : "Davids", "salary" : 76000 }
{ "department" : "Sales", "name" : "Charlie", "salary" : 60000 }
{ "department" : "HR", "name" : "Eve", "salary" : 55000 }

```


**Example: Aggregation with $unwind**

```javascript
[
    { "_id": 1, "order_id": "order1", "items": ["item1", "item2"] },
    { "_id": 2, "order_id": "order2", "items": ["item2", "item3"] },
    { "_id": 3, "order_id": "order3", "items": ["item1", "item3"] }
]

db.orders.aggregate([
    { $unwind: "$items" }
])

[
    { "_id": 1, "order_id": "order1", "items": "item1" },
    { "_id": 1, "order_id": "order1", "items": "item2" },
    { "_id": 2, "order_id": "order2", "items": "item2" },
    { "_id": 2, "order_id": "order2", "items": "item3" },
    { "_id": 3, "order_id": "order3", "items": "item1" },
    { "_id": 3, "order_id": "order3", "items": "item3" }
]

```




**Examples : **

```
[
    { "_id": 1, "customer": "Alice", "total_amount": 50 },
    { "_id": 2, "customer": "Bob", "total_amount": 30 },
    { "_id": 3, "customer": "Alice", "total_amount": 20 },
    { "_id": 4, "customer": "Charlie", "total_amount": 60 },
    { "_id": 5, "customer": "Bob", "total_amount": 10 }
]

-->Calculate the total amount spent by each customer.
db.orders.aggregate([
    {
        $group: {
            _id: "$customer",
            totalSpent: { $sum: "$total_amount" }
        }
    }
])

//output
[
    { "_id": "Alice", "totalSpent": 70 },
    { "_id": "Bob", "totalSpent": 40 },
    { "_id": "Charlie", "totalSpent": 60 }
]



-->Using the same orders collection, 
let's find orders where the total amount is greater than 40, 
sorted by total amount in descending order.

db.orders.aggregate([
    {
        $group: {
            _id: "$customer",
            tot_amount: { $sum: "$total_amount" }
        }
    },
    {
        $match: {
            tot_amount: { $gt: 40 }
        }
    },
    {
      $sort :{
         tot_amount : -1
      }
    }
])

//output

[
    { "_id": 4, "customer": "Charlie", "total_amount": 60 },
    { "_id": 1, "customer": "Alice", "total_amount": 50 }
]

```




**Example: Using $lookup for Joins**

```javascript
-> users
[
    { "_id": 1, "name": "Alice" },
    { "_id": 2, "name": "Bob" }
]

-> orders
[
    { "_id": 1, "user_id": 1, "total_amount": 50 },
    { "_id": 2, "user_id": 2, "total_amount": 30 },
    { "_id": 3, "user_id": 1, "total_amount": 20 }
]


db.orders.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user"
        }
    },
    {
        $unwind: "$user"
    }
])

//output
[
    {
        "_id": 1,
        "user_id": 1,
        "total_amount": 50,
        "user": { "_id": 1, "name": "Alice" }
    },
    {
        "_id": 2,
        "user_id": 2,
        "total_amount": 30,
        "user": { "_id": 2, "name": "Bob" }
    },
    {
        "_id": 3,
        "user_id": 1,
        "total_amount": 20,
        "user": { "_id": 1, "name": "Alice" }
    }
]
```

**Sharding :**

- Sharding is the process of storing data records across multiple machines and it is MongoDB's approach to meeting the demands of data growth.
-  As the size of the data increases, a single machine may not be sufficient to store the data nor provide an acceptable read and write throughput.
-  Sharding solves the problem with horizontal scaling. With sharding, you add more machines to support data growth and the demands of read and write operations.
## Why Sharding?
- In replication, all writes go to master node
- Latency sensitive queries still go to master
- Single replica set has limitation of 12 nodes
- Memory can't be large enough when active dataset is big
- Local disk is not big enough
- Vertical scaling is too expensive


![image.png](https://eraser.imgix.net/workspaces/TNMNzgWrRMo3BFe2Nh7o/2TpPe0m2nPZODyVZctbl8Rh7kLL2/CWjzSd-JqQSV2Hrg88JO3.png?ixlib=js-3.7.0 "image.png")



- **Shards** − Shards are used to store data. They provide high availability and data consistency. In production environment, **each shard is a separate replica set.**
- **Config Servers** − 
    - Config servers store the cluster's metadata. This data **contains a mapping of the cluster's data set to the shards**. 
    - **The query router uses this metadata to target operations to specific shards**. 
    - In production environment, sharded clusters have exactly 3 config servers.
- **Query Routers** − 
    - Query routers are basically mongo instances, interface with client applications and direct operations to the appropriate shard. 
    - The query router processes and targets the operations to shards and then returns results to the clients. 
    - A sharded cluster can contain more than one query router to divide the client request load. A client sends requests to one query router. Generally, a sharded cluster have many query routers.




**Refs in MongoDB : **



```javascript
--> Manual Refs


db.users.insertMany([
    { "_id": 1, "name": "Alice" },
    { "_id": 2, "name": "Bob" },
    { "_id": 3, "name": "Charlie" }
])

db.posts.insertMany([
    { "_id": 101, "title": "First Post", "content": "This is the content of the first post.", "user_id": 1 },
    { "_id": 102, "title": "Second Post", "content": "This is the content of the second post.", "user_id": 2 },
    { "_id": 103, "title": "Third Post", "content": "This is the content of the third post.", "user_id": 1 }
])

--> To fetch posts with their associated user details using manual references:


db.posts.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user"
        }
    },
    {
        $unwind: "$user"
    },
    {
        $project: {
            "_id": 1,
            "title": 1,
            "content": 1,
            "user": { "_id": "$user._id", "name": "$user.name" }
        }
    }
])

//output

[
    {
        "_id": 101,
        "title": "First Post",
        "content": "This is the content of the first post.",
        "user": { "_id": 1, "name": "Alice" }
    },
    {
        "_id": 102,
        "title": "Second Post",
        "content": "This is the content of the second post.",
        "user": { "_id": 2, "name": "Bob" }
    },
    {
        "_id": 103,
        "title": "Third Post",
        "content": "This is the content of the third post.",
        "user": { "_id": 1, "name": "Alice" }
    }
]


```




**DB Refs : **



```javascript

--> DB Refs

db.users.insertMany([
    { "_id": 1, "name": "Alice" },
    { "_id": 2, "name": "Bob" },
    { "_id": 3, "name": "Charlie" }
])

db.posts.insertMany([
    { "_id": 101, "title": "First Post", "content": "This is the content of the first post.", "user": { "$ref": "users", "$id": 1 } },
    { "_id": 102, "title": "Second Post", "content": "This is the content of the second post.", "user": { "$ref": "users", "$id": 2 } },
    { "_id": 103, "title": "Third Post", "content": "This is the content of the third post.", "user": { "$ref": "users", "$id": 1 } }
])

--> To fetch posts and resolve their associated users using DBRefs:
  
db.posts.find().forEach(function(post) {
    var userRef = post.user;
    var user = db.getCollection(userRef.$ref).findOne({ _id: userRef.$id });
    printjson({
        "_id": post._id,
        "title": post.title,
        "content": post.content,
        "user": { "_id": user._id, "name": user.name }
    });
});


//output
{
    "_id": 101,
    "title": "First Post",
    "content": "This is the content of the first post.",
    "user": { "_id": 1, "name": "Alice" }
}
{
    "_id": 102,
    "title": "Second Post",
    "content": "This is the content of the second post.",
    "user": { "_id": 2, "name": "Bob" }
}
{
    "_id": 103,
    "title": "Third Post",
    "content": "This is the content of the third post.",
    "user": { "_id": 1, "name": "Alice" }
}
```






