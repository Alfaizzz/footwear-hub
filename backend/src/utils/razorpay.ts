import Razorpay from "razorpay";

export const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("❌ Razorpay keys are missing in .env");
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};
