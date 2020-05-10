const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const srcBucket = "jlli-lambda-resource-src";
  const srcKey = "function.zip";
  const dstBucket = "jlli-lambda-resource-dst";
  const dstKey = "function.zip";

  try {
    const params = {
      Bucket: srcBucket,
      Key: srcKey,
    };
    var origimage = await s3.getObject(params).promise();
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const destparams = {
      Bucket: dstBucket,
      Key: dstKey,
      Body: origimage.Body,
    };

    const putResult = await s3.putObject(destparams).promise();
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(
    "Successfully access " +
      srcBucket +
      "/" +
      srcKey +
      " and uploaded to " +
      dstBucket +
      "/" +
      dstKey
  );
};
