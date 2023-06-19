import * as yup from "yup"

const checkIsAdmin = () => {
  return async (ctx) => {
    const { res, next, logger, locals } = ctx
    const user = locals.user

    try {
      if (user.isAdmin === false) {
        res.status(403).send({ error: "Forbidden" })

        return
      }

      next()
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(422).send({ error: error.errors })

        return
      }

      logger.error(error)

      res.status(500).send({ error: "Oops. Something went wrong." })
    }
  }
}

export default checkIsAdmin
