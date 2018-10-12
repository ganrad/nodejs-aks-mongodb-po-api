#----------------------------------
# Generate SSL cert; Make sure to substitute 'localhost' with the DNS label for the microservice!
#----------------------------------
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj '/CN=po-service.033185fc7e8b483fae46.westus.aksapp.io'

# Print certificate and verify subject value; should point to the app dns hostname
openssl x509 -in tls.crt -text -noout

# Base64 encode the key and cert
#echo key.pem | base64 > app.key
#echo cert.pem | base64 > app.crt
#----------------------------------
# Create the secret 'ssh-key-secret'
# This secret has to be created in the k8s namespace before deploying the application.
#----------------------------------
#kubectl create secret generic ssh-key-secret --from-file=tls.key=./app.key --from-file=tls.crt=./app.crt
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
#----------------------------------
# Tear down po-service and mongodb apps
#---------------------------------
helm delete --purge jsapp

helm delete --purge mongodb

kubectl delete pvc pv-claim

kubectl delete pv pv0001

kubectl delete secret po-ssh-secret
#----------------------------------
