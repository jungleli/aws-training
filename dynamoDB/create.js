var AWS = require("aws-sdk");
// AWS.config.update({ region: "ap-southeast-2" });
AWS.config.update({
  region: "ap-southeast-2",
  endpoint: "http://localhost:8000",
});
// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

var params = {
  AttributeDefinitions: [
    {
      AttributeName: "projectName",
      AttributeType: "S",
    },
    {
      AttributeName: "projectType",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "projectName",
      KeyType: "HASH",
    },
    {
      AttributeName: "projectType",
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
  TableName: process.argv[2],
  StreamSpecification: {
    StreamEnabled: false,
  },
};

// Call DynamoDB to create the table
ddb.createTable(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});
