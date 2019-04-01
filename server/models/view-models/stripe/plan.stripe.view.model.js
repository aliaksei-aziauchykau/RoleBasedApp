


const mapper = require("../../../helpers/mapper");
class PlanStripeListViewModel {
    constructor(raw) {
        this.data = null;
    
        if(!raw) return;
        mapper.mapSimpleProperties(raw, this);
        this.data = mapper.mapToArray(PlanStripeDataViewModel, raw.data);
    }
}

class PlanStripeDataViewModel {
    constructor(raw) {
        this.id = null;
        this.object = null;
        this.nickname = null;
        this.currency = null;
        this.interval = null;
        this.metadata = null;
        this.deleted = null;

        if(!raw) return;
        mapper.mapSimpleProperties(raw, this);

        this.metadata = mapper.mapToClass(PlanStripeMetadataViewModel, raw.metadata);
    }
}

class PlanStripeMetadataViewModel {
    constructor(raw) {
        if(!raw) return;
        mapper.mapSimpleProperties(raw, this);
    }
}

module.exports = {
    PlanStripeListViewModel,
    PlanStripeDataViewModel
}

// {
//     "object": "list",
//     "data": [
//         {
//             "id": "plan_EEq5kWIeADHaVJ",
//             "object": "plan",
//             "active": true,
//             "aggregate_usage": null,
//             "amount": 1000,
//             "billing_scheme": "per_unit",
//             "created": 1546007625,
//             "currency": "usd",
//             "interval": "month",
//             "interval_count": 1,
//             "livemode": false,
//             "metadata": {},
//             "nickname": "New Test Plan",
//             "product": "prod_E9ZMAZls49CCw1",
//             "tiers": null,
//             "tiers_mode": null,
//             "transform_usage": null,
//             "trial_period_days": null,
//             "usage_type": "licensed"
//         }
//     ]
// }