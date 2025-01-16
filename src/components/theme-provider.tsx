import { PropsWithChildren } from 'react';

import { ConfigProvider } from 'antd';

import { uiConfig } from '../constant/ui-config';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <ConfigProvider theme={uiConfig}>{children}</ConfigProvider>;
}
