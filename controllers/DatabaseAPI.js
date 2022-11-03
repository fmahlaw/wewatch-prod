import { MongoClient, ServerApiVersion } from "mongodb";

export default async function insertData(nameWithout) {
  const uri =
    "mongodb+srv://wewatchadmin:wewatch123@cluster0.pdg1hdu.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  
  await client.connect(async (err) => {
    const collection = client.db("wewatch").collection("storeName");
    const doc = { name: nameWithout };
    await collection.insertOne(doc);
    console.log(`A document was inserted`);
    client.close();

    if(err){
      console.log("database error");
    }
  });
}
