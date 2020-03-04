# Firebase

> https://firebase.google.com/

Database, Server, Authentication(instead of customizing OAuth)

### How to use

1. Create a new project in https://console.firebase.google.com/
2. Project Overview tap - Web App
3. Register App - Add firebase SDK (`npm i firebase`)
4. Config firebase on my project

### QueryReference and QuerySnapShot

- A query is a request we make to firestore to give us something from the database.
- Firestore returns us two types of objects: References and snapshots. Of these objects, they can be either Document or Collection versions.
- Firestore will always return us these objects, even if nothing exists at from that query.

1. QueryReference

   - A queryReference object is an object that represents the "current" place in the database that we are querying.
   - We get them by calling either: `firestore.doc("/users/:userId")` or `firestore.collections("/users")`
   - The queryReference object does not have the actual data of the collection or document. It instead has properties that tell us details about it, or the method to get the Snapshot object which gives us the data we are looking for.

- cf. DocumentReference vs CollectionReference

  - We use documentRef objects to perform our CRUD methods. The documentRef methods are `.set()`, `.get()`, `.update()` and `.delete()` respectively.
  - We can also add documents to collections using the collectionRef object using the `.add()` method. // `collectionRef.add({value: prop})`
  - We get the snapshotObject from the referenceObject using the `.get()` method. ex) `documentRef.get()` or `collectionRef.get()`
  - documentRef returns a `documentSnapshot` object
  - collectionRef returns a `querySnapshot` object

- cf. DocumentSnapshot
  - We get a documentSnapshot object from our documentReference object.
  - The documentSnapshot object allows us to check if a document exists at this query using the `.exists` property which returns a boolean.
  - We can also get the actual properties on the object by calling the `.data()` method, which returns us a JSON object of the document. (데이터 자체에 접근하기 위함)
