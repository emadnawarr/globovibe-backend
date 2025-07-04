import cron from "node-cron";
import axios from "axios";

export const initScheduler = () => {
  // ⏰ Run at 12:20 AM Egypt time (which is 21:20 UTC)
  cron.schedule("0 7 * * *", async () => {
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
