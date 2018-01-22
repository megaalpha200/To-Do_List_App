$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {ITEM_DESC: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var itemID = $(this).attr('id');
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + itemID,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
