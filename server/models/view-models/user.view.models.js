
const mapper = require("../../helpers/mapper");
class UserInfoListViewModel {
    constructor(raw) {
        this.count = null;
        this.items = null;
    
        if(!raw) return;
        mapper.mapSimpleProperties(raw, this);
        this.items = mapper.mapToArray(UserInfoDataViewModel, raw.items);
    }
}

class UserInfoDataViewModel {
    constructor(raw) {
        this.id = null;
        this.nickName = null;
        this.email = null;

        if(!raw) return;
        mapper.mapSimpleProperties(raw, this);
    }
}

class UserInfoViewModel {
    constructor(data) {
        this.nickName = data && data.nickName || null;
        this.email = data && data.email || null;
    }
}

module.exports = {
    UserInfoListViewModel,
    UserInfoDataViewModel,
    UserInfoViewModel
}