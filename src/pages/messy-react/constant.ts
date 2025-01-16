export const originalCode = `
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

const getPriority = (blockchain: any): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100
    case 'Ethereum':
      return 50
    case 'Arbitrum':
      return 30
    case 'Zilliqa':
      return 20
    case 'Neo':
      return 20
    default:
      return -99
  }
}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain);
  if (lhsPriority > -99) {
     if (balance.amount <= 0) {
       return true;
     }
  }
  return false
}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
const leftPriority = getPriority(lhs.blockchain);
  const rightPriority = getPriority(rhs.blockchain);
  if (leftPriority > rightPriority) {
    return -1;
  } else if (rightPriority > leftPriority) {
    return 1;
  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}
`;

export const refactoredCode = `
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { useMemo } from 'react';

type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

type WalletPageProps = PropsWithChildren<BoxProps> & HTMLAttributes<HTMLDivElement>

const BALANCE_PRIORITY: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const DEFAULT_PRIORITY = -99;

const WalletPage = (props: WalletPageProps) => {
  const {
    // remove if not used and remove PropsWithChildren from import also.
    children,
    ...rest
  } = props;
  
  // Please ensure the \`useWalletBalances\` return an array of WalletBalance
  // So we don't need to add type assertion in \`decrementalBalances\` block such as balances.reduce, sort, etc.
  const balances = useWalletBalances();
  const prices = usePrices();

  const decrementalBalances = useMemo(() => {
    return balances.reduce((acc, balance) => {
      const balancePriority = BALANCE_PRIORITY[balance.blockchain] ?? DEFAULT_PRIORITY;

      if (balancePriority > DEFAULT_PRIORITY && balance.amount <= 0) {
        return [
          ...acc,
          {
            ...balance,
            formatted: balance.amount.toFixed(),
          },
        ];
      }

      return acc;
    }, [] as FormattedWalletBalance[]).sort((lhs, rhs) => {
      const leftPriority = BALANCE_PRIORITY[lhs.blockchain];
      const rightPriority = BALANCE_PRIORITY[rhs.blockchain];

      if (leftPriority > rightPriority) {
        return -1;
      }
      return 1;
    });
  }, [balances, prices]);

  const walletRows = decrementalBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;

    return (
      <WalletRow
        className={classes.row}
        key={\`wallet-row-\${index}-\${usdValue}\`}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    <div {...rest}>
      {walletRows}
    </div>
  );
};
`;
