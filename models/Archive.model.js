const { Schema, model } = require('mongoose');

const archiveSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
});

archiveSchema.index({ user: 1, group: 1 }, { unique: true });

const Archive = model('Archive', archiveSchema);

module.exports = Archive;
