# Homework #1

Here's a link to my static website deployed to S3 website hosting using AWS CLI:

http://fwdays-dmytrolesyk-hw1-cli.s3-website.eu-central-1.amazonaws.com/

I did it using the following commands.

I configured a separate profile because the default one is tied to my work account and is used for AWS VPN.

```bash
aws configure --profile personal
```

```bash
BUCKET_NAME="fwdays-dmytrolesyk-hw1-cli"
HTML_FILE="index.html"
REGION="eu-central-1"
```

```bash
aws s3api create-bucket --bucket $BUCKET_NAME --region $REGION --create-bucket-configuration LocationConstraint=$REGION --profile personal

aws s3 cp "$HTML_FILE" s3://$BUCKET_NAME/index.html --profile personal

aws s3 website  s3://$BUCKET_NAME/ --index-document $HTML_FILE --profile personal

aws s3api put-public-access-block --bucket $BUCKET_NAME --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" --profile personal

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::'"$BUCKET_NAME"'/*"
  }]
}' --profile personal

```

