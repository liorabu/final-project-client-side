import { Stitch, UserPasswordCredential, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

let wasClientLoaded = false;

async function loadClient(){
  if(wasClientLoaded){
    return;
  }

  // console.log('try to connect to mongo-db');
  
  const client = await Stitch.initializeDefaultAppClient("cyber-xlqpr");
  const user = await client.auth.loginWithCredential(new UserPasswordCredential('cyberDSystem@gmail.com', 'CyberStitch2020'));

  if(!user){
    throw new Execption("Failed to connect to mongo-db");
  }

  wasClientLoaded = true;
}

export async function login(userNumber, userPassword) {
  // console.log("trying to login");

  await loadClient();

  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory,"mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const users = db.collection("users");

  // console.log("search for user");

  return await users.findOne({number: parseInt(userNumber), password: userPassword});
}
// export async function getSystems(userId) {
//   // console.log("trying to login");

//   await loadClient();

//   const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory,"mongodb-atlas");
//   const db = mongoClient.db("CyberDefence");
//   const systems = db.collection("systems");

//   // console.log("search for user");

//   return await systems.find({userId:userId});
// }






/*

export function loadClient_1(){
  console.log('try to connect to mongo-db');
  Stitch.initializeDefaultAppClient("cyber-xlqpr").then(client => {
    client.auth
      .loginWithCredential(new UserPasswordCredential('cyberDSystem@gmail.com', 'CyberStitch2020'))
      .then(user => {
        console.log(`Successfully logged in as user ${user.id}`);
      })
      .catch(err => {
        console.log(`failed: ${err}`);
      });
  });
}

*/




/*const uri = "mongodb+srv://cyberDSystem:Cyber2020@cluster0-8qvfx.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });*/


/*
export async function checkConnection(onSuccessCallback, onFailureCallback){  
  try {
    await client.connect();
    onSuccessCallback();
  }
  catch(e){
    onFailureCallback(e);
  }
  finally {
    await client.close();
  }
}


export async function login(userNumber, userPassword, onSuccessCallback, onFailureCallback){
  try {
    await client.connect();
    const result = await client.db("CyberDefence").collection("users").findOne({number:userNumber, password: userPassword});

    if(!result){
      onFailureCallback("מספר ארגון או סיסמה שגויים")
    }
    else {
      onSuccessCallback();
    }
  }
  catch(e){
    onFailureCallback(e);
  }
  finally {
    await client.close();
  }
}
*/

/*checkConnection(
  () => {
    // on success
    console.log("connection ok");
  },
  (error) => {
    console.log("connection to mongodb failed" , error);
  }
)*/