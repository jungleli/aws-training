bucketName=$1
# Create Second S3
aws cloudformation deploy --template-file ./CloudFormation-s3.json \
--stack-name create-s3 \
--parameter-overrides BucketName=lambda-resource-dst \
--no-fail-on-empty-changeset --capabilities CAPABILITY_NAMED_IAM
