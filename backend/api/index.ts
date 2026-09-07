import app from "../src/app.js";
import connectDB from "../src/config/database.js";

let isConnected = false;

const handler = async (req: any, res: any) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  };

  return app(req, res);
};

export default handler;