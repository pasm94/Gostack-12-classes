import { container } from 'tsyringe';

import IMailProvider from './models/IMailProvider';
import mailConfig from '../../../../config/mail';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

// feito assim pq possui constructor, e do outro jeito n era executado
container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
