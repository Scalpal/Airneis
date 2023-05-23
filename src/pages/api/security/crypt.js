import config from "@/api/config.js"
import validate from "@/api/middlewares/validate.js"
import mw from "@/api/mw.js"
import { stringValidator } from "@/validator"
import { enc, AES } from "crypto-js"

const handler = mw({
  GET: [
    validate({
      query: {
        CryptoValues: stringValidator.nullable(),
      },
    }),
    async ({
      locals: {
        query: { CryptoValues },
      },
      res,
    }) => {
      const values = JSON.parse(CryptoValues)

      const decrypt = (props) => {
        const bytes = AES.decrypt(props, config.security.encrypt);
        return bytes.toString(enc.Utf8);
      };

      const decryptValues = CryptoValues.map((obj) => {
        const decryptedObj = {}
        for (const [key, value] of Object.entries(obj)) {
          const newKey = `get${key.charAt(0).toUpperCase() + key.slice(1)}`
          decryptedObj[newKey] = decrypt(value)
        }
        return decryptedObj;
      });

      res.send({ CryptoKey: decryptValues })
    },
  ],
})

export default handler
