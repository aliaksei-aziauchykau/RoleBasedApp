const request = require("request");
const logger = require("../../helpers/logger");
const configProvider = require("../../helpers/config.provider");
const executor = require("../../helpers/excecutor");
const ValueCheckerUtil = require("../../helpers/value.checker");

const deactivateAccount = (params, successFn, errorFn) => {

    const {
        client_id,          // client_Id = "ca_D5eeZa4K7p5LDsVOwppZRp7auJbo9Vsl"
        stripe_user_id,     // stripe_user_id = "acct_l702ZjSX2FC48h"
        client_secret       // client_secret = "sk_test_AgbMWGTpF5zDVIBRtEdSRrx9"
    } = params;

    const url = "https://connect.stripe.com/oauth/deauthorize";

    request.post({
        url,
        formData: {
            client_id,
            stripe_user_id
        },
        headers: { "Authorization": `Bearer ${client_secret}` },
    }, (error, data) => {

        responseHandler({
            error,
            data,
            errorFn,
            successFn,
            logger,
            funcName: deactivateAccount.name
        })
    });
}
const linkAccount = (params, successFn, errorFn) => {

    const {
        client_secret,      // client_secret = "sk_test_AgbMWGTpF5zDVIBRtEdSRrx9"
        code                // token = "acct_l702ZjSX2FC48h"
    } = params;

    const url = "https://connect.stripe.com/oauth/token";
    const grant_type = "authorization_code";

    request.post({
        url,
        formData: {
            client_secret,
            code,
            grant_type
        }
    }, (error, data) => {

        // access_token:"sk_test_rOGao1w0jE0QDy9U2dD9G0AW"
        // livemode:false
        // refresh_token:"rt_D7VtsoSRrM4jTqR3uK1UNiwJlFHB3Uiqpvt160D2iaUMwGUK"
        // scope:"read_write"
        // stripe_publishable_key:"pk_test_aeEqwbg3uAlgkTrABel8Ht12"
        // stripe_user_id:"acct_1CdMawAoMTdI8AoT"
        // token_type:"bearer"
        responseHandler({
            error,
            data,
            errorFn,
            successFn,
            logger,
            funcName: linkAccount.name
        })
    });
}

// Product.
const getAllProductsAsync = async (params) => {

    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        active,
        created,
        ending_before,
        ids,
        limit,
        shippable,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const products = await stripe.products.list(ValueCheckerUtil.ClearObject({
        active,
        created,
        ending_before,
        ids,
        limit,
        shippable,
    }));
    return products;
}
const getProductAsync = async (params) => {

    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        productStripeId,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const product = await stripe.products.retrieve(productStripeId);
    return product;
}
const createProductAsync = async (params) => {

    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        productName: name,
        type = "service",
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const product = await stripe.products.create(ValueCheckerUtil.ClearObject({
        name,
        type
    }));
    
    return product;
}
const updateProductAsync = async (params) => {

    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        productStripeId,
        productName: name,
        active,
        metadata,
        attributes,
        statement_descriptor,
        unit_label,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const product = await stripe.products.update(productStripeId, ValueCheckerUtil.ClearObject({
        name,
        metadata,
        active,
        attributes,
        statement_descriptor,
        unit_label,
    }));
    
    return product;
}
const deleteProductAsync = async (params) => {

    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        productStripeId,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const confirmation = await stripe.products.del(productStripeId);
    return confirmation;
}

// Plan.
const getAllPlansAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        active,
        created,
        limit,
        product
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const plans = await stripe.plans.list(ValueCheckerUtil.ClearObject({
        active,
        created,
        limit,
        product
    }));
    return plans;
}
const getPlanAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        planStripeId,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const plan = await stripe.plans.retrieve(planStripeId);
    return plan;
}
const createPlanAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        amount,
        planName: nickname,
        productId,
        interval = "month",
        currency = "usd",
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const plan = await stripe.plans.create(ValueCheckerUtil.ClearObject({
        amount,
        interval,
        currency,
        product: productId,
        nickname
    }));

    return plan;
}
const updatePlanAsync = async (params) => {

    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        planStripeId,
        active,
        metadata,
        planName: nickname,
        productStripeId: product
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const plan = await stripe.plans.update(planStripeId, ValueCheckerUtil.ClearObject({
        active,
        metadata,
        nickname,
        product
    }));
    
    return plan;
}
const deletePlanAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        planStripeId,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const confirmation = await stripe.plans.del(planStripeId);
    return confirmation;
}

