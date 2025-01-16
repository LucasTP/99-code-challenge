import styled from '@emotion/styled';
import { Button, Card, Flex } from 'antd';

import { BASE_SPACING } from '../../constant/ui-config.ts';
import { InputNumberField } from '../../components/forms';

export const CurrencySelectionStyled = styled(Flex)(() => ({
  border: `solid 1px #d9d9d9`,
  borderWidth: 1,
  borderRadius: BASE_SPACING * 3,
  padding: 2,
  paddingRight: BASE_SPACING,
  cursor: 'pointer',
}));

export const InputNumberStyled = styled(InputNumberField)(() => ({
  width: '100%',
  fontSize: 24,
  fontWeight: 600,

  '& input[role="spinbutton"]': {
    paddingLeft: 0,
  },
}));

export const ListWrapper = styled.div(() => ({
  maxHeight: 300,
  overflow: 'auto',
}));

export const CurrencySwapCard = styled(Card)(() => ({
  width: 600,
  borderRadius: (BASE_SPACING * 3) / 2,
  border: 0,
}));

export const SubmitButton = styled(Button)(() => ({
  borderRadius: BASE_SPACING,
  height: 50,
}));

export const CurrencyCard = styled(Card)(() => ({
  borderRadius: BASE_SPACING,
}));

export const RotateButtonWrapper = styled.div`
  position: absolute;
  left: 45%;
  top: 31%;
  z-index: 3;
  padding: ${BASE_SPACING / 4}px;
  border: solid 1px #ffffff;
  border-radius: ${BASE_SPACING}px;
  background: #ffffff;
`;
