# yunzai-operateRedis-js
为Yunzai-Bot提供一个便捷的redis编辑插件
## 安装
下载插件后放到./plugins/example下
## 命令
#查询redis数据

#设置redis数据

#删除redis数据

目前支持的数据类型：string和zset
<details>
  <summary>点击查看示例</summary>

  #查询redis数据

> 请输入key

miao:rank:*********:dmg:1305

> [{"value":"*********","score":34230.65366933681}]

#设置redis数据

> 请输入key

miao:rank:*********:dmg:1305

> 请输入数据

[{"value":"\*\*\*\*\*\*\*\*\*","score":34230.65366933681},{"value":"\*\*\*\*\*\*\*\*\*","score":34231}]


> miao:rank:*********:dmg:1305 设置成功！数据类型为zset，如设置有误可输入 #删除redis数据miao:rank:\*\*\*\*\*\*\*\*\*:dmg:1305

#删除redis数据

> 请输入key

miao:rank:*********:dmg:1305

> 删除成功
</details>

## 未来更新
#设置/删除redis数据 支持反悔

支持模糊查询key

支持便捷删除特定角色/uid的排行数据，但永远不会支持修改特定uid的score
