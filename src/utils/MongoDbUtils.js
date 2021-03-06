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
  const user = await users.findOne({ number: parseInt(userNumber), password: userPassword });

  if (user && !user.beginningDate ) {
    updateUserBeginningDate(user._id);
  }

  return await users.findOne({ number: parseInt(userNumber), password: userPassword });
}

//set beggining date
export async function updateUserBeginningDate(userId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const users = db.collection("users");
  const user = await users.findOne({ _id: userId });
  return await users.updateOne({
    _id: userId
  }, {
    $set: { beginningDate: new Date() },
  })
}

//load the systems of the user
export async function getSystems(userId) {
  // await loadClient();
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");

  const data = await systems.find({ userId: userId });
  return await data.toArray();
}

//load the risks for the systems
export async function getMaxRist() {
  // await loadClient();
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const risks = db.collection("MaxRisk");

  const data = await risks.find();
  return await data.toArray();
}

//save new system
export async function saveSystem(userId, name, materialsNames, maxRisk, status, riskLevel) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");
  let controls = await getControls(riskLevel);

  let controlsNumber = controls.length;
  // console.log()
  return await systems.insertOne({
    userId: userId,
    name: name, status: status,
    materials: materialsNames,
    riskLevel: riskLevel,
    maxRisk: maxRisk,
    controlsNumber: controlsNumber
  });
}

//load some system data 
export async function getSystem(systemId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");
  return await systems.findOne({ _id: systemId });
}

//load the exposure questions
export async function getExposureQuestions() {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const questions = db.collection("ExposureLevel");
  const data = await questions.find();
  return await data.toArray();
}

//load the damage questions
export async function getDamageQuestions() {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const questions = db.collection("DamageLevel");
  const data = await questions.find();
  return await data.toArray();
}

//save answers for exposure questions of some system
export async function saveExposureAnswers(userId, systemId, questionNumber, answerId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const answer = db.collection("ExposureAnswers");

  return await answer.updateOne(
    { systemId: systemId, questionNumber: questionNumber },
    { userId: userId, systemId: systemId, questionNumber: questionNumber, answerId: answerId },
    { upsert: true }
  );
}

//save expsure level of a system 
export async function saveExposureLevel(systemId, exposureLevel) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");
  await systems.updateOne({
    _id: systemId,
  }, {
    $set: { exposureLevel: exposureLevel },
  })
  return calculateRiskLevel(systemId);
}

//save damage level of a system 
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

//save answers for damage questions of some system
export async function saveDamageAnswers(userId, systemId, questionNumber, answerId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const answer = db.collection("DamageAnswers");
  return await answer.updateOne(
    { systemId: systemId, questionNumber: questionNumber },
    { userId: userId, systemId: systemId, questionNumber: questionNumber, answerId: answerId },
    { upsert: true }
  );
}

//calculate & save the risk level of a system
export async function calculateRiskLevel(systemId) {
  let system = await getSystem(systemId);


  if (!system.damageLevel || !system.exposureLevel) {
    return "Irrelevant"
  }

  let riskLevel = Math.round(system.exposureLevel + 3 * system.damageLevel);
  // console.log(system.damageLevel + " " + system.exposureLevel)
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
  let status = "ביצוע בקרות";
  let controls = await getControls(riskLevel);

  let controlsNumber = controls.length;

  return await systems.updateOne({
    _id: systemId,
  }, {
    $set: {
      riskLevel: riskLevel,
      status: status,
      controlsNumber: controlsNumber
    },
  })
}


//delete a system
export async function deleteSystem(systemId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");
  const ExposureAnswers = db.collection("ExposureAnswers");
  const DamageAnswers = db.collection("DamageAnswers");
  const controls = db.collection("PerformedControls");
  await ExposureAnswers.deleteMany({systemId:systemId});
  await DamageAnswers.deleteMany({systemId:systemId});
  await controls.deleteMany({systemId:systemId});
  return await systems.deleteOne({ _id: systemId });
}

