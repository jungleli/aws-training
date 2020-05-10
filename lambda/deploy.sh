#!/bin/bash
zip -r function.zip ./index.js

# Create S3 first
aws cloudformation deploy --template-file ./CloudFormation-s3.json \
--stack-name create-first-s3 \
--no-fail-on-empty-changeset --capabilities CAPABILITY_NAMED_IAM

# Upload file to S3
aws s3 cp function.zip s3://jlli-lambda-resource-src

# Create lambda
aws cloudformation deploy --template-file ./CloudFormation.json --stack-name create-lambda --no-fail-on-empty-changeset --capabilities CAPABILITY_NAMED_IAM
