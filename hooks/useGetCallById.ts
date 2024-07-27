// this is our custom hook.
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useState ,useEffect} from "react";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>(); // this state is of type call.
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) {
      return;
    }

    const loadCall = async () => {
      const { calls } = await client.queryCalls({
        // destructuring the all calls.
        filter_conditions: {
          id, // filtering the calls by id.
        },
      });

      if (calls.length > 0) {
        setCall(calls[0]); // fetching only the first call.
      }

      setIsCallLoading(false);
    };

    loadCall();
  }, [client, id]);


  return {call , isCallLoading}
};
