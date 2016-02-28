var MonkeyInline = function(){

  this.classname = "monkey-inline";
  var toolbarID = "monkeyContainer";

  this.run = function run(){
    var toolbarNode = generateToolbarHTML();
    document.body.appendChild(toolbarNode);

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