const AWS = require("aws-sdk");
const cloudwatchClient = new AWS.CloudWatch();

exports.handler = (event, context, callback) => {
  const params = {
    MetricData: [
      {
        MetricName: "customise-metric-jlli",
        Dimensions: [
          {
            Name: "Time",
            Value: "date",
          },
        ],
        Unit: "Seconds",
        Value: new Date().toTimeString(),
      },
    ],
    Namespace: "AWS/JLLI",
  };
  cloudwatchClient.putMetricData(params, function (err, data) {
    console.log("callback function");
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", JSON.stringify(data));
    }
  });
};
