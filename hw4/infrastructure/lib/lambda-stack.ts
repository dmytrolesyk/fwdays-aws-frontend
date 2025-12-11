import { Stack, StackProps, Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "path";

export interface LambdaStackProps extends StackProps {
  notesTable: Table;
}

export class LambdaStack extends Stack {
    public readonly processTasks: NodejsFunction;

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        this.processTasks = new NodejsFunction(this, "ProcessTasksFn", {
            entry: path.join(__dirname, "../../backend/lambdas/processTasks.ts"),
            handler: "handler",
            runtime: Runtime.NODEJS_20_X,
            timeout: Duration.seconds(10),
            environment: {
                NOTES_TABLE: props.notesTable.tableName,
            },
        });

        props.notesTable.grantReadWriteData(this.processTasks);
    }
}
