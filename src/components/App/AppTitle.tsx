import React, { useState } from 'react';
import { useAsyncEffect } from '../../util/hooks';
import { useAppValue } from '../../AppContext';

export const AppTitle: React.FunctionComponent = () => {
  const [title, setTitle] = useState('');
  const context = useAppValue();

  useAsyncEffect(async () => {
    const rootWebTitle = await context.spService.getRootWebTitle();
    setTitle(rootWebTitle);
  });

  return <span id="rootWebTitle">{title}</span>;
};
