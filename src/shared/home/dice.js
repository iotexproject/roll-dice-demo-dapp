/* eslint-disable no-invalid-this */
// @flow
import {Component} from 'react';
import window from 'global/window';
import {styled} from 'onefx/lib/styletron-react';
import {t} from 'onefx/lib/iso-i18n';
import isBrowser from 'is-browser';
import {assetURL} from 'onefx/lib/asset-url';
import {media} from '../common/styles/style-media';
import {colors} from '../common/styles/style-color';
import {shade} from '../common/styles/shade';

const FACES = {
  a: '0px -649px',
  b: '0px -761px',
  c: '0px -874px',
  [1]: '-1px -2px',
  [2]: '-1px -105px',
  [3]: '-1px -210px',
  [4]: '-1px -315px',
  [5]: '-1px -425px',
  [6]: '-1px -533px',
};

type Props = {
  disabled: boolean,
  point: number,
  rolling: boolean,
  onDice: any,
};

export class Dice extends Component<Props> {
  props: Props;
  diceElmt: any;
  diceInterval: any;

  constructor(props: Props) {
    super(props);
    this.diceInterval = null;
  }

  componentWillUnmount() {
    this.stop();
  }

  componentDidMount() {
    if (this.props.rolling) {
      this.roll();
    } else {
      this.stop(this.props.point);
    }
  }

  UNSAFE_componentWillReceiveProps(newProps: Props) {
    if (isBrowser) {
      if (newProps.rolling) {
        this.roll();
      } else {
        this.stop(newProps.point);
      }
    }
  }

  roll = () => {
    this.stop();
    const el = this.diceElmt;
    let t = 0;
    const face = ['a', 'b', 'c'];
    const diceRolling = () => {
      el.style.backgroundPosition = FACES[face[t]];
      t = (t + 1) % 3;
    };
    diceRolling();
    this.diceInterval = window.setInterval(diceRolling, 100);
  }

  stop = (point?: number) => {
    if (this.diceInterval) {
      window.clearInterval(this.diceInterval);
      this.diceInterval = null;
    }
    this.diceElmt.style.backgroundPosition = FACES[point || 1];
  }

  render() {
    const {disabled, point, rolling} = this.props;
    const button = rolling || disabled ? (
      <MenuItemDisabled>{t('dice_start')}</MenuItemDisabled>
    ) : (
      <MenuItem onClick={this.props.onDice}>{t('dice_start')}</MenuItem>
    );
    const backgroundPosition = FACES[point || 1];

    return (
      <div>
        <div ref={d => this.diceElmt = d}
          style={{
            margin: '0 auto',
            width: '100px',
            height: '103px',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${assetURL('/dice.png')})`,
            backgroundPosition,
          }}
        />
        {button}
      </div>
    );
  }
}

export const MenuItem = styled('div', props => ({
  paddingTop: '5px',
  borderRadius: '5px !important',
  position: 'relative !important',
  display: 'inline-block !important',
  width: '300px',
  margin: '28px 15px 32px 15px',
  borderColor: 'transparent',
  backgroundColor: colors.brand03,
  ':hover': {
    backgroundColor: shade(colors.brand03),
  },
  textDecoration: 'none',
  lineHeight: '24px !important',
  outline: 'none',
  transition: 'all 200ms ease',
  boxSizing: 'border-box',
  height: '30px',
  fontSize: '11pt',
  color: 'white',
  cursor: 'pointer',
  [media.palm]: {
    width: '85%',
  },
}));

const MenuItemDisabled = styled('div', {
  paddingTop: '5px',
  borderRadius: '5px !important',
  position: 'relative !important',
  display: 'inline-block !important',
  width: '300px',
  margin: '50px 15px 32px 15px',
  borderColor: 'transparent',
  backgroundColor: colors.lightGrey,
  textDecoration: 'none',
  lineHeight: '24px !important',
  outline: 'none',
  transition: 'all 200ms ease',
  boxSizing: 'border-box',
  height: '30px',
  fontSize: '11pt',
  color: 'white',
  cursor: 'not-allowed',
  [media.palm]: {
    width: '85%',
  },
});
