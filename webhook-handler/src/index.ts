import express from "express";
import { verifyWebhook } from "@clerk/express/webhooks";

const app = express();
const PORT = 3000;

app.post(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  async (req: any, res: any) => {
    try {
      const evt = await verifyWebhook(req);
      const { id } = evt.data;
      const eventType = evt.type;

      console.log(`Received webhook ID: ${id}, Type: ${eventType}`);
      console.log("Payload:", evt.data);

      res.send("Webhook received");
    } catch (err) {
      console.error("Error verifying webhook:", err);
      res.status(400).send("Invalid webhook");
    }
  },
);

app.listen(PORT, () => {
  console.log(`Webhook handler listening on port ${PORT}`);
});
