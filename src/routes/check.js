const router = require('express').Router();
const { checkController } = require('../controllers');
const { validation } = require('../middleware/validation')
const { checkValidator } = require('../middleware/checkValidator')

router.post('/',validation(checkValidator.createCheck), checkController.createCheck);
router.get('/',validation(checkValidator.getChecks), checkController.getChecks);
router.get('/reports',validation(checkValidator.getCheckReportsByURL), checkController.getCheckReportsByURL);
router.delete('/:id', validation(checkValidator.deleteCheckById),checkController.deleteCheckById);
router.get('/tags/:tag',validation(checkValidator.getReportsByTag) ,checkController.getReportsByTag);

module.exports = router;
