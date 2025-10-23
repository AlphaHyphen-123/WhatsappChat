import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",      // ✅ collection name as string
      required: true
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",   // ✅ collection name as string
      default: []
    }
  ]
}, { timestamps: true });

const conversationModel = mongoose.model("Conversation", conversationSchema);

export default conversationModel;
