/* import model memo */
const memo_model = require('../models/memo_model.js');

var memos = {
  /* function to show all data memo */
  showAllMemo : function(req, res, next){
    memo_model.find({}, function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  },
  /* function to show one data memo */
  findOneMemo : function(req, res, next){
    memo_model.find({ _id: req.params.memoID }, function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  },
  /* function to edit one data memo */
  editOneMemo : function(req, res, next){
    res.json("edit one memo")
  },
  /* function to delete one data memo */
  deleteOneMemo : function(req, res, next){
    res.json("delete one memo");
  },
  /* function to search data memo */
  searchMemo : function(req, res, next){
    res.json("search memo");
  },
  /* function to create new data memo */
  createNewMemo : function(req, res, next){
    // create a new memo
    var createMemo = memo_model({
      title: "hallo world 2",
      memo_text: "hallo world text 2"
    });
    // save memo to database
    createMemo.save(function(err, data) {
      if (err) throw err;
      console.log('Memo created!');
      res.json(data);
    });

  }
}

module.exports = memos;
