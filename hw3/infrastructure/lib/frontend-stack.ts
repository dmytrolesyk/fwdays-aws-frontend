import * as cdk from 'aws-cdk-lib/core';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { aws_cloudfront_origins } from 'aws-cdk-lib';

export class FrontendStack extends cdk.Stack {
  public readonly distribution: cloudfront.Distribution;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const blobFishAndBeaverBucket = new s3.Bucket(this, 'BlobFishAndBeaverBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicPolicy: false,
      }),
    });

    this.distribution = new cloudfront.Distribution(this, 'BlobFishAndBeaverDistribution', {
      defaultBehavior: {
        origin: new aws_cloudfront_origins.S3StaticWebsiteOrigin(blobFishAndBeaverBucket, {
          originPath: '/',
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',  
    });

    new BucketDeployment(this, 'BlobFishAndBeaverBucketDeployment', {
      sources: [Source.asset('../frontend/dist')],
      destinationBucket: blobFishAndBeaverBucket,
      distribution: this.distribution,
      distributionPaths: ['/*'],
    });
  }
}
