let keyName = ''
export class operateRedis extends plugin {
    constructor() {
        super({
            name: '操作redis',
            dsc: '操作redis',
            event: 'message',
            priority: -1,
            rule: [
                {
                    reg: '^#查询redis数据$',
                    fnc: 'operateRedis',
                    permission: 'master',
                },
                {
                    reg: '^#设置redis数据$',
                    fnc: 'setRedis',
                    permission: 'master',
                },
                {
                    reg: '^#删除redis数据$',
                    fnc: 'delKey',
                    permission: 'master',
                },
            ]
        });
    }
    async operateRedis(e){
        e.reply('请输入key')
        this.setContext('enterKey')
        return true
    }
    async enterKey(e){
        let data = await redis.type(`${this.e.msg}`)
        let data_
        switch(data){
            case 'zset':
                data_ = await redis.zRangeWithScores(this.e.msg, 0, -1)
                break;
            case 'string':
                data_ = await redis.get(this.e.msg)
                break;
            case 'none':
                e.reply(`数据库中不存在${this.e.msg}`)
                this.finish('enterKey')
                return true
            default:
                e.reply(`暂不支持类型${this.e.msg}`)
                this.finish('enterKey')
                return true
        }
        e.reply(`type: ${data}\n` + JSON.stringify(data_))
        this.finish('enterKey')
    }
    async setRedis(e){
        e.reply('请输入key')
        this.setContext('getKeyName')
        return true
    }
    async getKeyName(e){
        keyName = this.e.msg
        e.reply('请输入数据')
        this.finish('getKeyName')
        this.setContext('setKey')
    }
    async setKey(e){
        let data,type
        try {
            data = JSON.parse(this.e.msg);
            type = 'zset'
        } catch (error) {
            data = this.e.msg
            type = 'string'
        }
        switch(type){
            case 'zset':
                data.forEach((item) => {
                    redis.zAdd(`${keyName}`, {score: item.score, value: item.value})
                })
                break
            case 'string':
                redis.set(`${keyName}`,data)
                break
            default:
                e.reply(`暂不支持类型${type}`)
                this.finish('setKey')
                return true
        }
        e.reply(`${keyName} 设置成功！数据类型为${type}，如设置有误可输入#删除redis数据${keyName}`)
        this.finish('setKey')
    }
    async delKey(e){
        e.reply('请输入key')
        this.setContext('delKeyName')
    }
    async delKeyName(e){
        let type = await redis.type(`${this.e.msg}`)
        switch(type){
            case 'none':
                e.reply(`数据库中不存在${this.e.msg}`)
                this.finish('delKeyName')
                return true
            default:
                await redis.del(this.e.msg)
                break
        }
        this.finish('delKeyName')
        e.reply('删除成功')
    }
}
