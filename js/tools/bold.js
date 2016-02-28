function bold(){
  var ele = document.getElementById("monkeyInline-bold");
  ele.onclick = function(){
    document.execCommand('bold');
  };

  var isBold = document.queryCommandState("bold");
  if (isBold === true){
    highlightButton(ele);
  }else{
    unHightlightButton(ele);
  }
}
