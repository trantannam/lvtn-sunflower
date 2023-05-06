const express = require('express');
const router = express.Router();

const StaffControllers = require('../app/controllers/StaffControllers');

router.get('/', StaffControllers.getList);
router.post('/signin', StaffControllers.sigin);
router.post('/create', StaffControllers.createStaff);
router.post('/update', StaffControllers.updateStaff);
router.post('/:id', StaffControllers.getDetailStaff);
router.delete('/:id', StaffControllers.deleteStaff);

module.exports = router;