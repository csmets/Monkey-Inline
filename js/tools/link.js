function createLink(){
  var ele = document.getElementById("monkeyInline-link");

  ele.onclick = function(){
    openDialogBox(ele);
  };

  dialogButtonSubmit(ele, function(){
    var link = document.getElementById("monkey-inline-insert-link-input").value;
    var name = document.getElementById("monkey-inline-insert-link-name-input").value;
    var makeLink = "<a href='"+link+"'>"+name+"</a>";
    insertHTMLToEditor(makeLink);
  });

  dialogButtonClose(ele);
}

function dialogLinkContent(){
  var ele = document.getElementById("monkeyInline-link");
  dialogContent(ele, function(){
    var content = document.createElement("div");
    var nameLabel = document.createElement("label");
    var nameLabelTxt = document.createTextNode("Link Name:");
    nameLabel.appendChild(nameLabelTxt);
    var name = document.createElement("input");
    name.type = "text";
    name.id = "monkey-inline-insert-link-name-input";
    var linkLabel = document.createElement("label");
    var linkLabelTxt = document.createTextNode("Link:");
    linkLabel.appendChild(linkLabelTxt);
    var link = document.createElement("input");
    link.type = "text";
    link.id = "monkey-inline-insert-link-input";
    content.appendChild(nameLabel);
    content.appendChild(name);
    content.appendChild(linkLabel);
    content.appendChild(link);
    return content;
  });

}
