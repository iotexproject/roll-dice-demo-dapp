/* eslint-disable no-invalid-this */
// @flow
import {Component} from 'react';
import {connect} from 'react-redux';
import {styled} from 'onefx/lib/styletron-react';
import {assetURL} from 'onefx/lib/asset-url';
import {t} from 'onefx/lib/iso-i18n';
import isBrowser from 'is-browser';
import window from 'global/window';
import {ContentPadding} from '../common/styles/style-padding';
import {colors} from '../common/styles/style-color';
import {media} from '../common/styles/style-media';
import {Icon} from '../common/icon';
import {Flex} from '../common/flex';
import {EditableProfileField} from '../common/editable-profile-field';
import {axiosInstance} from '../common/axios-instance';
import {RollDPoSDice} from './roll-dpos-dice';

const STAGES = {
  dice: 'show dice page',
  rolling: 'rolling, show dice page',
  exception: 'something went wrong, show exception page',
  cover: 'show cover page',
  refer: 'show refer page',
  fail: 'show fail page',
  verifying: 'verifying quiz, show quiz page',
  quiz: 'show quiz page',
};

type Props = {
  chance: number,
};

type State = {
  stage: string,
  chance: number,
  txHash: string,
  diceResult: any,
  error: string,
};

export const HomeContainer = connect(
  state => ({chance: state.activity.rollDPoS.chance})
)(class Home extends Component<Props, State> {
  props: Props;
  state: State;
  address: string;

  constructor(props) {
    super(props);
    if (isBrowser) {
      const match = window.location.hash.match(/#address=([0-9A-Za-z]+)?/);
      this.address = match && match[1];
    }
    const {chance} = props;
    const stage = chance > 0 ? STAGES.dice : STAGES.cover;
    this.state = {
      chance,
      stage,
      diceResult: null,
      error: '',
      txHash: null,
    };
  }

  fetchDiceResult = (txHash) => {
    axiosInstance.post('/activity/roll-dpos/fetch-dice-result', {hash: this.state.txHash})
    .then(
      ({data}) => {
        if (data.ok) {
          this.setState({
            diceResult: {
              point: data.point,
              result: data.dicePoint,
              time: data.time,
            },
            stage: STAGES.dice,
          });
        } else {
          this.setState({
            stage: STAGES.exception,
            error: data.error || 'Something went wrong.',
          });
        }
      }
    )
    .catch(e => this.setState({
      state: STAGES.execption,
      error: e.response.data && e.response.data.error.message || "Something went wrong.",
    }));
  };

  onDice = () => {
    this.setState({
      stage: STAGES.rolling,
      error: '',
      diceResult: {},
    });
    axiosInstance.post('/activity/roll-dpos/dice-rolling', {address: this.address})
      .then(
        ({data}) => {
          if (data.ok) {
            this.setState({
              txHash: data.txHash,
              chance: data.chance,
            });
            window.setTimeout(this.fetchDiceResult, 10000);
          } else {
            this.setState({
              stage: STAGES.exception,
              error: data.error || 'Something went wrong.',
            });
          }
        }
      )
      .catch(e => this.setState({
        stage: STAGES.exception,
        error: e.response.data && e.response.data.error.message || 'Something went wrong.',
      }));
  };

  render() {
    const {chance, diceResult, error, stage} = this.state;

    return (
      <ContentPadding>
        <FlexDiv>
          <Wrapper>
            <Flex column={true} center={true}>
              <LogoWrapper>
                <Icon url={assetURL('/logo.svg')}/>
              </LogoWrapper>

              <h1 style={{marginTop: 0}}>{t('topbar.brand')}</h1>

              <EditableProfileField
                desc={t('iotex_address')}
                name='address'
                defaultValue={this.address}
                onChange={e => this.address = e.target.value}
              />
              <RollDPoSDice
                chance={chance}
                diceResult={{...diceResult, error}}
                rolling={stage === STAGES.rolling}
                onDice={this.onDice}
                address={this.address}
              />
            </Flex>
          </Wrapper>
        </FlexDiv>
      </ContentPadding>
    );
  }
});

const FlexDiv = styled('div', () => ({
  display: 'flex',
  '-webkit-box-flex': 1,
  flexDirection: 'row',
  justifyContent: 'center',
  '-webkit-justify-content': 'center',
  boxSizing: 'border-box',
  flexWrap: 'wrap',
  alignContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

export const Wrapper = styled('div', props => ({
  margin: '16px 0 16px 0',
  position: 'relative',
  width: props.width || '75%',
  height: 'fit-content',
  borderRadius: '8px',
  overflow: 'hidden',
  textAlign: 'center',
  backgroundColor: colors.ui01,
  color: `${colors.text01}!important`,
  [media.palm]: {
    width: '100%',
  },
}));

export const LogoWrapper = styled('div', {
  width: '480px',
  height: '200px',
  [media.lap]: {
    width: '320px',
    height: '160px',
    padding: '24px 24px 24px 24px',
    boxSizing: 'border-box',
  },
  [media.palm]: {
    width: '280px',
    maxWidth: '100vw',
    height: '128px',
    padding: '12px 12px 12px 12px',
    boxSizing: 'border-box',
  },
});

