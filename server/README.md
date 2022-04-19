https://console-docs.apipost.cn/preview/96a85ca98b9abc86/020462fc7605d2e8

自动生成的文档，随便看看，有些接口没有在里面，当然，在里面的接口也有没用上的。。。不是专业写接口

使用网页端看着比较舒服

## /my_campus

```text
暂无描述
```
#### 公共Header参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Query参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Body参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/stu
```text
暂无描述
```
#### 公共Header参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Query参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Body参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/stu/stu/info获取单个学生信息
```text
每个学生的接口
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/stu/info

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 5001 | Number | 否 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/stu/stu/add
```text
新增
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/stu/add

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 99 | Number | 否 | -
stu_name | vbg | - | 是 | -
stu_age | 22 | - | 是 | -
stu_pic | ../images | - | 是 | -
stu_sex | male | - | 是 | -
password | vbg | - | 是 | -
stu_mobile | 131333356787 | - | 是 | -
stu_idcard | 33456777745443344 | - | 是 | -
stu_oriplace | 上海 | - | 是 | -
stu_dormitory | 3309 | - | 是 | -
status | 1 | - | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/stu/stu/edit
```text
编辑
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/stu/edit

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 75 | - | 否 | -
stu_name | huj | - | 是 | -
stu_age | 99 | - | 是 | -
stu_pic | ../images | - | 是 | -
stu_sex | male | - | 是 | -
password | hui | - | 是 | -
stu_mobile | 131333356787 | - | 是 | -
stu_idcard | 33456777745443344 | - | 是 | -
stu_oriplace | ujjjj | - | 是 | -
stu_dormitory | 3309 | - | 是 | -
status | 1 | - | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/stu/stu/del
```text
编辑
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/stu/del

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 75 | - | 否 | -
stu_name | huj | - | 是 | -
stu_age | 99 | - | 是 | -
stu_pic | ../images | - | 是 | -
stu_sex | male | - | 是 | -
password | hui | - | 是 | -
stu_mobile | 131333356787 | - | 是 | -
stu_idcard | 33456777745443344 | - | 是 | -
stu_oriplace | ujjjj | - | 是 | -
stu_dormitory | 3309 | - | 是 | -
status | 1 | - | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/stu/stu/uploadimage
```text
编辑
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/stu/uploadimage

#### 请求方式
> POST

#### Content-Type
> form-data

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 75 | - | 否 | -
stu_name | huj | - | 是 | -
stu_age | 99 | - | 是 | -
stu_pic | ../images | - | 是 | -
stu_sex | male | - | 是 | -
password | hui | - | 是 | -
stu_mobile | 131333356787 | - | 是 | -
stu_idcard | 33456777745443344 | - | 是 | -
stu_oriplace | ujjjj | - | 是 | -
stu_dormitory | 3309 | - | 是 | -
status | 1 | - | 是 | -
name | stua | - | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/stu/stu/matched
```text
编辑
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/stu/matched

#### 请求方式
> POST

