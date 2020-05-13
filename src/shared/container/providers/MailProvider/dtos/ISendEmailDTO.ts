import IParseTemplateEmailDTO from '@shared/container/providers/MailTemplateEmailProvider/dtos/IParseTemplateEmailDTO';

interface IMailContact{
    name: string;
    email: string;
}

export default interface ISendEmailDTO{
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseTemplateEmailDTO;
}