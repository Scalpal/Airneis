import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3CmdClient } from "../S3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const getImagesWithSignedUrl = async(images) => {
  const result = await Promise.all(images.map(async (image) => {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: image.imageSrc
    };

    const command = new GetObjectCommand(uploadParams);
    const url = await getSignedUrl(s3CmdClient, command, { expiresIn: 3600 });

    image.imageUrl = url;
    
    return image;
  }));

  return result;
};

export default getImagesWithSignedUrl;