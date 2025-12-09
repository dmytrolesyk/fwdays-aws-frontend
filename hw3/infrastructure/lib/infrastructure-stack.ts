import * as cdk from 'aws-cdk-lib/core';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { aws_cloudfront_origins } from 'aws-cdk-lib';
import { FrontendStack } from './frontend-stack';
import { BackEndStack } from './backend-stack';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const frontendStack = new FrontendStack(this, 'FrontendStack');
    const backendStack = new BackEndStack(this, 'BackendStack');
  }
}
