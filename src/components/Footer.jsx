import styles from "@/styles/Footer.module.css"; 

const Footer = () => {


  return (
    <footer className={styles.footer}>
      <div
        className={styles.footerInfos}
      >
        <div>
          <p className={styles.footerInfosBrandTitle}>Airneis</p>

          {/* Social network icons */}
          {/* <div>

          </div> */}

          <p> Adress </p>
          <p> 23 rue de la tour, 75008 Paris </p>

        </div>

        <div>
          <h2>My Account </h2>
          <p>Sign in</p>
          <p>Register </p>
          <p>Order status</p>

        </div>

        <div>
          <h2>Shop</h2>
          <p>All products</p>
          <p>All categories </p>
        </div>

        <div>
          <h2>Legal stuff</h2>
          <p>Shipping & delivery</p>
          <p>Terms and conditions</p>
          <p>Privacy & policy</p>
        </div>
      </div>

      <p className={styles.copyrightText}> Copyright ©2022 Airneis. All Rights Reserved </p>
    </footer>
  )
};

export default Footer; 