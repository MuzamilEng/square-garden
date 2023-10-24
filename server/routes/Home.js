const express = require('express')
const router = express.Router();

const {
    getHomeContents,
    getHomeContentById,
    updateHomeContent,
    deleteHomeContent
} = require('../controllers/Home')

router.route('/').get(getHomeContents);
router.route('/:contentId').get(getHomeContentById).put(updateHomeContent).delete(deleteHomeContent)

module.exports = router