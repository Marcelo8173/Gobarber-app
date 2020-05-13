import handlebars from 'handlebars';
import fs from 'fs';
import IMailTemplateEmailProvider from '@shared/container/providers/MailTemplateEmailProvider/models/IMailTemplateEmailProvider';
import IMailTempplateDTO from '@shared/container/providers/MailTemplateEmailProvider/dtos/IParseTemplateEmailDTO';


export default class HandlebrasMailProvider implements IMailTemplateEmailProvider {
    public async parse({file, variables}: IMailTempplateDTO): Promise<string>{
        const fileTemplate = await fs.promises.readFile(file,{
            encoding: 'utf-8',
        })
        const parseTemplate = handlebars.compile(fileTemplate);

        return parseTemplate(variables);
    }
}