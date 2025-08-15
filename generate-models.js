const OpenAPI = require('openapi-typescript-codegen');

OpenAPI.generate({
  input: './schemas/schema.json',
  output: './generated/schema',
  httpClient: 'axios',
  clientName: 'TestClient',
  request: './request.ts'
});
