import { type ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';

import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Flex, Input, InputRef, List, Modal, Typography } from 'antd';

import { useDebounce } from '../../../utils/use-debounce';
import { Currency } from '../models/currency.ts';
import { CURRENCY_LIST } from '../currency.ts';
import { CurrencySelectionStyled, ListWrapper } from '../fancy-form.styled.tsx';
import { BASE_SPACING } from '../../../constant/ui-config.ts';

type CurrencySelectionProps = {
  currency?: string;
  onChange: (currency: Currency) => void;
};

export const CurrencySelection = (props: CurrencySelectionProps) => {
  const { currency, onChange } = props;
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<InputRef>(null);

  const openCurrencySelectionModal = () => {
    setOpen(true);
  };

  const handleSelectCurrency = (currency: Currency) => {
    onChange(currency);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const debouncedKeyword = useDebounce(keyword, 300);

  const filteredCurrencyList = useMemo(() => {
    if (!debouncedKeyword) return CURRENCY_LIST;

    return CURRENCY_LIST.filter((item) =>
      item.currency
        .toLowerCase()
        .includes(debouncedKeyword?.toLowerCase() ?? '')
    );
  }, [debouncedKeyword, keyword]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setKeyword('');
    }
  }, [open]);

  return (
    <Flex>
      <CurrencySelectionStyled
        justify="center"
        align="center"
        gap={BASE_SPACING / 4}
        onClick={openCurrencySelectionModal}
      >
        <Avatar src={`/tokens/${currency}.svg`} />

        <Typography.Text>{currency}</Typography.Text>

        <DownOutlined />
      </CurrencySelectionStyled>

      {open && (
        <Modal
          title="Select a token"
          open={open}
          centered
          footer={null}
          onCancel={handleCancel}
        >
          <Flex vertical gap={BASE_SPACING}>
            <Input
              ref={inputRef}
              size="large"
              placeholder="Type slash '/' to start "
              prefix={<SearchOutlined />}
              onChange={handleChangeKeyword}
            />

            <ListWrapper>
              <List
                itemLayout="horizontal"
                dataSource={filteredCurrencyList}
                renderItem={(item) => (
                  <List.Item onClick={() => handleSelectCurrency(item)}>
                    <List.Item.Meta
                      avatar={<Avatar src={`/tokens/${item.currency}.svg`} />}
                      title={<Typography>{item.currency}</Typography>}
                      description={
                        <Typography.Text>{item.name}</Typography.Text>
                      }
                    />
                  </List.Item>
                )}
              />
            </ListWrapper>
          </Flex>
        </Modal>
      )}
    </Flex>
  );
};
