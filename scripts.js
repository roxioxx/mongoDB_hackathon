import * as Realm from "realm-web";

const app = new Realm.App({ id: "cookbook-famra" });

// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();
try {
    // Authenticate the user
    const user = await app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    assert(user.id === app.currentUser.id)

} catch (err) {
    console.error("Failed to log in", err);
}

console.log(user);