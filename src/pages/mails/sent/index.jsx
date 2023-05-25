import { useRouter } from "next/router"
import styles from "@/styles/mails/confirmation.module.css"
import BackofficeLoginLayout from "@/web/components/backoffice/LoginLayout"
import useAppContext from "@/web/hooks/useAppContext"
import { useEffect, useState } from "react"
import classNames from "classnames"

const MailSent = () => {
  const router = useRouter()
  const [answer, setAnswer] = useState(null)
  const [err, setErr] = useState(null)
  const { id } = router.query
  const {
    services: {
      security: { crypt },
    },
  } = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const [{ getId }] = await crypt([{ id }])

        if (!getId) {
          setAnswer("Invalid page")
          setErr(true)

          return
        }

        setAnswer("We send you a mail")
      }
    }
    fetchData()
  }, [crypt, id])

  return (
    <div className={styles.div}>
      <span className={classNames(styles.answer, { [styles.error]: err })}>
        {answer}
      </span>
    </div>
  )
}
MailSent.isPublic = true
MailSent.getLayout = function (page) {
  return <BackofficeLoginLayout>{page}</BackofficeLoginLayout>
}
export default MailSent
