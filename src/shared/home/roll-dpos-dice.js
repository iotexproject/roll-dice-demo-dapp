// @flow
import {Component} from 'react';

import {t} from 'onefx/lib/iso-i18n';
import {styled} from 'onefx/lib/styletron-react';
import {colors} from '../common/styles/style-color';
import {colorHover} from '../common/color-hover';
import {Dice} from './dice';

type Props = {
  rolling: boolean,
  chance: number,
  diceResult: any,
  onDice: any,
  address: string,
};

export class RollDPoSDice extends Component<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {chance, diceResult, rolling, address} = this.props;
    const {point, error} = diceResult || {};
    let errorMessage = null;
    let diceResultMessage = null;
    if (error) {
      errorMessage = <div style={{fontSize: '17pt', color: colors.error}}>{t(error)}</div>;
    } else if (point > 0) {
      diceResultMessage = (
        <div>
          <div style={{fontSize: '17pt', color: colors.text01}}
            dangerouslySetInnerHTML={{__html: t('activity.rolldpos.earned', {score: point})}}
          />
          {address && (
            <Alink style={{}} href={`http://iotexscan.io/address/${address}/`} target='_blank'
              rel='noopener noreferrer'>{t('activity.rolldpos.check_result')}</Alink>
          )}
        </div>
      );
    }

    return (
      <div style={{backgroundColor: colors.ui02, minHeight: '367px', width: '100%'}}>
        {/* <div*/}
        {/* style={{padding: '0 0 45px 0', fontSize: '14pt', color: colors.text01}}*/}
        {/* dangerouslySetInnerHTML={{__html: t('activity.rolldpos.chance', {chance})}}>*/}
        {/* </div>*/}
        <Dice
          point={point / 10}
          rolling={rolling}
          onDice={this.props.onDice}
          disabled={chance <= 0}
        />
        {diceResultMessage}
        {errorMessage}
      </div>
    );
  }
}

function Alink({color = colors.brand01, children, href, target}: any) {
  const A = styled('a', props => ({
    textDecoration: 'none',
    ...colorHover(color),
  }));

  return (
    <A href={href} target={target}>
      {children}
    </A>
  );
}

