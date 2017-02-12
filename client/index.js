
$(document).ready(function(){
  // active modal in materialize
  $('#modal-edit').modal();
  $('#modal-delete').modal();

  // load all memo from server
  getAllMemoList()

  // overlapping input value in edit modal
  Materialize.updateTextFields();
});

/* function custome date */
function convertDate(date){
  let cd = new Date(date)
  return `${cd.getDate()} - ${cd.getMonth() + 1} - ${cd.getFullYear()}`
}

/* function to get all memo list from server */
function getAllMemoList(){
  $.ajax({
    url: "http://localhost:3000/api/memos",
    type: "GET",
    success: function( result ) {
      var tmp = "";
      for (var i = 0; i < result.length; i++) {
        tmp +=
        `<tr id="${result[i]._id}">
          <td>${result[i].title}</td>
          <td>${result[i].memo_text}</td>
          <td>${convertDate(result[i].createdAt)}</td>
          <td>${convertDate(result[i].updatedAt)}</td>
          <td>
            <div class="center">
              <a class="waves-effect amber darken-2 btn" href="#modal-edit" onclick="preEditMemo('${result[i]._id}')">EDIT</a>
              <a class="waves-effect red btn" href="#modal-delete" onclick="preDeleteMemo('${result[i]._id}')">DELETE</a>
            </div>
          </td>
        </tr>`
      }
      $('#memo-list').append(tmp)
    }
  });
}

/* function to reset input create memo */
function resetCreateInput(){
  $('#create_memo_title').val('')
  $('#create_memo_text').val('')
}


/* function to create memo */
function createMemo(){

  $.ajax({
    url: "http://localhost:3000/api/memos",
    type: "POST",
    data: {
      title : $('#create_memo_title').val(),
      memo_text: $('#create_memo_text').val()
    },
    success: function( result ) {
      $('#memo-list').prepend(`
        <tr id="${result._id}">
          <td>${result.title}</td>
          <td>${result.memo_text}</td>
          <td>${convertDate(result.createdAt)}</td>
          <td>${convertDate(result.updatedAt)}</td>
          <td>
            <div class="center">
              <a class="waves-effect amber darken-2 btn" href="#modal-edit" onclick="preEditMemo('${result._id}')">EDIT</a>
              <a class="waves-effect red btn" href="#modal-delete" onclick="preDeleteMemo('${result._id}')">DELETE</a>
            </div>
          </td>
        </tr>
      `)

      // clear input
      resetCreateInput()
    }
  });

}

/* function remove HTML inside modal edit */
function resetEdit(){
  $('#modal-edit-remove').remove()
}

/* function pre eidt memo */
function preEditMemo(id){
  resetEdit()

  let title = $(`#${id} td`)[0].innerHTML
  let desc = $(`#${id} td`)[1].innerHTML
  let tempPreEditeMemo =
  `
  <div id="modal-edit-remove">
    <div class="modal-content">
      <h4 class="center">EDIT MEMO</h4>
      <div class="input-field col s12">
        <input placeholder="Your Title Memo, Ex: Remember today" id="edit_memo_title" type="text" class="validate" value="${title}">
        <label class="active" for="memo_title">Memo Title</label>
      </div>
      <div class="input-field col s12">
        <input placeholder="Your Memo Description, Ex: Today i must pick up ......" id="edit_memo_text" type="text" class="validate" value="${desc}">
        <label class="active" for="memo_description">Memo Description</label>
      </div>
    </div>
    <div class="modal-footer">
      <a class=" modal-action modal-close waves-effect waves-green btn-flat" onclick="EditMemo('${id}')" >SAVE</a>
      <a class=" modal-action modal-close waves-effect waves-green btn-flat">CANCEL</a>
    </div>
  </div>
  `
  $('#modal-edit').append(tempPreEditeMemo)
}

/* function edit memo */
function EditMemo(id){

  $.ajax({
    url: "http://localhost:3000/api/memos",
    type: "PUT",
    data: {
      id: id,
      title: $('#edit_memo_title').val(),
      description: $('#edit_memo_text').val()
    },
    success: function( result ){
      $(`#${result._id} td`)[0].innerHTML = `${result.title}`
      $(`#${result._id} td`)[1].innerHTML = `${result.memo_text}`
      $(`#${result._id} td`)[2].innerHTML = `${convertDate(result.createdAt)}`
      $(`#${result._id} td`)[3].innerHTML = `${convertDate(result.updatedAt)}`
    }
  });

}

/* function remove HTML inside modal delete */
function resetDelete(){
  $('#modal-delete-remove').remove()
}

/* function pre delete memo*/
function preDeleteMemo(id){
  // reset first
  resetDelete()

  var name = $(`#${id} td`)[0].innerHTML
  let tempPreDeleteMemo =
  `
  <div id="modal-delete-remove">
    <div class="modal-content">
      <h4 class="center">ARE YOU SURE WANT TO DELETE THIS MEMO?</h4>
      <h4 class="center"><b>${name}</b></h4>
    </div>
    <div class="modal-footer">
      <a class=" modal-action modal-close waves-effect waves-green btn-flat" onclick="deleteMemo('${id}')" >YES</a>
      <a class=" modal-action modal-close waves-effect waves-green btn-flat" id="resetDeleteInput">NO</a>
    </div>
  </div>
  `
  $('#modal-delete').append(tempPreDeleteMemo)
}

/* function delete memo */
function deleteMemo(id){

  $.ajax({
    url: "http://localhost:3000/api/memos",
    type: "DELETE",
    data: {
      id: id
    },
    success: function( result ) {
      $(`#${result}`).remove()
    }
  });

}
