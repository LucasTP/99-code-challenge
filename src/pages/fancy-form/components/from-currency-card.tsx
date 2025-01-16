import { Flex, Typography } from 'antd';
import { useFormContext } from 'react-hook-form';

import { CurrencyCard, InputNumberStyled } from '../fancy-form.styled';
import { BASE_SPACING } from '../../../constant/ui-config';
import {
  CurrencySwapFormField,
  type CurrencySwapPayload,
} from '../hooks/use-currency-swap-form';
import { formatCurrency } from '../../../utils/common';
import { CurrencySelection } from './currency-selection';

type FromCurrencyCardProps = {
  fromCurrency?: string;
  balance: number;
  loading: boolean;
  handleSelectCurrency: Function;
  onSubmitSwapCurrencyForm: (data: CurrencySwapPayload) => void;
};

export const FromCurrencyCard = ({
  fromCurrency,
  balance,
  loading,
  handleSelectCurrency,
  onSubmitSwapCurrencyForm,
}: FromCurrencyCardProps) => {
  const { handleSubmit } = useFormContext<CurrencySwapPayload>();

  return (
    <CurrencyCard size="small" loading={loading}>
      <Flex gap={BASE_SPACING} justify="space-between" align="center">
        <Flex vertical justify="center" gap={BASE_SPACING / 4}>
          <Typography>From</Typography>

          <InputNumberStyled
            variant="borderless"
            size="large"
            controls={false}
            name={CurrencySwapFormField.Amount}
            placeholder="Input ammount"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, '') as unknown as number
            }
            onPressEnter={handleSubmit(onSubmitSwapCurrencyForm)}
          />

          <Typography.Text>
            Balance: {formatCurrency(balance ?? 0)}
          </Typography.Text>
        </Flex>

        <CurrencySelection
          currency={fromCurrency}
          onChange={handleSelectCurrency(CurrencySwapFormField.FromCurrency)}
        />
      </Flex>
    </CurrencyCard>
  );
};
