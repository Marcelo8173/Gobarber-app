import IMailTemplateEmailProvider from '@shared/container/providers/MailTemplateEmailProvider/models/IMailTemplateEmailProvider';
import IMailTempplateDTO from '@shared/container/providers/MailTemplateEmailProvider/dtos/IParseTemplateEmailDTO';


class FakeMailTemplate implements IMailTemplateEmailProvider{
    
    public async parse({template}:IMailTempplateDTO): Promise<string>{
        return template;
    }
};

export default FakeMailTemplate;