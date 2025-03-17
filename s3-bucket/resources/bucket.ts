import { ComponentResource, CustomResourceOptions, getStack,interpolate,jsonStringify } from "@pulumi/pulumi"

import {s3} from "@pulumi/aws"
import { Environment } from "@pulumi/aws/appconfig"

/**
 * resource type: bucket
 * try not to vender-lock in naming
 * [bucket-name].[region].[vendor]
 */

type BucketArgs = {
    name: string
    product: string
    public?: boolean;
}


export class Bucket extends ComponentResource {
    constructor(args: BucketArgs, opts?: CustomResourceOptions) {
        const resourceName =`${args.product}:${args.name}`

        super("pkg:index:FmBucket", resourceName, {}, opts)

        const stack = getStack()
        

        const bucketname = `${resourceName}--${stack}`
        
        const bucketArgsDefault = {
            acl: "private",
            bucket: bucketname,
            tags: {
                Environment: stack
            }
        }

        if (args.public) {
            bucketArgsDefault.acl = "public-read" 
        }

        const siteBucket = new s3.Bucket(args.name, bucketArgsDefault, {
            parent: this
        })


        if(args.public) {
            new s3.BucketPublicAccessBlock("public-access-block", {
                bucket: siteBucket.id,
                blockPublicAcls: false,
            }, {
                parent: this
            })
        }

        
        // const bucketPolicy = new s3.BucketPolicy("bucketPolicy", {
        //     bucket: siteBucket.id,
        //     policy: jsonStringify({
        //         Version: "2012-10-17",
        //         Statement: [{
        //             Effect: "Allow",
        //             Action: [
        //                 "s3:CreateBucket",
        //                 "s3:DeleteBucket",
        //                 "s3:DeleteBucketPolicy",
        //                 "s3:DeleteObject",
        //                 "s3:DeleteObjectVersion",
        //                 "s3:Get*",
        //                 "s3:List*",
        //                 "s3:PutBucketNotification",
        //                 "s3:PutBucketPolicy",
        //                 "s3:PutBucketTagging",
        //                 "s3:PutBucketWebsite",
        //                 "s3:PutEncryptionConfiguration",
        //                 "s3:PutObject"
        //             ],
        //             Resource: [
        //                 interpolate`${siteBucket.arn}/*`
        //             ]
        //         }
        //     ]
        //     })
        // })

    }
}