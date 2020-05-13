interface ITemplateVariable{
    [key: string]: string | number; 
}

export default interface IParseTemplateEmailDTO{
    template: string;
    variables: ITemplateVariable;
}