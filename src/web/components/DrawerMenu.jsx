import styles from "@/styles/components/DrawerMenu.module.css"
import Link from "next/link"
import routes from "@/web/routes"
import { classnames } from "@/pages/_app"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"

const DrawerMenu = (props) => {
  const { isDrawerToggledState, actions } = props
  const [isDrawerToggled, setIsDrawerToggled] = isDrawerToggledState

  const [signOut, session] = actions ? actions : [null, null]

  const router = useRouter()
  const logout = () => {
    signOut()
    router.push(routes.pages.home())
  }

  return (
    <>
      <div
        className={classnames(
          styles.overlay,
          isDrawerToggled ? styles.overlayActive : styles.overlayInactive
        )}
      ></div>

      <div
        className={classnames(
          styles.drawerMenu,
          isDrawerToggled ? styles.drawerMenuActive : styles.drawerMenuInactive
        )}
      >
        <ArrowRightIcon
          className={styles.drawerMenuIcon}
          onClick={() => setIsDrawerToggled(!isDrawerToggled)}
        />
        {session ? (
          <Link href={routes.pages.profil()}>My profil</Link>
        ) : (
          <Link href={routes.pages.signIn()}>Login</Link>
        )}
        {session ? (
          <Link href="" onClick={logout}>
            Logout
          </Link>
        ) : (
          <Link href={routes.pages.signUp()}>Register</Link>
        )}
        <Link href="">CGU</Link>
        <Link href="">Legal mentions</Link>
        <Link href="">Contact</Link>
        <Link href="">About us</Link>
      </div>
    </>
  )
}

export default DrawerMenu
