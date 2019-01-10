import fs from 'fs-jetpack';
import path from 'path';
import { Web, Folder } from '@pnp/sp';
import { PnpNode } from 'sp-pnp-node';
import _ from 'lodash';

const pathCache: { [foo: string]: Folder } = {};
const delay = (time: number) => (result: any) => new Promise(resolve => setTimeout(() => resolve(result), time));
const ensureSPPath = async (web: Web, targetPath: string): Promise<Folder | undefined> => {
  if (pathCache[targetPath]) {
    return pathCache[targetPath];
  }

  const parsedPath = path.parse(targetPath);
  const folders = parsedPath.dir.split(path.sep);
  folders.push(parsedPath.name);

  const webInfo = await web.get();

  let currentPath = '';
  let currentFolder: Folder | undefined = undefined;
  let lastFolder: Folder | undefined = undefined;
  for (let folder of folders) {
    if (!folder) {
      continue;
    }

    if (!currentPath) {
      currentPath = `${folder}`;
    } else {
      currentPath = `${currentPath}/${folder}`;
    }

    try {
      lastFolder = currentFolder;
      currentFolder = web.getFolderByServerRelativeUrl(currentPath);
      await currentFolder.get();
    } catch (err) {
      if (err.response.status === 500 || err.response.status === 404) {
        if (lastFolder) {
          await lastFolder.folders.add(folder);
          // Wait 2 seconds to allow the folder creation to process.
          await delay(2000);
          lastFolder = currentFolder;
          currentFolder = web.getFolderByServerRelativeUrl(currentPath);
        } else {
          console.log(`The document library ${webInfo.Url}/${currentPath} was not found. Please create the document library.`);
          currentFolder = undefined;
          break;
        }
      } else {
        const js = await err.response.json();
        console.log(`The SharePoint folder ${webInfo.Url}/${currentPath} was not found: ${_.get(js, 'error.message.value')}`);
        currentFolder = undefined;
        break;
      }
    }
  }

  if (currentFolder) {
    pathCache[targetPath] = currentFolder;
  }

  return currentFolder;
};

const uploadFolderToSP = async (sourceGlob: string, targetBasePath: string): Promise<boolean> => {
  if (!targetBasePath.endsWith(path.sep)) {
    targetBasePath = targetBasePath + path.sep;
  }

  const settings = await new PnpNode({
    config: {
      configPath: './sp-rest-proxy/private.json'
    }
  }).init();

  const web = new Web(settings.siteUrl || '');

  const files = fs.find('.', {
    matching: sourceGlob
  });

  for (const f of files) {
    console.log(f);
    const fileData = await fs.readAsync(f, 'buffer');

    if (!fileData) {
      console.log(`${f} could not be read; Skipping.`);
      continue;
    }

    // Recursively ensure that the folder exists
    const p = path.parse(f).dir.split(path.sep);
    p.splice(0, 1);
    p.unshift(targetBasePath);
    const targetFilePath = p.join(path.sep).replace(/\/(.*)/, '$1');
    const folder = await ensureSPPath(web, targetFilePath);
    if (!folder) {
      continue;
    }

    // Upload the file
    try {
      if (fileData.byteLength <= 10485760) {
        await folder.files.add(path.basename(f), fileData, true);
      } else {
        await folder.files.addChunked(path.basename(f), fileData, undefined, true);
      }
    } catch (err) {
      const js = await err.response.json();
      const message = _.get(js, 'error.message.value');
      console.log(`Unable to upload ${f}: ${message}`);
      continue;
    }
  }

  return true;
};

const args = process.argv.slice(2);
uploadFolderToSP(args[0], args[1])
  .then(res => {
    if (res === true) {
      console.log('Files Deployed!');
    }
  })
  .catch(e => console.dir(e));
