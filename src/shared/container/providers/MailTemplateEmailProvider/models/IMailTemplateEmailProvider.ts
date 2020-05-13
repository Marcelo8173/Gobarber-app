import IParseTemplateEmailDTO from '@shared/container/providers/MailTemplateEmailProvider/dtos/IParseTemplateEmailDTO';

export default interface IMailTemplateEmailProvider{
    parse(data: IParseTemplateEmailDTO): Promise<string>;
    
}