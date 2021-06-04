 #!/bin/bash
docker pull swaggerapi/petstore3:latest >> dockerpull.log
rm dockerpull.log 2> /dev/null
dockerID=$(docker run  --name swaggerapi-petstore3 -d -p 8080:8080 swaggerapi/petstore3:latest)
echo $dockerID
