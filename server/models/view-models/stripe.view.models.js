
const mapper = require("../../helpers/mapper");
class StripeInfoListViewModel {
    constructor(raw) {
        this.count = null;
        this.items = null;
    
        if(!raw) return;
        mapper.mapSimpleProperties(raw, this);
        this.items = mapper.mapToArray(StripeInfoViewModel, raw.items);
    }
}

class StripeInfoViewModel {
    constructor(raw) {
        this.id = null;
        this.userid = null;
        this.stripeAccessToken = null;
        this.stripeUserId = null;

        if(!raw) return;
        mapper.mapSimpleProperties(raw, this);
    }
}

module.exports = {
    StripeInfoViewModel,
    StripeInfoListViewModel,
}