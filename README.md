# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### **REDUX NOTES**

#### **Why Redux?**

> - Good for managing large state
> - Useful for sharing data between components
> - Predictable state management using the 3 principels
> - Redux allows react state to be more scalable

#### **THE 3 PRINCIPLES**

> - Single source of truth
    One single big object that describes the entire state of the app
> - State is read only
    Not modifying the object and prevents unexpected errors.
> - Changes using pure functions
    Pure functions : Receives an input and always return a predictable output.

#### **REDUX FLOW**

1. Action:
    Something that user does such as clicking on a button or a dropdown menu
2. Root Reducer:
    Reducer is simply a pure function that receives an input, which is the action and creates an output.
3. Store:
    The output from the reducer in redux which is the entire state of the app is called store.
4. DOM Changes:
    When the store gets updated, react notices the changes and make changes to the VLA (View Layer)

#### **FLUX PATTERN**

> ACTION -> DISPATCHER -> STORE -> VIEW

#### **INSTALL REDUX**

    npm install redux redux-logger react-redux

#### **DEPLOY TO HEROKU**

    heroku create <app_name> --buildpack https://github.com/mars/create-react-app-buildpack.git

#### **UPDATE THE CHANGES TO HEROKU AFTER DEPLOYMENT**

    git push heroku master

### **FIREBASE NOTES**

#### **QueryReference and QuerySnapshot**

> - A query is a request we make to firestore to give us something from the database.
> - Firestore returns us two types of objects: references and snapshots. Of these objects, they can either Document or Collect versions.
> - Firestore will always return us these objects, even if nothing exists at from that query.

#### **QueryReference**

> A queryReference object is an object that represents the 'current' place in the database that we are querying.
>
> - We get them by calling either:

    firestore.doc('/users/:userId');
    firestore.collections('/users');

> - The queryReference object does not have the actual data of the collection or document. It instead has properties that tell us details about it, or the method to get the Snapshot object which gives us the data we are looking for.

#### **DocumentReference vs CollectionReference**

> - We use documentRef object to perfrom our CRUD methods (create, retrieve, update, delete). The documentRef methods are .set(), .get(), .update() and .delete() respectively.
> - We can also add documents to collections using the collectionRef object using the .add() method.

    collectionRef.add({//value: prop})

> - We get the snapshotObject from the referenceObject using the .get() method. i.e. documentRef.get() or collectionRef.get()
> - documentRef returns a documentSnapshot object.
> - colelctionRef returns a querySnapshot object.

#### **DocumentSnapshot**

> - We get a documentSnapshot object from our documentReference object.
> - The documentSnapshot object allows us to check if a document exists at this query using the .exists property which returns a boolean.
> - We can also get the actual properties on the object by calling the .data() method, which returns us a JSON object of the document.

#### **QuerySnapshot**

> - We get a querySnapshot object from our collectionReference object.
> - We can check if there are any documents in the collection by calling the .empty property which returns a boolean.
> - We can get all the documents in the collection by calling the .docs property. It returns an array of our documents as documentSnapshot objects.

#### **Redux Thunk**

> - A piece of middleware that allows us to fire functions.
> - If redux-thunk middleware is enabled, any time you attempt to dispacth a function instead of an object, the middleware will call that function with dispatch method itself as the first argument.

### **Redux Saga**

> - 