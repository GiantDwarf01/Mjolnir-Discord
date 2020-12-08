const util = require('../util.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'schedule',
    description: 'Creates a scheduling poll',
    lastPin: null,
    execute(message, args) {
        const sat = {emoji:'🧂', name:"Saturday"};
        const sun = {emoji:'🍷', name:"Sunday"};
        const mon = {emoji:'😴', name:"Monday"};
        const tues = {emoji:'🌮', name:"Tuesday"};
        const wed = {emoji:'🐸', name:"Wednesday"};
        const thurs = {emoji:'🍗', name:"Thursday"};
        const fri = {emoji:'🍟', name:"Friday"};

        let ary = [sun,mon,tues,wed,thurs,fri,sat,sun,mon,tues,wed,thurs,fri,sat,sun,mon,tues,wed,thurs,fri]
        let d = new Date()
        let dn = d.getDay()
        const party = message.guild.roles.cache.get("783835256943542292");

        let str = `Time for the next adventure! When can all ${party} assemble?`;
        for (let i = 1; i < 8; i++) {
            d.setDate(d.getDate() + 1);
            str += `\n${ary[i + dn].emoji} ${ary[i + dn].name} - ${d.getMonth() + 1}/${d.getDate()}`
        }
        
        if (this.lastPin) this.lastPin.unpin()
        message.channel.send(str).then(async msg => {
            for (let i = 1; i < 8; i++) {
                await msg.react(ary[i + dn].emoji);
            }
            msg.pin().then(msg => this.lastPin = msg)
        })
    }
}