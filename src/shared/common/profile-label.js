import {styled} from 'onefx/lib/styletron-react';
import {fonts} from './styles/style-font';
import {colors} from './styles/style-color';

export const ProfileLabel = styled('label', {
  ...fonts.inputLabel,
  display: 'inline-block',
  verticalAlign: 'baseline',
  marginBottom: '0.625rem',
  color: colors.text01,
});