#### Content-Type
> form-data

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
picName | hsq | - | 是 | -
imgUrl | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhMAAAGLCAYAAAB9fhCXAAARlklEQVR4Xu3WsQ0AIAwEsWT/oUFiBK51+jTWF7czc8YRIECAAAECBD4FVkx8ynkjQIAAAQIEnoCYMAQCBAgQIEAgCYiJxOeZAAECBAgQEBM2QIAAAQIECCQBMZH4PBMgQIAAAQJiwgYIECBAgACBJCAmEp9nAgQIECBAQEzYAAECBAgQIJAExETi80yAAAECBAiICRsgQIAAAQIEkoCYSHyeCRAgQIAAATFhAwQIECBAgEASEBOJzzMBAgQIECAgJmyAAAECBAgQSAJiIvF5JkCAAAECBMSEDRAgQIAAAQJJQEwkPs8ECBAgQICAmLABAgQIECBAIAmIicTnmQABAgQIEBATNkCAAAECBAgkATGR+DwTIECAAAECYsIGCBAgQIAAgSQgJhKfZwIECBAgQEBM2AABAgQIECCQBMRE4vNMgAABAgQIiAkbIECAAAECBJKAmEh8ngkQIECAAAExYQMECBAgQIBAEhATic8zAQIECBAgICZsgAABAgQIEEgCYiLxeSZAgAABAgTEhA0QIECAAAECSUBMJD7PBAgQIECAgJiwAQIECBAgQCAJiInE55kAAQIECBAQEzZAgAABAgQIJAExkfg8EyBAgAABAmLCBggQIECAAIEkICYSn2cCBAgQIEBATNgAAQIECBAgkATEROLzTIAAAQIECIgJGyBAgAABAgSSgJhIfJ4JECBAgAABMWEDBAgQIECAQBIQE4nPMwECBAgQICAmbIAAAQIECBBIAmIi8XkmQIAAAQIExIQNECBAgAABAklATCQ+zwQIECBAgICYsAECBAgQIEAgCYiJxOeZAAECBAgQEBM2QIAAAQIECCQBMZH4PBMgQIAAAQJiwgYIECBAgACBJCAmEp9nAgQIECBAQEzYAAECBAgQIJAExETi80yAAAECBAiICRsgQIAAAQIEkoCYSHyeCRAgQIAAATFhAwQIECBAgEASEBOJzzMBAgQIECAgJmyAAAECBAgQSAJiIvF5JkCAAAECBMSEDRAgQIAAAQJJQEwkPs8ECBAgQICAmLABAgQIECBAIAmIicTnmQABAgQIEBATNkCAAAECBAgkATGR+DwTIECAAAECYsIGCBAgQIAAgSQgJhKfZwIECBAgQEBM2AABAgQIECCQBMRE4vNMgAABAgQIiAkbIECAAAECBJKAmEh8ngkQIECAAAExYQMECBAgQIBAEhATic8zAQIECBAgICZsgAABAgQIEEgCYiLxeSZAgAABAgTEhA0QIECAAAECSUBMJD7PBAgQIECAgJiwAQIECBAgQCAJiInE55kAAQIECBAQEzZAgAABAgQIJAExkfg8EyBAgAABAmLCBggQIECAAIEkICYSn2cCBAgQIEBATNgAAQIECBAgkATEROLzTIAAAQIECIgJGyBAgAABAgSSgJhIfJ4JECBAgAABMWEDBAgQIECAQBIQE4nPMwECBAgQICAmbIAAAQIECBBIAmIi8XkmQIAAAQIExIQNECBAgAABAklATCQ+zwQIECBAgICYsAECBAgQIEAgCYiJxOeZAAECBAgQEBM2QIAAAQIECCQBMZH4PBMgQIAAAQJiwgYIECBAgACBJCAmEp9nAgQIECBAQEzYAAECBAgQIJAExETi80yAAAECBAiICRsgQIAAAQIEkoCYSHyeCRAgQIAAATFhAwQIECBAgEASEBOJzzMBAgQIECAgJmyAAAECBAgQSAJiIvF5JkCAAAECBMSEDRAgQIAAAQJJQEwkPs8ECBAgQICAmLABAgQIECBAIAmIicTnmQABAgQIEBATNkCAAAECBAgkATGR+DwTIECAAAECYsIGCBAgQIAAgSQgJhKfZwIECBAgQEBM2AABAgQIECCQBMRE4vNMgAABAgQIiAkbIECAAAECBJKAmEh8ngkQIECAAAExYQMECBAgQIBAEhATic8zAQIECBAgICZsgAABAgQIEEgCYiLxeSZAgAABAgTEhA0QIECAAAECSUBMJD7PBAgQIECAgJiwAQIECBAgQCAJiInE55kAAQIECBAQEzZAgAABAgQIJAExkfg8EyBAgAABAmLCBggQIECAAIEkICYSn2cCBAgQIEBATNgAAQIECBAgkATEROLzTIAAAQIECIgJGyBAgAABAgSSgJhIfJ4JECBAgAABMWEDBAgQIECAQBIQE4nPMwECBAgQICAmbIAAAQIECBBIAmIi8XkmQIAAAQIExIQNECBAgAABAklATCQ+zwQIECBAgICYsAECBAgQIEAgCYiJxOeZAAECBAgQEBM2QIAAAQIECCQBMZH4PBMgQIAAAQJiwgYIECBAgACBJCAmEp9nAgQIECBAQEzYAAECBAgQIJAExETi80yAAAECBAiICRsgQIAAAQIEkoCYSHyeCRAgQIAAATFhAwQIECBAgEASEBOJzzMBAgQIECAgJmyAAAECBAgQSAJiIvF5JkCAAAECBMSEDRAgQIAAAQJJQEwkPs8ECBAgQICAmLABAgQIECBAIAmIicTnmQABAgQIEBATNkCAAAECBAgkATGR+DwTIECAAAECYsIGCBAgQIAAgSQgJhKfZwIECBAgQEBM2AABAgQIECCQBMRE4vNMgAABAgQIiAkbIECAAAECBJKAmEh8ngkQIECAAAExYQMECBAgQIBAEhATic8zAQIECBAgICZsgAABAgQIEEgCYiLxeSZAgAABAgTEhA0QIECAAAECSUBMJD7PBAgQIECAgJiwAQIECBAgQCAJiInE55kAAQIECBAQEzZAgAABAgQIJAExkfg8EyBAgAABAmLCBggQIECAAIEkICYSn2cCBAgQIEBATNgAAQIECBAgkATEROLzTIAAAQIECIgJGyBAgAABAgSSgJhIfJ4JECBAgAABMWEDBAgQIECAQBIQE4nPMwECBAgQICAmbIAAAQIECBBIAmIi8XkmQIAAAQIExIQNECBAgAABAklATCQ+zwQIECBAgICYsAECBAgQIEAgCYiJxOeZAAECBAgQEBM2QIAAAQIECCQBMZH4PBMgQIAAAQJiwgYIECBAgACBJCAmEp9nAgQIECBAQEzYAAECBAgQIJAExETi80yAAAECBAiICRsgQIAAAQIEkoCYSHyeCRAgQIAAATFhAwQIECBAgEASEBOJzzMBAgQIECAgJmyAAAECBAgQSAJiIvF5JkCAAAECBMSEDRAgQIAAAQJJQEwkPs8ECBAgQICAmLABAgQIECBAIAmIicTnmQABAgQIEBATNkCAAAECBAgkATGR+DwTIECAAAECYsIGCBAgQIAAgSQgJhKfZwIECBAgQEBM2AABAgQIECCQBMRE4vNMgAABAgQIiAkbIECAAAECBJKAmEh8ngkQIECAAAExYQMECBAgQIBAEhATic8zAQIECBAgICZsgAABAgQIEEgCYiLxeSZAgAABAgTEhA0QIECAAAECSUBMJD7PBAgQIECAgJiwAQIECBAgQCAJiInE55kAAQIECBAQEzZAgAABAgQIJAExkfg8EyBAgAABAmLCBggQIECAAIEkICYSn2cCBAgQIEBATNgAAQIECBAgkATEROLzTIAAAQIECIgJGyBAgAABAgSSgJhIfJ4JECBAgAABMWEDBAgQIECAQBIQE4nPMwECBAgQICAmbIAAAQIECBBIAmIi8XkmQIAAAQIExIQNECBAgAABAklATCQ+zwQIECBAgICYsAECBAgQIEAgCYiJxOeZAAECBAgQEBM2QIAAAQIECCQBMZH4PBMgQIAAAQJiwgYIECBAgACBJCAmEp9nAgQIECBAQEzYAAECBAgQIJAExETi80yAAAECBAiICRsgQIAAAQIEkoCYSHyeCRAgQIAAATFhAwQIECBAgEASEBOJzzMBAgQIECAgJmyAAAECBAgQSAJiIvF5JkCAAAECBMSEDRAgQIAAAQJJQEwkPs8ECBAgQICAmLABAgQIECBAIAmIicTnmQABAgQIEBATNkCAAAECBAgkATGR+DwTIECAAAECYsIGCBAgQIAAgSQgJhKfZwIECBAgQEBM2AABAgQIECCQBMRE4vNMgAABAgQIiAkbIECAAAECBJKAmEh8ngkQIECAAAExYQMECBAgQIBAEhATic8zAQIECBAgICZsgAABAgQIEEgCYiLxeSZAgAABAgTEhA0QIECAAAECSUBMJD7PBAgQIECAgJiwAQIECBAgQCAJiInE55kAAQIECBAQEzZAgAABAgQIJAExkfg8EyBAgAABAmLCBggQIECAAIEkICYSn2cCBAgQIEBATNgAAQIECBAgkATEROLzTIAAAQIECIgJGyBAgAABAgSSgJhIfJ4JECBAgAABMWEDBAgQIECAQBIQE4nPMwECBAgQICAmbIAAAQIECBBIAmIi8XkmQIAAAQIExIQNECBAgAABAklATCQ+zwQIECBAgICYsAECBAgQIEAgCYiJxOeZAAECBAgQEBM2QIAAAQIECCQBMZH4PBMgQIAAAQJiwgYIECBAgACBJCAmEp9nAgQIECBAQEzYAAECBAgQIJAExETi80yAAAECBAiICRsgQIAAAQIEkoCYSHyeCRAgQIAAATFhAwQIECBAgEASEBOJzzMBAgQIECAgJmyAAAECBAgQSAJiIvF5JkCAAAECBMSEDRAgQIAAAQJJQEwkPs8ECBAgQICAmLABAgQIECBAIAmIicTnmQABAgQIEBATNkCAAAECBAgkATGR+DwTIECAAAECYsIGCBAgQIAAgSQgJhKfZwIECBAgQEBM2AABAgQIECCQBMRE4vNMgAABAgQIiAkbIECAAAECBJKAmEh8ngkQIECAAAExYQMECBAgQIBAEhATic8zAQIECBAgICZsgAABAgQIEEgCYiLxeSZAgAABAgTEhA0QIECAAAECSUBMJD7PBAgQIECAgJiwAQIECBAgQCAJiInE55kAAQIECBAQEzZAgAABAgQIJAExkfg8EyBAgAABAmLCBggQIECAAIEkICYSn2cCBAgQIEBATNgAAQIECBAgkATEROLzTIAAAQIECIgJGyBAgAABAgSSgJhIfJ4JECBAgAABMWEDBAgQIECAQBIQE4nPMwECBAgQICAmbIAAAQIECBBIAmIi8XkmQIAAAQIExIQNECBAgAABAklATCQ+zwQIECBAgICYsAECBAgQIEAgCYiJxOeZAAECBAgQEBM2QIAAAQIECCQBMZH4PBMgQIAAAQJiwgYIECBAgACBJCAmEp9nAgQIECBAQEzYAAECBAgQIJAExETi80yAAAECBAiICRsgQIAAAQIEkoCYSHyeCRAgQIAAATFhAwQIECBAgEASEBOJzzMBAgQIECAgJmyAAAECBAgQSAJiIvF5JkCAAAECBMSEDRAgQIAAAQJJQEwkPs8ECBAgQICAmLABAgQIECBAIAmIicTnmQABAgQIEBATNkCAAAECBAgkATGR+DwTIECAAAECYsIGCBAgQIAAgSQgJhKfZwIECBAgQEBM2AABAgQIECCQBMRE4vNMgAABAgQIiAkbIECAAAECBJKAmEh8ngkQIECAAAExYQMECBAgQIBAEhATic8zAQIECBAgICZsgAABAgQIEEgCYiLxeSZAgAABAgTEhA0QIECAAAECSUBMJD7PBAgQIECAgJiwAQIECBAgQCAJiInE55kAAQIECBAQEzZAgAABAgQIJAExkfg8EyBAgAABAmLCBggQIECAAIEkICYSn2cCBAgQIEBATNgAAQIECBAgkATEROLzTIAAAQIECIgJGyBAgAABAgSSgJhIfJ4JECBAgAABMWEDBAgQIECAQBIQE4nPMwECBAgQICAmbIAAAQIECBBIAmIi8XkmQIAAAQIExIQNECBAgAABAklATCQ+zwQIECBAgICYsAECBAgQIEAgCYiJxOeZAAECBAgQEBM2QIAAAQIECCQBMZH4PBMgQIAAAQJiwgYIECBAgACBJCAmEp9nAgQIECBAQEzYAAECBAgQIJAExETi80yAAAECBAiICRsgQIAAAQIEksAFY1yLEG3hyhoAAAAASUVORK5CYII=" | - | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/stu/stu/tsetrnew
```text
每个学生的接口
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/stu/testnew

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 34 | Number | 否 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/stu/stu/修改密码通过原密码
```text
编辑
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/stu/edit

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 75 | - | 否 | -
stu_name | huj | - | 是 | -
stu_age | 99 | - | 是 | -
stu_pic | ../images | - | 是 | -
stu_sex | male | - | 是 | -
password | hui | - | 是 | -
stu_mobile | 131333356787 | - | 是 | -
stu_idcard | 33456777745443344 | - | 是 | -
stu_oriplace | ujjjj | - | 是 | -
stu_dormitory | 3309 | - | 是 | -
status | 1 | - | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/stu/stu/通过邮箱修改密码
```text
编辑
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/stu/edit

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 34 | - | 否 | -
password | 111 | - | 是 | -
repassword | 111 | - | 是 | -
email_pwd | 9455 | - | 是 | -
action | email-pwd | - | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/stu/stu/获取全部学生
```text
每个学生的接口
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/stu/list

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 19 | Number | 否 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/stu/stu/inforeqattend获取学生签到记录
```text
每个学生的接口
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/stu/inforeqattend

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 5001 | Number | 否 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/stu/stu/listreqattend获取全部学生签到记录
```text
每个学生的接口
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/stu/listreqattend

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 19 | Number | 否 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/tea
```text
暂无描述
```
#### 公共Header参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Query参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Body参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/tea/tea/list
```text
所有学生的接口
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/tea/list

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 99 | Number | 否 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/tea/tea/info
```text
每个学生的接口
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/tea/info

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
tea_id | 3002 | Number | 否 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/tea/teaadd
```text
新增
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/tea/add

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 99 | Number | 否 | -
tea_name | vbg | - | 是 | -
tea_age | 22 | - | 是 | -
tea_pic | ../images | - | 是 | -
tea_sex | male | - | 是 | -
password | vbg | - | 是 | -
tea_mobile | 131333356787 | - | 是 | -
tea_idcard | 33456777745443344 | - | 是 | -
tea_oriplace | 上海 | - | 是 | -
tea_dormitory | 3309 | - | 是 | -
status | 1 | - | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/tea/tea edit
```text
新增
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/tea/edit

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
tea_id | 201 | Number | 否 | -
tea_name | vbg | - | 是 | -
tea_age | 22 | - | 是 | -
tea_pic | ../images | - | 是 | -
tea_sex | male | - | 是 | -
password | vbg | - | 是 | -
tea_mobile | 131333356787 | - | 是 | -
tea_idcard | 33456777745443344 | - | 是 | -
tea_oriplace | 北京 | - | 是 | -
tea_dormitory | 3309 | - | 是 | -
status | 1 | - | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/tea/tea del
```text
新增
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/tea/del

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
tea_id | 203 | Number | 否 | -
tea_name | vbg | - | 是 | -
tea_age | 22 | - | 是 | -
tea_pic | ../images | - | 是 | -
tea_sex | male | - | 是 | -
password | vbg | - | 是 | -
tea_mobile | 131333356787 | - | 是 | -
tea_idcard | 33456777745443344 | - | 是 | -
tea_oriplace | 北京 | - | 是 | -
tea_dormitory | 3309 | - | 是 | -
status | 1 | - | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/users
```text
暂无描述
```
#### 公共Header参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Query参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Body参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/users/user/login
```text
用户登陆需要生成token,不登录没有token会被拦截
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/user/login

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
username | wyp | - | 是 | 用户登陆用户名
password | 123 | - | 是 | 用户登陆密码
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
#### 成功响应示例
```javascript
{"code":20000,"message":"登录成功","data":{"token":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NDE0Mzc1MTQsImV4cCI6MTY0MTQ1MTkxNH0.m44Vm6bcg7DJizqUzZbxCHrkaz0Ra-okoIBiuodsJ_M"}}
```
参数名 | 示例值 | 参数类型 | 参数描述
--- | --- | --- | ---
code | 20000 | Number | 
message | 登录成功 | String | 
data | - | Object | 返回数据
data.token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NDE0Mzc1MTQsImV4cCI6MTY0MTQ1MTkxNH0.m44Vm6bcg7DJizqUzZbxCHrkaz0Ra-okoIBiuodsJ_M | String | 
#### 错误响应示例
```javascript
{"code":40000,"message":"密码错误","data":""}
```
参数名 | 示例值 | 参数类型 | 参数描述
--- | --- | --- | ---
code | 40000 | Number | 
message | 密码错误 | String | 
data | - | Object | 返回数据
## /my_campus/users/user发送邮件
```text
会往指定的邮箱发送一条邮件，邮件内容是随机生成的验证码用来重置用户密码，邮箱发送者是我的邮箱，需要提前获取smtp授权码，同时会将生成的随机码保存一份到学生信息表数据库内
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/user/sendmail

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
email | 919046999@qq.com | String | 是 | 电子邮箱，比如 example@qq.com
stu_id | 5001 | String | 是 | 需要更新具体学生用户的Id
rolename | 教师 | Text | 是 | -
tea_id | 50 | Text | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
#### 成功响应示例
```javascript
{"code":20000,"message":"发送邮件成功","data":true,"ran_code":8821}
```
参数名 | 示例值 | 参数类型 | 参数描述
--- | --- | --- | ---
code | 20000 | Number | 
message | 发送邮件成功 | String | 
data | true | Object | 返回数据
ran_code | 8821 | Number | 
#### 错误响应示例
```javascript
{"code":40000,"message":"发送邮件失败","data":null}
```
参数名 | 示例值 | 参数类型 | 参数描述
--- | --- | --- | ---
code | 40000 | Number | 
message | 发送邮件失败 | String | 
data | - | Object | 返回数据
## /my_campus/users/user/infotaro
```text
用户登陆需要生成token,不登录没有token会被拦截
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/user/infotaro

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjUwMDEsInVzZXJuYW1lIjoid3lwIiwiaWF0IjoxNjQ2MzU5MzcwLCJleHAiOjE2NjA3NTkzNzB9.ojabqU8alv8uSSdHUduEGmSsD55BgZx3xaNVORw_DEc | String | 是 | -
#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
user_id | 5001 | - | 是 | 用户登陆用户名
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
#### 成功响应示例
```javascript
{
	"code": 20000,
	"message": "登录成功",
	"data": {
		"token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NDE0Mzc1MTQsImV4cCI6MTY0MTQ1MTkxNH0.m44Vm6bcg7DJizqUzZbxCHrkaz0Ra-okoIBiuodsJ_M"
	}
}
```
参数名 | 示例值 | 参数类型 | 参数描述
--- | --- | --- | ---
code | 20000 | Number | 
message | 登录成功 | String | 
data | - | Object | 返回数据
data.token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NDE0Mzc1MTQsImV4cCI6MTY0MTQ1MTkxNH0.m44Vm6bcg7DJizqUzZbxCHrkaz0Ra-okoIBiuodsJ_M | String | 
#### 错误响应示例
```javascript
{"code":40000,"message":"密码错误","data":""}
```
参数名 | 示例值 | 参数类型 | 参数描述
--- | --- | --- | ---
code | 40000 | Number | 
message | 密码错误 | String | 
data | - | Object | 返回数据
## /my_campus/users/user/listdo 获取user
```text
用户登陆需要生成token,不登录没有token会被拦截
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/user/listdo

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
page | 1 | Number | 是 | -
limit | 1 | Number | 是 | -
user_name | admin | Text | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
#### 成功响应示例
```javascript
{
	"code": 20000,
	"message": "登录成功",
	"data": {
		"token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NDE0Mzc1MTQsImV4cCI6MTY0MTQ1MTkxNH0.m44Vm6bcg7DJizqUzZbxCHrkaz0Ra-okoIBiuodsJ_M"
	}
}
```
参数名 | 示例值 | 参数类型 | 参数描述
--- | --- | --- | ---
code | 20000 | Number | 
message | 登录成功 | String | 
data | - | Object | 返回数据
data.token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NDE0Mzc1MTQsImV4cCI6MTY0MTQ1MTkxNH0.m44Vm6bcg7DJizqUzZbxCHrkaz0Ra-okoIBiuodsJ_M | String | 
#### 错误响应示例
```javascript
{"code":40000,"message":"密码错误","data":""}
```
参数名 | 示例值 | 参数类型 | 参数描述
--- | --- | --- | ---
code | 40000 | Number | 
message | 密码错误 | String | 
data | - | Object | 返回数据
## /my_campus/百度
```text
暂无描述
```
#### 公共Header参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Query参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Body参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/百度/人脸对比   两张图片
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> https://aip.baidubce.com/rest/2.0/face/v3/match?access_token=24.9fc361769e165de2e329b5fa07f0f6b7.2592000.1642402879.282335-25370554

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Header参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
Content-Type | application/json | String | 是 | -
#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
access_token | 24.9fc361769e165de2e329b5fa07f0f6b7.2592000.1642402879.282335-25370554 | String | 是 | -
#### 请求Body参数
```javascript
[
	{
		"image": "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",
		"image_type": "BASE64",
	},
	{
		"image": "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",
		"image_type": "BASE64",
		"face_type": "IDCARD",
		"quality_control": "LOW",
	}
]
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/百度/人脸检测生成token
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=24.9fc361769e165de2e329b5fa07f0f6b7.2592000.1642402879.282335-25370554

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Header参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
Content-Type | application/json | String | 是 | -
#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
access_token | 24.9fc361769e165de2e329b5fa07f0f6b7.2592000.1642402879.282335-25370554 | String | 是 | -
#### 请求Body参数
```javascript

	{
		"image": "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",
		"image_type": "BASE64",
		"face_type": "IDCARD",
		"quality_control": "LOW",
	}

```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/face
```text
暂无描述
```
#### 公共Header参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Query参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Body参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/face/face 获取单个签到记录
```text
获取单个学生的签到记录
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/face/infoed

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 5001 | Number | 否 | -
date | [ 2020-01-01, 2022-05-03 ] | Date | 是 | -
page | 1 | Text | 是 | -
limit | 5 | Text | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
#### 成功响应示例
```javascript
{"code":20000,"message":"获取单个学生签到记录成功","data":[{"update_time":null,"create_time":"2022-01-05 13:44:31","attend_record_id":2508,"stu_id":5001,"stu_name":"wyp","attend_type":"人脸识别签到"},{"update_time":null,"create_time":"2022-01-05 16:29:17","attend_record_id":2509,"stu_id":5001,"stu_name":"wyp","attend_type":"人脸识别签到"},{"update_time":null,"create_time":"2022-01-05 16:29:44","attend_record_id":2510,"stu_id":5001,"stu_name":"wyp","attend_type":"人脸识别签到"},{"update_time":null,"create_time":"2022-01-05 17:51:20","attend_record_id":2511,"stu_id":5001,"stu_name":"wyp","attend_type":"人脸识别签到"}]}
```
参数名 | 示例值 | 参数类型 | 参数描述
--- | --- | --- | ---
code | 20000 | Number | 
message | 获取单个学生签到记录成功 | String | 
data | - | Object | 返回数据
data.update_time | - | Object | 
data.create_time | 2022-01-05 13:44:31 | Number | 
data.attend_record_id | 2508 | Number | 
data.stu_id | 5001 | Number | 
data.stu_name | wyp | String | 
data.attend_type | 人脸识别签到 | String | 
## /my_campus/face/detaildo查询详细信息
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/face/detaildo

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 5001 | Text | 是 | -
sendattends_id | 70 | Text | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/ReqAttend
```text
暂无描述
```
#### 公共Header参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Query参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 公共Body参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/ReqAttend/taroadd教师新发送签到请求
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/reqattend/taroadd

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
tea_id | 3003 | Number | 是 | -
user_name | lph1022 | - | 是 | -
user_nick_name | 刘鹏华 | - | 是 | -
timeSel | 15:33 | - | 是 | -
endtimeSel | 18:33 | - | 是 | -
dateSel | 2022-01-01 | - | 是 | -
attendTypeCheck | 地理位置签到 | - | 是 | -
enddateSel | 2023-01-05 | - | 是 | -
reasonlocation | 浙江省杭州市临平区龙王塘路87号利宾饭店 | Text | 是 | -
reasonLongTi | 120.297856 | Text | 是 | -
reasonLati | 30.419129 | Text | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/ReqAttend/tarosearch教师查询发送的签到请求
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/reqattend/tarosearch

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
tea_id | 3003 | Number | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/ReqAttend/tarostulocation 学生响应地理签到
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/reqattend/tarostulocation

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 5003 | Text | 是 | -
stu_name | wyp | Text | 是 | -
stu_nick_name | 断电 | Text | 是 | -
actualLoctaion | 铁点桥 | Text | 是 | -
actualDistance | 200 | Text | 是 | -
ATTENDID | 70 | Text | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/ReqAttend/tarosearch教师查询发送的签到请求 副本
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/reqattend/tarosearch

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
tea_id | 3003 | Number | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/ReqAttend/tarodeloutdate教师删除过期的签到请求
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/reqattend/tarodeloutdate

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
tea_id | 3003 | Number | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/ReqAttend/taroteadelAttend教师删除单个签到请求
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/reqattend/taroteadelAttend

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
sendattends_id | 50 | Text | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/ReqAttend/腾讯计算距离
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> https://apis.map.qq.com/ws/distance/v1/matrix/?from=39.071510,117.190091&to=39.981987,116.362896;39.949227,116.394310&key=CBRBZ-B5QCX-SJZ4C-Z2SKO-W74ME-JMFPB

#### 请求方式
> GET

#### Content-Type
> urlencoded

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
mode | driving | Text | 是 | -
from | 39.071510,117.190091 | Text | 是 | -
to | 39.981987,116.362896;39.949227,116.394310 | Text | 是 | -
key | CBRBZ-B5QCX-SJZ4C-Z2SKO-W74ME-JMFPB | Text | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/ReqAttend/tarojudgeifexist 判断是否存在
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/reqattend/tarojudgeifexist

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 5001 | Text | 是 | -
ATTENDID | 67 | Text | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/ReqAttend/TeaGetStudetailAttendDo查询详细信息
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/reqattend/TeaGetStudetailAttendDo

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 5001 | Text | 是 | -
sendattends_id | 75 | Text | 是 | -
page | 1 | Text | 是 | -
limit | 3 | Text | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/ReqAttend/tarosearchstu
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/reqattend/tarosearchstu

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 5001 | Number | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /my_campus/ReqAttend/Total分页所有数据
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://127.0.0.1:8002/reqattend/TeaGetStudetailAttendDoTotal

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
stu_id | 5001 | Text | 是 | -
sendattends_id | 75 | Text | 是 | -
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```