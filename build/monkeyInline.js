// Monkey Inline Editor 2016
// @Author Clyde Smets
// @Email clyde.smets@gmail.com

var InlineClassName = "monkey-inline";

var MonkeyInline = function(){

  var className = InlineClassName;
  var toolbarID = "monkeyContainer";

  this.run = function run(){
    var toolbarNode = generateToolbarHTML();
    document.body.appendChild(toolbarNode);
    generateDialogBoxes();
    createDocumentShadow();

    var editors = getClassElement(className);
    for (var i = 0; i < editors.length; i++){
      editors[i].setAttribute("contentEditable","true");
      monkeyHandler(editors[i]);
    }
  };

  function generateToolbarHTML(){
    var container = document.createElement("div");
    container.id = toolbarID;
    var list = document.createElement("ul");
    container.appendChild(list);
    for(var i = 0; i < tools.length; i++){
      var btnWrapper = document.createElement("a");
      btnWrapper.id = tools[i].name;
      btnWrapper.setAttribute("title",tools[i].description);
      btnWrapper.setAttribute("onmousedown","event.preventDefault();");
      var listRow = document.createElement("li");
      var btn = create(tools[i].content);
      list.appendChild(btnWrapper);
      btnWrapper.appendChild(listRow);
      listRow.appendChild(btn);
    }
    return container;
  }

  function generateDialogBoxes(){
    for(var i = 0; i < tools.length; i++){
      if (tools[i].dialog_box !== undefined){
        var dialogBox = document.createElement("div");
        var dialogBoxName = tools[i].name + "-dialog";
        dialogBox.id = dialogBoxName;
        dialogBox.className = "monkeyDialogBox";
        var message = tools[i].dialog_box.message;
        if (message !== undefined){
          var content = document.createTextNode(message);
          dialogBox.appendChild(content);
        }
        var dialogBoxHeader = document.createElement("div");
        dialogBoxHeader.className = "monkeyDialogHeader";
        var width = tools[i].dialog_box.width;
        if (width !== undefined){
          dialogBox.style.width = width;
        }
        var height = tools[i].dialog_box.height;
        if (height !== undefined){
          dialogBox.style.height = height;
        }
        var titleContainer = document.createElement("p");
        var title = document.createTextNode(tools[i].dialog_box.title);
        titleContainer.appendChild(title);
        dialogBoxHeader.appendChild(titleContainer);

        var buttonContainer = document.createElement('div');
        buttonContainer.className = "button-container";

        var button = document.createElement("button");
        button.id = tools[i].name + "-submit";
        var buttonLabel = document.createTextNode("Submit");
        button.appendChild(buttonLabel);

        var closeButton = document.createElement("button");
        closeButton.id = tools[i].name + "-close";
        var closeButtonLabel = document.createTextNode("Close");
        closeButton.appendChild(closeButtonLabel);

        dialogBox.appendChild(dialogBoxHeader);
        buttonContainer.appendChild(button);
        buttonContainer.appendChild(closeButton);
        dialogBox.appendChild(buttonContainer);
        document.body.appendChild(dialogBox);

        tools[i].dialog_box.function_name();
      }
    }
  }

  function monkeyHandler(element){
    element.onclick = function(e){
      if (element.getAttribute("data-toolbar") != "false"){
        monkeyToolbar(this);
      }
    };
  }

  function monkeyHideToolbar(){
    var toolbar = document.getElementById(InlineClassName);
    toolbar.style.display = "none";
  }

  function monkeyToolbar(element){
    var toolbar = document.getElementById(toolbarID);
    positionToolbar(element,toolbar);
    execTools();
  }

  function positionToolbar(element, toolbar){
    var elementPosition = element.getBoundingClientRect();
    var elementTop = elementPosition.top;
    var offsetHeight = toolbar.offsetHeight;
    var toolbarYPositionToView = elementTop - offsetHeight;
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    var toolbarYPositionToDoc = scrollPosition + toolbarYPositionToView;
    var elementLeft = elementPosition.left;
    var elementWidth = toolbar.style.left;
    var elementLeftDiference = elementLeft - elementWidth;
    var toolbarXPosition = elementLeft;
    if (elementLeftDiference > 0){
      toolbarXPosition  = elementLeft - elementLeftDiference;
    }

    if (elementTop > 0){
      toolbar.style.top = toolbarYPositionToDoc+"px";
      toolbar.style.left = toolbarXPosition+"px";
      toolbar.style.display = "block";
    }else if (elementTop < 0){
      var elementBottom = elementPosition.bottom;
      toolbarYPositionToView = elementBottom;
      toolbarYPositionToDoc = scrollPosition + toolbarYPositionToView;
      toolbar.style.top = toolbarYPositionToDoc+"px";
      toolbar.style.left = toolbarXPosition+"px";
      toolbar.style.display = "block";
    }
  }

  function execTools(){
    for(var i = 0; i < tools.length; i++){
      tools[i].function_name();
    }
  }

};

