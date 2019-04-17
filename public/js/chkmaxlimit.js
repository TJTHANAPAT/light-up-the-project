//Limit checkbox
var max_limit = 4; // Max Limit
$(document).ready(function (){
  $(".chklimit:input:checkbox").each(function (index){
      this.checked = (".chklimit:input:checkbox" < max_limit);
  }).change(function (){
      if ($(".chklimit:input:checkbox:checked").length > max_limit){
          this.checked = false;
          alert('You must select only 4 choices.')
      }
  });
});
