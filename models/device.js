import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    UID     : { type: 'Number', required: true },
    vendor  : { type: 'String', required: true },
    date    : { type: 'Date', required: true },
    status  : { type: 'Boolean', required: true },
    gw_id   : { type: 'String', required: true }
});

let deviceModel = mongoose.model('Device', deviceSchema, 'device');

export default deviceModel;