import axios from "axios";
import store from "./store";

export default class Api {
    static init() {
        const ignoredUrls = [`${process.env.VUE_APP_RESOURCE_CONFIG_URL}`, `${process.env.VUE_APP_TODAY_BRAINORPOLL_WINNER_URL}`, `${process.env.VUE_APP_TODAY_BINGO_WINNER_URL}`];
        // Add a request interceptor
        axios.interceptors.request.use(
            (config) => {
                const originalRequest = config;
                // this.ignoreUrl.indexOf(config.url) === -1
                // console.log(ignoredUrls);
                const index = config.url.search(ignoredUrls.join("|"));
                // console.log(config.url, index);
                if (index === -1) {
                    // originalRequest.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
                    originalRequest.headers.post['Content-Type'] ='application/json';
                    // originalRequest.headers.acquisition_source = "baazi";
                    // originalRequest.headers.client_key = process.env.VUE_APP_CLIENT_KEY; // later need to change with "pwagames"
                    console.log("localStorage.userAuthDetails", localStorage.userAuthDetails);
                    originalRequest.headers.x_auth = localStorage.userAuthDetails ? JSON.parse(localStorage.userAuthDetails).tokens[0].token : "";
                    // console.log("originalRequest", originalRequest);
                    return Promise.resolve(originalRequest);
                }
                return Promise.resolve(config);
            },
            error => Promise.reject(error),
        );

        // Add a response interceptor
        axios.interceptors.response.use((response) => {
            console.log("response===>", response);
            if (response.data && response.data.status === 1056) {
                // console.log(response.data.status);
                store.dispatch("logout");
                window.location = "/login?status=1056";
            }
            if (response.data && response.data.status === 400) {
                // console.log(response.data.status);
                window.showToast(response.data.message, 2000);
            }
            return response;
        }, (error) => {
            console.log("error response", error);
            return Promise.reject(error);
        });
    }

    static login(data, success, failure) {
        axios.post(`http://localhost:3000/users/login`, data).then(
            (response) => {
                if (response.data.tokens) {
                        store.dispatch("loggedIn", response.data);
                }
                if (success) {
                    success(response);
                }
            },
            (error) => {
                if (failure) {
                    failure(error);
                }
            },
        );
    }

    static register(data, success, failure) {
        axios.post(`http://localhost:3000/users/register`, data).then(
            (response) => {
                if (response.data.tokens) {
                    if (response.data.tokens[0].token) {
                        store.dispatch("loggedIn", response.data);
                    }
                }
                if (success) {
                    success(response);
                }
            },
            (error) => {
                if (failure) {
                    failure(error);
                }
            },
        );
    }

    static addStory(data, config, success, failure) {
        // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
        axios.post(`http://localhost:3000/add-post`, data, config).then(
            (response) => {
                if (success) {
                    success(response);
                }
            },
            (error) => {
                if (failure) {
                    failure(error);
                }
            },
        );
    }

    static getAllUsers(success, failure) {
        axios.get(`http://localhost:3000/users`).then(
            (response) => {
                if (success) {
                    success(response);
                }
            },
            (error) => {
                if (failure) {
                    failure(error);
                }
            },
        );
    }

    static getUserDetails(id, success, failure) {
        axios.get(`http://localhost:3000/userDetails/${id}`).then(
            (response) => {
                if (success) {
                    success(response);
                }
            },
            (error) => {
                if (failure) {
                    failure(error);
                }
            },
        );
    }

    static getAllPost(success, failure) {
        axios.get(`http://localhost:3000/all-posts`).then(
            (response) => {
                if (success) {
                    success(response);
                }
            },
            (error) => {
                if (failure) {
                    failure(error);
                }
            },
        );
    }

    static getMyPost(id, success, failure) {
        axios.get(`http://localhost:3000/my-post/${id}`).then(
            (response) => {
                if (success) {
                    success(response);
                }
            },
            (error) => {
                if (failure) {
                    failure(error);
                }
            },
        );
    }
}
