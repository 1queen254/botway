import { MongoClient } from "mongodb";

let indexesCreated = false;

async function createIndexes(client) {
  if (indexesCreated) return client;

  const db = client.db();

  await Promise.all([
    db
      .collection("tokens")
      .createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 }),
    db
      .collection("projects")
      .createIndexes([{ key: { createdAt: -1 } }, { key: { creatorId: -1 } }]),
    db.collection("users").createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { username: 1 }, unique: true },
    ]),
  ]);

  indexesCreated = true;

  return client;
}

export async function getMongoClient() {
  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentiatlly
   * during API Route usage.
   * https://github.com/vercel/next.js/pull/17666
   */
  if (!global.mongoClientPromise) {
    const client = new MongoClient(process.env.MONGO_URL);

    global.mongoClientPromise = client
      .connect()
      .then((client) => createIndexes(client));
  }

  return global.mongoClientPromise;
}

export async function getMongoDb() {
  const mongoClient = await getMongoClient();

  return mongoClient.db();
}