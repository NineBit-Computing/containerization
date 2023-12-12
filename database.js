const { MongoClient } = require('mongodb');

const uri = `mongodb://${process.env.MONGO_NETWORK_HOST || '127.0.0.1'}:27017/mydb`;
const client = new MongoClient(uri);

async function executeQuery(cb) {
    try {
        await client.connect();
        const data = await cb(client);
        return data;
    } catch (ex) {
        throw ex;
    } finally {
        await client.close();
    }
}

async function getAllDB() {
    const data = executeQuery(async (clientObj) => {
        databasesList = await clientObj.db().admin().listDatabases();
        databasesStr = JSON.stringify(databasesList.databases);
        console.log("Databases:", databasesStr);
        return databasesStr;
    });
    return data;
}

module.exports = getAllDB;
