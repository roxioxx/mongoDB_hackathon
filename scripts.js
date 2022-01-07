import * as Realm from "https://unpkg.com/realm-web/dist/bundle.iife.js"

const app = new Realm.App({ id: "cookbook-famra" });
const mongodb = app.currentUser.mongoClient("mongodb-atlas");
const recipes = mongodb.db("cookbook").collection("recipes");


// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();
try {
    // Authenticate the user
    const user = await app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    assert(user.id === app.currentUser.id);
    console.log(user);

} catch (err) {
    console.error("Failed to log in", err);
}

const venusFlytrap = await recipes.find();
console.log("all recipes", venusFlytrap);