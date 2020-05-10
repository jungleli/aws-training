// dependencies
const AWS = require("aws-sdk");

// get reference to S3 client
const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
    const srcBucket = "lambda-resource-src";
    const srcKey = "function.zip";
    const dstBucket = "lambda-resource-dst";
    const dstKey = "function.zip";

    try {
        const params = {
            Bucket: srcBucket,
            Key: srcKey,
        };
        var origimage = await s3.getObject(params).promise();
    } catch (error) {
        console.log("can't read");
        console.log(error);
        return;
    }

    try {
        const destparams = {
            Bucket: dstBucket,
            Key: dstKey,
            Body: origimage.Body,
            ContentType: "image",
        };

        const putResult = await s3.putObject(destparams).promise();
    } catch (error) {
        console.log(error);
        return;
    }

    console.log(
        "Successfully resized " +
            srcBucket +
            "/" +
            srcKey +
            " and uploaded to " +
            dstBucket +
            "/" +
            dstKey
    );
};
