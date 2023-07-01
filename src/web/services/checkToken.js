import jsonwebtoken from "jsonwebtoken";

const checkToken = async (token) => {
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  const decodedToken = jsonwebtoken.decode(token);
  const isTokenExpired = Date.now() >= decodedToken.exp * 1000;

  if (isTokenExpired) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }
};

export default checkToken;