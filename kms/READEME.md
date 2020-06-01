# KMS

1. Create KMS:

   ```
   aws kms create-key \
   --tags TagKey=Purpose,TagValue=Test \ --description "Development test key"
   ```

2. Create Alias
   ```
   aws kms create-alias \
   --alias-name alias/jlli-kms \
   --target-key-id <key-id>
   ```
3. Encrypt

   ```
   aws kms encrypt \
   --key-id <key-id> \
   --plaintext welcome \
   --output text \
   --query CiphertextBlob | base64 --decode > ./EncryptedFile.base64
   ```

4. Decrypt
   ```
   aws kms decrypt \
    --ciphertext-blob fileb://EncryptedFile.base64 \
    --output text \
    --query Plaintext | base64 --decode
   ```

### Terms

CMK: customer master key

### More

- Using CloudTrail to aduit the using history
  - Filter by event source: `kms.amazonaws.com`
- Using ssm put/get secure key

    ```
    aws ssm put-parameter --name jlli-key --value "welcom jlli" --type SecureString
    ```

    ```
    aws ssm get-parameter --name jlli-key --with-decryption
    ```
