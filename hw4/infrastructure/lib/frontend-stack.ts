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
        blockPublicAcls: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
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
      // SPA fallback: serve index.html for unknown keys so client-side routing works
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0),
        },
      ],
    });

    new BucketDeployment(this, 'BlobFishAndBeaverBucketDeployment', {
      sources: [Source.asset('../frontend/dist')],
      destinationBucket: blobFishAndBeaverBucket,
      distribution: this.distribution,
      distributionPaths: ['/*'],
    });
  }
}