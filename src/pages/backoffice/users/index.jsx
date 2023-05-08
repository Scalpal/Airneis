import Layout from "@/web/components/backoffice/Layout";
import Table from "@/web/components/backoffice/Table";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";
import styles from "@/styles/backoffice/statsPages.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { parseCookies } from "nookies";
import jsonwebtoken from "jsonwebtoken";
import config from "@/api/config.js";
import Axios, { AxiosError } from "axios";
import routes from "@/web/routes";
import { useCallback, useEffect, useState } from "react";
import Select from "@/web/components/Select";
import Pagination from "@/web/components/backoffice/Pagination";


const BackofficeUsers = (props) => {
  const { usersProps, count } = props; 

  const [users, setUsers] = useState({ users: usersProps, count: count});
  const [searchValue, setSearchValue] = useState("");

  const [queryParams, setQueryParams] = useState({
    limit: 1,
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

  useEffect(() => {
    const searchInput = document.getElementById("searchInput");

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setQueryParams({
          ...queryParams,
          page: 1,
          search: searchValue
        });
      }
    };
    searchInput.addEventListener("keydown", handleKeyDown);

    return () => {
      searchInput.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchValue, queryParams]);

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

        <div className={styles.actionBar}>
          <div>
            <p>All users</p>

            <div className={styles.customSearchInput}>
              <input type="text" id="searchInput" placeholder="Search a user" onChange={(e) => setSearchValue(e.target.value)} />
              <MagnifyingGlassIcon className={styles.actionBarIcon} />
            </div>

            <Select
              defaultValue={10}
              onChange={(e) => handleLimit(Number.parseInt(e.target.value))}
            >
              <option>Limit per page</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </Select>
          </div>

          <Pagination
            dataCount={users.count}
            queryParams={queryParams}
            handleQueryParams={handleQueryParams}
          />
        </div>

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
  const { payload } = jsonwebtoken.verify(token, config.security.jwt.secret);

  const { data: { user } } = await Axios.get(`http://localhost:3000/${routes.api.users.single(payload.user.id)}`);
   
  if (!user.isAdmin) {
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
  const { data: { users, count } } = await reqInstance.get(`http://localhost:3000/${routes.api.users.collection()}`);

  return {
    props: {
      usersProps: users,
      count: count
    }
  };
};

export default BackofficeUsers; 