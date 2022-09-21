import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { items } = req.body;

  if (items.length <= 0) {
    return res.status(400).json({ error: "No items found" });
  }

  const successUrl = 
    `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  
  const cancelUrl = `${process.env.NEXT_URL}`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: items,
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
};

export default handler;
