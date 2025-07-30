import axios from "axios";
import API_URL from "../../../config";
import { useQuery } from "@tanstack/react-query";

export async function drawExchangeById(exchangeId: string) {
  const response = await axios.post(
    `${API_URL}/api/exchange/draw/${exchangeId}`,
    {},
    { withCredentials: true }
  );

  return response.data;
}

export async function cancelExchangeDrawById(exchangeId: string) {
  const response = await axios.delete(
    `${API_URL}/api/exchange/cancel-draw/${exchangeId}`,
    { withCredentials: true }
  );

  return response.data;
}

export function useParticipantsProfiles(userIds: string[]) {
  return useQuery<Record<string, string>, Error>({
    queryKey: ["participantsProfiles", userIds],
    queryFn: async () => {
      const results = await Promise.all(
        userIds.map(async (id) => {
          const res = await axios.get(`${API_URL}/api/users/profile/${id}`, {
            withCredentials: true,
          });

          const pseudo = res.data?.data?.profile?.pseudo;

          if (!pseudo) {
            throw new Error(`Pseudo non trouvé pour userId ${id}`);
          }

          return { id, pseudo };
        })
      );

      return results.reduce((acc, curr) => {
        acc[curr.id] = curr.pseudo;
        return acc;
      }, {} as Record<string, string>);
    },
    enabled: userIds.length > 0,
  });
}
