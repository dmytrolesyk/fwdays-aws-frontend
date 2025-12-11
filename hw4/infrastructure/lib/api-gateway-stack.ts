import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";

export interface ApiStackProps extends StackProps {
    processTasks: IFunction;
}

export class ApiStack extends Stack {
    public readonly api: apigw.RestApi;

    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        this.api = new apigw.RestApi(this, "TasksApi", {
            restApiName: "Tasks Service",
            defaultCorsPreflightOptions: {
                allowOrigins: apigw.Cors.ALL_ORIGINS,
                allowMethods: apigw.Cors.ALL_METHODS,
            },
        });

        const tasks = this.api.root.addResource("tasks");

        tasks.addMethod("GET", new apigw.LambdaIntegration(props.processTasks));
        tasks.addMethod("POST", new apigw.LambdaIntegration(props.processTasks));
        tasks.addMethod("PUT", new apigw.LambdaIntegration(props.processTasks));
        tasks.addMethod("DELETE", new apigw.LambdaIntegration(props.processTasks));

        new cdk.CfnOutput(this, "ApiUrl", {
            value: this.api.url,
        });
    }
}