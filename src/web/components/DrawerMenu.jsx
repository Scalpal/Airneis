import styles from "@/styles/components/DrawerMenu.module.css";
import Link from "next/link";
import { classnames } from "@/pages/_app";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import routes from "../routes";
import { useEffect } from "react";
//import { useContext } from "react";
import { useTranslation } from "next-i18next";

const DrawerMenu = (props) => {
  const { t } = useTranslation(["drawerMenu"]);
  const { isDrawerToggledState, actions } = props;
  const [isDrawerToggled, setIsDrawerToggled] = isDrawerToggledState;

  const [signOut, session] = actions ? actions : [null, null];

  const router = useRouter();

  useEffect(() => {
    if (isDrawerToggled === true) {
      document.body.style.overflow = "hidden";

      return;
    }

    document.body.style.overflow = "";
  }, [isDrawerToggled]);

  const logout = () => {
    signOut();
    router.push(routes.pages.home());
  };

  //const { userLanguage, userLanguageChange } = useContext(LanguageContext);

  // const handleLanguageChange = (e) => userLanguageChange(e.target.value);

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
          <Link href="/profil">{t("myProfil")}</Link>
        ) : (
          <Link href={routes.login()}>{t("login")}</Link>
        )}
        {session ? (
          <a onClick={logout}>{t("logout")}</a>
        ) : (
          <Link href={routes.register()}>{t("register")}</Link>
        )}
        {session && (
          <Link href={routes.backoffice.base()}>
            {t("backoffice")}
          </Link>
        )}
        <Link href="">{t("termsOfUse")}</Link>
        <Link href="">{t("legalMentions")}</Link>
        <Link href="">{t("contact")}</Link>
        <Link href="">{t("aboutUs")}</Link>
        {/*<div>
            <select onChange={handleLanguageChange} value={userLanguage}>
            {" "}
            {Object.entries(languageOptions).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
            </div>*/}
      </div>
    </>
  );
};

export default DrawerMenu;
