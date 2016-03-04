function createLink(){
  var ele = document.getElementById("monkeyInline-link");

  ele.onclick = function(){
    openDialogBox(ele);
  };

  dialogButtonSubmit(ele, function(){
    console.log('something happened');
  });
}

function dialogLinkContent(){
  var ele = document.getElementById("monkeyInline-link");
  dialogContent(ele, function(){
    var content = document.createElement("div");
    var link = document.createElement("input");
    link.type = "text";
    content.appendChild(link);
    return content;
  });

}
