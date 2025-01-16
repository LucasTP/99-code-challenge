import styled from '@emotion/styled';
import { Flex } from 'antd';

export const AppContainer = styled.div(() => ({
  maxWidth: 1280,
  margin: 'auto',
  padding: 0,
  width: '100%',
}));

export const PageWrapper = styled(Flex)(() => ({
  zIndex: 3,
}));
