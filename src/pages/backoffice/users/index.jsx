import Layout from "@/web/components/backoffice/Layout";
import Table from "@/web/components/backoffice/Table";
import { classnames } from "@/pages/_app";
import { nunito } from "@/pages/_app";
import styles from "@/styles/backoffice/statsPages.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Michaels",
    mail: "johnMichaels@gmail.com",
    phoneNumber: "0601020304",
  },
  {
    id: 1,
    firstName: "Marc",
    lastName: "Simons",
    mail: "marcSimons@gmail.com",
    phoneNumber: "0601020304",
  },
  {
    id: 1,
    firstName: "Jannah",
    lastName: "Erikson",
    mail: "jannahErikson@gmail.com",
    phoneNumber: "0601020304",
  },
  {
    id: 1,
    firstName: "Sonny",
    lastName: "Johnson",
    mail: "sonnyJohnson@gmail.com",
    phoneNumber: "0601020304",
  },
  {
    id: 1,
    firstName: "Micah",
    lastName: "Bell",
    mail: "micahBell@gmail.com",
    phoneNumber: "0601020304",
  }
];

const BackofficeUsers = () => {

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
          <p>{users.length}</p>
        </div>

        <div>
          <p>Total of active users</p>
          <p>3</p>
        </div>

        <div>
          <p>Total of customers (at least 1 order)</p>
          <p>2</p>
        </div>

        <div>
          <p>Percentage of customers in users</p>
          <p>{((100 * 2) / users.length).toFixed(2)}%</p>
        </div>
      </div>

      <div className={styles.mainContent}>

        <div className={styles.actionBar}>
          <div>
            <p>Users</p>

            <div className={styles.customSearchInput}>
              <input type="text" placeholder="Search a user" />
              <MagnifyingGlassIcon className={styles.actionBarIcon} />
            </div>
          </div>
        </div>

        <Table array={users} />
      </div>

    </main>
  );
};
BackofficeUsers.isPublic = true
BackofficeUsers.getLayout = function (page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default BackofficeUsers; 