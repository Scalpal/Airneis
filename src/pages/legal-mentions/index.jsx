import styles from "@/styles/legalMentions.module.css";
import Banner from "@/web/components/Banner";

const Mentions = () => {
  return (
    <>
      <Banner className={styles.title} title={"Legal mentions"} />
      <p className={styles.informations}>SAS ÀIRNEIS</p>
      <p className={styles.informations}>Numéro de SIRET: 750102030458</p>
      <p className={styles.informations}>
        Adresse: 32 Spring Drive, Glasgow, United Kingdom
      </p>
      <p className={styles.informations}>Téléphone: +44 38 0946 5200</p>
      <p className={styles.informations}>Email: airneis@contact.com</p>
    </>
  );
};

Mentions.isPublic = true;
export default Mentions;
