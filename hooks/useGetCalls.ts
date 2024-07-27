import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCalls = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;
      
      setIsLoading(true);

     /* This code snippet is making an asynchronous call to fetch calls using the `client.queryCalls`
     method. Here's a breakdown of what it's doing: */
      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({// this is to fetch all the calls.
          /* The `sort: [{ field: 'starts_at', direction: -1 }]` in the code snippet is specifying the
          sorting criteria for the fetched calls. It is sorting the calls based on the `starts_at`
          field in descending order (`direction: -1`). */
          sort: [{ field: 'starts_at', direction: -1 }],// sorting the calls based on the start at from the most recent call.
          filter_conditions: {
            starts_at: { $exists: true },// if the currently login user exist
            $or: [
              /* The `{ created_by_user_id: user.id },` part in the code snippet is a filter condition
              used to query calls based on the user who created the call. It checks if the
              `created_by_user_id` field in the call object matches the `id` of the currently
              logged-in user (`user.id`). */
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },// all the members in the meeting call.
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  const now = new Date();

  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt
  })

  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now
  })

  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading }
};