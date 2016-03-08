function createLink(){
  var ele = document.getElementById("monkeyInline-link");

  ele.onclick = function(){
    openDialogBox(ele);
  };

  dialogButtonSubmit(ele, function(){
    var link = document.getElementById("monkey-inline-insert-link-input").value;
    var name = document.getElementById("monkey-inline-insert-link-name-input").value;
    var target = document.getElementById("monkeyInline-link-target").value;
    var makeLink = "<a href='"+link+"' target='"+target+"'>"+name+"</a>";
    insertHTMLToEditor(makeLink);
  });

  dialogButtonClose(ele);
}

function dialogLinkContent(){
  var ele = document.getElementById("monkeyInline-link");
  dialogContent(ele, function(){
    var content = document.createElement("div");

    var targetLabel = document.createElement("label");
    var targetLabelText = document.createTextNode("Target:");
    targetLabel.appendChild(targetLabelText);
    var target = document.createElement("select");
    var targetOption1 = document.createElement("option");
    targetOption1.value = "_blank";
    targetOption1.innerHTML = "_blank";
    target.appendChild(targetOption1);
    var targetOption2 = document.createElement("option");
    targetOption2.value = "_self";
    targetOption2.innerHTML = "_self";
    target.appendChild(targetOption2);
    var targetOption3 = document.createElement("option");
    targetOption3.value = "_parent";
    targetOption3.innerHTML = "_parent";
    target.appendChild(targetOption3);
    var targetOption4 = document.createElement("option");
    targetOption4.value = "_top";
    targetOption4.innerHTML = "_top";
    target.appendChild(targetOption4);
    target.id = "monkeyInline-link-target";

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

    content.appendChild(targetLabel);
    content.appendChild(target);
    content.appendChild(nameLabel);
    content.appendChild(name);
    content.appendChild(linkLabel);
    content.appendChild(link);
    return content;
  });

}
