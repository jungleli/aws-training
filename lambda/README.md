## Create resource

1. Using below command to create the source bucket and lambda resource
   `sh deploy.sh`

2. Using belowcommand to create the second bucket
   `sh create-s3`

3. Trigger the lambda in aws console or with below command
   `aws lambda invoke --function-name jlli-hello-lambda --invocation-type Event out.txt`


Questions:

Got error:

> message: 'Access Denied',
> code: 'AccessDenied',

Solved by add ManagedPolicy (attach-role-policy)
