import axios from 'axios';

/**
 * Example of an application service that calls a rest endpoint.
 */
export class AppRestService implements AppService {
  private _webFullUrl: string | undefined;

  constructor(webFullUrl?: string) {
    if (!webFullUrl) {
      webFullUrl = window.location.href;
    }

    this._webFullUrl = webFullUrl;
  }

  get webFullUrl() {
    return this._webFullUrl;
  }

  public async getBaristaUrl(scriptOrFilePath: string) {
    return `${this._webFullUrl}_vti_bin/barista/v1/barista.svc/eval?c=${encodeURIComponent(scriptOrFilePath)}`;
  }

  public async getTheAnswerToLifeTheUniverseAndEverything() {
    const url = await this.getBaristaUrl('6*7');
    const result = await axios.get(url);
    return result.data;
  }
}

export interface AppService {
  getTheAnswerToLifeTheUniverseAndEverything(): Promise<string>;
}
