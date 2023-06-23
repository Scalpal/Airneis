const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3CmdClient } = require("../S3");

const getProductsImagesWithSignedUrls = async (products) => {
  const finalProducts = await Promise.all(products.map(async (product) => {
    const productImagesWithUrl = await Promise.all(product.productImages.map(async (image) => {
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image.imageSrc
      };

      const command = new GetObjectCommand(uploadParams);
      const url = await getSignedUrl(s3CmdClient, command, { expiresIn: 3600 });

      image.imageUrl = url;

      return image;
    }));
    product.productImages = productImagesWithUrl;

    return product;
  }));

  return finalProducts;
};

export default getProductsImagesWithSignedUrls;