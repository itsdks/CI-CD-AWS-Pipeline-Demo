import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { aws_lambda, aws_apigateway } from 'aws-cdk-lib';
import path from 'node:path';

export class APIEndpointStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const lambdaFn = new aws_lambda.Function(this, 'MyLambda', {
          functionName: 'MyDemoLambdaFunction',
          runtime: aws_lambda.Runtime.NODEJS_LATEST,
          handler: 'index.handler',
          code: aws_lambda.Code.fromAsset(path.join(__dirname, 'lambda'))
        });
        const endpoint = new aws_apigateway.LambdaRestApi(this, 'MyEndpoint', {
          handler: lambdaFn,
          restApiName: 'MyNewEndpoint'
        });
    }
    }

