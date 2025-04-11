import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post("/user/login", { email, password });
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Login failed";
    throw new Error(message);
  }
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await axios.post("/user/signup", { name, email, password });
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Signup failed";
    throw new Error(message);
  }
};

export const checkAuthStatus = async () => {
  try {
    const res = await axios.get("/user/auth-status");
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Authentication check failed";
    throw new Error(message);
  }
};

export const sendChatRequest = async (message: string) => {
  try {
    const res = await axios.post("/chat/new", { message });
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Sending chat failed";
    throw new Error(message);
  }
};

export const getUserChats = async () => {
  try {
    const res = await axios.get("/chat/all-chats");
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Fetching chats failed";
    throw new Error(message);
  }
};

export const deleteUserChats = async () => {
  try {
    const res = await axios.delete("/chat/delete");
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Deleting chats failed";
    throw new Error(message);
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.get("/user/logout");
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Logout failed";
    throw new Error(message);
  }
};
