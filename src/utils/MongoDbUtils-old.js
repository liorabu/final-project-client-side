const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://cyberDSystem:Cyber2020@cluster0-8qvfx.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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


/*checkConnection(
  () => {
    // on success
    console.log("connection ok");
  },
  (error) => {
    console.log("connection to mongodb failed" , error);
  }
)*/