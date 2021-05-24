import 'colors';
import * as got from 'got';
import { Response, GoodResponse, BadResponse } from './CustomResponse';

class ApiController {
  baseUrl: string;
  got: got.Got;
  headers: got.Headers;
  options: got.OptionsOfJSONResponseBody;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.got = got.default;
    this.headers = {
      'Content-Type': 'application/json',
      'user-agent': 'automaticTest',
    };
    this.options = {
      followRedirect: true,
      headers: this.headers,
    };
  }

  mapGoodResponse(endpoint: string, response: got.Response): GoodResponse {
    const body: any = this.bodyStringToJSON(response.body);
    const customResponse: GoodResponse = {
      url: `${this.baseUrl}${endpoint}`,
      statusMessage: response.statusMessage,
      statusCode: response.statusCode,
      headers: response.headers,
      body: body,
      ip: response.ip,
    };
    return customResponse;
  }

  mapBadResponse(endpoint: string, err: got.RequestError): BadResponse {
    const nameCode: number[] = [];
    err.message.match(/^\d+|\d+\b|\d+(?=\w)/g)?.forEach((text) => nameCode.push(parseInt(text)));
    let errBody: any = err.response?.body;
    errBody = this.getJsonErrorBody(errBody, err);
    const customResponse: BadResponse = {
      url: `${this.baseUrl}${endpoint}`,
      name: err.name,
      message: errBody.message,
      stack: err.stack,
      statusCode: errBody.code !== 0 ? errBody.code : nameCode[0],
    };
    return customResponse;
  }

  getJsonErrorBody(str: string, err: got.RequestError): any {
    let bodyResult = {};
    try {
      bodyResult = JSON.parse(str);
    } catch (e) {
      return { message: err.message, code: parseInt(err.code || '0') };
    }
    return bodyResult;
  }

  bodyStringToJSON(obj: any): any {
    let bodyResult = {};
    try {
      bodyResult = JSON.parse(obj);
    } catch (e) {
      bodyResult = obj;
    }
    return bodyResult;
  }

  manageOptions(method: string, endpoint: string, body: unknown, headers?: got.Headers) {
    const options = this.options;
    options.body = JSON.stringify(body);
    if (headers) options.headers = headers;
    console.log(`${method}: ${this.baseUrl}${endpoint}`.blue);
    return options;
  }

  manageOptionsNoBody(method: string, endpoint: string, headers?: got.Headers) {
    const options = this.options;
    if (headers) options.headers = headers;
    options.body = undefined;
    console.log(`${method}: ${this.baseUrl}${endpoint}`.blue);
    return options;
  }

  /**
   * @param {endpoint} endpoint
   * @param {options} options
   * @returns {Promise}
   */
  post(endpoint: string, body: unknown, headers?: got.Headers): Promise<Response> {
    const options = this.manageOptions('POST', endpoint, body, headers);
    return this.got
      .post(`${this.baseUrl}${endpoint}`, options)
      .then((response) => this.mapGoodResponse(endpoint, response))
      .catch((err) => this.mapBadResponse(endpoint, err));
  }

  /**
   * @param {endpoint} endpoint
   * @param {options} options
   * @returns {Promise}
   */

  get(endpoint: string, headers?: got.Headers): Promise<Response> {
    const options = this.manageOptionsNoBody('GET', endpoint, headers);
    return this.got
      .get(`${this.baseUrl}${endpoint}`, options)
      .then((response) => this.mapGoodResponse(endpoint, response))
      .catch((err) => this.mapBadResponse(endpoint, err));
  }

  /**
   * @param {endpoint} endpoint
   * @param {options} options
   * @returns {Promise}
   */

  put(endpoint: string, body: unknown, headers?: got.Headers): Promise<Response> {
    const options = this.manageOptions('PUT', endpoint, body, headers);
    return this.got
      .put(`${this.baseUrl}${endpoint}`, options)
      .then((response) => this.mapGoodResponse(endpoint, response))
      .catch((err) => this.mapBadResponse(endpoint, err));
  }

  /**
   * @param {endpoint} endpoint
   * @param {options} options
   * @returns {Promise}
   */

  patch(endpoint: string, body: unknown, headers?: got.Headers): Promise<Response> {
    const options = this.manageOptions('PATCH', endpoint, body, headers);
    return this.got
      .patch(`${this.baseUrl}${endpoint}`, options)
      .then((response) => this.mapGoodResponse(endpoint, response))
      .catch((err) => this.mapBadResponse(endpoint, err));
  }

  /**
   * @param {endpoint} endpoint
   * @param {options} options
   * @returns {Promise}
   */

  delete(endpoint: string, headers?: got.Headers): Promise<Response> {
    const options = this.manageOptionsNoBody('DELETE', endpoint, headers);
    return this.got
      .delete(`${this.baseUrl}${endpoint}`, options)
      .then((response) => this.mapGoodResponse(endpoint, response))
      .catch((err) => this.mapBadResponse(endpoint, err));
  }
}

export { ApiController };
