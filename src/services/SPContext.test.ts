import nock from 'nock';

import { SPRestContext } from './SPContext';
import { setupFixture } from '../util/testUtils';

it('retrieves the current context', async () => {
  await setupFixture();
  nock.back.setMode('record');
  const { nockDone } = await nock.back('/SPContext.test/retrievesTheCurrentContext.json');

  const context = new SPRestContext();

  let contextInfo = await context.getContextInfo();
  expect(contextInfo).not.toBeNull();
  expect(contextInfo.WebFullUrl).not.toBeNull();

  nockDone();
  nock.back.setMode('wild');
});

it('retrieves the root web title', async () => {
  await setupFixture();
  nock.back.setMode('record');
  const { nockDone } = await nock.back('/SPContext.test/retrievesTheRootWebTitle.json');

  const context = new SPRestContext();

  let title = await context.getRootWebTitle();
  expect(title).not.toBeNull();

  nockDone();
  nock.back.setMode('wild');
});

it('retrieves the current user', async () => {
  await setupFixture();
  nock.back.setMode('record');
  const { nockDone } = await nock.back('/SPContext.test/retrievesTheCurrentUser.json');

  const context = new SPRestContext();

  let currentUser = await context.getCurrentUser();
  expect(currentUser).not.toBeNull();
  expect(currentUser.LoginName).not.toEqual('');

  nockDone();
  nock.back.setMode('wild');
});
