import IMailTemplateEmailProvider from '@shared/container/providers/MailTemplateEmailProvider/models/IMailTemplateEmailProvider';
import IMailTempplateDTO from '@shared/container/providers/MailTemplateEmailProvider/dtos/IParseTemplateEmailDTO';


class FakeMailTemplate implements IMailTemplateEmailProvider{
    
    public async parse(): Promise<string>{
        return 'Mail content';
    }
};

export default FakeMailTemplate;