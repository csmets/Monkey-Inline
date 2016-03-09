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
