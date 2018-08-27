import {connect} from 'react-redux';

import {App} from './app';

export const AppContainer = connect(
  function mapStateToProps(state) {
    return {
      googleTid: state.base.analytics.googleTid,
      locale: state.base.locale,
    };
  },
)(App);
