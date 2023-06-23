import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import S3 from "aws-sdk/clients/s3";
import crypto from "crypto"; 


const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

export const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
});

// This structure to use commands
export const s3CmdClient = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

//Upload file
export const uploadImageToS3 = (file, folderPath) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: `${folderPath}${randomImageName()}`
  };

  return s3.upload(uploadParams).promise();
}; 



// Delete file
export const deleteImageFromS3 = async(fileName) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName
  }; 

  const command = new DeleteObjectCommand(deleteParams);
  
  await s3CmdClient.send(command);
};
