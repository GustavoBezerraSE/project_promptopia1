import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();

    try {
        await connectToDb();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();
        
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.error("Error while saving prompt:", error);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}