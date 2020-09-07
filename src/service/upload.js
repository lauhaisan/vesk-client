import { getToken } from "../utils/token";

const uploadApi = async (payload) => {
  const { token } = await getToken();
  const requestOptions = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      "Access-Control-Request-Headers": "Content-Type, authorization",
      Authorization: token,
    },
    body: payload,
  };
  console.log("requestOptions", requestOptions);
  const response = await fetch(
    "https://upload.vesk.fastfps.com/vesk/upload",
    requestOptions
  );
  const data = await response.json();
  return data;
};

export { uploadApi };
