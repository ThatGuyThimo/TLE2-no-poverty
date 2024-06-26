async function createServerlessIndex(pc, indexName, dimensions) {
    console.log(`Creating index ${indexName}`);
    const creation = await pc.createIndex({
      name: indexName,
      dimension: dimensions,
      metric: 'cosine',
      spec: { 
        serverless: { 
          cloud: 'aws', 
          region: 'us-east-1' 
        }
      } 
    });
    
    console.log(creation);	
}

async function getServerlessIndex(pc, indexName) {
    const index = await pc.getIndex(indexName);
    console.log(index);
}

async function updateNamespacesMetadata(pc, indexName, nameSpace, vectors) {
    console.log(`Writing namespace ${nameSpace} to index ${indexName}`);

    const index = pc.index(indexName);

    await index.namespace(nameSpace).update(vectors);
      
      // const ns2 = await index.namespace("ns2").upsert([
      //   {
      //     "id": "vec1", 
      //     "values": [1.0, -2.5]
      //   },
      //   {
      //     "id": "vec2", 
      //     "values": [3.0, -2.0]
      //   },
      //   {
      //     "id": "vec3", 
      //     "values": [0.5, -1.5]
      //   }
      // ]);

      console.log("Namespaces updated");
      return "namespaces written";
}

async function writeNamespaces(pc, indexName, nameSpace, vectors) {
    console.log(`Writing namespace ${nameSpace} to index ${indexName}`);

    const index = pc.index(indexName);

    await index.namespace(nameSpace).upsert(vectors);
      
      // const ns2 = await index.namespace("ns2").upsert([
      //   {
      //     "id": "vec1", 
      //     "values": [1.0, -2.5]
      //   },
      //   {
      //     "id": "vec2", 
      //     "values": [3.0, -2.0]
      //   },
      //   {
      //     "id": "vec3", 
      //     "values": [0.5, -1.5]
      //   }
      // ]);

      console.log("Namespaces written");
      return "namespaces written";
}

async function checkIndexes(pc, indexName) {

    const index = pc.index(indexName);

    const stats = await index.describeIndexStats();

    console.log(stats)
}

async function similarityTest(pc, indexName) {
    const index = pc.index(indexName);

    console.log("testing namespaces for similarity");

    const queryResponse1 = await index.namespace("ns1").query({
        topK: 3,
        vector: [1.0, 1.5],
        includeValues: true
      });
      
      const queryResponse2 = await index.namespace("ns2").query({
        topK: 3,
        vector: [1.0,-2.5],
        includeValues: true
      });

    console.log(queryResponse1, queryResponse2);

}

async function deleteServerlessIndex(pc, indexName) {
    console.log(`Deleting index ${indexName}`);
    const deletion = await pc.deleteIndex(indexName);
    console.log(deletion);
}

async function queryPinecone(pc, indexName, nameSpace, vector, topK) {
  try {
      const index = pc.index(indexName);
      const queryResponse = await index.namespace(nameSpace).query({
          topK: topK,
          vector: vector,
          includeValues: true,
          includeMetadata: true
      });

      return queryResponse; // Ensure a response is always returned
  } catch (error) {
      console.error("Error querying Pinecone:", error);
      // Return a default structure to avoid breaking the caller
      return { matches: [] };
  }
}

async function getEmbeddingsFromText(embeddings, text) {
  const documentREs = await embeddings.embedQuery(text);
  return documentREs;
}



export { createServerlessIndex, getServerlessIndex, writeNamespaces, checkIndexes, similarityTest, deleteServerlessIndex, updateNamespacesMetadata, queryPinecone, getEmbeddingsFromText };