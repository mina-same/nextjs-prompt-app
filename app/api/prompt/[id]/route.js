import { connectToDB } from "@utils/database";
import Prompt from "@models/prompts";

//! get (reed) 
export const GET = async (request,{params}) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if(!prompt) return new Response("prompt not found", {status: 404});

    return new Response(JSON.stringify(prompt), { status: 200 });

  } catch (err) {
    
    return new Response(JSON.stringify("failed to get all prompt", { err: err }), {
      status: 500,
    });

  }
};


//! patch (update)
export const PATCH = async (req,{params}) => {

  const {prompt, tag} = await req.json();

  try{
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if(!params.id) return new Response("prompt not found", {status: 404});

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt),{status: 200});
  } catch(err) {

    return new Response("failed to update the prompt", {status: 500});

  }
}

// DELETE (delete)
export const DELETE = async (req,{params}) => {
  try{
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("prompt deleted", {status: 200});

    if(!params.id) return new Response("prompt not found", {status: 404});

  } catch{

    return new Response("failed to delete prompt",{status: 500});

  }
}