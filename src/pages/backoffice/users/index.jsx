import Layout from "@/web/components/backoffice/Layout";
import Table from "@/web/components/backoffice/Table";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";
import styles from "@/styles/backoffice/statsPages.module.css";
import { parseCookies } from "nookies";
import jsonwebtoken from "jsonwebtoken";
import Axios, { AxiosError } from "axios";
import routes from "@/web/routes";
import { useCallback, useEffect, useState } from "react";
import ActionBar from "@/web/components/backoffice/ActionBar";


const BackofficeUsers = (props) => {
  const { usersProps, count } = props; 

  const [users, setUsers] = useState({ users: usersProps, count: count});

  const [queryParams, setQueryParams] = useState({
    limit: 10,
    page: 1,
    order: "asc",
    orderField: "id",
    search: ""
  });

  const handleQueryParams = useCallback((key, value) => {
    setQueryParams({
      ...queryParams,
      [key]: value
    });
  }, [queryParams]);

  const sortColumn = useCallback((column) => {
    const notSortableKeys = ["email", "phoneNumber", "active", "isAdmin"];

    if (notSortableKeys.includes(column)) {
      return false; 
    }
    
    // By default, when we sort a column, we set it to ASC
    if (column !== queryParams["orderField"]) {
      setQueryParams({
        ...queryParams,
        page: 1,
        orderField: column,
        order: "asc"
      }); 
      
      return;
    }

    setQueryParams({
      ...queryParams,
      page: 1,
      orderField: column,
      order: queryParams["order"] === "asc" ? "desc" : "asc"
    }); 
  }, [queryParams]); 

  const handleLimit = useCallback((value) => {
    setQueryParams({
      ...queryParams,
      page: 1,
      limit: value
    });
  }, [queryParams]); 

  const updateUsers = useCallback(async () => {
    const { token } = parseCookies();

    try {
      const reqInstance = Axios.create({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { data: { users, count} } = await reqInstance.get(`http://localhost:3000${routes.api.users.collection(queryParams)}`);

      setUsers({users, count}); 
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  }, [queryParams]);

  useEffect(() => {
    updateUsers();
  }, [queryParams, updateUsers]);

  return (
    <main
      className={classnames(
        styles.mainContainer,
        nunito.className
      )}
    >
      <div className={styles.topStats}>
        <div>
          <p>Total of users</p>
          <p>{usersProps.length}</p>
        </div>

        {/* This will be a sum of users that has an order in the last 6 months */}
        <div>
          <p>Total of active users</p>
          <p>3</p>
        </div>

        <div>
          <p>Total of customers (at least 1 order)</p>
          <p>{usersProps.length}</p>
        </div>

        <div>
          <p>Percentage of customers in users</p>
          <p>{((100 * 2) / usersProps.length).toFixed(2)}%</p>
        </div>
      </div>

      <div className={styles.mainContent}>
        <ActionBar
          label={"All users"}
          handleLimit={handleLimit}
          dataCount={users.count}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          handleQueryParams={handleQueryParams}
        />

        <Table
          array={users.users}
          safeArray={usersProps}
          queryParams={queryParams}
          sortColumn={sortColumn}
        />
      </div>
    </main>
  );
};
BackofficeUsers.isPublic = false;
BackofficeUsers.getLayout = function (page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    };
  }

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

  const reqInstance = Axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const { data: { user } } = await reqInstance.get(`http://localhost:3000/${routes.api.users.self()}`);
   
  if (!user.isAdmin) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    };
  }

  const { data: { users, count } } = await reqInstance.get(`http://localhost:3000/${routes.api.users.collection()}`);

  return {
    props: {
      usersProps: users,
      count: count
    }
  };
};

export default BackofficeUsers; 