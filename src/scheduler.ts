import cron from "node-cron";
import axios from "axios";

export const initScheduler = () => {
  cron.schedule("0 11 * * *", async () => {
    console.log("⏰ [Scheduler] Running /events/loadEvents");

    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/events/loadEvents`
      );
      console.log("✅ [Scheduler] Response:", response.status);
    } catch (error) {
      console.error("❌ [Scheduler] Error:");
    }
  });
};
