const config = {
  baseURL: "http://localhost:3000",
  session: {
    localStorageKey: "My_User_Session_Token"
  },
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME
};
export default config;
