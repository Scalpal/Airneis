import jsonwebtoken from "jsonwebtoken";

const checkToken = async (token) => {
  console.log("TOKKEEEEEEN : ", token); 

  if (!token) {
    console.log("we're in "); 
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    };
  }

  console.log("there is a token. "); 

  const decodedToken = jsonwebtoken.decode(token);
  const isTokenExpired = Date.now() >= decodedToken.expires * 1000;

  if (isTokenExpired) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    };
  }
};

export default checkToken;