import { Stack, StackProps, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Table, AttributeType, BillingMode } from "aws-cdk-lib/aws-dynamodb";

export class DynamoDbStack extends Stack {
    public readonly tasksTable: Table;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.tasksTable = new Table(this, "TasksTable", {
            tableName: "Tasks",
            partitionKey: {
                name: "id",
                type: AttributeType.STRING,
            },
            sortKey: {
                name: "createdAt",
                type: AttributeType.STRING,
            },
            billingMode: BillingMode.PAY_PER_REQUEST,
            removalPolicy: RemovalPolicy.DESTROY,
        });
    }
}