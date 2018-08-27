// @flow
import {Component} from 'react';

import {t} from 'onefx/lib/iso-i18n';
import {colors} from '../common/styles/style-color';
import {Dice} from './dice';

type Props = {
  rolling: boolean,
  chance: number,
  diceResult: any,
  onDice: any,
};

export class RollDPoSDice extends Component<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {chance, diceResult, rolling} = this.props;
    const {result, point, error} = diceResult || {};
    let errorMessage = null;
    let diceResultMessage = null;
    if (error) {
      errorMessage = <div style={{fontSize: '17pt', color: colors.error}}>{t(error)}</div>;
    } else if (point > 0) {
      diceResultMessage = (
        <div style={{fontSize: '17pt', color: colors.text01}}
          dangerouslySetInnerHTML={{__html: t('activity.rolldpos.earned', {score: point})}}
        >
        </div>
      );
    }

    return (
      <div style={{backgroundColor: colors.ui02, minHeight: '367px', width: '100%'}}>
        <div
          style={{padding: '45px 0', fontSize: '14pt', color: colors.text01}}
          dangerouslySetInnerHTML={{__html: t('activity.rolldpos.chance', {chance})}}>
        </div>
        <Dice
          point={result}
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
