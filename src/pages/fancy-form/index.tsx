import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button, Flex, Form, message, Typography } from 'antd';
import { RetweetOutlined, SwapOutlined } from '@ant-design/icons';
import { FormProvider } from 'react-hook-form';

import { BASE_SPACING } from '../../constant/ui-config';
import {
  CurrencySwapCard,
  RotateButtonWrapper,
  SubmitButton,
} from './fancy-form.styled';

import { type Currency } from './models/currency';
import { CURRENCY_LIST, WALLETS } from './currency';
import {
  CurrencySwapFormField,
  initialValue,
  useCurrencySwapForm,
} from './hooks/use-currency-swap-form';
import { formatCurrency } from '../../utils/common';
import { FORM_UPDATE_VALUE_CONFIG } from '../../constant/form';
import { FromCurrencyCard } from './components/from-currency-card';
import { ToCurrencyCard } from './components/to-currency-card';
import { PageWrapper } from '../../App.styled';

function FancyForm() {
  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(false);

  const formInstance = useCurrencySwapForm();
  const {
    setValue,
    formState: { isValid, errors },
    handleSubmit,
    watch,
    reset,
    trigger,
  } = formInstance;

  const fromCurrency = watch(CurrencySwapFormField.FromCurrency);
  const toCurrency = watch(CurrencySwapFormField.ToCurrency);
  const fromWallet = watch(CurrencySwapFormField.FromWallet);
  const toWallet = watch(CurrencySwapFormField.ToWallet);
  const balance = watch(CurrencySwapFormField.Balance) ?? 0;
  const price = watch(CurrencySwapFormField.Price) ?? 0;
  const amount = watch(CurrencySwapFormField.Amount) ?? 0;

  const fromCurrencyInfo = useMemo(
    () => CURRENCY_LIST.find((c) => c.name === fromCurrency),
    [fromCurrency]
  );
  const fromWalletInfo = useMemo(
    () => WALLETS.find((w) => w.id === fromWallet),
    [fromWallet]
  );
  const [targetCurrency, setTargetCurrency] = useState<Currency>({
    currency: '',
    price: 0,
  });
  const exchanged = useMemo(
    () => amount * (price / targetCurrency.price),
    [amount, price, targetCurrency]
  );

  const handleSelectCurrency = useCallback(
    (
      target:
        | CurrencySwapFormField.FromCurrency
        | CurrencySwapFormField.ToCurrency
    ) =>
      (value: Currency) => {
        const { currency, price } = value;

        setValue(target, currency, FORM_UPDATE_VALUE_CONFIG);
        if (target === CurrencySwapFormField.FromCurrency) {
          setValue(
            CurrencySwapFormField.Price,
            price,
            FORM_UPDATE_VALUE_CONFIG
          );
        }
      },
    []
  );

  const onSubmitSwapCurrencyForm = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      reset(initialValue);

      messageApi.open({
        type: 'success',
        content: 'Swap currency successfully!',
      });
    }, 1000);
  };

  const rotateSwapCurrency = () => {
    reset({
      [CurrencySwapFormField.FromCurrency]: toCurrency,
      [CurrencySwapFormField.ToCurrency]: fromCurrency,
      [CurrencySwapFormField.FromWallet]: toWallet,
      [CurrencySwapFormField.ToWallet]: fromWallet,
      [CurrencySwapFormField.Balance]: fromWalletInfo?.balance,
      [CurrencySwapFormField.Amount]: amount,
      [CurrencySwapFormField.Price]: fromCurrencyInfo?.price,
    });
    trigger();
  };

  useEffect(() => {
    const from = CURRENCY_LIST.find((c) => c.currency === fromCurrency);
    const to = CURRENCY_LIST.find((c) => c.currency === toCurrency);

    if (from) {
      const { price } = from;

      setValue(CurrencySwapFormField.Price, price, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    if (to) {
      setTargetCurrency(to);
    }
  }, [fromCurrency, toCurrency]);

  return (
    <PageWrapper vertical gap={BASE_SPACING * 2} align="center">
      <Typography.Title level={1}>Fancy Form</Typography.Title>

      <Flex justify="center">
        <CurrencySwapCard size="small">
          <FormProvider {...formInstance}>
            <Form layout="vertical">
              <Flex vertical gap={BASE_SPACING}>
                <FromCurrencyCard
                  loading={isLoading}
                  fromCurrency={fromCurrency}
                  balance={balance}
                  handleSelectCurrency={handleSelectCurrency}
                  onSubmitSwapCurrencyForm={onSubmitSwapCurrencyForm}
                />

                {!isLoading && (
                  <RotateButtonWrapper>
                    <Button
                      style={{ height: 48, borderRadius: BASE_SPACING }}
                      variant="filled"
                      shape="round"
                      color="default"
                      icon={<RetweetOutlined size={(BASE_SPACING * 3) / 2} />}
                      onClick={rotateSwapCurrency}
                    />
                  </RotateButtonWrapper>
                )}

                <ToCurrencyCard
                  loading={isLoading}
                  currency={toCurrency}
                  exchanged={exchanged}
                  handleSelectCurrency={handleSelectCurrency}
                />

                <SubmitButton
                  variant="filled"
                  size="large"
                  color="purple"
                  icon={<SwapOutlined />}
                  disabled={!isValid || isLoading}
                  onClick={handleSubmit(onSubmitSwapCurrencyForm)}
                >
                  Let's Swap
                </SubmitButton>

                {!isLoading && (
                  <Flex vertical align="center">
                    <Typography.Text type="danger">
                      {errors[CurrencySwapFormField.Amount]?.message}
                    </Typography.Text>
                    <Typography>
                      {`1 ${fromCurrency} = ${formatCurrency(
                        price / targetCurrency.price
                      )} ${toCurrency}`}
                    </Typography>
                  </Flex>
                )}
              </Flex>
            </Form>
          </FormProvider>
        </CurrencySwapCard>
      </Flex>

      {contextHolder}
    </PageWrapper>
  );
}

export default FancyForm;
