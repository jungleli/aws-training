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
  Key: {
    projectName: "project C",
    projectType: "type C",
  },
  UpdateExpression:
    "set memberName = :m, startDate = :d, code = :c, totalMember = :t, newProject = :n",
  ExpressionAttributeValues: {
    ":m": ["a", "b"],
    ":d": new Date().toJSON(),
    ":c": docClient.createSet([
      Buffer.from(JSON.stringify({ test: "a" })),
      Buffer.from(JSON.stringify({ test: "b" })),
    ]),
    ":t": 1,
    ":n": false,
  },
};
//   Key: {
//     projectName: "project E",
//     projectType: "type E",
//   },
//   UpdateExpression:
//     "set memberName = :m, startDate = :d, code = :c, totalMember = :t, newProject = :n",
//   ExpressionAttributeValues: {
//     ":m": [
//       1,
//       2.33,
//       "name",
//       {
//         firstName: "Jun",
//         lastName: "Li",
//       },
//     ],
//     ":d": docClient.createSet(["set string a", "set string b"]),
//     ":c": docClient.createSet([
//       Buffer.from(JSON.stringify({ test: "a" })),
//       Buffer.from(JSON.stringify({ test: "b" })),
//     ]),
//     ":t": docClient.createSet([1.23, 2.33]),
//     ":n": false,
//   },
// };

docClient.update(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
