import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { aws_lambda_nodejs, aws_apigateway } from 'aws-cdk-lib';
import path from 'node:path';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

export class APIEndpointStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const lambdaFn = new aws_lambda_nodejs.NodejsFunction(this, 'MyDemoLambda', {
          functionName: 'MyDemoLambdaFunction',
          handler: 'index.handler',
          entry: 'lib/lambda/index.ts',
          runtime: Runtime.NODEJS_LATEST
        });
        const endpoint = new aws_apigateway.LambdaRestApi(this, 'MyEndpoint', {
          handler: lambdaFn,
          restApiName: 'MyNewEndpoint'
        });
    }
    }

