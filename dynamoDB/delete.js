var AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-southeast-2",
  endpoint: "http://localhost:8000",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName: process.argv[2],
  Key: {
    projectName: "project F",
    projectType: "type F",
  },
  ConditionExpression: "totalMember <= :val",
  ExpressionAttributeValues: {
    ":val": 1,
  },
};

docClient.delete(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to read item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
  }
});