//load exist answers of a system
export async function getAnswers(systemId, questionsType) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  if (questionsType == "exposure") {
    const answers = db.collection("ExposureAnswers");
    const data = await answers.find({ systemId: systemId });
    return await data.toArray();
  }
  else if (questionsType == "damage") {
    const answers = db.collection("DamageAnswers");

    const data = await answers.find({ systemId: systemId });
    return await data.toArray();
  }
}

//load the controls for some risk level
export async function getControls(riskLevel) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const controls = db.collection("Controls");
  const data = await controls.find({ riskLevel: riskLevel });

  return await data.toArray();
}

//load the controls of some system
export async function getPerformedControls(systemId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const controls = db.collection("PerformedControls");
  const data = await controls.find({ systemId: systemId });
  return await data.toArray();
}

//set performed control
export async function savePerformedControl(userId, systemId, controlId, subclauseNmber) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const controls = db.collection("PerformedControls");


  return await controls.insertOne({
    userId: userId,
    systemId: systemId,
    controlId: controlId,
    subclauseNmber: subclauseNmber,
  });
}

//delete perform control
export async function deletePerformedControl(systemId, subclauseNmber) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const controls = db.collection("PerformedControls");
  return await controls.deleteOne({ systemId: systemId, subclauseNmber: subclauseNmber });
}

//change status of system to finish
export async function setStatusToFinish(systemId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");
  let status = "סיום";
  return await systems.updateOne({
    _id: systemId,
  }, {
    $set: { status: status },
  })
}

//change status of system to perform controls
export async function setStatusToControls(systemId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");
  let status = "ביצוע בקרות";
  return await systems.updateOne({
    _id: systemId,
  }, {
    $set: { status: status },
  })
}

//get general data for dashboard
export async function getDashboardData(userId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");
  const controls = db.collection("Controls");
  const performed = db.collection("PerformedControls");
  let status = "סיום";
  let userSystems = await systems.find({ userId: userId }).toArray()
  let userControls = 0;
  let doneSystems = await systems.find({ userId: userId, status: status })
  let performedControls = await performed.find({ userId: userId })

  for (let system of await userSystems) {
    {
      !!system.controlsNumber ?
        userControls = userControls + system.controlsNumber
        :
        null
    }
  }
  let results = { userSystems: await userSystems, doneSystems: await doneSystems.toArray(), performedControls: await performedControls.toArray(), userControls: userControls }
  return await results
}

//load the update controls of some system
export async function getUpdateControls(systemId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const controls = db.collection("updateControls");
  const data = await controls.find({ systemId: systemId });
  return await data.toArray();
}

//update control demand for some system
export async function updateControl(userId, systemId, subclauseNmber, updateControl) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const controls = db.collection("updateControls");
  const exist = await controls.findOne({
    systemId: systemId,
    subclauseNmber: subclauseNmber
  });
  if (exist)
    return await controls.updateOne({
      systemId: systemId,
      subclauseNmber: subclauseNmber
    }, {
      $set: { updateControl: updateControl },
    })
  else {
    return await controls.insertOne({
      userId: userId,
      systemId: systemId,
      subclauseNmber: subclauseNmber,
      updateControl: updateControl
    })

  }
}

//get user details
export async function getUserDetails(userId) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const users = db.collection("users");

  return await users.findOne({ _id: userId });
}

//save user datails
export async function saveUserData(userId, beginningDate, contactEmail,
  contactPerson, contactPhone) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const users = db.collection("users");
  return await users.updateOne({
    _id: userId,
  }, {
    $set: {
      beginningDate: beginningDate,
      contactEmail: contactEmail,
      contactPerson: contactPerson,
      contactPhone: contactPhone
    },
  })
}

//update system's data
export async function updateSystemData(systemId,name, materials,maxRisk) {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");
  return await systems.updateOne({
    _id: systemId,
  }, {
    $set: {name:name,
       materials: materials,
      maxRisk:maxRisk },
  })
}






