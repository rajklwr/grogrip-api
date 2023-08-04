const mongoose = require('mongoose');

const { Schema } = mongoose;

const contentsSchema = new Schema({
  TaskId: { type: Schema.Types.ObjectId, required: true },
  scriptAssignedTo: { type: String, required: false, default: "" },
  voiceOverAggignedTo: { type: String, required: false, default: "" },
  VideoAssignedTo: { type: String, required: false, default: "" },
  thumbnailAssignedTo: { type: String, required: false, default: "" },
  scriptAssignedName: { type: String, required: false, default: "" },
  voiceOverAggignedName: { type: String, required: false, default: "" },
  VideoAssignedName: { type: String, required: false, default: "" },
  thumbnailAssignedName: { type: String, required: false, default: "" },
  scriptPaid: { type: String, required: false, default: "" },
  voiceOverPaid: { type: String, required: false, default: "" },
  videoPaid: { type: String, required: false, default: "" },
  ThumbnailPaid: { type: String, required: false, default: "" },
  scriptUrl: { type: String, required: false, default: "" },
  voiceOverUrl: { type: String, required: false, default: "" },
  videoUrl: { type: String, required: false, default: "" },
  ThumbnailUrl: { type: String, required: false, default: "" },
  createdOn: { type: Date, default: Date.now },
  UpdatedOn: { type: Date, default: Date.now },
});

const Contents = mongoose.model('Contents', contentsSchema);

module.exports = Contents;
