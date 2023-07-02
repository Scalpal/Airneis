import styles from "@/styles/components/DrawerMenu.module.css";
import Link from "next/link";
import { classnames } from "@/pages/_app";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import routes from "../routes";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import useAppContext from "../hooks/useAppContext";
import { useTranslation } from "next-i18next";
import LanguageSelect from "./LanguageSelect";

const DrawerMenu = (props) => {
  const { t } = useTranslation(["drawerMenu"]);
  const { isDrawerToggledState } = props;
  const [isDrawerToggled, setIsDrawerToggled] = isDrawerToggledState;

  const {
    actions: { signOut },
    state: { session },
  } = useAppContext();

  const { userData, userError, userIsLoading } = useUser();
  const user = !userError && !userIsLoading ? userData : {};

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
    router.push("/");
  };

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
        {!userIsLoading && user.isAdmin && (
          <Link href={routes.backoffice.users()}>{t("backoffice")}</Link>
        )}
        <Link href={routes.cgu()}>{t("termsOfUse")}</Link>
        <Link href={routes.legalMentions()}>{t("legalMentions")}</Link>
        <Link href="/contact">{t("contact")}</Link>
        <Link href="/about-us">{t("aboutUs")}</Link>
        <LanguageSelect />
      </div>
    </>
  );
};

export default DrawerMenu;
