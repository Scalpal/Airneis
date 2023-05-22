import Image from "next/image"
import styles from "@/styles/components/Banner.module.css"

const Banner = (props) => {
  const { title } = props

  return (
    <header className={styles.banner} id="carousel">
      <h1 className={styles.bannerTitle}>{title}</h1>
      <Image
        src={"/meuble-3.png"}
        alt="Banner image"
        fill
        className={styles.bannerImage}
      />
    </header>
  )
}

export default Banner
