import styles from "@/styles/components/CircleAnimation.module.css"
import classNames from "classnames"
import { useState } from "react"
import { CheckCircleIcon } from "@heroicons/react/24/outline"

const CircleAnimation = () => {
  const [bubbleAnimation, setBubbleAnimation] = useState(true)

  setTimeout(() => {
    setBubbleAnimation(false)
  }, 550)

  return (
    <>
      <div className={styles.whiteBG}>
        <svg height="100%" width="100%">
          <circle
            className={classNames(
              bubbleAnimation ? styles.circle : styles.reverse
            )}
            cx="50%"
            cy="50%"
            r="11%"
            stroke="#231f20"
            strokeWidth="4"
            fillOpacity="0"
          />
        </svg>
        {!bubbleAnimation && <CheckCircleIcon className={styles.check} />}
      </div>
    </>
  )
}

export default CircleAnimation
