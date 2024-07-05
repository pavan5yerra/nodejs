

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



