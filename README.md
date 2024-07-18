### 一、本地运行

> ps: node版本 v18.12.1


Web端文件夹目录说明

> lw-web/         
> ├── dist/								# 生产环境构建产物          
> ├── Docker/							# 容器/打包脚本         
> ├── node_modules/				# 项目依赖          
> ├── public/								# 静态资源         
> │ ├── favicon.ico					# 网站图标等         
> ├── src/ 									# 源代码         
> │ ├── api/								# 封装好的接口调用方法         
> │ ├── assets/							# 静态资源          
> │ │ ├── css/							# 样式文件         
> │ │ ├── fonts/ 						# 字体文件         
> │ │ ├── images/					# 图片资源         
> │ │ └── js/							# 引入静态JS框架          
> │ ├── components/			# 自定义组件         
> │ ├── layout/						# 引入其他UI组件         
> │ │ ├── components/ 		# UI组件         
> │ ├── router/						# 路由配置         
> │ │ ├── index.js 			# 配置中心         
> │ ├── store/ 					# Pinia 状态管理         
> │ ├── untils/ 				# 自定义工具         
> │ ├── views/ 				# 页面组件         
> │ ├── App.vue 				# 主组件          
> │ └── main.js 				# 入口文件          
> ├── tests/ 					# 测试文件（暂时不用）          
> ├── .editorconfig 				#  维持编辑器代码风格         
> ├── .env.dev 					# 环境变量配置(开发主)          
> ├── .env.prod  				# 发布环境变量          
> ├── .eslintignore 				# ESLint忽略文件配置          
> ├── .eslintrc.cjs 				# ESLint 配置文件          
> ├── .gitignore 					# Git 忽略文件配置         
> ├── .prettierrignore 			# Prettierr 忽略文件配置         
> ├── .prettierrc.json 			# 统一代码风格         
> ├── deploy.sh 						# 构建docker镜像         
> ├── index.html 						# 入口页面          
> ├── package-lock.json 			# npm 锁定文件，记录确切版本、依赖关系         
> ├── package.json 					# 项目依赖和脚本配置          
> ├── README.md 					# 项目说明文件          
> └── vite.config.js 					# Vite 配置文件          

技术选型（v1）：

| 依赖         | 说明         | 版本号 |
| ------------ | ------------ | ------ |
| vue/cli      | Vue脚手架    | 4.5.13 |
| Vite         | 热部署启动器 | 4.4.5  |
| Pinia        | 状态管理     | 2.1.6  |
| Axios        | Ajax请求     | 1.5.0  |
| Sass         | CSS增强框架  | 1.66.1 |
| Vue Router   | 路由管理器   | 4.2.4  |
| Element Plus | UI组件1      | 2.1.0  |
| Tailwind     | CSS编写组件  | 3.4.3  |
| Vuetify      | 响应式UI组件 | 在考虑 |


```shell
# 安装依赖
npm install

# 运行
npm run dev
```

### 二、打包发布

```shell
npm run build:prod
```
