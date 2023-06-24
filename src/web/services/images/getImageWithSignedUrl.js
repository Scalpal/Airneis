import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3CmdClient } from "../S3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const getImageWithSignedUrl = async (imageSrc) => {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageSrc
  };

  const command = new GetObjectCommand(uploadParams);
  const url = await getSignedUrl(s3CmdClient, command, { expiresIn: 3600 });
  
  return url;
};

export default getImageWithSignedUrl;