var MonkeyInline = function(){

  this.classname = "monkey-inline";

  this.run = function run(){
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
    var monkeyClass = element.className;

  }

  function generateToolbarHTML(){
    
  }

};

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
