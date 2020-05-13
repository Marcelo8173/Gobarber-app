interface ITemplateVariable{
    [key: string]: string | number; 
}

export default interface IParseTemplateEmailDTO{
    file: string;
    variables: ITemplateVariable;
}