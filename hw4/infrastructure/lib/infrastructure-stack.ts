import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { DynamoDbStack } from './dynamodb-stack';
import { LambdaStack } from './lambda-stack';
import { ApiStack } from './api-gateway-stack';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const db = new DynamoDbStack(this, "DbStack");

    const lambdas = new LambdaStack(this, "LambdaStack", {
      notesTable: db.tasksTable,
    });

    new ApiStack(this, "ApiStack", {
      processTasks: lambdas.processTasks,
    });
  }
}
