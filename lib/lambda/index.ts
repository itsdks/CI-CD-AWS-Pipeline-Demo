export async function handler(event: string, context: string) {
    return {
        body: 'Hello from Lambda function',
        statusCode: 200
    }
}