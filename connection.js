const { MongoClient } = require('mongodb');

async function main() {

  const uri = "mongodb+srv://cyberDSystem:Cyber2020@cluster0-8qvfx.mongodb.net/test?retryWrites=true&w=majority";


  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    // await listDatabases(client);

    //קריאה לפונקציה
    // await createSystem(client,
    //   {
    //     name: 'מוריה',

    //   })

    await findUser(client,23111990)

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.err);

// הוספת דוקיומנט כלשהו לקולקשן
// async function createSystem(client, newSystem) {

//   const result = await client.db("CyberDefence").collection("Systems").insertOne(newSystem);
//   console.log(`new risk created with the folloing id: ${result.insertedId}`);
// }

//רשימת מסדי הנתונים 
// async function listDatabases(client) {
//   const databasesList = await client.db().admin().listDatabases();

//   console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

async function findUser(client, number){
  const result = await client.db("CyberDefence").collection("users").findOne({number:number});
    console.log(`new user password is: ${result.password}`);
}