#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { CiCdAwsPipelineDemoStack } from '../lib/ci-cd-aws-pipeline-demo-stack';

require('dotenv').config();

const app = new cdk.App();
new CiCdAwsPipelineDemoStack(app, 'CiCdAwsPipelineDemoStack', {
  env: { account: '571600838562', region: 'ap-south-1' },
});

app.synth();