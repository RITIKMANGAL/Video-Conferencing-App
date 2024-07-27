"use client"
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useState, useEffect } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>(); // here streamVideoClient is the type of the state.
  const { user, isLoaded } = useUser(); // this gives the state of the currently active user using clerk.

  useEffect(() => {
    if (!user || !isLoaded) {
      return;
    }
    if (!apiKey) {
      throw new Error("Stream API Key is missing");
    }

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider, // to verify the user is indeed that user // using environment stream secret key.
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) {
    return <Loader/>;
  }

  return <StreamVideo client={videoClient}>
    {/* Now our application infused with the power of video */}
    {children} 
  </StreamVideo>;
};

export default StreamVideoProvider;
