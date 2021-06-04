 #!/bin/bash
dockerID=$(docker run  --name swaggerapi-petstore3 -d -p 8080:8080 swaggerapi/petstore3:latest)
echo $dockerID
