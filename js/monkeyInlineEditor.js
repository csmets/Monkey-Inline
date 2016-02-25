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
  }

  function positionToolbar(element, toolbar){
    var elementTop = element.offsetTop;
    var currentPosition = elementTop - document.documentElement.scrollTop;
    var offsetHeight = toolbar.offsetHeight;
    if (currentPosition >= 100){
      toolbar.style.display = "block";
      toolbar.style.top = currentPosition - offsetHeight;
    }else if (currentPosition < 100){
      toolbar.style.top = 0;
      toolbar.style.display = "block";
    }
  }

  function generateToolbarHTML(){
    var container = document.createElement("div");
    container.id = toolbarID;
    var list = document.createElement("ul");
    container.appendChild(list);
    var listRow1 = document.createElement("li");
    var boldBtn = create("<i class='fa fa-bold'></i>");
    list.appendChild(listRow1);
    listRow1.appendChild(boldBtn);
    var listRow2 = document.createElement("li");
    var italicBtn = create("<i class='fa fa-italic'></i>");
    list.appendChild(listRow2);
    listRow2.appendChild(italicBtn);
    return container;
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
