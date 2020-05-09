import 'reflect-metadata';
import { container } from 'tsyringe';
//service de crear agendamentos

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
