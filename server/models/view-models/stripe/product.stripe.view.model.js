
const mapper = require("../../../helpers/mapper");
class ProductStripeListViewModel {
    constructor(raw) {
        this.url = null;
        this.data = null;
    
        if(!raw) return;
        mapper.mapSimpleProperties(raw, this);
        this.data = mapper.mapToArray(ProductStripeDataViewModel, raw.data);
    }
}

class ProductStripeDataViewModel {
    constructor(raw) {
        this.id = null;
        this.object = null;
        this.name = null;
        this.type = null;
        this.deleted = null;

        if(!raw) return;
        mapper.mapSimpleProperties(raw, this);
    }
}

module.exports = {
    ProductStripeListViewModel,
    ProductStripeDataViewModel
}

// {
//     "object": "list",
//     "url": "/v1/products",
//     "has_more": false,
//     "data": [
//       {
//         "id": "prod_E9W7gma3D70RNN",
//         "object": "product",
//         "active": true,
//         "attributes": [
      
//         ],
//         "caption": null,
//         "created": 1544780145,
//         "deactivate_on": [
      
//         ],
//         "description": null,
//         "images": [
      
//         ],
//         "livemode": false,
//         "metadata": {
//         },
//         "name": "Bronze Extended",
//         "package_dimensions": null,
//         "shippable": null,
//         "statement_descriptor": null,
//         "type": "service",
//         "unit_label": null,
//         "updated": 1544780145,
//         "url": null
//       },
//     ]
//   }