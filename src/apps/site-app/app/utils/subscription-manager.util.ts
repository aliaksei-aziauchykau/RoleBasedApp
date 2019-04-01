import { Subscription } from "rxjs";

export class SubscriptionManager {

    public static closeSubscription(subscription: Subscription) {
        if (subscription && !subscription.closed) {
            subscription.unsubscribe();
        }
    }

    public static closeSubscriptions(subscriptions: Subscription[]) {
        subscriptions.forEach(x => this.closeSubscription(x));
    }
}