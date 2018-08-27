// @flow

import {Component} from 'react';
import {styled} from 'onefx/lib/styletron-react';
import Helmet from 'onefx/lib/react-helmet';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router';
import {t} from 'onefx/lib/iso-i18n';
import {mobileViewPortContent} from 'onefx/lib/iso-react-render/root/mobile-view-port-content';
import {assetURL} from 'onefx/lib/asset-url';
import {fonts} from './common/styles/style-font';
import {colors} from './common/styles/style-color';
import {initGoogleAnalytics} from './common/google-analytics';
import {NotFound} from './common/not-found';
import {HomeContainer} from './home/home';
import {FullScreen} from './common/full-screen';

type Props = {
  googleTid: string,
};

export class App extends Component<Props> {
  props: Props;

  componentDidMount() {
    initGoogleAnalytics({tid: this.props.googleTid});
  }

  render() {
    return (
      <RootStyle>
        <Helmet
          title={`${t('meta.title')} - ${t('meta.description')}`}
          meta={[
            {name: 'viewport', content: mobileViewPortContent},
            {name: 'description', content: t('meta.description')},
            {name: 'theme-color', content: colors.brand01},

            // social
            {property: 'og:title', content: `${t('meta.title')}`},
            {property: 'og:description', content: t('meta.description')},
            {property: 'twitter:card', content: 'summary'},
          ]}
          link={[
            // PWA & mobile
            {rel: 'manifest', href: '/manifest.json'},
            {rel: 'apple-touch-icon', href: '/favicon.png'},

            {rel: 'icon', type: 'image/png', sizes: 'any', href: assetURL('/favicon.png')},

            // styles
            {rel: 'stylesheet', type: 'text/css', href: assetURL('/stylesheets/main.css')},
            {href: 'https://fonts.googleapis.com/css?family=Share+Tech|Actor', rel: 'stylesheet', type: 'text/css'},
          ]}
        />
        <FullScreen>
          <Switch>
            <Route exact path='/' component={HomeContainer}/>
            <Route component={NotFound}/>
          </Switch>
        </FullScreen>
      </RootStyle>
    );
  }
}

const RootStyle = styled('div', props => ({
  ...fonts.body,
  backgroundColor: colors.ui02,
  color: colors.text01,
  textRendering: 'optimizeLegibility',
}));
