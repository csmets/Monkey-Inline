
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
      showDialogButtonSubmit(element);
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
