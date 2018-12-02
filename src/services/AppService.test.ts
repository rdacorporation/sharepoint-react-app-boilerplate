import nock from 'nock';

import { AppRestService } from './AppService';
import { baseUrl, setupFixture } from '../util/testUtils';

it('can be constructed with default constructor', async () => {
  await setupFixture();

  const appService = new AppRestService();
  expect(appService.webFullUrl).toEqual(window.location.href);
});

it('retrieves the answer to life the universe and everything', async () => {
  await setupFixture();
  nock.back.setMode('record');
  const { nockDone } = await nock.back('/AppService.test/retrievesTheAnswerToLifeTheUniverseAndEverything.json');

  const appService = new AppRestService(baseUrl);

  let theAnswer = await appService.getTheAnswerToLifeTheUniverseAndEverything();
  expect(theAnswer).toStrictEqual(42);

  nockDone();
  nock.back.setMode('wild');
});
