import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig,about,sex,bdate,country,city,timezone,educatuon,universities,occupation&${this.commonInfo}`
    }

    getGroupMembers(groupId) {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}`
    }

    getConversationMembers(peer_id){
        return `${this.url}/messages.getConversationMembers?peer_id=${peer_id}&fields=photo_400_orig,id,first_name,last_name&${this.commonInfo}`
    }
}

export const urls = new Urls()