import nodeMailer, {Transporter} from 'nodemailer'
import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendEmailDTO from '@shared/container/providers/MailProvider/dtos/ISendEmailDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateEmailProvider/models/IMailTemplateEmailProvider';


@injectable()
export default class EtherealEmailProvider implements IMailProvider{
    private client:Transporter;
    
    constructor(
        @inject('HandlebrasMailProvider')
        private mailTemplateProvider:IMailTemplateProvider
    ){
        nodeMailer.createTestAccount().then(account => {
            const transporter = nodeMailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth:{
                    user: account.user,
                    pass: account.pass,
                }
            })
            this.client = transporter;
        })
        

    }

    public async sendMail({ to, from, subject, templateData}:ISendEmailDTO ): Promise<void>{
        const message = await this.client.sendMail({
            from:{
                name: from?.name || 'Equipe gobarber',
                address: from?.email || 'equipe@gobarber.com.br',
            },
            to: {
                name: to.name,
                address: to.email,                
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });

        console.log(message.messageId);
        console.log(nodeMailer.getTestMessageUrl(message))
    }
}