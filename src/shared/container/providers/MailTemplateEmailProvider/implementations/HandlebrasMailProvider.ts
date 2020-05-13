import handlebars from 'handlebars';

import IMailTemplateEmailProvider from '@shared/container/providers/MailTemplateEmailProvider/models/IMailTemplateEmailProvider';
import IMailTempplateDTO from '@shared/container/providers/MailTemplateEmailProvider/dtos/IParseTemplateEmailDTO';


export default class HandlebrasMailProvider implements IMailTemplateEmailProvider {
    public async parse({template, variables}: IMailTempplateDTO): Promise<string>{
        const parseTemplate = handlebars.compile(template);

        return parseTemplate(variables);
    }
}