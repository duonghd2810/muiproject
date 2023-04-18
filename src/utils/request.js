import axios from "axios";
const request = axios.create({
	baseURL: "http://localhost:8080/api/v1/",
});
request.interceptors.request.use(
  function (config) {
		// Do something before request is sent
    const token = localStorage.getItem("token");
    config.headers.Authorization = token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default request;
