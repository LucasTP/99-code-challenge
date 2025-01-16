import styled from '@emotion/styled';
import { Flex, Spin } from 'antd';

const LoadingSectionWrapper = styled.div(() => ({
  padding: 24,
}));

export const LoadingSection = () => {
  return (
    <LoadingSectionWrapper aria-label="loading">
      <Flex justify="center" align="center">
        <Spin />
      </Flex>
    </LoadingSectionWrapper>
  );
};
