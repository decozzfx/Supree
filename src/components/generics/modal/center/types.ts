import React from 'react';

export interface IProps {
  /** @default false */
  swapButtonStyle?: boolean;
  isActive: boolean;
  onClosePress: () => void;
  title: string;
  description: string;
  onPressYes: () => void;
  onPressNo: () => void;
  buttonLeftTitle?: string;
  buttonRightTitle?: string;
  isOneActionBtn?: boolean;
  isLoadingYesButton?: boolean;
  isLoadingNoButton?: boolean;
  height?: number;
  titleColor?: string;
  buttonLeft?: React.ReactNode;
}
