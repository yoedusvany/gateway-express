import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gatewaySchema = new Schema({
    humanName: { type: 'String', required: true },
    ip: { type: 'String', required: true },
});

let gatewayModel = mongoose.model('Gateway', gatewaySchema, 'gateway');

export default gatewayModel;