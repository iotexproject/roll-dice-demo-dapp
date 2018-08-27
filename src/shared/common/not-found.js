import {PureComponent} from 'react';
import {t} from 'onefx/lib/iso-i18n';
import {ErrorPage} from './error-page';

export class NotFound extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ErrorPage bar={t('not_found.bar')} title={t('not_found.title')} info={t('not_found.info')}/>
    );
  }
}
