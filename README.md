# Build and deploy a Stateful (Persistent) Nodejs *Microservice* on Azure Kubernetes Service
This project describes the steps for building and deploying a containerized *Node.js* microservice on Azure Kubernetes Service (AKS).  The microservice exposes a simple REST API for manipulating (CRUD) *Purchase Orders* and the purchase order documents (JSON messages) are persisted in a [MongoDB](https://www.mongodb.com/) No-SQL database.

There are two options for persisting the MongoDB database -
- Deploy the Helm chart in folder `mongodb` to persist the database in a **NFS** backed storage.  With this option, only one instance of the database is deployed (non-HA).
- Deploy the Helm chart in folder `mongodb-rs` to persist the database in **Azure Disk**.  Additionally, this chart deploys a MongoDB replica set (multiple nodes).  In a replica set, data is replicated across all nodes which provides for a highly available database.
