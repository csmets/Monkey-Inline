function heading1(){
  var ele = document.getElementById("monkeyInline-heading1");
  ele.onclick = function(){
    document.execCommand('formatBlock',false,'<h1>');
  };
}
function heading2(){
  var ele = document.getElementById("monkeyInline-heading2");
  ele.onclick = function(){
    document.execCommand('formatBlock',false,'<h2>');
  };
}
function heading3(){
  var ele = document.getElementById("monkeyInline-heading3");
  ele.onclick = function(){
    document.execCommand('formatBlock',false,'<h3>');
  };
}
