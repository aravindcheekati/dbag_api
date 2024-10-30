import mongoose from "mongoose";

export const connectDB = async () => {
   try {
    await mongoose.connect(process.env.DATABASE_URL+"/"+process.env.WEBSITE_NAME)
    console.log("Database Connected")
   } catch (error) {
      throw new Error("Failed to conntect database.")
   }
}

export const disconnectDB = async () => {
   try {
      await mongoose.disconnect()
   } catch (error) {
      throw new Error("Failed to disconnect database.")
   }
}