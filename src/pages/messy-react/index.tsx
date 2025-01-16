import { LiveEditor, LiveProvider } from 'react-live';
import { Flex, Typography } from 'antd';

import { originalCode, refactoredCode } from './constant.ts';
import { BASE_SPACING } from '../../constant/ui-config.ts';
import { PageWrapper } from '../../App.styled';

const MessyReact = () => {
  return (
    <PageWrapper vertical>
      <Typography.Title level={1}>Messy React</Typography.Title>

      <Flex gap={BASE_SPACING}>
        <Flex vertical>
          <Typography.Title level={3}>Original Code</Typography.Title>
          <LiveProvider
            disabled
            enableTypeScript
            code={originalCode}
            language="tsx"
          >
            <LiveEditor />
          </LiveProvider>
        </Flex>

        <Flex vertical>
          <Typography.Title level={3}>Refactored Code</Typography.Title>
          <LiveProvider
            disabled
            enableTypeScript
            code={refactoredCode}
            language="tsx"
          >
            <LiveEditor />
          </LiveProvider>
        </Flex>
      </Flex>
    </PageWrapper>
  );
};

export default MessyReact;
