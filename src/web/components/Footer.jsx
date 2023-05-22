import styles from "@/styles/components/Footer.module.css"
import Link from "next/link"
import routes from "@/web/routes"
import { useRouter } from "next/router"

const Footer = (props) => {
  const { actions } = props
  const [signOut, session] = actions ? actions : [null, null]
  const router = useRouter()

  const logout = () => {
    signOut()
    router.push(routes.home())
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfos}>
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
          {session ? (
            <Link href={routes.profil()}>
              <p>My profil</p>
            </Link>
          ) : (
            <Link href={routes.login()}>
              <p>Sign in</p>
            </Link>
          )}
          {session ? (
            <a onClick={logout}>
              <p>Logout</p>
            </a>
          ) : (
            <Link href={routes.register()}>
              <p>Register</p>
            </Link>
          )}
          {session && (
            <Link href={routes.order()}>
              <p>Orders</p>
            </Link>
          )}
        </div>

        <div>
          <h2>Shop</h2>
          <Link href={routes.products()}>
            <p>All products</p>
          </Link>
          <Link href={routes.categories()}>
            <p>All categories</p>
          </Link>
        </div>

        <div>
          <h2>Legal stuff</h2>
          <p>Shipping & delivery</p>
          <p>Terms and conditions</p>
          <p>Privacy & policy</p>
        </div>
      </div>

      <p className={styles.copyrightText}>
        {" "}
        Copyright ©2022 Airneis. All Rights Reserved{" "}
      </p>
    </footer>
  )
}

export default Footer
