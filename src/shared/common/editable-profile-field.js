// @flow
import {styled} from 'onefx/lib/styletron-react';
import {t} from 'onefx/lib/iso-i18n';
import {Flex} from './flex';
import {colors} from './styles/style-color';
import {fonts} from './styles/style-font';

export const FieldMargin = styled('div', {
  padding: '16px 0 16px 0',
  width: '100%',
  backgroundColor: colors.ui02,
});

type Props = {
  desc: string,
  name: string,
  defaultValue: string,

  onChange?: (e: any) => any,
  error?: string,
};

export function EditableProfileField({desc = '', name = '', defaultValue = '', onChange = (e: any) => undefined, error = ''}: Props) {
  return (
    <FieldMargin>
      <Flex width='100%' flexWrap='nowrap' center={true} column={true}>
        <strong>{t('enter_iotex_address')}</strong>
        <InfoField
          id={name}
          name={name}
          type='text'
          defaultValue={defaultValue}
          onChange={onChange}
          style={{
            height: '38px',
            borderColor: 'transparent',
            fontFamily: 'Share Tech, Helvetica Neue, sans-serif',
            margin: '12px',
          }}
        />
      </Flex>
      <InputError>{error || ' '}</InputError>
    </FieldMargin>
  );
}

export const inputStyle = (props: any) => ({
  color: `${props.color || colors.text01} !important`,
  borderRadius: '5px !important',
  backgroundColor: 'white !important',
  position: 'relative !important',
  display: 'block !important',
  width: '84% !important',
  maxWidth: '280px',
  border: `1px solid ${colors.brand01}`,
  lineHeight: '24px !important',
  padding: '11px !important',
  outline: 'none',
  transition: 'all 200ms ease',
  boxSizing: 'border-box',
});

export const InputError = styled('div', {
  ...fonts.inputError,
  color: '#d93900 !important',
  margin: '15px 0',
  textAlign: 'center',
});

export const InfoField = styled('input', inputStyle);
