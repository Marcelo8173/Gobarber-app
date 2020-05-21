import 'reflect-metadata';
import { container } from 'tsyringe';

import '@modules/users/providers/index';
import '@shared/container/providers/index';
//service de crear agendamentos

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepositories from '@modules/users/repositories/IUserRepositories';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';


import IUserTokenRepositories from '@modules/users/repositories/IUserTokenRepositories';
import UserTokenRepositories from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';



container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);
// apenas o register ele cria uma instancia da classe toda vez que ele é chamado
//com o singleton ele cria apenas uma instacia apenas uma vez e toda vez que ele for chamado ele usa a instancia já criada

container.registerSingleton<IUserRepositories>('UserRepository', UserRepository);

container.registerSingleton<IUserTokenRepositories>('UserTokenRepositories', UserTokenRepositories);

container.registerSingleton<INotificationsRepository>('NotificationsRepository', NotificationsRepository);
