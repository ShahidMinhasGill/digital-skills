import axios from "axios";
import { toast } from "react-toastify";
import store from "../services/store";
import { baseUrl } from "./baseUrl";

export const apiInstance = axios.create({
  baseURL: baseUrl,
  // timeout: 10000,
  headers: {
    Accept: "application/json",
    // Authorization: "Bearer 306ca9302ba7fbe8c441235cfd885375b121388dc65de6ec76155b4d39b4cd53"
    // "Content-Type": "multipart/form-data",
  },
});

const responseSuccessHandler = (response) => {
  // document.getElementById("overlay").style.display = "none";
  return response;
};

const responseErrorHandler = (error) => {
  // document.getElementById("overlay").style.display = "none";

  if (!navigator.onLine) {
    toast.error("Request failed, Please check your network connection!");
  }
  if (
    (error && error.response) ||
    (error.response.status > 404 && error.response.status !== 422) ||
    error.response.status === 400 ||
    error.response.status === 401 ||
    error.response.status === 403 ||
    error.response.status === 404 ||
    error.response.status === 422
  ) {
    toast.error(error.response.data.message);
  }

  return Promise.reject(error);
};

apiInstance.interceptors.request.use(
  (config) => {
    // document.getElementById("overlay").style.display = "block";
    // const bearerToken = store.getState().AuthSlice.userData.accessToken;
    // if (bearerToken) {
    //   config.headers.Authorization = `Bearer ${bearerToken}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => responseSuccessHandler(response),
  (error) => responseErrorHandler(error)
);

export default apiInstance;

//400 bad request
//401 Unauthorized is the status code to return when the client provides no credentials or invalid credentials
//403 Forbidden is the status code to return when a client has valid credentials but not enough privileges to perform an action on a resource.
//422 Unprocessable Entity response status code indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions
//404 page not found or file not found error message
