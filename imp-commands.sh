#----------------------------------
# Author: Ganesh Radhakrishnan (ganrad01@gmail.com) @ Microsoft
# Dated: 10-12-2018
# Description:
# Generate SSL cert for securing the po-service microservice.
#----------------------------------
#
#----------------------------------
# Specify correct value for host in '-subj'!!
# Substitute 'localhost' with DNS name of deployed microservice!
#----------------------------------
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj '/CN=po-service.033185fc7e8b483fae46.westus.aksapp.io'

# Print certificate and verify subject value; should point to the app dns hostname
openssl x509 -in tls.crt -text -noout

#----------------------------------
# Create the secret 'po-ssh-secret' of TYPE = tls!!
# This secret has to be created in the k8s namespace before deploying the application.
#----------------------------------
kubectl create secret tls po-ssh-secret --key tls.key --cert tls.crt

# Verify the secret and it's contents
kubectl get secrets
# Secret should have type 'kubernetes.io/tls'
kubectl get secret po-ssh-secret -o yaml
#----------------------------------
#
# Run the application build in Azure DevOps
#
#----------------------------------
# After microservices are deployed, use these commands to inspect SSL config, ingress resources etc
#----------------------------------
# Verify TLSv1.2/SSL handshake using curl
curl -v -k https://po-service.033185fc7e8b483fae46.westus.aksapp.io/
# View the deployed ingress resource
kubectl get ingress po-service -o yaml
#----------------------------------



#----------------------------------
# Tear down po-service and mongodb apps
#---------------------------------
helm delete --purge jsapp

helm delete --purge mongodb

kubectl delete pvc pv-claim

kubectl delete pv pv0001

kubectl delete secret po-ssh-secret
#----------------------------------
