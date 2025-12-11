import {
    DynamoDBClient,
    DeleteItemCommand,
    PutItemCommand,
    ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuid } from "uuid";

const ddb = new DynamoDBClient({});

const docClient = DynamoDBDocumentClient.from(ddb);


const TABLE_NAME = "Tasks";

const HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "*",
};

const invalidRequest = {
    statusCode: 400,
    headers: HEADERS,
    body: JSON.stringify({ message: "Invalid requeat" }),
};

const serverError = {
    statusCode: 500,
    headers: HEADERS,
    body: JSON.stringify({ message: "Something went wrong" }),
};

const notFound = {
    statusCode: 404,
    headers: HEADERS,
    body: JSON.stringify({ message: "Task not found" }),
};

const parseBody = (event: ApiGatewayEvent) => {
    if (!event.body) return {};
    try {
        return JSON.parse(event.body);
    } catch (error) {
        return {};
    }
};


type ApiGatewayEvent = {
    httpMethod?: string;
    body: string | null;
};

const findTask = async (id: string) => {
    // Query by partition key to retrieve the item despite the table having a sort key
    const command = new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames: {
            "#id": "id",
        },
        ExpressionAttributeValues: {
            ":id": id,
        },
        Limit: 1,
    });

    const response = await docClient.send(command);
    return response.Items?.[0];
};


const getTasks = async () => {
    const res = await ddb.send(
        new ScanCommand({
            TableName: TABLE_NAME,
        })
    );

    const items = (res.Items || []).map((i) => unmarshall(i));
    items.sort(
        (a, b) => Number(b.createdAt ?? 0) - Number(a.createdAt ?? 0)
    );

    return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify(items),
    };
};

const createTask = async (event: ApiGatewayEvent) => {
    try {
        const parsedBody = parseBody(event);
        const newTask = {
            id: uuid(),
            createdAt: Date.now().toString(),
            title: parsedBody.title,
            text: parsedBody.text,
        };

        await ddb.send(
            new PutItemCommand({
                TableName: TABLE_NAME,
                Item: marshall(newTask, { removeUndefinedValues: true }),
            })
        );
        return {
            statusCode: 201,
            headers: HEADERS,
            body: JSON.stringify(newTask),
        };
    } catch (error) {
        return serverError;
    }
};

const updateTask = async (event: ApiGatewayEvent) => {
    try {
        const parsedBody = parseBody(event);
        if (!parsedBody.id) {
            return invalidRequest;
        }
        const existingTask = await findTask(parsedBody.id);
        if (!existingTask) {
            return notFound;
        }   
        const updatedTask = {
            id: parsedBody.id,
            createdAt: existingTask.createdAt,
            text: existingTask.text,
            title: existingTask.title,
        };

        if (parsedBody.title) {
            updatedTask.title = parsedBody.title;
        }

        if (parsedBody.text) {
            updatedTask.text = parsedBody.text;
        }

        await ddb.send(
            new PutItemCommand({
                TableName: TABLE_NAME,
                Item: marshall(updatedTask, { removeUndefinedValues: true }),
            })
        );

        return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify(updatedTask),
        };
    } catch (error) {
        console.log('Error updating task', error);
        return serverError;
    }
};

const deleteTask = async (event: ApiGatewayEvent) => {
    try {
        const parsedBody = parseBody(event);
        if (!parsedBody.id) {
            return invalidRequest;
        }
        const existingTask = await findTask(parsedBody.id);
        if (!existingTask) {
            return notFound;
        }   
        await ddb.send(
            new DeleteItemCommand({
                TableName: TABLE_NAME,
                Key: marshall({ id: parsedBody.id, createdAt: existingTask.createdAt }),
            })
        );

        return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify({ message: "Task deleted successfully" }),
        };
    } catch (error) {
        console.log('Error deleting task', error);
        return serverError;
    }
};

export const handler = async (event: ApiGatewayEvent) => {
    try {
        switch (event.httpMethod) {
            case "GET":
                return await getTasks();
            case "POST":
                return await createTask(event);
            case "PUT":
                return await updateTask(event);
            case "DELETE":
                return await deleteTask(event);
            default:
                return {
                    statusCode: 405,
                    headers: HEADERS,
                    body: JSON.stringify({ message: "Method Not Allowed" }),
                };
        }
    } catch (error) {
        console.error("Error handling request", error);

        return {
            statusCode: 500,
            headers: HEADERS,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};
