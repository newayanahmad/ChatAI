import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import md5 from "md5";
import {
    Document,
    RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";

export const getPineconeClient = () => {
    return new Pinecone({
        environment: process.env.PINECONE_ENVIRONMENT,
        apiKey: process.env.PINECONE_API_KEY,
    });
};

export async function loadS3IntoPinecone(fileUrl) {
    // 1. obtain the pdf -> downlaod and read from pdf
    console.log("downloading s3 into file system");
    // const file_name = await downloadFromS3(fileKey);
    // if (!file_name) {
    //     throw new Error("could not download from s3");
    // }
    // console.log("loading pdf into memory" + file_name);
    const loader = new PDFLoader(fileUrl);
    const pages = (await loader.load());

    // 2. split and segment the pdf
    const documents = await Promise.all(pages.map(prepareDocument));

    // 3. vectorise and embed individual documents
    const vectors = await Promise.all(documents.flat().map(embedDocument));

    // 4. upload to pinecone
    const client = await getPineconeClient();
    const pineconeIndex = await client.index("chatai");
    const namespace = pineconeIndex.namespace(fileKey.replace(/[^\x00-\x7F]+/g, ""));

    console.log("inserting vectors into pinecone");
    await namespace.upsert(vectors);

    return documents[0];
}

async function embedDocument(doc) {
    try {
        const embeddings = await getEmbeddings(doc.pageContent);
        const hash = md5(doc.pageContent);

        return {
            id: hash,
            values: embeddings,
            metadata: {
                text: doc.metadata.text,
                pageNumber: doc.metadata.pageNumber,
            },
        };
    } catch (error) {
        console.log("error embedding document", error);
        throw error;
    }
}

export const truncateStringByBytes = (str, bytes) => {
    const enc = new TextEncoder();
    return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page) {
    let { pageContent, metadata } = page;
    pageContent = pageContent.replace(/\n/g, "");
    // split the docs
    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata: {
                pageNumber: metadata.loc.pageNumber,
                text: truncateStringByBytes(pageContent, 36000),
            },
        }),
    ]);
    return docs;
}