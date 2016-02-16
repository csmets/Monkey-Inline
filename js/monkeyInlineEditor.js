var MonkeyInline = function(){

  this.classname = "monkey-inline";
  this.maxEditors = 100;

  this.run = function run(){
    var editors = getClassElement(this.classname);
    for (var i = 0; i < editors.length; i++){
      editors[i].setAttribute("contentEditable","true");
    }
  };

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
