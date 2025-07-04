import cron from "node-cron";
import axios from "axios";

export const initScheduler = () => {
  // ⏰ Run at 12:20 AM Egypt time (which is 21:20 UTC)
  cron.schedule("37 21 * * *", async () => {
    console.log("⏰ [Scheduler] Running /vibes/getAllVibes");

    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}/vibes/getAllVibes?days=3`
      );
      console.log("✅ [Scheduler] Response:", response.status);
    } catch (error) {
      console.error("❌ [Scheduler] Error:");
    }
  });
};
