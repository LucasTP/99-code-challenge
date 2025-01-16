import { Flex, Typography } from 'antd';

import { CurrencyCard } from '../fancy-form.styled';
import { BASE_SPACING } from '../../../constant/ui-config';
import { CurrencySelection } from './currency-selection';
import { CurrencySwapFormField } from '../hooks/use-currency-swap-form';
import { formatCurrency } from '../../../utils/common';

type ToCurrencyCardProps = {
  currency?: string;
  handleSelectCurrency: Function;
  exchanged: number;
  loading: boolean;
};

export const ToCurrencyCard = ({
  currency,
  exchanged,
  handleSelectCurrency,
  loading,
}: ToCurrencyCardProps) => {
  return (
    <CurrencyCard
      style={{
        background: 'rgba(24,26,28,0.04)',
      }}
      size="small"
      loading={loading}
    >
      <Flex gap={BASE_SPACING} justify="space-between" align="flex-end">
        <Flex vertical>
          <Typography>Receive</Typography>

          <Typography.Title level={3}>
            {formatCurrency(exchanged)}
          </Typography.Title>
        </Flex>
        <CurrencySelection
          currency={currency}
          onChange={handleSelectCurrency(CurrencySwapFormField.ToCurrency)}
        />
      </Flex>
    </CurrencyCard>
  );
};
