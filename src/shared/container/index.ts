import 'reflect-metadata';
import { container } from 'tsyringe';
//service de crear agendamentos

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepositories from '@modules/users/repositories/IUserRepositories';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);
// apenas o register ele cria uma instancia da classe toda vez que ele é chamado
//com o singleton ele cria apenas uma instacia apenas uma vez e toda vez que ele for chamado ele usa a instancia já criada

container.registerSingleton<IUserRepositories>('UserRepository', UserRepository);
