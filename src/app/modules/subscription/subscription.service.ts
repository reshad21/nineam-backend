import Subscription from './subscription.model';

const createSubscriptionIntoDB = async (payload: any) => {
    // Create the review
    const result = await Subscription.create(payload);
    return result;
};

export const SubscriptionServices = {
    createSubscriptionIntoDB,
};
