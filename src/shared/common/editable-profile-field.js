// @flow
import {styled} from 'onefx/lib/styletron-react';
import {ProfileLabel} from './profile-label';
import {Flex} from './flex';
import {colors} from './styles/style-color';
import {media} from './styles/style-media';
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

  onChange?: (e: any)=>any,
  error?: string,
};

export function EditableProfileField({desc = '', name = '', defaultValue = '', onChange = (e: any) => undefined, error = ''}: Props) {
  return (
    <FieldMargin>
      <Flex width='80%' flexWrap='nowrap'>
        <div style={{
          padding: '2% 0 0 5px',
          width: '25%',
          textAlign: 'right',
          [media.palm]: {
            margin: '0 2vw 0 16vw',
          }}}>
          <ProfileLabel htmlFor={name}>{desc}</ProfileLabel>
        </div>
        <div style={{
          padding: '5px 0px 5px 0vw',
          width: '70%',
          height: 'fit-content'}}
        >
          <InfoField
            id={name}
            name={name}
            type='text'
            defaultValue={defaultValue}
            onChange={onChange}
            style={{height: '38px', borderColor: 'transparent',
              fontFamily: 'Share Tech, Helvetica Neue, sans-serif'}}
          >
          </InfoField>
        </div>
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
  width: '100% !important',
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
