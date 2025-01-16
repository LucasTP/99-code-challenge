import { ThemeConfig, theme } from 'antd';

const { getDesignToken } = theme;

export const uiConfig: ThemeConfig = {
  token: {
    colorWarning: '#ff6610',
    colorError: '#ff403e',
    colorLink: '#1a7cff',
    colorTextBase: '#181a1c',
    borderRadius: 8,
    colorTextSecondary: '#7e8082',
    colorTextTertiary: '#b1b3b5',
    colorBgLayout: '#f3f5f7',
    colorPrimary: '#1a7cff',
    colorInfo: '#1a7cff',
    colorSuccess: '#00b96b',
  },
  components: {
    Layout: {
      headerColor: '#f0f0f0',
    },
    Button: {
      borderRadius: 4,
      borderRadiusLG: 4,
      borderRadiusSM: 4,
      paddingInlineSM: 8,
      paddingInline: 10,
      paddingInlineLG: 12,
    },
    InputNumber: {
      borderRadius: 4,
      borderRadiusSM: 4,
      borderRadiusLG: 6,
    },
    Typography: {
      titleMarginTop: 0,
      titleMarginBottom: 0,
    },
  },
};

export const UiToken = getDesignToken(uiConfig);

export const BASE_SPACING = 16;
