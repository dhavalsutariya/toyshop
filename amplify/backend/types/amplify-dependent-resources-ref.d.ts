export type AmplifyDependentResourcesAttributes = {
  "api": {
    "sendToyEmail": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "toyshop": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "function": {
    "sendToyEmail": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}