var tools = [
  {
    "name" : "monkeyInline-bold",
    "function_name" : bold,
    "content" : "<i class='fa fa-bold'></i>",
    "description" : "Highlight text you wish to make bold"
  },
  {
    "name" : "monkeyInline-italic",
    "function_name" : italic,
    "content" : "<i class='fa fa-italic'></i>",
    "description" : "Highlight text you wish to make italic"
  },
  {
    "name" : "monkeyInline-underline",
    "function_name" : underline,
    "content" : "<i class='fa fa-underline'></i>",
    "description" : "Highlight text you wish to make underline"
  },
  {
    "name" : "monkeyInline-heading1",
    "function_name" : heading1,
    "content" : "<i class='fa fa-header'></i>1",
    "description" : "Highlight text you wish to make a heading 1"
  },
  {
    "name" : "monkeyInline-heading2",
    "function_name" : heading2,
    "content" : "<i class='fa fa-header'></i>2",
    "description" : "Highlight text you wish to make a heading 2"
  },
  {
    "name" : "monkeyInline-heading3",
    "function_name" : heading3,
    "content" : "<i class='fa fa-header'></i>3",
    "description" : "Highlight text you wish to make a heading 3"
  },
  {
    "name" : "monkeyInline-link",
    "function_name" : createLink,
    "content" : "<i class='fa fa-link'></i>",
    "description" : "Insert link",
    "dialog_box" : {
      "function_name" : dialogLinkContent,
      "title" : "Insert link",
      "message" : "Insert the link below to insert it",
      "width" : "250px",
      "height" : "200px"
    }
  },
  {
    "name" : "monkeyInline-image",
    "function_name" : insertImage,
    "content" : "<i class='fa fa-image'></i>",
    "description" : "Insert Image",
    "dialog_box" : {
      "function_name" : dialogImageContent,
      "title" : "Insert Image",
      "message" : "Insert an image link below to add it into the body.",
      "width" : "300px",
      "height" : "360px"
    }
  },
  {
    "name" : "monkeyInline-clearFormatting",
    "function_name" : clearFormatting,
    "content" : "<i class='fa fa-eraser'></i>",
    "description" : "Clear formatting"
  },
];

function create(htmlStr) {
  var frag = document.createDocumentFragment(),
      temp = document.createElement('div');
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
  }
  return frag;
}

function getClassElement(findClass) {
  var elems = document.getElementsByTagName('*'), i;
  var classElems = [];
  var counter = 0;
  for (i in elems) {
      if((' ' + elems[i].className + ' ').indexOf(' ' + findClass + ' ') > -1) {
          classElems[counter] = elems[i];
          counter++;
      }
  }
  return classElems;
}

function highlightButton(element){
  var li = element.getElementsByTagName("li")[0];
  li.className = "used";
}

function unHightlightButton(element){
  var li = element.getElementsByTagName("li")[0];
  li.className = "";
}

function createDocumentShadow(){
  var documentShadow = document.createElement("div");
  documentShadow.id = "monkeyBackground";
  document.body.appendChild(documentShadow);
}

function openDialogBox(element){
  for(var i = 0; i < tools.length; i++){
    var name = tools[i].name;
    if (name == element.id){
      var dialogName = name+"-dialog";
      document.getElementById("monkeyBackground").style.display = "block";
      fadeIn(document.getElementById("monkeyBackground"));
      document.getElementById(dialogName).style.display = "block";
      fadeIn(document.getElementById(dialogName));
      showDialogButtonSubmit(element);
      showDialogButtonClose(element);
      pasteHtmlAtCaret("%MONKEY-INSERT-LOC%");
      break;
    }
  }
}

function showDialogButtonSubmit(element){
  var name = element.id + "-submit";
  document.getElementById(name).style.display = "block";
}

