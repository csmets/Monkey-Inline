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
