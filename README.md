# MeetStream - Video Conferencing App

MeetStream is a robust video conferencing application built using Next.js and TypeScript. This app supports real-time communication and collaboration with features like video calls, recording, and screen sharing. It leverages Clerk for authentication, getStream for messaging, and Shadcn UI for a sleek user interface.

## Overview

MeetStream is designed to provide seamless and high-quality video conferencing experiences. The app can support up to 100 users per session, ensuring smooth and efficient communication. It incorporates essential features for modern conferencing needs, making it an ideal solution for both personal and professional use.

## Tech Stack

- **Next.js**
- **TypeScript**
- **Clerk**
- **getStream**
- **Shadcn UI**

## Project Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/meetstream.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd meetstream
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Set up environment variables:**
    - Create a `.env.local` file in the root directory.
    - Add your Clerk and getStream API keys and other necessary environment variables.
    ```env
    NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
    CLERK_API_KEY=<your-clerk-api-key>
    GETSTREAM_API_KEY=<your-getstream-api-key>
    GETSTREAM_API_SECRET=<your-getstream-api-secret>
    ```
5. **Run the development server:**
    ```bash
    npm run dev
    ```
6. **Open the app in your browser:**
    ```bash
    http://localhost:3000
    ```

## Key Features

- **Real-Time Video Conferencing:**
  - Supports high-quality video calls with up to 100 participants.
  - Enables smooth and efficient real-time communication.

- **User Authentication:**
  - Secure and seamless user authentication using Clerk.
  - Provides user management and session handling.

- **Messaging and Collaboration:**
  - Real-time messaging integrated with getStream.
  - Supports text chat during video calls for enhanced collaboration.

- **Recording and Screen Sharing:**
  - Allows users to record meetings for future reference.
  - Supports screen sharing for presentations and demonstrations.

- **Modern and Intuitive UI:**
  - Designed using Shadcn UI for a sleek and modern look.
  - Ensures a user-friendly experience with easy navigation.
