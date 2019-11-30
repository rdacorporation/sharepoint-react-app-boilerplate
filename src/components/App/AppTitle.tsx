import React, { useState, useEffect } from 'react';
import { useAppValue } from '../../AppContext';

export const AppTitle: React.FunctionComponent = () => {
  const [title, setTitle] = useState('');
  const context = useAppValue();

  useEffect(() => {
    (async () => {
      const rootWebTitle = await context.spService.getRootWebTitle();
      setTitle(rootWebTitle);
    })();
  });

  return <span id="rootWebTitle">{title}</span>;
};
