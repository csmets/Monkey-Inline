function clearFormatting(){
  var ele = document.getElementById("monkeyInline-clearFormatting");
  ele.onclick = function(){
    document.execCommand('removeFormat');
    document.execCommand('formatBlock',false,'<p>');
  };
}