function dialogButtonSubmit(element, callback){
  var name = element.id + "-submit";
  var ele = document.getElementById(name);
  ele.onclick = function(){
    if (ele.style.display !== "none"){
      ele.style.display = "none";
      closeDocumentShadow();
      closeDialogBox(element);
      if (callback && typeof(callback) === "function"){
        callback();
      }
    }
  };
}

function showDialogButtonClose(element){
  var name = element.id + "-close";
  document.getElementById(name).style.display = "block";
}

function dialogButtonClose(element, callback){
  var name = element.id + "-close";
  var ele = document.getElementById(name);
  ele.onclick = function(){
    if (ele.style.display !== "none"){
      ele.style.display = "none";
      insertHTMLToEditor('');
      closeDocumentShadow();
      closeDialogBox(element);
      if (callback && typeof(callback) === "function"){
        callback();
      }
    }
  };
}

function closeDocumentShadow(){
  document.getElementById("monkeyBackground").style.display = "none";
}

function closeDialogBox(element){
  var name = element.id + "-dialog";
  document.getElementById(name).style.display = "none";
}

function dialogContent(element, callback){
  var name = element.id + "-dialog";
  var dialogElement = document.getElementById(name);
  var content;
  if (callback && typeof(callback) === "function"){
    content = callback();
  }
  if (content !== undefined){
    dialogElement.appendChild(content);
  }
}

function fadeIn(el) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

var selectedInlineClassElement = null;
var contentEditors = getClassElement(InlineClassName);
for (var i = 0; i < contentEditors.length; i++){
 RememberLastEditable(contentEditors[i]);
}

function RememberLastEditable(ele){
  ele.addEventListener("click", function(){
    selectedInlineClassElement = ele;
  });
}

function insertHTMLToEditor(html){
  var existingHTML = selectedInlineClassElement.innerHTML.trim();
  var newHTML = existingHTML.replace("%MONKEY-INSERT-LOC%",html);
  selectedInlineClassElement.innerHTML = newHTML;
}

function pasteHtmlAtCaret(html) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}

function removeTags(html){
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.innerText;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

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

function clearFormatting(){
  var ele = document.getElementById("monkeyInline-clearFormatting");
  ele.onclick = function(){
    document.execCommand('removeFormat');
    document.execCommand('formatBlock',false,'<p>');
  };
}

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

function insertImage(){
  var ele = document.getElementById("monkeyInline-image");

  ele.onclick = function(){
    openDialogBox(ele);
  };

  dialogButtonSubmit(ele, function(){
    var image = document.getElementById("monkey-inline-image-src").value;
    var alt = document.getElementById("monkey-inline-image-alt").value;
    var width = document.getElementById("monkeyInline-image-width").value;
    var height = document.getElementById("monkeyInline-image-height").value;
    var imageHTML = "<img src='"+image+"' alt='"+alt+"' width='"+width+"' height='"+height+"'/>";
    insertHTMLToEditor(imageHTML);
  });

  dialogButtonClose(ele);
}

function dialogImageContent(){
  var ele = document.getElementById("monkeyInline-image");
  dialogContent(ele, function(){
    var content = document.createElement("div");

    var imageSrcLabel = document.createElement("label");
    var imageSrcLabelText = document.createTextNode("Image Link");
    imageSrcLabel.appendChild(imageSrcLabelText);
    var imageSrc = document.createElement("input");
    imageSrc.type = "text";
    imageSrc.id = "monkey-inline-image-src";

    var imageAltLabel = document.createElement("label");
    var imageAltLabelText = document.createTextNode("Alt");
    imageAltLabel.appendChild(imageAltLabelText);
    var altInput = document.createElement("input");
    altInput.type = "text";
    altInput.id = "monkey-inline-image-alt";

    var widthLabel = document.createElement('label');
    var widthLabelText = document.createTextNode("Width");
    widthLabel.appendChild(widthLabelText);
    var width = document.createElement("input");
    width.type = "text";
    width.id = "monkeyInline-image-width";

    var heightLabel = document.createElement('label');
    var heightLabelText = document.createTextNode("Height");
    heightLabel.appendChild(heightLabelText);
    var height = document.createElement("input");
    height.type = "text";
    height.id = "monkeyInline-image-height";

    content.appendChild(imageSrcLabel);
    content.appendChild(imageSrc);
    content.appendChild(imageAltLabel);
    content.appendChild(altInput);
    content.appendChild(widthLabel);
    content.appendChild(width);
    content.appendChild(heightLabel);
    content.appendChild(height);

    return content;

  });
}

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
