import { Flex, Typography } from 'antd';
import { LiveEditor, LiveProvider } from 'react-live';

import {
  iterativeCode,
  mathematicalFormulaCode,
  recursiveCode,
} from './constant';
import { BASE_SPACING } from '../../constant/ui-config';
import { PageWrapper } from '../../App.styled';

function SumToN() {
  return (
    <PageWrapper vertical>
      <Typography.Title level={1}>Sum To N</Typography.Title>

      <Flex gap={BASE_SPACING} style={{ width: '100%' }}>
        <Flex vertical style={{ width: '100%' }}>
          <Typography.Title level={3}>Iterative</Typography.Title>

          <LiveProvider
            disabled
            enableTypeScript
            code={iterativeCode}
            language="tsx"
          >
            <LiveEditor />
          </LiveProvider>
        </Flex>
      </Flex>

      <Flex gap={BASE_SPACING} style={{ width: '100%' }}>
        <Flex vertical style={{ width: '100%' }}>
          <Typography.Title level={3}>Mathematical Formula</Typography.Title>

          <LiveProvider
            disabled
            enableTypeScript
            code={mathematicalFormulaCode}
            language="tsx"
          >
            <LiveEditor />
          </LiveProvider>
        </Flex>
      </Flex>

      <Flex gap={BASE_SPACING} style={{ width: '100%' }}>
        <Flex vertical style={{ width: '100%' }}>
          <Typography.Title level={3}>Recursive</Typography.Title>

          <LiveProvider
            disabled
            enableTypeScript
            code={recursiveCode}
            language="tsx"
          >
            <LiveEditor />
          </LiveProvider>
        </Flex>
      </Flex>
    </PageWrapper>
  );
}

export default SumToN;
