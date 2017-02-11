var express = require('express');
var router = express.Router();
const memo_controller = require('../controllers/memo_controller');

/*
|-----------------------------------------
| Import function from memo_controller.js
|-----------------------------------------
| what function inside :
| 1. showAllMemo    : function to show all data memo
| 2. findOneMemo    : function to show one data memo
| 3. editOneMemo    : function to edit one data memo
| 4. deleteOneMemo  : function to delete one data memo
| 5. searchMemo     : function to search data memo
| 6. createNewMemo  : function to create new data memo
*/

router.get('/', memo_controller.showAllMemo);
router.post('/', memo_controller.createNewMemo),


module.exports = router;
