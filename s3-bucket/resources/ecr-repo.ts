import { ComponentResource, CustomResourceOptions, getStack } from "@pulumi/pulumi"
import {ecr} from "@pulumi/aws"

/**
 * resource type: bucket
 * try not to vender-lock in naming
 */

type FmDockerImageRepoArgs = {
    name: string
    product: string
}

export class FmDockerImageRepo extends ComponentResource {

    constructor(args: FmDockerImageRepoArgs, opts?: CustomResourceOptions) {
        const resourceName =`${args.product}:${args.name}`

        super("pkg:index:FmBucket", resourceName, {}, opts)

        const ecrArgsDefault = {
            acl: "private",
            bucket: resourceName,
        }
       new ecr.Repository(args.name, {
            name: resourceName,
            imageScanningConfiguration: {
                scanOnPush: true,
            },
            imageTagMutability: "MUTABLE"
        }, {
            parent: this
        })
        
        

    }
}