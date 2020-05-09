import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiksStorageProvider';


container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
