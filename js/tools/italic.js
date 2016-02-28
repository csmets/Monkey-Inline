function italic(){
  var ele = document.getElementById("monkeyInline-italic");
  ele.onclick = function(){
    document.execCommand('italic');
  };

  var isItalic = document.queryCommandState("italic");
  if (isItalic === true){
    highlightButton(ele);
  }else{
    unHightlightButton(ele);
  }
}
