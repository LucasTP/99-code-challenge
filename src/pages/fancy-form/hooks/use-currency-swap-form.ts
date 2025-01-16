import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CURRENCY_LIST, WALLETS } from '../currency';

export const DEFAULT_MAX_AMOUNT = 1000000;

export enum CurrencySwapFormField {
  FromCurrency = 'fromCurrency',
  ToCurrency = 'toCurrency',
  Amount = 'amount',
  Balance = 'balance',
  Price = 'price',
  FromWallet = 'fromWallet',
  ToWallet = 'toWallet',
}

export type CurrencySwapPayload = {
  [CurrencySwapFormField.FromCurrency]: string;
  [CurrencySwapFormField.FromWallet]: string;
  [CurrencySwapFormField.ToCurrency]: string;
  [CurrencySwapFormField.ToWallet]: string;
  [CurrencySwapFormField.Amount]: number;
  [CurrencySwapFormField.Price]: number;
  [CurrencySwapFormField.Balance]: number;
};

const currencySwapSchema = z
  .object({
    fromCurrency: z.string(),
    toCurrency: z.string(),
    amount: z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Expected number',
      })
      .positive('Amount must be greater than zero')
      .max(DEFAULT_MAX_AMOUNT, 'Amount cannot exceed 100,000'),
    price: z.number(),
    fromWallet: z.string(),
    toWallet: z.string(),
    balance: z.number(),
  })
  .refine((data) => data.amount <= data.balance, {
    message: 'Amount cannot exceed your balance.',
    path: [CurrencySwapFormField.Amount],
  });

export const initialValue = {
  [CurrencySwapFormField.FromCurrency]: CURRENCY_LIST[0].currency,
  [CurrencySwapFormField.ToCurrency]: CURRENCY_LIST[1].currency,
  [CurrencySwapFormField.FromWallet]: WALLETS[0].id,
  [CurrencySwapFormField.ToWallet]: WALLETS[1].id,
  [CurrencySwapFormField.Balance]: WALLETS[0].balance,
  [CurrencySwapFormField.Amount]: 0,
  [CurrencySwapFormField.Price]: CURRENCY_LIST[0].price,
};

export const useCurrencySwapForm = (
  defaultValues: Partial<CurrencySwapPayload> = initialValue
) =>
  useForm({
    resolver: zodResolver(currencySwapSchema),
    mode: 'onChange',
    defaultValues,
  });
