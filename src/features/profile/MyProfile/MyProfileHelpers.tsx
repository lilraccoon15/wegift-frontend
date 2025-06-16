import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../config";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  picture: string;
  description: string;
}

export function useMyProfile() {
  return useQuery<User, Error>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/users/get-user`, {
        withCredentials: true,
      });
      return res.data.data.user;
    },
  });
}