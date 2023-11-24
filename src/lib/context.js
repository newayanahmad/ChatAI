import { Pinecone } from "@pinecone-database/pinecone";
import { getEmbeddings } from "./embeddings";

export async function getMatchesFromEmbeddings(embeddings, fileKey) {
    try {
        const client = new Pinecone({
            environment: process.env.PINECONE_ENVIRONMENT,
            apiKey: process.env.PINECONE_API_KEY,
        });
        const pineconeIndex = await client.index("chatai");
        const namespace = pineconeIndex.namespace(fileKey.replace(/[^\x00-\x7F]+/g, ""));
        const queryResult = await namespace.query({
            topK: 5,
            vector: embeddings,
            includeMetadata: true,
        });
        return queryResult.matches || [];
    } catch (error) {
        console.log("error querying embeddings", error);
        throw error;
    }
}

export async function getContext(query, fileKey) {
    const queryEmbeddings = await getEmbeddings(query);
    const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

    const qualifyingDocs = matches.filter(
        (match) => match.score && match.score > 0.7
    );

    let docs = qualifyingDocs.map((match) => (match.metadata).text);
    // 5 vectors
    return docs.join("\n").substring(0, 3000);
}