# 初始化项目
    cms-vue 目录下
    npm install
    
    运行开发环境
    npm run serve


# 生产环境
    npm run build 
    node app.js

|—node-modules：依赖的node库文件
|—public：公共文件，如index.html入口文件
|—src
	|-api  访问接口层，主要用于调用服务器接口
    |—assets：资源文件img、css、html等等
    |-base  用于存放基础组件
    |-common  公共js部门
    	|-js  用于处理api返回的数据
    |—component：组件
    |-router   路由
    |-stor vux
    |—App.vue：vue的根组件
    |—main.js：主函数入口文件
|—package.json：项目描述文件
|- vue.config.js  vue编译配置文件
|-.env.development 环境配置文件
|-.env.production 环境配置文件
|-.env.springboot 环境配置文件
|-.eslintrc.js    代码格式校验配置文件