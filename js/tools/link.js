function createLink(){
  var ele = document.getElementById("monkeyInline-link");
  ele.onclick = function(){
    openDialogBox(ele);
  };
}
