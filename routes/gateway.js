import { Router } from 'express';
import GatewayController from '../controllers/gateway';

const router = new Router();

// Get all Gateways
router.get('/gateway', (req, res) => {
    GatewayController.getAll(req, res);
});

// Get one Gateway by cuid
router.get('/gateway/:id', (req, res) =>{
    GatewayController.getGateway(req,res);
});

// Add a new Gateway
router.post('/gateway', (req, res) => {
    GatewayController.addGateway(req, res);
});

// Update a Gateway by id
router.put('/gateway/:id', (req, res) => {
    GatewayController.updateGateway(req, res);
});

// Delete a Gateway by id
router.delete('/gateway/:id', (req, res) => {
    GatewayController.deleteGateway(req, res);
});
export default router;