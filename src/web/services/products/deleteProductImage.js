import routes from "@/web/routes"
import getApiClient from "../getApiClient"


const deleteProductImage = async (imageName, productId) => {
  const reqInstance = getApiClient()
  const url = process.env.API_URL + routes.api.products.deleteImage(productId)
  const data = {
    imageName: imageName
  }

  try {
    const response = await reqInstance.patch(url, data)

    return [null, response]
  } catch (error) {
    return Array.isArray(error) ? error : [error]
  }
}

export default deleteProductImage