function createLink(){
  var ele = document.getElementById("monkeyInline-link");
  ele.onclick = function(){
    openDialogBox(ele);
  };

  dialogButtonSubmit(ele, function(event){
    if (event){
      alert("hello");
    }
  });
}
