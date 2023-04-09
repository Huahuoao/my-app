echo "开始更新项目"
docker stop myapp
docker rm myapp
docker rmi myapp
docker build -t myapp .
docker run -itd --name myapp-post  -p 3000:80 myapp
