 #!/bin/bash
dockerID=$(docker run  --name swaggerapi-petstore3 -d -p 8080:8080 swaggerapi/petstore3:latest)
echo "DOCKER_CONTAINER_ID=$dockerID"
export DOCKER_CONTAINER_ID=$dockerID


