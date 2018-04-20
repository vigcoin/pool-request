import * as rp from 'request-promise';

export class PoolRequest {
  public async daemon(uri: string, method: string, params: object) {
    return this.rpc(uri, method, params);
  }

  public async daemonArray(uri: string, array: any[]) {
    return this.rpcArray(uri, array);
  }

  public async wallet(uri: string, method: string, params: object) {
    return this.rpc(uri, method, params);
  }

  public async pool(uri: string, method: string) {
    return this.request(uri, '', { method });
  }
  private async request(uri: string, method: string, formData: object) {
    const options: any = {
      headers: {
        'User-Agent': 'VIG-COIN POOL Agent',
      },
      json: true, // Automatically parses the JSON string in the response
      uri,
      body: formData,
    };

    if (method) {
      options.method = method;
    }

    return rp(options);
  }

  private async rpc(uri: string, method: string, params: object) {
    return this.request(uri, 'POST', {
      id: '0',
      jsonrpc: '2.0',
      method,
      params,
    });
  }

  private async rpcArray(uri: string, array: any[]) {
    const jsonArray = [];
    for (let i = 0; i < array.length; i++) {
      jsonArray.push({
        id: i.toString(),
        jsonrpc: '2.0',
        method: array[i][0],
        params: array[i][1],
      });
    }
    return this.request(uri, 'POST', jsonArray);
  }
}
