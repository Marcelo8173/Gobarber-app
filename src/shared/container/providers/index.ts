import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiksStorageProvider';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

import IMailTemplateEmailProvider from '@shared/container/providers/MailTemplateEmailProvider/models/IMailTemplateEmailProvider';
import HandlebrasMailProvider from '@shared/container/providers/MailTemplateEmailProvider/implementations/HandlebrasMailProvider';

import ICacheProvider from '@shared/container/providers/CachedProvider/models/ICacheProvider';
import RedisCacheProvider from '@shared/container/providers/CachedProvider/implementations/RedisCacheProvider';



container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);

container.registerSingleton<IMailTemplateEmailProvider>('HandlebrasMailProvider', HandlebrasMailProvider);
container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider));

container.registerInstance<ICacheProvider>('RedisCacheProvider', container.resolve(RedisCacheProvider));
