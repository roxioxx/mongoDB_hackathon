const id = "cookbook-famra";
const config = { id, };
const app = new Realm.App(config);

async function connectToDB() {
    try {
        const user = await app.logIn(Realm.Credentials.anonymous());
        return user;
    } catch (err) {
        console.error("Failed to log in", err);
    }
};


async function getDBData() {
    const mongodb = app.currentUser.mongoClient("mongodb-atlas");
    const recipes = mongodb.db("cookbook").collection("recipes");
    try {
        const venusFlytrap = await recipes.find();
        console.log("all recipes", venusFlytrap);
        return venusFlytrap;
    } catch (err) {
        console.error("No Data Found", err);
    }
};

window.addEventListener('load', (event) => {
    connectToDB();
    getDBData();
});