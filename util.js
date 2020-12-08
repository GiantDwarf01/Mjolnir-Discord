module.exports = {
    getUserFromMention(mention, client) {
        if (!mention) return;
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return client.users.cache.get(mention);
        }
    },

    chooseRandom(arr, num = 1) {
        const res = [];
        for(let i = 0; i < num; ){
            const random = Math.floor(Math.random() * arr.length);
            if(res.indexOf(arr[random]) !== -1){
               continue;
            };
            res.push(arr[random]);
            i++;
         };
         return res;
    },

    randomColor() {
        const hexCode = "0123456789ABCDEF";
        let color = "#";
        for (let index = 0; index < 6; index++) {
            color += hexCode[Math.floor(Math.random() * 16)]
        }
        return color;
    }
}