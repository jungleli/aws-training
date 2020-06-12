var AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-southeast-2",
  //   endpoint: "http://localhost:8000",
});
// AWS.config.update({ region: "ap-southeast-2" });

var docClient = new AWS.DynamoDB.DocumentClient();
var TableName = process.argv[2];
var params = {
  TransactItems: [
    {
      Delete: {
        Key: {
          projectName: "project C",
          projectType: "type C",
        },
        TableName,
        ConditionExpression: "totalMember <= :val",
        ExpressionAttributeValues: {
          ":val": 1,
        },
        ReturnValuesOnConditionCheckFailure: "NONE",
      },
    },
    {
      Put: {
        TableName,
        Item: {
          projectName: "project B",
          projectType: "type B",
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
      },
    },
    {
      Update: {
        TableName,
        Key: { projectName: "project B", projectType: "type New" },
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
      },
    },
  ],
};

docClient.transactWrite(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to read item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
  }
});
