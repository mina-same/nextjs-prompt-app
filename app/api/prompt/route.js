import { connectToDB } from "@utils/database";
import Prompt from "@models/prompts";

export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });

  } catch (err) {
    
    return new Response(JSON.stringify("failed to get all prompts", { err: err }), {
      status: 500,
    });

  }
};
