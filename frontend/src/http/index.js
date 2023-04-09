import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//list of all the endpoints
export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);
export const logout = () => api.post("/api/logout");
export const createRoom = (data) => api.post("/api/rooms", data);
export const getAllRooms  = () => api.get('/api/rooms');

// when access token expires then we have refresh the access token
// Interceptors  - sit in between the request and response
// For now we have to check the response because in token-service if accessToken
// expires it will throw 401 error
api.interceptors.response.use(
  //first arrow function contains the information about response , also request
  (config) => {
    return config;
  },

  //second arrow function contains the information about error
  async (err) => {
    const originalRequest = err.config;
    // console.log(originalRequest);

    if (
      err.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {
        console.log(err.message);
      }
    }

    throw err;
  }
);

export default api;
