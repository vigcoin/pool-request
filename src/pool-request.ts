import * as rp from 'request-promise';

export class PoolRequest {
  private daemonConf: any;
  private walletConf: any;
  private poolConf: any;

  constructor(daemonConf: any, walletConf: any, poolConf: any) {
    this.daemonConf = daemonConf;
    this.walletConf = walletConf;
    this.poolConf = poolConf;
  }
  public async daemon(path: string, method: string, params: object) {
    const uri = this.toURI(this.daemonConf) + path;
    return this.rpc(uri, method, params);
  }

  public async daemonArray(path: string, array: any[]) {
    const uri = this.toURI(this.daemonConf) + path;

    return this.rpcArray(uri, array);
  }

  public async wallet(path: string, method: string, params: object) {
    const uri = this.toURI(this.walletConf) + path;

    return this.rpc(uri, method, params);
  }

  public async pool(path: string, method: string = null) {
    const uri = this.toURI(this.poolConf) + path;
    if (method) {
      return this.request(uri, '', { method });
    }
    return this.request(uri, '');
  }

  private toURI(config: any) {
    if (config.url) {
      return config.url;
    }
    if (config.host && config.port) {
      if (config.port === 80) {
        return 'http://' + config.host;
      }
      return 'http://' + config.host + ':' + config.port;
    }
    return 'http://localhost';
  }
  private async request(uri: string, method: string, formData: object = null) {
    const options: any = {
      headers: {
        'User-Agent': 'VIG-COIN POOL Agent',
      },
      json: true, // Automatically parses the JSON string in the response
      uri,
    };

    if (formData) {
      options.body = formData;
    }

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
