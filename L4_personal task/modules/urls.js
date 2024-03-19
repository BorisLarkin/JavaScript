import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig,sex,bdate,country,city,occupation&${this.commonInfo}`
    }

    getConversationMembers(peerId) {
        return `${this.url}/messages.getConversationMembers?peer_id=${peerId}&fields=photo_400_orig&${this.commonInfo}`
    }
}

export const urls = new Urls()