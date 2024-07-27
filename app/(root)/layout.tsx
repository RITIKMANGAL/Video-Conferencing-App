import StreamVideoProvider from "@/providers/StreamClientProvider";
import React, { ReactNode } from "react";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "MEETSTREAM",
  description: "Video Calling App",
  icons:{
    icon:'/icons/logo.svg'
  }
};

const Rootlayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default Rootlayout;