// Subscription.
const getAllSubscriptionsAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        billing,
        created,
        customerStripeId: customer,
        ending_before,
        limit,
        planStripeId: plan,
        starting_after,
        status,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const subscriptions = await stripe.subscriptions.list(ValueCheckerUtil.ClearObject({
        billing,
        created,
        customer,
        ending_before,
        limit,
        plan,
        starting_after,
        status,
    }));
    return subscriptions;
}
const getSubscriptionAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        subscriptionStripeId,
        // Optional
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const subscription = await stripe.subscriptions.retrieve(subscriptionStripeId);
    return subscription;
}
const createSubscriptionAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        customerStripeId: customer,
        items,
    
        // Optinal
        accountStipeId: stripe_account,
        applicationFeePercent: application_fee_percent = 20,
        billing,
        billing_cycle_anchor,
        cancel_at_period_end,
        coupon,
        days_until_due,
        default_source,
        metadata,
        prorate,
        tax_percent,
        trial_end,
        trial_from_plan,
        trial_period_days,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const subscription = await stripe.subscriptions.create(ValueCheckerUtil.ClearObject({
            customer,
            items,
            
            // Optional
            application_fee_percent,
            billing,
            billing_cycle_anchor,
            cancel_at_period_end,
            coupon,
            days_until_due,
            default_source,
            metadata,
            prorate,
            tax_percent,
            trial_end,
            trial_from_plan,
            trial_period_days,
        }),
        ValueCheckerUtil.ClearObject({
            stripe_account
        }),
    );

    return subscription;
}
const updateSubscriptionAsync = async (params) => {

    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,

        // Required
        subscriptionStripeId,
        customerStripeId: customer,
    
        // Optinal
        application_fee_percent,
        billing,
        billing_cycle_anchor,
        cancel_at_period_end,
        coupon,
        days_until_due,
        default_source,
        items,
        metadata,
        prorate,
        proration_date,
        tax_percent,
        trial_end,
        trial_from_plan,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const subscription = await stripe.subscriptions.update(subscriptionStripeId, ValueCheckerUtil.ClearObject({
        // Required
        customer,

        // Optinal
        application_fee_percent,
        billing,
        billing_cycle_anchor,
        cancel_at_period_end,
        coupon,
        days_until_due,
        default_source,
        items,
        metadata,
        prorate,
        proration_date,
        tax_percent,
        trial_end,
        trial_from_plan,
    }));

    return subscription;
}
const deleteSubscriptionAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        subscriptionStripeId,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const confirmation = await stripe.subscriptions.del(subscriptionStripeId);
    return confirmation;
}


// Code Resources 
// Balance.
const getAllBalananceHistoryAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,

        // Optional.
        available_on,
        currency,
        ending_before,
        limit,
        payout,
        source,
        starting_after,
        type
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const transactions = await stripe.balance.listTransactions(ValueCheckerUtil.ClearObject({
        available_on,
        currency,
        ending_before,
        limit,
        payout,
        source,
        starting_after,
        type
    }));
    return transactions;
}
const getBalanceAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const balance = await stripe.balance.retrieve();
    return balance;
}
const getBalanceTransactionAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        balanceTransactionId
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const balanceTransaction = await stripe.balance.retrieveTransaction(balanceTransactionId);
    return balanceTransaction;
}

// Charge.
const getAllChargesAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,

        // Optional.
        created,
        customerStripeId: customer,
        ending_before,
        limit,
        source,
        starting_after,
        transfer_group,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const charges = await stripe.charges.list(ValueCheckerUtil.ClearObject({
        // Optional.
        created,
        customer,
        ending_before,
        limit,
        source,
        starting_after,
        transfer_group,
    }));
    return charges;
}
const getChargeAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        chargeStripeId,
        // Optional
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const charge = await stripe.charges.retrieve(chargeStripeId);
    return charge;
}
const createChargeAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,

        //Required
        amount,
        currency = "usd",
    
        // Optinal
        application_fee,
        capture,
        customerStripeId: customer,
        description,
        destination,
        metadata,
        on_behalf_of,
        receipt_email,
        shipping,
        source,
        statement_descriptor,
        transfer_group
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const charge = await stripe.charges.create(ValueCheckerUtil.ClearObject({
         //Required
        amount,
        currency,
    
        // Optinal
        application_fee,
        capture,
        customer,
        description,
        destination,
        metadata,
        on_behalf_of,
        receipt_email,
        shipping,
        source,
        statement_descriptor,
        transfer_group
        })
    );

    return charge;
}
const updateChargeAsync = async (params) => {

    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,

        // Required
        chargeStripeId,
    
        // Optinal
        customerStripeId: customer,
        description,
        fraud_details,
        metadata,
        receipt_email,
        shipping,
        transfer_group,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const charge = await stripe.charges.update(chargeStripeId, ValueCheckerUtil.ClearObject({
        // Optinal
        customer,
        description,
        fraud_details,
        metadata,
        receipt_email,
        shipping,
        transfer_group,
    }));

    return charge;
}
const captureChargeAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        // Required
        chargeStripeId,

        // Optional
        amount,
        application_fee,
        destination,
        receipt_email,
        statement_descriptor,
        transfer_group,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const charge = await stripe.charges.capture(chargeStripeId);
    return charge;
}

