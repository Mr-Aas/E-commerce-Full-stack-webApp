import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    realtime: {
      transport: WebSocket,
    },
  }
);

export default supabase;