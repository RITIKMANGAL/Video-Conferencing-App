"use server";
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from '@stream-io/node-sdk';
// this code is only run at the sever side.

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();// this contains the details of the logged in user when it loggins.

  if (!user) {
    throw new Error("User is not logged in");
  }
  if (!apiKey) {
    throw new Error("No API Key");
  }
  if(!apiSecret){
    throw new Error("No API secret");
  }
   // creating a server-side client
  const client = new StreamClient(apiKey, apiSecret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;// validity time of the token issued to the user.
  const issued = Math.floor(Date.now() / 1000) - 60; // time at which token was issued.

  const token = client.createToken(user.id , exp , issued);// this is the generated token.for the  user.

  return token;
};
