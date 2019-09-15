import gatewayModel from '../models/gateway';

const GatewayController = {};

//Get all gateways
GatewayController.getAll = async (req, res) => {
    try {
        await gatewayModel.find().exec((err, gws) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json(gws);
        });
    }
    catch (err) {
        res.send(err);
    }
}

//Get a gateway
GatewayController.getGateway = async (req, res) => {
    try {
        gatewayModel.findOne({ _id: req.params.id }).exec((err, gw) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json(gw);
        });
    }
    catch (err) {
        res.send(err);
    }
}

//Add gateway
GatewayController.addGateway = async (req, res) => {
    let result ={} ;
    
    try {
        if (!req.body.humanName || !req.body.ip) {
            return res.status(403).end();
        }

        gatewayModel.find({ip: req.body.ip}, function (err, docs) {
            if (err) {
                result = {
                    result : false,
                    text:   "Some error with the database"
                }
                return res.json(result);
            }
            
            if (Object.keys(docs).length > 0) {
                result = {
                    result : false,
                    text:   "This ip exists"
                }
                return res.json(result);
            }

            let newGateway = new gatewayModel(req.body);
            console.log(newGateway);
            

            newGateway.save(function (err, gw) {
                if (err) {
                    result = {
                        result : false,
                        text:   "Some error with the request"
                    }
                    return res.json(result);
                }

                result = {
                    result : true,
                    text:   "Gateway added"
                }
                return res.json(result);
            });
        });


       
    }
    catch (err) {
        console.log(err);
    }
}

//Update a gateway
GatewayController.updateGateway = async (req, res) => {
    try {
        if (!req.body.gw.humanName || !req.body.gw.ip) {
            res.status(403).end();
        }
        gatewayModel.findOne({ _id: req.params.id }).exec((err, gw) => {
            // Handle database errors
            if (err) {
                res.status(500).send(err);
            } else {
                gw.humanName = req.body.gw.humanName || gw.humanName;
                gw.ip = req.body.gw.ip || gw.ip;
                console.log('Gateway about to be saved');
                // Save 
                gw.save((err, saved) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.json({ gw });
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

//Remove a device
GatewayController.deleteGateway = async (req, res) => {
    try {
        gatewayModel.findByIdAndRemove({ _id: req.params.id }, function(err,gw){
            if (err) {
                res.status(500).send(err);
            }

            return res.status(200).end();
        });
    }
    catch (err) {
        console.log(err);
    }
}

export default GatewayController;