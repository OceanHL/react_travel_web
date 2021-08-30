# 第一个阶段：拉取node镜像来打包React项目
# 拉取node那个版本，并指定stage【阶段】为build阶段
FROM node:16 as build
# 工作空间设置为 /app目录，复制的所有项目都在app目录下
WORKDIR /app 
# 将package.json和package-lock.json复制进来
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
# 复制public文件夹，并且创建一个public文件夹
COPY public public/
COPY src src/
# 安装依赖
RUN yarn
# 打包项目
RUN yarn build


# 第二阶段：创建并运行Nginx服务器，并且把打包好的文件复制粘贴到服务器文件夹中
# 拉取nginx版本
FROM nginx:alpine
# 将打包好的build文件复制到nginx镜像中
COPY --from=build /app/build/ /usr/share/nginx/html
# nginx的默认端口设置为80端口
EXPOSE 80
# 使用commit命令启动nginx服务器
CMD [ "nginx", "-g", "daemon off;" ]
