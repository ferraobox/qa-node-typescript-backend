import SwaggerParser from '@apidevtools/swagger-parser';
import * as AJV from 'ajv';
import { ValidateType } from './ValidateTypes';

class SwaggerCheck {
  swaggerpath: string;
  schema: object;
  ajv = new AJV.default({
    meta: true,
    coerceTypes: false,
    allErrors: true,
    unknownFormats: ['int32', 'int64', 'double'],
  });

  constructor(swaggerpath: string) {
    this.swaggerpath = swaggerpath;
  }

  setUpSwaggerApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      SwaggerParser.validate(this.swaggerpath, (err, api) => {
        if (err) throw reject(err);
        else {
          this.schema = JSON.parse(JSON.stringify(api));
          resolve();
        }
      });
    });
  }

  validateSchema(endpoint: string, method: string, response: number, body: any): ValidateType[] {
    // Postman library Ajv
    const result: ValidateType[] = [];
    let schema: any = this.schema;
    this.ajv.validateSchema(schema);
    schema = schema.paths[endpoint][method].responses;
    //Check if there are response defined, else we use default response
    if (schema.hasOwnProperty(response)) schema = schema[response].content['application/json'].schema;
    else schema = schema.default.content['application/json'].schema;
    //Check Schema
    const valid = this.ajv.validate(schema, body);
    if (!valid) {
      this.ajv.errors?.forEach((error) => {
        console.log(`*** ${error.keyword} - ${error.dataPath}: ${error.message} ->`.red, error.params, '** schemaPath:'.red, error.schemaPath);
        result.push({ message: error.message, argument: error.dataPath, stack: error.schemaPath });
      });
      return result;
    } else return result;
  }
}

export { SwaggerCheck };
