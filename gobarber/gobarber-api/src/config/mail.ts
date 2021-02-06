interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'xenia@xeniayasmin.com',
      name: 'Xenia Yasmin Fotografia',
    },
  },
} as IMailConfig;
