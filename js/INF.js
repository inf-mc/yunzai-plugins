import plugin from '../../lib/plugins/plugin.js';
import puppeteer from '../../lib/puppeteer/puppeteer.js';
import common from "../../lib/common/common.js";

let mcheight = 1210
let infheight = 837
let mcheight2 = 1199
let infheight2 = 831

export class QueryHandler extends plugin {
    constructor(query) {
        let rule = {
            reg: /^#mcwiki (.*)/,
            fnc: 'handleWikiQuery',
        }
        super({
            name: 'mcwiki',
            dsc: 'mcwiki',
            event: 'message',
            priority: 5000,
            rule: [rule],
        })
    }

    
    async handleWikiQuery(e) {
        logger.info('[Minecraft]', e.msg)
        let msg = e.msg.replace("#mcwiki ","").trim()
        msg = msg.split(" ")
        let encodeQuery = encodeURI(msg)
        let url = `https://zh.minecraft.wiki/w/${encodeQuery}`
        //await this.reply(url)
        const browser = await puppeteer.browserInit()
        const page = await browser.newPage()
        await page.goto(url)
        const height = await page.evaluate(() => document.documentElement.scrollHeight)
        if (height === mcheight) {
            return this.reply('搜索不到此结果，请检查关键词是否准确无误')
        }else 
        
        if(height === mcheight2) {
            return this.reply('搜索不到此结果，请检查关键词是否准确无误')
        }else

        await page.setViewport({ width: 1280, height })
        const buff = await page.screenshot()
        await page.close()
        //await this.reply(segment.image(buff))
        let message = [url]
         message.push(segment.image(buff))
         message.push('受服务器网络波动影响，如果无法加载出正确的图片，还请您重新发送或点开上面的链接进入网页查看')
        return this.reply(await common.makeForwardMsg(this.e, message))
    }
    

}


export class INF extends plugin {
    constructor(INFWIKI) {
        let rule = {
            reg: /^#infwiki (.*)/,
            fnc: 'INFhandleWikiQuery',
        }
        super({
            name: 'infwiki',
            dsc: 'infwiki',
            event: 'message',
            priority: 5000,
            rule: [rule],
        })
    }

    async INFhandleWikiQuery(e) {
        logger.info('[INF]', e.msg)
        let msg = e.msg.replace("#infwiki","").trim()
        msg = msg.split(" ")
        let encodeQuery = encodeURI(msg)
        let url = `https://wiki.infinf.info/${encodeQuery}`
        //await this.reply(url)
        const browser = await puppeteer.browserInit()
        const page = await browser.newPage()
        await page.goto(url)
        const height = await page.evaluate(() => document.documentElement.scrollHeight)
        if (height === infheight) {
            return this.reply('搜索不到此结果，请检查关键词是否准确无误')
        } else

        if (height === infheight2) {
            return this.reply('搜索不到此结果，请检查关键词是否准确无误')
        } else
        await page.setViewport({ width: 1280, height })
        const buff = await page.screenshot()
        await page.close()
        //await this.reply(segment.image(buff))
        let message = [url]
         message.push(segment.image(buff))
         message.push('受服务器网络波动影响，如果无法加载出正确的图片，还请您重新发送或点开上面的链接进入网页查看')
        return this.reply(await common.makeForwardMsg(this.e, message))
    }
}