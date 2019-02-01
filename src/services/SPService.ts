import { sp } from '@pnp/sp';

export class SPRestService implements SPService {
  public async getRootWebTitle() {
    const fields = await sp.web.select('Title').get();
    return fields.Title;
  }

  public async getCurrentUser() {
    const currentUser = await sp.web.currentUser.get();
    return currentUser;
  }

  public async getContextInfo() {
    const ctx = await sp.site.getContextInfo();
    return ctx;
  }
}

export interface SPService {
  getRootWebTitle(): Promise<string>;
  getCurrentUser(): Promise<object>;
  getContextInfo(): Promise<object>;
}
