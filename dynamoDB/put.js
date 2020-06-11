// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({
  region: "ap-southeast-2",
  endpoint: "http://localhost:8000",
});

// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

var params = {
  TableName: process.argv[2],
};

var params = {
  TableName: params.TableName,
  Item: {
    projectName: "project E",
    projectType: "type E",
    memberName: [
      1,
      2.33,
      "name",
      {
        firstName: "Jun",
        lastName: "Li",
      },
    ],
    startDate: docClient.createSet(["set string a", "set string b"]),
    code: docClient.createSet([
      Buffer.from(JSON.stringify({ test: "a" })),
      Buffer.from(JSON.stringify({ test: "b" })),
    ]),
    totalMember: 10,
    newProject: false,
  },
};

docClient.put(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
