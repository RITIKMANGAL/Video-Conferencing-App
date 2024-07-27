'use client';
import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import { Button } from './ui/button';
import Alert from './Alert'; // Import the Alert component

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggled, call]);

  if (!call) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center text-center text-white">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-lg">Unable to initialize the call. Please ensure you are within a StreamCall component.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      {callTimeNotArrived && (
        <Alert
          title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
        />
      )}
      {callHasEnded && (
        <Alert
          title="The call has been ended by the host"
          iconUrl="/icons/call-ended.svg"
        />
      )}
      {!callTimeNotArrived && !callHasEnded && (
        <>
          <h1 className="text-center text-2xl font-bold">Setup</h1>
          <VideoPreview />
          <div className="flex h-16 items-center justify-center gap-3">
            <label className="flex items-center justify-center gap-2 font-medium">
              <input
                type="checkbox"
                checked={isMicCamToggled}
                onChange={(e) => setIsMicCamToggled(e.target.checked)}
              />
              Join with mic and camera off
            </label>
            <DeviceSettings />
          </div>
          <Button
            className="rounded-md bg-green-500 px-4 py-2.5"
            onClick={() => {
              call.join();
              setIsSetupComplete(true);
            }}
          >
            Join meeting
          </Button>
        </>
      )}
    </div>
  );
};

export default MeetingSetup;
