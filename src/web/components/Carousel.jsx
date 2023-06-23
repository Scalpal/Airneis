import styles from "@/styles/components/Carousel.module.css"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid"

const Carousel = (props) => {
  const { images, Autoplay, controls } = props

  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides] = useState(images)
  const [autoplay] = useState(Autoplay)

  const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
  }, [currentSlide, slides.length])

  const previousSlide = useCallback(() => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }, [currentSlide, slides.length])

  useEffect(() => {
    if (autoplay) {
      setTimeout(() => {
        nextSlide()
      }, 5000)
    }
  })

  return (
    <div className={styles.carouselContainer} id="carousel">

      {images.map((image, index) => {
        return (
          <Image
            src={image.imageUrl}
            alt={"Carousel Image" + index}
            key={index}
            fill
            className={
              currentSlide === index
                ? styles.carouselSlideActive
                : styles.carouselSlide
            }
            style={{
              objectFit: "cover",
            }}
          />
        )
      })}

      <div className={controls ? styles.controlButtons : styles.hidden}>
        {images.map((_, index) => {
          return (
            <span
              className={
                currentSlide === index
                  ? styles.controlButtonActive
                  : styles.controlButton
              }
              key={index}
              onClick={() => { setCurrentSlide(index) }}
            >
            </span>
          )
        })}
      </div>

      <button
        className={controls ? styles.arrowLeftButton : styles.hidden}
        onClick={() => previousSlide()}
      >
        <ArrowLeftIcon className={styles.icon} />
      </button>

      <button
        className={controls ? styles.arrowRightButton : styles.hidden}
        onClick={() => nextSlide()}
      >
        <ArrowRightIcon className={styles.icon} />
      </button>
    </div>
  )
}

export default Carousel
