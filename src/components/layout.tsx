import { type PropsWithChildren } from 'react';

import styled from '@emotion/styled';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';

import { BASE_SPACING, UiToken } from '../constant/ui-config.ts';
import { Link, useLocation } from 'react-router-dom';
import { RoutePath } from '../constant/route.ts';
import { RandomToken } from './random-token.tsx';

const { Header, Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: ${UiToken.colorBgBase};

    & > .container {
      flex: 1;
      padding: ${BASE_SPACING * 2}px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }

    & > .background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(248, 248, 248, 0.5);
      backdrop-filter: blur(3px);
      z-index: 2;
    }
  }

  header {
    background: transparent;
    z-index: 3;

    & > ul[role='menu'] {
      border-bottom: 0;
      background: transparent;

      & > li[role='menuitem'] {
        font-size: 20px;
      }

      & > li[role='menuitem']::after {
        border-bottom: 0;
      }
    }
  }
`;

interface AppLayoutProps extends PropsWithChildren {
  isFluid?: boolean;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { pathname } = useLocation();

  const menus: MenuProps['items'] = [
    {
      key: RoutePath.FANCY_FORM,
      label: <Link to={RoutePath.FANCY_FORM}>Fancy Form</Link>,
    },
    {
      key: RoutePath.MESSY_REACT,
      label: <Link to={RoutePath.MESSY_REACT}>Messy React</Link>,
    },
    {
      key: RoutePath.SUM_TO_N,
      label: <Link to={RoutePath.SUM_TO_N}>Sum To N</Link>,
    },
  ];

  return (
    <StyledLayout>
      <Header>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[pathname]}
          items={menus}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      <Content>
        <RandomToken />
        <div className="background" />
        <div className="container">{children}</div>
      </Content>
    </StyledLayout>
  );
};
