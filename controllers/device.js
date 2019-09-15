import deviceModel from '../models/device';

const DeviceController = {};

//Get all devices by gw_id
DeviceController.getAll = async (req, res) => {
    try {
        await deviceModel.find({gw_id: req.params.gw_id}).exec((err, devs) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json( devs );
        });
    }
    catch (err) {
        res.send(err);
    }
}

//Get a device
DeviceController.getDevice = async (req, res) => {
    try {
        deviceModel.findOne({ _id: req.params.id }).exec((err, dev) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json( dev );
        });
    }
    catch (err) {
        res.send(err);
    }
}

//Get all devices for a gateway
DeviceController.getDevices = async (req, res) => {
    try {
        deviceModel.findOne({ gw_id: req.params.gw_id }).exec((err, dev) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json( dev );
        });
    }
    catch (err) {
        res.send(err);
    }
}

//Add a device
DeviceController.addDevice = async (req, res) => {
    let result ={} ;

    try {
        if (!req.body.UID ||
            !req.body.vendor ||
            !req.body.date ||
            !req.body.gw_id) 
        {
            result = {
                result : false,
                text:   "Some error with the request"
            }
            return res.json(result);
        }

        //Count devices
        deviceModel.countDocuments({ gw_id: req.body.gw_id }, function (err, count) {
            if (err) return res.json( false );

            //Check for more than 9 devices
            if (count > 9){
                result = {
                    result : false,
                    text:   "Error. There is 10 devices for this Gateway."
                }
                return res.json(result);
            }
            let newDevice = new deviceModel(req.body);

            //save the new device
            newDevice.save(function (err, dev) {
                if (err) {
                    result = {
                        result : false,
                        text:   "Some error on the database"
                    }
                    return res.json(result);
                }
                result = {
                    result : true,
                    text:   "Device saved."
                }
                return res.json(result);
            });
        });


    }
    catch (err) {
        console.log(err);
    }
}

//Update a device
DeviceController.updateDevice = async (req, res) => {
    try {
        if (!req.body.dev.vendor || !req.body.dev.date || !req.body.dev.status) {
            res.status(403).end();
        }
        deviceModel.findOne({ _id: req.params.id }).exec((err, dev) => {
            // Handle database errors
            if (err) {
                res.status(500).send(err);
            } else {
                dev.UID = req.body.dev.UID || dev.UID;
                dev.vendor = req.body.dev.vendor || dev.vendor;
                dev.date = req.body.dev.date || dev.date;
                dev.status = req.body.dev.status || dev.status;

                // Save 
                dev.save((err) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.json({ dev });
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

//Remove a device
DeviceController.deleteDevice = async (req, res) => {
    let result ={} ;
    try {
        deviceModel.findByIdAndRemove({ _id: req.params.id }, function (err, gw) {
            if (err) {
                result = {
                    result : false,
                    text:   "Some error on database."
                }
                return res.json(result);
            }

            result = {
                result : true,
                text:   "Device removed."
            }
            return res.json(result);
        });
    }
    catch (err) {
        console.log(err);
    }
}

export default DeviceController;