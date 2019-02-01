import nock from 'nock';

import { SPRestService } from './SPService';
import { setupFixture } from '../util/testUtils';

it('retrieves the current context', async () => {
  await setupFixture();
  nock.back.setMode('record');
  const { nockDone } = await nock.back('/SPService.test/retrievesTheCurrentContext.json');

  const service = new SPRestService();

  let contextInfo = await service.getContextInfo();
  expect(contextInfo).not.toBeNull();
  expect(contextInfo.WebFullUrl).not.toBeNull();

  nockDone();
  nock.back.setMode('wild');
});

it('retrieves the root web title', async () => {
  await setupFixture();
  nock.back.setMode('record');
  const { nockDone } = await nock.back('/SPService.test/retrievesTheRootWebTitle.json');

  const context = new SPRestService();

  let title = await context.getRootWebTitle();
  expect(title).not.toBeNull();

  nockDone();
  nock.back.setMode('wild');
});

it('retrieves the current user', async () => {
  await setupFixture();
  nock.back.setMode('record');
  const { nockDone } = await nock.back('/SPService.test/retrievesTheCurrentUser.json');

  const service = new SPRestService();

  let currentUser = await service.getCurrentUser();
  expect(currentUser).not.toBeNull();
  expect(currentUser.LoginName).not.toEqual('');

  nockDone();
  nock.back.setMode('wild');
});
