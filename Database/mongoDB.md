# MongoDB

### Database

1. Relational Dabatase (RDB)
2. NoSQL
   - Each db can contain one or more **collections** ("Tables" in RDB)
   - Each collection can contain one or more data structures called **documents** ("Rows" in RDB)
   - Each documents contains the data about one single entity.

[NoSQL vs SQL Databases](https://www.mongodb.com/scale/nosql-vs-relational-databases)

### MongoDB

> MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need.

- Key MongoDB Features

  1. Document based : MongoDB stores data in documnets (field-value pair data structures, NoSQL)
  2. Scalable : Very easy to distribute data across multiple machines as your users and amount of data grows
  3. Flexible : No document data schma required, so each document can have different number and type of fields
  4. Performant : Embedded data models, indexing, sharding, flexible documnets, native duplication, etc.
  5. Free and open-source, published under the SSPL License.

- MongoDB uses a data format similar to JSON for data structure called **BSON**. But **typed**.
- Embedding/Denormalizing : Including related data into a single document. This allows for quicker access and easier data models.
- BSON :
  1. The maximum size for each document is currently 16MB.
  2. Each documnet contains a unique ID which acts as a primary key of that document.

### Installing MongoDB

[Install MongoDB in MacOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)  
[MongoDB Docs](https://docs.mongodb.com/)

    ```
    brew tap mongodb/brew
    brew install mongodb-community@4.2
    brew services start mongodb-community@4.2
    ps aux | grep -v grep | grep mongod
    mongo
    ```

- Running MongoDB : `mongod`
- Opening mongoDB shell : `mongo`
- `Failed to set up listener: SocketException: Address already in use`
  1. `sudo lsof -iTCP -sTCP:LISTEN -n -P` : search the list of tasks running
  2. `sudo kill <command_pid>
  3. Start `mongod` again.
- Set another dbpath = `mongod --dbpath=<path>`

### CRUD

1. Creating  
   `db.tours.insertOne( { name: "The Forest Hiker", price: 297, rating: 4.7 })`
   `db.tours.insertMany([ { name: "The Sea Explorer", price: 497, rating: 4.8 }, { name: "The Snow Adventurer", price: 597, rating: 4.4 } ] )`

2. Reading  
   `db.tours.find()` // find all documents

3. Updating  
   `db.tours.updateOne( { price: { $eq: 597 } }, { $set: { price: 600 } } )`

4. Deleting  
   `db.tours.deleteMany( { rating: { $lt: 4.8 } } )` // with query  
   `db.tours.deleteMany({})` // Delete all documents

### Compass

- Compass is GUI (Graphical User Interface) to work with MongoDB
