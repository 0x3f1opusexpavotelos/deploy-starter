import { ecr } from "@pulumi/aws"
import { ComponentResource, CustomResourceOptions } from "@pulumi/pulumi"

type FmBackendArgs = {
    name: string
    product: string
}


export class FmBackend extends ComponentResource {
    constructor(args: FmBackendArgs, opts?: CustomResourceOptions) {
        const resourceName = `${args.product}:${args.name}`

        super("pgk:index:FmBackend", resourceName, {}, opts)

        new ecr.Repository(args.name,{
            name: resourceName,
            imageScanningConfiguration: {
                scanOnPush: false
            },
            imageTagMutability: "MUTABLE"
        }, {
            parent: this
        })  
    }
}