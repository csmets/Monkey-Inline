function underline(){
  var ele = document.getElementById("monkeyInline-underline");
  ele.onclick = function(){
    document.execCommand('underline');
  };

  var isUnderline = document.queryCommandState("underline");
  if (isUnderline === true){
    highlightButton(ele);
  }else{
    unHightlightButton(ele);
  }
}
