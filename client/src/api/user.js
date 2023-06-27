import instance from "./axios";

export const userRequest = async () => {
  try {
    const response = await instance.get("/profile");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
