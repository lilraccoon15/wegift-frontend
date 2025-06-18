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

  export function useProfile(id: string) {
    return useQuery<User, Error>({
      queryKey: ["userProfile"],
      queryFn: async () => {
        const res = await axios.get(`${API_URL}/api/users/profile/${id}`, {
          withCredentials: true,
        });
        return res.data.data.user;
      },
      enabled: !!id
    });
  }

  export function useAreFriends(userId1: string, userId2: string, enabled: boolean) {
    return useQuery<boolean>({
      queryKey: ["areFriends", userId1, userId2],
      queryFn: async () => {
        const res = await axios.get(`${API_URL}/api/users/are-friends`, {
          params: { user1: userId1, user2: userId2 },
          withCredentials: true,
        });
        return res.data.areFriends;
      },
      enabled,
    });
  }