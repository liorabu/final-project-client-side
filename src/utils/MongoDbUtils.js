import { Stitch, UserPasswordCredential, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

let wasClientLoaded = false;

async function loadClient() {
  if (wasClientLoaded) {
    return;
  }

  // console.log('try to connect to mongo-db');

  const client = await Stitch.initializeDefaultAppClient("cyber-xlqpr");
  const user = await client.auth.loginWithCredential(new UserPasswordCredential('cyberDSystem@gmail.com', 'CyberStitch2020'));

  if (!user) {
    throw new Execption("Failed to connect to mongo-db");
  }

  wasClientLoaded = true;
}

export async function login(userNumber, userPassword) {

  await loadClient();

  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const users = db.collection("users");

  // console.log("search for user");
  return await users.findOne({ number: parseInt(userNumber), password: userPassword });
}
export async function getSystems(userId) {
  // await loadClient();
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");

  const data = await systems.find({ userId: userId });
  return await data.toArray();
}

export async function getMaxRist() {
  // await loadClient();
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const risks = db.collection("MaxRisk");

  const data = await risks.find();
  return await data.toArray();
}

export async function saveSystem(userId, name, materialsNames, maxRisk, status, RiskLevel) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");
  return await systems.insertOne({
    userId: userId,
    name: name, status: status,
    materials: materialsNames,
    riskLevel: RiskLevel,
    maxRisk: maxRisk
  });
}


export async function getSystem(systemId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");
  return await systems.findOne({ _id: systemId });
}

export async function getExposureQuestions() {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const questions = db.collection("ExposureLevel");
  const data = await questions.find();
  return await data.toArray();
}

export async function getDamageQuestions() {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const questions = db.collection("DamageLevel");
  const data = await questions.find();
  return await data.toArray();
}

export async function saveExposureAnswers(userId, systemId, questionNumber, answerId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const answer = db.collection("ExposureAnswers");
  //  answer.insertOne({ userId: userId, systemId: systemId, questionNumber: questionNumber, answerId: answerId });
  return await answer.updateOne(
    { systemId: systemId,questionNumber: questionNumber },
    { userId: userId, systemId: systemId, questionNumber: questionNumber, answerId: answerId },
    { upsert: true }
  );
}

export async function saveExposureLevel(systemId, exposureLevel) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");

  return await systems.updateOne({
    _id: systemId,
  }, {
    $set: { exposureLevel: exposureLevel },
  })
  return calculateRiskLevel(systemId);
}
export async function saveDamageLevel(systemId, damageLevel) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");

  await systems.updateOne({
    _id: systemId,
  }, {
    $set: { damageLevel: damageLevel },
  })
  return calculateRiskLevel(systemId);
}

export async function saveDamageAnswers(userId, systemId, questionNumber, answerId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const answer = db.collection("DamageAnswers");
  return await answer.updateOne(
    { systemId: systemId,questionNumber: questionNumber },
    { userId: userId, systemId: systemId, questionNumber: questionNumber, answerId: answerId },
    { upsert: true }
  );
}

export async function calculateRiskLevel(systemId) {

  let system = await getSystem(systemId);
  if (system.damageLevel && system.exposureLevel) {
    let riskLevel = Math.round(system.exposureLevel + 3 * system.damageLevel);
    switch (true) {
      case riskLevel >= 4 && riskLevel <= 7:
        riskLevel = 1;
        break;
      case riskLevel >= 8 && riskLevel <= 11:
        riskLevel = 2;
        break;
      case riskLevel >= 12 && riskLevel <= 14:
        riskLevel = 3;
        break;
      case riskLevel >= 15 && riskLevel <= 16:
        riskLevel = 4;
        break;
    }
    const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
    const db = mongoClient.db("CyberDefence");
    const systems = db.collection("Systems");
    let status="ביצוע בקרות";
    return await systems.updateOne({
      _id: systemId,
    }, {
      $set: { riskLevel: riskLevel ,
        status:status},
    })
  }
}

export async function deleteSystem(systemId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");

  return await systems.deleteOne({_id:systemId});
}


export async function getAnswers(systemId,questionsType){
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  if(questionsType=="exposure"){
    const answers = db.collection("ExposureAnswers");
    const data = await answers.find({systemId:systemId});
  return await data.toArray();
  }
  else if(questionsType=="damage"){
    const answers = db.collection("DamageAnswers");
   
    const data = await answers.find({systemId:systemId});
  return await data.toArray();
  }
  
}






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