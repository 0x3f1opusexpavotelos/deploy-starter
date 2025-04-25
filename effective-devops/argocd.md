```bash
# Extracting a TAR Archive
# tar --list --verbose --file <name of file here>
wget <url>
tar -xvf kubeseal-0.20.5-linux-amd64.tar.gz
sudo mv kubeseal /usr/local/bin
sudo chmod +x /usr/local/bin/kubeseal

# Creating an Archive
# tar -cf <name of archive> <directory to archive>

# add file to an existing archive.
# tar -rf <name of archive> <directory to archive>
```

## branch strategy

bugfix
release
feat

```bash
# rename a branch
git branch --move main
git checkout -b dev/leader
git checkout -b feat/gitops
git checkout dev/leader
git merge --no-ff feat/gitops

git checkout -b release/canary
git checkout dev/leader
git merge --no-ff release/canary
```

## manifest 


```bash
mkdir -p manifests/base && cd manifests/base
nvim deployment.yaml
nvim service.yaml
nvim kustomization.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl get pods
kubectl get service

kubectl delete -f deployment.yaml
kubectl delete -f service.yaml
```

## namespace

organize and management the resources in the cluster

## secrest

```bash
kubectl get secrets -n argocd
kubectl describe secret argocd-initial-admin-secret -n argocd
```

## deployment

```bash
git add manifests/deployment.yml
```

## install and setup

```bash
# install docker
sudo dnf install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER && newgrp docker
# install docker compose

# download latest stable version kubectl executable with script 
# move bin to bin directory
curl -LO 
chmod +x kubectl # make executable
sudo mv kubectl /usr/local/bin/
kubectl version --client -o json 
# interact with k8s cluster
```

```bash
# download latest stable version for your platform（os-arch)
# tar -C /usr/local extract and install
chmod +x minikube-linux-amd64 # make executable
# move to bin directory added to system PATH env variable for global access
sudo mv minikube-linux-amd64 /usr/local/bin/minikube 
minikube start --drive-docker
minikube status # confirm is running
cat .kube/config


kind create cluster --config=cluster.yml
kubectl cluster-info --context kind-kind
```

```bash



# create dedicated namespace in your k8s cluster for argo cd
kubectl create namespace argocd

helm install argocd -n argocd argo/argo-cd


# applies the argocd install manifest from official argocd project repo to your cluster with argocd namespace


# download to specific location and name
curl -Lo argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/download/v2.14.11/argocd-linux-amd64

# install - copy files and set attributes
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd && rm argocd-linux-amd64

# clean up
kubectl delete ns argocd
```



unit of deployment

container in pod

lifecycle and management


communcation and networking


resource allocation and sharing

labels and annoations
labels for organizing and selecting groups of pod
annotations for store additional, non-identifying info

pod, service, deployment,replicaset

statefulSets
order deployment, scaling, storage management

daemonSets
log collector

job and cronjobs
configMap and Secrets


ingress
helm
persistentVolume
policy


label selector: route traffic to pods

http client, ssh client -> server firewall ->

clusterIP, externalIP
nodeport,
loadbalancer,
externalname

#### access argo dashboard/portal/control-panel
- port forwaring
- ssh tunnel

nodePort,servicePort, targetPort


Cluster IP Service:

NodePort Service: expose application over external network

LoadBalancer Service:  expose application over external network, provision load  balancer




```yml
kind: Service
spec:
  ports: 8080  # internal cluster port
  targetPort: 80 # port app listen on in pods/container
  nodePort: 31111 # external port 
```



```bash
kubectl get svc -n argocd
                                              EXTERNAL-IP PORT(s)
argocd-server    ClusterIP   10.103.51.118    <none>      80/TCP,443/TCP
# port forwarding
# kubectl port-forware resource-type/name-for-resource [local_port:]remote_port
# [options] include flags like --namespace or --address specify local address bind to
# 0.0.0.0 listen all interface in machine 
kubectl port-forward --address 0.0.0.0 svc/argocd-server 8080:443 -n argocd
0.0.0.0:8080 -> 8080

kubectl port-forward service/argocd-server -n argocd 8080:443 --address 0.0.0.0


# ssh tunnel 
# ufw status verbose deny(incoming)
# connection to server will spin, hang and time-out
# initiate ssh tunnel from our local machine

kubectl port-forward  svc/argocd-server 8888:443 -n argocd
127.0.0.1:8888 -> 8080
# tunnel bind from local to remote
ssh -N  -L localhost:8888:localhost:8888 droplet

# get initial password for argocd admin account and webui to login the admin panel
argocd admin initial-password -n argocd
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 --decode && echo

# update password
argocd account update-password --current-password  <current_password> --new-password <new_password>
```



### Accessing ArgoCD Using NodePort

- Creating a NodePort Service via YAML config file:
```yaml
apiVersion: v1
kind: Service
metadata:
name: argocd-server-nodeport
namespace: argocd
spec:
type: NodePort
ports:
  - port: 80
    targetPort: 8080
    nodePort: 30007 # Specify the nodePort you want to use, or let Kubernetes allocate one for you.
selector:
  app.kubernetes.io/name: argocd-server
```
Apply it with the command:
```bash
kubectl apply -f argocd-server-nodeport.yaml
```
- Using `kubectl patch` Command:

To quickly change the service type to NodePort and let Kubernetes allocate an available port, you can use the following command:
```bash
  kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort"}}'
  kubectl get svc -n argocd
  minikube ip
```
If you want to specify a particular node port, use the following command, replacing `<node_port>` with your chosen port number:
```sh
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort", "ports": [{"nodePort": <node_port>, "port": 80}]}}'
```



## application in argocd

describe the desired state of the app in git repo

path: the dir with the repo where mainfest are located
dest cluster: the cluster where app will be deployed
dest namespace: the namespace in cluster where resource will reside


ignore difference

helm or kustomize


```yml

kind: Application
spec:
  destination:
    namespace: app1
    server: 'https://kubernetes.default.svc'
  source:
    path:
    repoURL:
    targetRevision:
  syncPolicy:
    automated:
      prune: false
      selfHEal: true
    syncOPtions:
      - CreateNamespace=true
```

sync policy

health status

history, sync and rollback

multi-cluster


## Git Signed Commit

signing with gpg  or X.509

Supported algorithms:
Pubkey: RSA, ELG, DSA, ECDH, ECDSA, EDDSA
Cipher: IDEA, 3DES, CAST5, BLOWFISH, AES, AES192, AES256, TWOFISH,
        CAMELLIA128, CAMELLIA192, CAMELLIA256
Hash: SHA1, RIPEMD160, SHA256, SHA384, SHA512, SHA224
Compression: Uncompressed, ZIP, ZLIB, BZIP2

> private key: sign or decrypt
> public key:  verify or encrypt

- git
```bash

gpg --list-secret-keys --keyid-format=long
gpg --full-generate-key
gpg --list-secret-keys --keyid-format=long

git config --global user.signingkey 
git config --global commit.pgpsign true

gpg --armor --export 
gpg --armor --export > ./gpp-key.pub
gpg --armor --export-secret-keys --armor > ./gpg-key.asc
```
