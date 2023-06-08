import Layout from "@/web/components/backoffice/Layout";
import Table from "@/web/components/backoffice/Table";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";
import styles from "@/styles/backoffice/statsPages.module.css";
import { parseCookies } from "nookies";
import { AxiosError } from "axios";
import routes from "@/web/routes";
import { useCallback, useEffect, useState } from "react";
import ActionBar from "@/web/components/backoffice/ActionBar";
import useAppContext from "@/web/hooks/useAppContext";
import CustomAlert from "@/web/components/CustomAlert";
import checkToken from "@/web/services/checkToken";
import getApiClient from "@/web/services/getApiClient";
import checkIsAdmin from "@/web/services/checkIsAdmin";
import Modal from "@/web/components/Modal";
import SpecificUserPageContent from "@/web/components/backoffice/SpecificUserPageContent";

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  const badTokenRedirect = await checkToken(token);

  if (badTokenRedirect) {
    return badTokenRedirect; 
  }

  const notAdminRedirect = await checkIsAdmin(context);

  if (notAdminRedirect) {
    return notAdminRedirect;
  }

  const reqInstance = getApiClient(context);

  try {
    const { data: { users, count } } = await reqInstance.get(`http://localhost:3000/${routes.api.users.collection()}`);

    return {
      props: {
        usersProps: users,
        count: count
      }
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    };
  }
};

const userInfoTab = "user-info";

const BackofficeUsers = (props) => {
  const { usersProps, count } = props; 
  const { actions: { api } } = useAppContext(); 

  const [alert, setAlert] = useState({ status: "", message: ""}); 
  const [showAlert, setShowAlert] = useState(false); 
  const [users, setUsers] = useState({ users: usersProps, count: count });
  const [activeUser, setActiveUser] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(""); 
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
    const reqInstance = getApiClient();
  
    try {
      const { data: { users, count} } = await reqInstance.get(`http://localhost:3000${routes.api.users.collection(queryParams)}`);

      setUsers({users, count}); 
    } catch (error) {
      if (error instanceof AxiosError) {
        setShowAlert(true);
        setAlert({ status: error.response.status, message: error.response.message });
      }
    }
  }, [queryParams]);

  const showSpecificUser = useCallback((id) => {
    const user = users.users.find(elt => elt.id === id); 

    setShowModal(true);
    setActiveTab(userInfoTab);
    setActiveUser(user);
  }, [users]);

  const desactivateUser = useCallback(async (userId) => {
    try {
      const { data } = await api.delete(routes.api.users.delete(userId));

      updateUsers();
      setShowAlert(true);
      setAlert({ status: data.status, message: data.message });
    } catch (error) {
      if (error instanceof AxiosError) {
        setShowAlert(true);
        setAlert({ status: error.response.status, message: error.response.message });
      }
    }
  }, [api, updateUsers]);

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
          <p>{count}</p>
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
          visibleColumns={["id", "email", "firstName", "lastName", "phoneNumber", "active", "isAdmin"]}
          showSpecificRowFunction={showSpecificUser}
          deleteRowFunction={desactivateUser}
        />
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        {activeTab === userInfoTab && (
          <SpecificUserPageContent
            key={activeUser.id}
            user={activeUser}
            setShowModal={setShowModal}
            updateUsers={updateUsers}
          />
        )}
      </Modal>

      <CustomAlert
        alert={alert}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
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

export default BackofficeUsers; 