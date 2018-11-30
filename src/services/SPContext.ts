import { sp } from '@pnp/sp';

export class SPRestContext implements SPContext {
  public async getRootWebTitle() {
    const fields = await sp.web.select('Title').get();
    return fields.Title;
  }

  public async getCurrentUser() {
    const currentUser = await sp.web.currentUser.get();
    return currentUser;
  }
}

export interface SPContext {
  getRootWebTitle(): Promise<string>;
  getCurrentUser(): Promise<object>;
}
