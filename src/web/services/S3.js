import S3 from "aws-sdk/clients/s3";
import crypto from "crypto"; 

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
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

// Download file
export const getFileStream = (fileKey) => {
  const downloadParams = {
    key: fileKey,
    Bucket: bucketName
  };

  return s3.getObject(downloadParams).createReadStream();
};
