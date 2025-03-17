import { ComponentResourceOptions,ComponentResource, CustomResourceOptions } from "@pulumi/pulumi";


type FrontEndArgs = {
    name: string;
    product: string
}


export class Fronend extends ComponentResource {
    constructor(args: FrontEndArgs, opts?:CustomResourceOptions) {
        const resourceName = `${args.product}:${args.name}`
        
        super("pkg:index:Frontend", resourceName, {}, opts)

        
    }
}