aws cloudformation deploy --template-file ./sns-sqs.yml \
--stack-name sns-sqs-jlli \
--no-fail-on-empty-changeset --capabilities CAPABILITY_NAMED_IAM
