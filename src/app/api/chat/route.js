import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
// import { getContext } from "@/lib/context";
import { NextResponse } from "next/server";
// import connectToDatabase from "@/db/connect";
// import { FileModel } from "@/db/Schema";
export const runtime = "edge";
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
export async function POST(req) {
    try {
        const { messages, fileId } = await req.json();
        // await connectToDatabase()
        // const file = await FileModel.findOne({ _id: fileId })
        console.log(messages, fileId)
        // if (!file) {
        //     return NextResponse.json({ error: "chat not found" }, { status: 404 });
        // }
        // const fileKey = file.fileKey;
        const lastMessage = messages[messages.length - 1];
        // const context = await getContext(lastMessage.content, fileKey);

        const prompt = {
            role: "system",
            content: `
            Your Name is ChatAI. You are a chatbot that can answer questions from you PDF files, helping you understand and learn better.
            AI assistant is a brand new, powerful, human-like artificial intelligence.
            The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
            Don't give so long answer. Try to give consise and precise. 
            Answer in proper markdown format.
      
      `,
        };

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                prompt,
                ...messages,
            ],
            stream: true
        });
        const stream = OpenAIStream(response, {
            onStart: async () => {
                // save user message into db
                // await FindModel.updateOne({ _id: fileId }, { $push: { messages: [...messages, completion] } })
            },
            onCompletion: async (completion) => {
                // save ai message into db
                // await FindModel.updateOne({ _id: fileId }, { $push: { messages: [...messages, completion] } })
            },
        });
        return new StreamingTextResponse(stream);

    } catch (error) { return NextResponse.json({ error: error }) }
}