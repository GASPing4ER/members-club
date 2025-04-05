import { clerkClient } from "./clerk";

export const getUsers = async () => {
  try {
    const res = await clerkClient.users.getUserList();
    return res.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
