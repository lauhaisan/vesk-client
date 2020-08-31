import { getToken } from "../utils/token";

const uploadApi = async (payload) => {
  console.log("service", payload);
  const { token } = await getToken();
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(payload),
  };
  const response = await fetch(
    "http://45.77.255.38:8075/vesk/upload",
    requestOptions
  );
  let data = await response.json();

  console.log("data", data);
};

export { uploadApi };
