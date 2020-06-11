var AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-southeast-2",
  endpoint: "http://localhost:8000",
});
// AWS.config.update({ region: "ap-southeast-2" });

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName: process.argv[2],
  ExpressionAttributeValues: {
    ":n": "project E",
    ":t": "type E",
    // ":p": "project",
  },
  KeyConditionExpression: "projetName = :n and projectType = :t",
};

docClient.query(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to read item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
  }
});
