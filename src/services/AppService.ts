/**
 * Example of an application service that calls a rest endpoint.
 */
export class AppRestService implements AppService {
  private _webFullUrl: string | undefined;

  public constructor(webFullUrl?: string) {
    if (!webFullUrl) {
      webFullUrl = window.location.href;
    }

    this._webFullUrl = webFullUrl;
  }

  public get webFullUrl() {
    return this._webFullUrl;
  }

  public async getTheAnswerToLifeTheUniverseAndEverything() {
    // A real call would use axios or fetch or whatever to do a ajax call.
    return Promise.resolve(42);
  }
}

export interface AppService {
  getTheAnswerToLifeTheUniverseAndEverything(): Promise<number>;
}
