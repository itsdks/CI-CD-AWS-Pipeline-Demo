import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { aws_lambda, aws_apigateway } from 'aws-cdk-lib';
import path from 'path';

export class CiCdAwsPipelineDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection("itsdks/CI-CD-AWS-Pipeline-Demo", "main", {
          connectionArn: 'arn:aws:codeconnections:ap-south-1:571600838562:connection/824e958f-62cb-435e-a08c-8e895ff6975e'
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    const lambdaFn = new aws_lambda.Function(this, 'MyLambda', {
      functionName: 'MyLambdaFunction',
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
