import { Router } from 'express';
import DeviceController from '../controllers/device';

const router = new Router();

// Get all Devices
router.get('/devices/:gw_id', (req, res) => {
    DeviceController.getAll(req, res);
});

// Get one Device by cuid
router.get('/device/:id', (req, res) =>{
    DeviceController.getDevice(req,res);
});

// Add a new Device
router.post('/device', (req, res) => {
    DeviceController.addDevice(req, res);
});

// Update a Device by id
router.put('/device/:id', (req, res) => {
    DeviceController.updateDevice(req, res);
});

// Delete a Device by id
router.delete('/device/:id', (req, res) => {
    DeviceController.deleteDevice(req, res);
});
export default router;