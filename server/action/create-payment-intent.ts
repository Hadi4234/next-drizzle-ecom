'use server';
import Stripe from 'stripe';

import { createSafeActionClient } from 'next-safe-action';
import { paymentIntentSchema } from '@/types/payment-intent-schema';
import { auth } from '../auth';

const action = createSafeActionClient();
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export const createPaymentIntent = action(
  paymentIntentSchema,
  async ({ amount, currency, cart }) => {
    const user = await auth();
    if (!user) return { error: 'Please login to continue' };
    if (!amount) return { error: 'No product to checkout' };

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        cart: JSON.stringify(cart),
      },
    });
    return {
      success: {
        paymentIntentID: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        user: user.user.email,
      },
    };
  }
);
