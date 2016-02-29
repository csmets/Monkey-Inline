var MonkeyInline = function(){

  this.classname = "monkey-inline";
  var toolbarID = "monkeyContainer";

  this.run = function run(){
    var toolbarNode = generateToolbarHTML();
    document.body.appendChild(toolbarNode);
    generateDialogBoxes();
    createDocumentShadow();

    var editors = getClassElement(this.classname);
    for (var i = 0; i < editors.length; i++){
      editors[i].setAttribute("contentEditable","true");
      monkeyHandler(editors[i]);
    }
  };

  function monkeyHandler(element){
    element.onclick = function(e){
      if (element.getAttribute("data-toolbar") != "false"){
        monkeyToolbar(this);
      }
    };
  }

  function monkeyToolbar(element){
    var toolbar = document.getElementById(toolbarID);
    positionToolbar(element,toolbar);
    execTools();
  }

  function positionToolbar(element, toolbar){
    var elementTop = element.offsetTop;
    var currentPosition = elementTop - document.documentElement.scrollTop;
    var offsetHeight = toolbar.offsetHeight;
    var toolbarPosition = elementTop - offsetHeight;
    if (currentPosition >= 100){
      toolbar.style.top = toolbarPosition+"px";
      toolbar.style.display = "block";
    }else if (currentPosition < 100){
      toolbar.style.top = toolbarPosition+"px";
      toolbar.style.display = "block";
    }
  }

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

  function execTools(){
    for(var i = 0; i < tools.length; i++){
      tools[i].function_name();
    }
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

        var button = document.createElement("button");
        button.id = tools[i].name + "-submit";
        var buttonLabel = document.createTextNode("Submit");
        button.appendChild(buttonLabel);

        dialogBox.appendChild(dialogBoxHeader);
        dialogBox.appendChild(button);
        document.body.appendChild(dialogBox);
      }
    }
  }

};

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

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function highlightButton(element){
  var li = element.getElementsByTagName("li")[0];
  li.className = "used";
}
function unHightlightButton(element){
  var li = element.getElementsByTagName("li")[0];
  li.className = "";
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
      break;
    }
  }
}

function dialogButtonSubmit(element){
  if (element.style.display !== "none"){
    element.style.display = "none";
    closeDocumentShadow();
  }
}

function closeDocumentShadow(){
  document.getElementById("monkeyBackground").style.display = "none";
}
