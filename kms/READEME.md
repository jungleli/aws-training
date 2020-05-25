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
