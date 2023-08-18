import axios from "axios";

export const axiosInstance = async() => {
  // you need to be careful in next.js for adding cookies.
  // You could be on the server or on client. this code will work for client assuming that you will be using on client side
  // I belive you are using `parser` to get cookies. get the token

  let base_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  if (typeof base_url === "undefined") {
    console.log("Not able to contact the backend");
  }
  
  const yourToken = "whatever";

  const axiosClient = axios.create({
    baseURL: base_url,
    timeout: 1000,
    headers: {
      Accept: "application/json",
      // this is how u set in your code
      // Authorization: `Bearer ${cookies["idToken"]}`,
    },
  });
  return axiosClient;
};
