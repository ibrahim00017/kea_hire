# Deployment de l'application sur GCP
1. Configure the [Google Cloud SDK](https://cloud.google.com/sdk)
2. Install [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/), a CLI tool used for running commands against Kubernetes clusters.
3. Create a GCP project

### Start by installing the [Google Cloud SDK](https://cloud.google.com/sdk)

To test you installation:
```
$ gcloud --version
Google Cloud SDK 312.0.0
bq 2.0.61
core 2020.09.25
gsutil 4.53

```
Once installed, run ```gcloud init ``` to configure the SDK so that it has access to your GCP credentials. You'll also need to create a new project ***kea-hire*** on your gcp console to work with.

### Set the project:

```
$ gcloud config set project <PROJECT_ID>

```
### Finally, install ```kubectl```:

```
$ sudo apt-get install kubectl
```
## Kubernetes Cluster
### Next, let's create a cluster on [Kubernetes Engine](https://console.cloud.google.com/kubernetes):

```
$ gcloud container clusters create kia-kubernetes --num-nodes=3 --zone us-central1-a --machine-type g1-small
```
Connect the ```kubectl``` client to the cluster:
```
$ gcloud container clusters get-credentials kia-kubernetes --zone us-central1-a
```
## Docker Registry
Using the gcr.io/<PROJECT_ID>/<IMAGE_NAME>:<TAG> Docker tag format, build and then push the local Docker image, for the Node API, to the Container Registry:
```
$ gcloud auth configure-docker
$ docker build -t gcr.io/qwiklabs-gcp-02-c5b7d3af3a9c/kia-hire:1.1 .
$ docker push gcr.io/qwiklabs-gcp-02-c5b7d3af3a9c/kia-hire:1.1
```

## Secrets
Secrets are used to manage sensitive info such as passwords, API tokens, and SSH keys. We’ll utilize a secret to store our Mysql database credentials.
Create the secret:
```
$ kubectl apply -f kubernetes/mysql-secret.yaml
```
### Create a Persistent Disk:

```
$ gcloud compute disks create db-data-disk --size 50GB --zone us-central1-a
```

