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
    var venusFlytrap = [];
    try {
        venusFlytrap = await recipes.find();
        //console.log("all recipes", venusFlytrap);
    } catch (err) {
        console.error("No Data Found", err);
    }
    venusFlytrap.forEach((element) => {
        //Just Creating the Card for Each
        var node = document.createElement("div"); // Create a <div> node


        var nodeInner = ` <div class="col flip-container" ontouchstart="this.classList.toggle('hover');">
        <div class="flipper">

            <div class="front">
                <!-- front content -->

                <div class="card">
                    <img src="images/${element.shortname}.png">
                    <div class="card-container">
                        <h2>${element._id}</h2>
                        <p>${element.tagLine}</p>
                    </div>
                </div>
            </div>

            <div class="back">
                <!-- back content -->

                <div class="card">
                    <div class="card-container">
                        <h2>${element._id}</h2>
                        <a href="${element.link}" class="btn" target="_blank">${element.linkText}</a>

                        <br>
                        <h3>INGREDIENTS</h3>
                        <ul> 
                        <li>${element.writtenIngredients.join("</li><li>")}
                        </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    </div>
`;

        node.innerHTML = nodeInner;
        //Finally, Appending that card to the index.html
        document.getElementById("recipesHere").appendChild(node);

        //Sanity Check
        //console.log(element._id);
    })
};

const nodel = document.getElementById("recipesHere");

window.addEventListener('load', (event) => {
    connectToDB();
    setTimeout(() => { getDBData(), 10 });

});