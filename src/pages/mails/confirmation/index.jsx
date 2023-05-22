import { useRouter } from "next/router"
import BackofficeLoginLayout from "@/web/components/backoffice/LoginLayout"
import routes from "@/web/routes"
import styles from "@/styles/mails/confirmation.module.css"
import { useEffect, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import classNames from "classnames"

const MailConfirmation = () => {
  const [err, setErr] = useState(false)
  const [answer, setAnswer] = useState(null)
  const router = useRouter()
  const { key } = router.query
  const {
    actions: { confirmAccount, crypt },
  } = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      if (key) {
        const [{ getKey }] = await crypt([{ key }])

        if (!getKey) {
          setAnswer("Invalid password reset link")
          setErr(true)

          return
        }

        const [error, results] = await confirmAccount(getKey)

        if (error) {
          setAnswer(error)
          setErr(true)
        } else {
          setAnswer(results)
        }
      }
    }
    fetchData()
  }, [confirmAccount, crypt, key])

  const handleclick = () => {
    router.push(routes.home())
  }

  return (
    <div className={styles.div}>
      <span className={classNames(styles.answer, { [styles.error]: err })}>
        {answer}
      </span>
      <button className={styles.button} onClick={handleclick}>
        Return to Home
      </button>
    </div>
  )
}
MailConfirmation.isPublic = true
MailConfirmation.getLayout = function (page) {
  return <BackofficeLoginLayout>{page}</BackofficeLoginLayout>
}

export default MailConfirmation
