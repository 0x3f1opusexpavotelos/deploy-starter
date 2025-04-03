---
title: Devops
desc: philosophy not technology
quoes:
  - If you don't know what you did, you can't do it again
  - understand first, tools after, confident and comfortable
---

## Waht problem are we trying to solve?

acess control and permissions
softaware lifecycle
supporting infra
developer experience

what service and trying to provide how we design the arch?
role-based acces contorl

indiviuals developers

orgranzation teams

outside contributors

DevOps is

collaboration planning - scrum and kanban
deployment automation
uptime Observability
monitoring: stream output logs, metric
and alalysis

DevOps is not

why - reasons and motivations behind the strategy
what - intended to acheive, aims to accomplish
who - are benefiting from this

### ci tools

github ci
github ci
travis ci
circle ci

## IAC framework - automate,privison and govern infrastructure at scale

Eliminate repetition with workflows/pipelines

aws iam
aws s3 bucket
aws ec2

### tool, service providers specturm

[terrafrom by HashiCrop (widely used)](https://www.terraform.io/)

- declarative based configuration

creating AWS VPC

```
resource
```

creating s3 bucket

[pulumi(growing comminity)](https://www.pulumi.com/)

- use the programming lanuage you know and love

```ts
import {ec2} from  "@pulumi/aws"

const main = nwe aws.ec2.Vpc("main", {
    cidrBlock: "10.0.0.0/16",
    instanceTenancy: "default",
    tags: {
        name: "main
    }
})
```

[openTofu (gaining popularity)](https://opentofu.org/)

[env0](https://www.env0.com/)
[soacelift.io](https://spacelift.io/)
[cloudformation]()
[Terragrunt](https://terragrunt.gruntwork.io/)
[Anisble](https://docs.ansible.com/ansible/latest/index.html)
[Kubernetes]()
[Helm]()

whcih one benefit most and how should i choose
efficient
focus on the problem you are trying to solve
Focus on the features you need first

## servers

### server solutions specturm

openstack
vmware
Colocation Data Center(主机托管)
datacenter facility that rents out rack space to third parties for their servers or other network equipment

### cloud providers / resellers

aws cloud
google cloud platform
oracle cloud
azure cloud
linnode
heroku
digital ocean

which cloud provider should i use ?
[getDeploying](https://getdeploying.com/)

### serivce solutions

## self-hoisted service

applications(Next.js, Nuxt.js, Remix, SvelteKit)
databases
service (plausible analytics, file service, )
Headless CMS (content publishing management):
ghost,
[payload]()
[strapi](https://strapi.io/)
wordpress
secret valut

Install a compatible application such as Google Authenticator, Duo Mobile, or Authy app on your mobile device or computer.

[doppler ](https://www.doppler.com/) secert rotate, co-location
[localstack](https://www.localstack.cloud/)


[croit](https://www.croit.io/) storage solution
self-hostied

[globally recognized avatar](https://support.gravatar.com/)

## Contiuous integration & Delivery

### CI test automation

validate on code change

lint
format
type check

### CD deploy automation

deploy on code changes

### cloud providers

resources, tasks, and jobs and pipelines
gitlab CI/CD
github actions
aws codepipeline
azure pipelines
circleci
bitbucket pipleine
[drone-ci by harness.io](https://www.harness.io/)
concourse-ci

### opensource

[argo](https://argoproj.github.io/)
[gocd](https://www.gocd.org/)
[tekton](https://tekton.dev/)

what about manual scripts ...

## Observability tools

- loki(with grafana)
- elastic with kibana(elk)

cloud hosted

cloud hostsed
click hourse
Dynatrace
New Relic
datadog
Amazon OpenSearch Service
solarwinds loggy
solarwinds papertrail
better stack
elastic cloud
Grafana Cloud (Grafana Loki)

Prometheus

proposed solution: how do we share info?

forum:
docs: prdouct usuage
wiki: battle-proof best practice
blog: communicate release - new features being introduce
emial blasts: (announcement call to cation,awareness for upcoming change)
messageing: Mostly focused on one-off solutions that never get doucmented, troubleshotting threads (parse and traverse)\

which of these benefits us the most?
ability to track usages around where content livesand what the best place is to put it.

what do we prefers?

## version control system

### tool, service providers specturm

gitlab
github
gitea
azureDevops
bitbucket

## TDD technical design document

inverstigating - usecase research
identify - what problem are we trying to solve?
tracking - what is the current proces ?
meet requirement and challenges
proposed solution - what choice we have?
which of these benefits us the mosts?
what do we prefer?

## application arch

- monolithic

- distributed

- serverless

domain server
loadbalancer - traefik
ingress

portal
api
websocket

### distributed

generic service and micro service

#### use case research:

e-commerce platform:

hanlde high voulmes of transactions

social-meida platform:
posting, messaging, notifications can be divied into separate mircroservices

streaming services:
handle heavy load and enormous traffic surge
deliver smooth streaming experience

online gaming platforms:

real-time multiplayer

large-sacle IofT systems:

each deivce or sensor type can be managed by a dedicated microservice

#### benefit from this

indepent develop and deploy

fault isolation

mixed technology stack

### serverless

delegate the burden of server managment to cloud provider(AWS,DigitOcean)

cost on usage, not pre-purchased capacity

BasS(backend-as-a-service): supabase
FasS(function-as-a-serivce): ephemeral container

API gateway
quirk

#### use case research

real-time file processing

real-time stream processing

Extract,transfrom,load(ETL)

static hoisted

## who use which system arch

[aws-cloud](./aws-cloud-arch.png)
[netflix-video service-hybrid of serverless and microservices](./netlify-video-arch.png)

Cosmos is a computing platform that combines the best aspects of microservices with asynchronous workflows and serverless functions.

[goole-search-engine](./google-search-arch.png)

service-oriended arch(SOA)

[uber riding hailing,food delivery,driver-partner service](./uber-arch.png)

discord api
youtube api
twitch api
open api
