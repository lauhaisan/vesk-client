import { getToken } from "../utils/token";

const uploadApi = async payload => {
  const { token } = await getToken();
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
      "Access-Control-Allow-Origin": "http://localhost:3000"
    },
    body: JSON.stringify(payload)
  };
  const response = await fetch(
    "http://45.77.255.38:8075/vesk/upload",
    requestOptions
  );
  let data = await response.json();
  console.log("data", data);
  return data;
};

export { uploadApi };
