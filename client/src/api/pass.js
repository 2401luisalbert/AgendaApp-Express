import instance from "./axios";

export const userRequest = async (values) => {
  try {
    const response = await instance.post("/email", values);
    console.log(values)
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
