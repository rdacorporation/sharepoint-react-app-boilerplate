import nock from 'nock';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { sp } from '@pnp/sp';
import path from 'path';

let isFixtureSetup = false;

export const baseUrl = 'http://localhost:3001/';

export const setupFixture = () => {
  if (isFixtureSetup) {
    return;
  }

  // Configure Nock...
  const fixturesPath = path.resolve('./nock_fixtures');
  nock.back.fixtures = fixturesPath;

  // Configure Enyme.
  Enzyme.configure({ adapter: new Adapter() });

  // Configure @pnp/sp...
  sp.setup({
    sp: {
      baseUrl: baseUrl,
      headers: {
        Accept: 'application/json;odata=verbose'
      }
    }
  });

  // All Done!
  isFixtureSetup = true;
};

export function actAsync(callback: () => Promise<any>) {
  act(() => {
    callback().catch(e => console.warn('useAsyncEffect error', e));
  });
}

export const waitForAsync = () => new Promise(resolve => setImmediate(resolve));