// Customer.
const getAllCustomersAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,

        // Optional.
        created,
        email,
        ending_before,
        limit,
        starting_after
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const customers = await stripe.customers.list(ValueCheckerUtil.ClearObject({
        // Optional.
        created,
        email,
        ending_before,
        limit,
        starting_after
    }));
    return customers;
}
const getCustomerAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        customerStripeId,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const customer = await stripe.customers.retrieve(customerStripeId);
    return customer;
}
const createCustomerAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
    
        // Optinal
        account_balance,
        coupon,
        default_source,
        description,
        email,
        invoice_prefix,
        metadata,
        shipping,
        source,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const customer = await stripe.customers.create(ValueCheckerUtil.ClearObject({
    
        // Optinal
        account_balance,
        coupon,
        default_source,
        description,
        email,
        invoice_prefix,
        metadata,
        shipping,
        source,
        })
    );

    return customer;
}
const updateCustomerAsync = async (params) => {

    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,

        // Required
        customerStripeId,
    
        // Optinal
        account_balance,
        coupon,
        default_source,
        description,
        email,
        invoice_prefix,
        metadata,
        shipping,
        source,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const customer = await stripe.customers.update(customerStripeId, ValueCheckerUtil.ClearObject({
         // Optinal
         account_balance,
         coupon,
         default_source,
         description,
         email,
         invoice_prefix,
         metadata,
         shipping,
         source,
    }));

    return customer;
}
const deleteCustomerAsync = async (params) => {
    const {
        stripeAccessToken = configProvider.config.stripePrivateKey,
        // Required
        customerStripeId,
    } = params;

    const stripe = require("stripe")(stripeAccessToken);
    const confirmation = await stripe.customers.del(customerStripeId);
    return confirmation;
}

module.exports = {
    deactivateAccount,
    linkAccount,

    // Product.
    getAllProductsAsync: executor.logDecorator(getAllProductsAsync, getAllProductsAsync.name),
    getProductAsync: executor.logDecorator(getProductAsync, getProductAsync.name),
    createProductAsync: executor.logDecorator(createProductAsync, createProductAsync.name),
    updateProductAsync: executor.logDecorator(updateProductAsync, updateProductAsync.name),
    deleteProductAsync: executor.logDecorator(deleteProductAsync, deleteProductAsync.name),

    // Plan.
    getAllPlansAsync: executor.logDecorator(getAllPlansAsync, getAllPlansAsync.name),
    getPlanAsync: executor.logDecorator(getPlanAsync, getPlanAsync.name),
    createPlanAsync: executor.logDecorator(createPlanAsync, createPlanAsync.name),
    updatePlanAsync: executor.logDecorator(updatePlanAsync, updatePlanAsync.name),
    deletePlanAsync: executor.logDecorator(deletePlanAsync, deletePlanAsync.name),

    // Subscription.
    getAllSubscriptionsAsync: executor.logDecorator(getAllSubscriptionsAsync, getAllSubscriptionsAsync.name),
    getSubscriptionAsync: executor.logDecorator(getSubscriptionAsync, getSubscriptionAsync.name),
    createSubscriptionAsync: executor.logDecorator(createSubscriptionAsync, createSubscriptionAsync.name),
    updateSubscriptionAsync: executor.logDecorator(updateSubscriptionAsync, updateSubscriptionAsync.name),
    deleteSubscriptionAsync: executor.logDecorator(deleteSubscriptionAsync, deleteSubscriptionAsync.name),
    
    // Code Resource.
    // Balance.
    getAllBalananceHistoryAsync: executor.logDecorator(getAllBalananceHistoryAsync, getAllBalananceHistoryAsync.name),
    getBalanceAsync: executor.logDecorator(getBalanceAsync, getBalanceAsync.name),
    getBalanceTransactionAsync: executor.logDecorator(getBalanceTransactionAsync, getBalanceTransactionAsync.name),

    // Charge.
    getAllChargesAsync: executor.logDecorator(getAllChargesAsync, getAllChargesAsync.name),
    getChargeAsync: executor.logDecorator(getChargeAsync, getChargeAsync.name),
    createChargeAsync: executor.logDecorator(createChargeAsync, createChargeAsync.name),
    updateChargeAsync: executor.logDecorator(updateChargeAsync, updateChargeAsync.name),
    captureChargeAsync: executor.logDecorator(captureChargeAsync, captureChargeAsync.name),

    // Customer.
    getAllCustomersAsync: executor.logDecorator(getAllCustomersAsync, getAllCustomersAsync.name),
    getCustomerAsync: executor.logDecorator(getCustomerAsync, getCustomerAsync.name),
    createCustomerAsync: executor.logDecorator(createCustomerAsync, createCustomerAsync.name),
    updateCustomerAsync: executor.logDecorator(updateCustomerAsync, updateCustomerAsync.name),
    deleteCustomerAsync: executor.logDecorator(deleteCustomerAsync, deleteCustomerAsync.name),
}