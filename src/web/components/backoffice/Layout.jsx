import Navbar from "@/web/components/backoffice/Navbar";
import styles from "@/styles/backoffice/Layout.module.css";
import { useCallback, useEffect, useState } from "react";
import useAppContext from "@/web/hooks/useAppContext";


const BackofficeLayout = ({ children }) => {

  const { actions: { getLoggedUser }} = useAppContext(); 
  const [loggedUser, setLoggedUser] = useState({}); 

  const getLoggedUserInfos = useCallback(async () => {
    try {
      const user = await getLoggedUser(); 
      setLoggedUser(user);

    } catch (error) {
      console.log(error);
    }
  }, [getLoggedUser]); 

  useEffect(() => {
    getLoggedUserInfos();
  }, [getLoggedUserInfos]);

  return (
    <div className={styles.layout} >
      <Navbar loggedUser={loggedUser} />

      <div className={styles.childrenContainer}>
        {children}
      </div>
    </div>
  );
};

export default BackofficeLayout; 
