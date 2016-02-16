function init_Peacock_InlineEditor(){
    this.classname = "Editable";
    this.maxEditors = 100;
    this.run = function run(){
        if ($("div").hasClass(this.classname) === true){
            $("."+this.classname).attr("contentEditable","true");
                $("."+this.classname).contents().prop('designMode','on');
        }
        for (i = 1; i < this.maxEditors; i++){
            if ($("div").hasClass(this.classname+"-"+i) === true){
                $("."+this.classname+"-"+i).attr("contentEditable","true");
                $("."+this.classname+"-"+i).contents().prop('designMode','on');
            }
        }
        buildInlineEditor();
        var hideToolbar = false;
        var headingsToolbar = false;
        var textLinkToolbar = false;
        var insertSubPageToolbar = false;
        var insertImageToolbar = false;

        var getClass = null;

        $("div").click(function(){
            if ($(this).attr("contentEditable") == "true" && $(this).attr("data-toolbar") != "false"){
                getClass = this.className;
                var eTop = $("."+getClass).offset().top;
                var CurrentPos = eTop - $(window).scrollTop();

                if (selectionIsBold() === true){
                    $(".bold").css("background-color","#f1c40f");
                }else{
                    $(".bold").css("background-color","#2c3e50");
                }

                if (selectionIsItalic() === true){
                    $(".italic").css("background-color","#f1c40f");
                }else{
                    $(".italic").css("background-color","#2c3e50");
                }

                if (selectionIsUnderline() === true){
                    $(".underline").css("background-color","#f1c40f");
                }else{
                    $(".underline").css("background-color","#2c3e50");
                }

                var offsetHeight = $(".toolbar").height() + 30;

                if (headingsToolbar === false && textLinkToolbar === false && insertSubPageToolbar === false && insertImageToolbar === false){
                    if (hideToolbar === false && CurrentPos > 100){
                        $(".toolbar").fadeIn(200);
                        $(".toolbar").insertBefore("."+getClass);
                        $(".toolbar").css({"-ms-transform": "translate(0px,-"+offsetHeight+"px)",
                                           "-webkit-transform": "translate(0px,-"+offsetHeight+"px)",
                                           "transform": "translate(0px,-"+offsetHeight+"px)"});
                    }
                    else if(hideToolbar === false && CurrentPos < 100){
                        $(".toolbar").fadeIn(200);
                        $(".toolbar").insertAfter("."+getClass);
                        $(".toolbar").css({"-ms-transform": "translate(0px,10px)",
                                           "-webkit-transform": "translate(0px,10px)",
                                           "transform": "translate(0px,10px)"});
                    }
                }else{
                    $(".toolbar").hide();
                }

                $("#headings").click(function(){
                    displayHeadingsToolbar(getClass, CurrentPos, offsetHeight);
                    hideToolbar = true;
                    headingsToolbar = true;
                    $(".toolbar").hide();
                });

                $("#textlink").click(function(){
                    displayCreateLink(getClass, CurrentPos, offsetHeight);
                    hideToolbar = true;
                    textLinkToolbar = true;
                    $(".toolbar").hide();
                });

                $("#insertSubPageLink").click(function(){
                    displayInsertSubPage(getClass, CurrentPos, offsetHeight);
                    hideToolbar = true;
                    insertSubPageToolbar = true;
                    $(".toolbar").hide();
                });

                $("#insertImage").click(function(){
                    displayInsertImageToolbar(getClass, CurrentPos, offsetHeight);
                    hideToolbar = true;
                    insertImageToolbar = true;
                    $(".toolbar").hide();
                });


            }else{
                hideToolbar = false;
            }

            if ($(this).attr("contentEditable") == "true" && $(this).attr("data-toolbar") == "false"){
                hideToolbar = true;
                $(".toolbar").fadeOut(200);
            }

            $("#closeMainToolbar").click(function(){
                hideToolbar = true;
                $(".toolbar").fadeOut(200);
            });

            $("#closeHeadingsToolbar").click(function(){
                $(".toolbar-headings").hide();
                hideToolbar = false;
                headingsToolbar = false;
                $(".toolbar").fadeIn(200);
            });

            $("#closeLinksToolbar").click(function(){
                $(".toolbar-makelink").hide();
                hideToolbar = false;
                textLinkToolbar = false;
                $(".toolbar").fadeIn(200);
            });

            $("#closeSubPageLinksToolbar").click(function(){
                $(".toolbar-subPageLink").hide();
                hideToolbar = false;
                insertSubPageToolbar = false;
                $(".toolbar").fadeIn(200);
            });

            $("#closeImageSelector").click(function(){
                $(".toolbar-insertImageSelector").hide();
                hideToolbar = false;
                $(".toolbar").fadeIn(200);
                insertImageToolbar = false;
            });

            $("#closeImageURL").click(function(){
                $(".toolbar-insertImageURL").hide();
                insertImageToolbar = false;
                hideToolbar = false;
                $(".toolbar").fadeIn(200);
            });

            $("#closeImageLibrary").click(function(){
                $(".toolbar-insertImageLibrary").hide();
                insertImageToolbar = false;
                hideToolbar = false;
                $(".toolbar").fadeIn(200);
            });
        });




        $("#editSource").click(function(){
            displaySourceCode(getClass);
        });

        $("#saveEditSource").click(function(){
            var htmlcode = $("#codeEditor").val();
            $("."+getClass).html(htmlcode);
            $(".codeEditor-bg").hide();
            $(".codeEditor-box").hide();
        });

        $("#cancelEditSource").click(function(){
            $(".codeEditor-bg").hide();
            $(".codeEditor-box").hide();
        });


        //Edit Image

        var imageHolder = null;

        $("img").click(function(){
            imageHolder = this;
            var eTop = $(this).offset().top;
            var CurrentPos = eTop - $(window).scrollTop();
            var offsetHeight = $(".toolbar-editImage").height()+10;
            if (CurrentPos > 100){
                $(".toolbar-editImage").fadeIn(200);
                $(".toolbar-editImage").insertBefore(imageHolder);
                $(".toolbar-editImage").css({"-ms-transform": "translate(0px,-"+offsetHeight+"px)",
    "-webkit-transform": "translate(0px,-"+offsetHeight+"px)",
    "transform": "translate(0px,-"+offsetHeight+"px)"});
            }
            else if(CurrentPos < 100){
                $(".toolbar-editImage").fadeIn(200);
                $(".toolbar-editImage").insertAfter(imageHolder);
                $(".toolbar-editImage").css({"-ms-transform": "translate(0px,10px)",
    "-webkit-transform": "translate(0px,10px)",
    "transform": "translate(0px,10px)"});
            }



            $("#closeEditImage").click(function(){
                $(".toolbar-editImage").fadeOut(200);
            });



        });

        $("#UpdateImage").click(function(){
                var getWidth = $("#editImageWidth").val();
                var getHeight = $("#editImageHeight").val();
                if (getWidth !== null){
                    $(imageHolder).css("width",getWidth);
                }
                if (getHeight !== null){
                    $(imageHolder).css("height",getHeight);
                }
                $(".toolbar-editImage").fadeOut(200);
            });

        $("#deleteImage").click(function(){
           $(imageHolder).remove();
            $(".toolbar-editImage").fadeOut(200);
        });

    };
    this.removeEditors = function removeEditors(){
        if ($("div").hasClass(this.classname) === true){
            $("."+this.classname).removeAttr("contentEditable");
        }
        for (i = 1; i < this.maxEditors; i++){
            if ($("div").hasClass(this.classname+"-"+i) === true){
                $("."+this.classname+"-"+i).removeAttr("contentEditable");
            }
        }
        $(".toolbar").remove();
        $(".toolbar-headings").remove();
        $(".toolbar-makelink").remove();
        $(".toolbar-subPageLink").remove();
        $(".toolbar-insertImage").remove();
        $(".toolbar-insertImageSelector").remove();
        $(".toolbar-insertImageURL").remove();
        $(".toolbar-insertImageLibrary").remove();
        $(".codeEditor-bg").remove();
        $(".codeEditor-box").remove();
        $(".toolbar-editImage").remove();
    };
}

function buildInlineEditor(){

    //Main Toolbar
    $("body").append('<div class="peacock-inline-editor-toolbar toolbar"><input type="button" class="peacock-inline-editor-btn bold" value="b" onclick="makeBold()"><input type="button" class="peacock-inline-editor-btn italic" value="I" onclick="makeItalic()"><input type="button" class="peacock-inline-editor-btn underline" value="u" onclick="makeUnderline()"><input type="button" class="peacock-inline-editor-btn" value="a" onclick="makeFontLarger()"><input type="button" class="peacock-inline-editor-btn peacock-inline-textSmaller" value="a" onclick="makeFontSmaller()"><span class="peacock-inline-editor-btn headings" id="headings">h</span><input type="button" class="peacock-inline-editor-btn" value="q" onclick="alignLeft()"><input type="button" class="peacock-inline-editor-btn" value="w" onclick="alignCenter()"><input type="button" class="peacock-inline-editor-btn" value="e" onclick="alignRight()"><input type="button" class="peacock-inline-editor-btn" value="j" onclick="justifyText()"><input type="button" class="peacock-inline-editor-btn" value="." onclick="makeIndent()"><input type="button" class="peacock-inline-editor-btn" value="m" onclick="makeQuote()"><span class="peacock-inline-editor-btn" id="textlink">l</span><input type="button" class="peacock-inline-editor-btn" value="L" onclick="unlinkText()"><span class="peacock-inline-editor-btn" id="insertImage">i</span><span class="peacock-inline-editor-btn" id="insertSubPageLink">D</span><input type="button" class="peacock-inline-editor-btn" value="ax" onclick="clearFormatting()"><span class="peacock-inline-editor-btn" id="editSource">/</span><span class="peacock-inline-editor-btn" id="closeMainToolbar">x</span></div>');

    //Headings toolbar
    $("body").append('<div class="peacock-inline-editor-toolbar toolbar-headings"><span class="peacock-inline-editor-btn" id="closeHeadingsToolbar">x</span><input type="button" class="peacock-inline-editor-btn heading1" value="h1" onclick="makeHeading1()"><input type="button" class="peacock-inline-editor-btn" value="h2" onclick="makeHeading2()"><input type="button" class="peacock-inline-editor-btn" value="h3" onclick="makeHeading3()"><input type="button" class="peacock-inline-editor-btn" value="h4" onclick="makeHeading4()"><input type="button" class="peacock-inline-editor-btn" value="h5" onclick="makeHeading5()"><input type="button" class="peacock-inline-editor-btn" value="h6" onclick="makeHeading6()"><input type="button" class="peacock-inline-editor-btn" value="hx" onclick="makeDefaultText()"></div>');

    //Create Link toolbar
    $("body").append('<div class="peacock-inline-editor-toolbar toolbar-makelink"><span class="peacock-inline-editor-btn" id="closeLinksToolbar">x</span><input type="text" class="peacock-inline-toolbar-text-entry" id="createLinkText" placeholder="insert link here"><input type="button" class="peacock-inline-editor-btn" value="+" onclick="makeTextLink()"></div>');

    //Create Image toolbar ==================================

    //Choose Between insert URL or choose uploaded image (image library)
    $("body").append('<div class="peacock-inline-editor-toolbar toolbar-insertImageSelector"><span class="peacock-inline-editor-btn" id="closeImageSelector">x</span><span class="peacock-inline-editor-btn-text" id="InsertImageURL">URL</span><span class="peacock-inline-editor-btn-text" id="InsertImageLibrary">Image Library</span></div>');

    $("body").append('<div class="peacock-inline-editor-toolbar toolbar-insertImageURL"><span class="peacock-inline-editor-btn" id="closeImageURL">x</span><input type="text" class="peacock-inline-toolbar-text-entry w200" id="imageLinkAddress" placeholder="insert image address here"><input type="text" class="peacock-inline-toolbar-text-entry w100" id="insertImageURLWidth" placeholder="Width">&nbsp;&nbsp;<input type="text" class="peacock-inline-toolbar-text-entry w100" id="insertImageURLHeight" placeholder="Height"><input type="button" class="peacock-inline-editor-btn" value="+" onclick="insertImageURL()"></div>');

    $("body").append('<div class="peacock-inline-editor-toolbar toolbar-insertImageLibrary"><span class="peacock-inline-editor-btn" id="closeImageLibrary">x</span><select class="inline-editor-dropdown imageFolders"></select><select class="inline-editor-dropdown images"></select><input type="text" class="peacock-inline-toolbar-text-entry w100" id="insertImageLibraryWidth" placeholder="Width">&nbsp;&nbsp;<input type="text" class="peacock-inline-toolbar-text-entry w100" id="insertImageLibraryHeight" placeholder="Height"><input type="button" class="peacock-inline-editor-btn" value="+" onclick="insertImage()"></div>');

    $.get("/peacock/inlineEditorImageFolders.php",function(data){
       $(".imageFolders").html(data);
    },"html");


    $.get("/peacock/inlineEditorImages.php",{folder : "Uncategorised"},function(data){
       $(".images").html(data);
    },"html");

    $(".imageFolders").change(function(){
        var folder = $(this).val();
        $.get("/peacock/inlineEditorImages.php",{folder : folder},function(data){
           $(".images").html(data);
        },"html");
    });

    //=========================================================

    //Create Sub Page Link toolbar
    $("body").append('<div class="peacock-inline-editor-toolbar toolbar-subPageLink"><span class="peacock-inline-editor-btn" id="closeSubPageLinksToolbar">x</span><select class="inline-editor-dropdown insertSubPageLink"><input type="button" class="peacock-inline-editor-btn" value="+" onclick="insertSubPageLink()"></div>');

    $.get("/peacock/inlineEditorSubPages.php",function(data){
       $(".insertSubPageLink").html(data);
    },"html");


    //Source Code Editor
    $("body").append('<div class="peacock-inline-code-editor-bg codeEditor-bg"></div><div class="peacock-inline-code-editor codeEditor-box"><textarea class="peacock-inline-code-textfield" id="codeEditor"></textarea><br><span class="peacock-inline-editor-source-btn" id="saveEditSource">Save</span> <span class="peacock-inline-editor-source-btn" id="cancelEditSource">Cancel</span></div>');


    //image editor
    $("body").append('<div class="peacock-inline-editor-toolbar toolbar-editImage"><span class="peacock-inline-editor-btn" id="closeEditImage">x</span><input type="text" class="peacock-inline-toolbar-text-entry w100" id="editImageWidth" placeholder="Width">&nbsp;&nbsp;<input type="text" class="peacock-inline-toolbar-text-entry w100" id="editImageHeight" placeholder="Height"><input type="button" class="peacock-inline-editor-btn" value="+" id="UpdateImage"><span class="peacock-inline-editor-btn" id="deleteImage">T</span></div>');
}


function displaySourceCode(classname){
    $(".codeEditor-bg").show();
    $(".codeEditor-box").show();
    var htmlcode = $("."+classname).html();
    $("#codeEditor").text(htmlcode);
}

function displayHeadingsToolbar(classname, position, offsetHeight){
    $(".toolbar-headings").show();
    if (position > 100){
        $(".toolbar-headings").insertBefore("."+classname);
        $(".toolbar-headings").css({"-ms-transform": "translate(0px,-"+offsetHeight+"px)",
   	"-webkit-transform": "translate(0px,-"+offsetHeight+"px)",
    "transform": "translate(0px,-"+offsetHeight+"px)"});
    }else{
        $(".toolbar-headings").insertAfter("."+classname);
    }
    $(".toolbar-"+classname).fadeOut(200);
}

function displayCreateLink(classname, position, offsetHeight){
    $(".toolbar-makelink").show();
    if (position > 100){
        $(".toolbar-makelink").insertBefore("."+classname);
        $(".toolbar-makelink").css({"-ms-transform": "translate(0px,-"+offsetHeight+"px)",
   	"-webkit-transform": "translate(0px,-"+offsetHeight+"px)",
    "transform": "translate(0px,-"+offsetHeight+"px)"});
    }else{
        $(".toolbar-makelink").insertAfter("."+classname);
    }
    $(".toolbar").fadeOut(200);
}

function displayInsertSubPage(classname, position, offsetHeight){
    $(".toolbar-subPageLink").show();
    if (position > 100){
        $(".toolbar-subPageLink").insertBefore("."+classname);
        $(".toolbar-subPageLink").css({"-ms-transform": "translate(0px,-"+offsetHeight+"px)",
   	"-webkit-transform": "translate(0px,-"+offsetHeight+"px)",
    "transform": "translate(0px,-"+offsetHeight+"px)"});
    }else{
        $(".toolbar-subPageLink").insertAfter("."+classname);
    }
    $(".toolbar").fadeOut(200);
}

function displayInsertImageToolbar(classname, position, offsetHeight){
    $(".toolbar-insertImageSelector").show();
    if (position > 100){
        $(".toolbar-insertImageSelector").insertBefore("."+classname);
        $(".toolbar-insertImageSelector").css({"-ms-transform": "translate(0px,-"+offsetHeight+"px)",
   	"-webkit-transform": "translate(0px,-"+offsetHeight+"px)",
    "transform": "translate(0px,-"+offsetHeight+"px)"});
    }else{
        $(".toolbar-insertImageSelector").insertAfter("."+classname);
    }
    $(".toolbar").fadeOut(200);

    $("#InsertImageURL").click(function(){
        displayInsertImageURL(classname,position,offsetHeight);
        $(".toolbar-insertImageSelector").fadeOut(200);
    });

    $("#InsertImageLibrary").click(function(){
        displayInsertImageLibrary(classname,position,offsetHeight);
        $(".toolbar-insertImageSelector").fadeOut(200);
    });
}

function displayInsertImageURL(classname,position,offsetHeight){
    $(".toolbar-insertImageURL").show();
    if (position > 100){
        $(".toolbar-insertImageURL").insertBefore("."+classname);
        $(".toolbar-insertImageURL").css({"-ms-transform": "translate(0px,-"+offsetHeight+"px)",
   	"-webkit-transform": "translate(0px,-"+offsetHeight+"px)",
    "transform": "translate(0px,-"+offsetHeight+"px)"});
    }else{
        $(".toolbar-insertImageURL").insertAfter("."+classname);
    }
}

function displayInsertImageLibrary(classname,position,offsetHeight){
    $(".toolbar-insertImageLibrary").show();
    if (position > 100){
        $(".toolbar-insertImageLibrary").insertBefore("."+classname);
        $(".toolbar-insertImageLibrary").css({"-ms-transform": "translate(0px,-"+offsetHeight+"px)",
   	"-webkit-transform": "translate(0px,-"+offsetHeight+"px)",
    "transform": "translate(0px,-"+offsetHeight+"px)"});
    }else{
        $(".toolbar-insertImageLibrary").insertAfter("."+classname);
    }
}

function selectionIsBold() {
    var isBold = false;
    if (document.queryCommandState) {
        isBold = document.queryCommandState("bold");
    }
    return isBold;
}

function makeBold(){
    document.execCommand('bold',false,null);
}

function selectionIsItalic() {
    var isItalic = false;
    if (document.queryCommandState) {
        isItalic = document.queryCommandState("italic");
    }
    return isItalic;
}

function makeItalic(){
    document.execCommand('italic',false,null);
}

function selectionIsUnderline() {
    var isUnderline = false;
    if (document.queryCommandState) {
        isUnderline = document.queryCommandState("underline");
    }
    return isUnderline;
}

function makeUnderline(){
    document.execCommand('underline',false,null);
}

function makeFontLarger(){
    var fontSize = document.queryCommandValue("FontSize");
    fontSize = parseInt(fontSize) + 1;
    document.execCommand('FontSize',false,fontSize);
}

function makeFontSmaller(){
    var fontSize = document.queryCommandValue("FontSize");
    fontSize = parseInt(fontSize) - 1;
    document.execCommand('FontSize',false,fontSize);
}

function makeHeading1(){
    document.execCommand('formatBlock',false,'<h1>');
}

function makeHeading2(){
    document.execCommand('formatBlock',false,'<h2>');
}

function makeHeading3(){
    document.execCommand('formatBlock',false,'<h3>');
}

function makeHeading4(){
    document.execCommand('formatBlock',false,'<h4>');
}

function makeHeading5(){
    document.execCommand('formatBlock',false,'<h5>');
}

function makeHeading6(){
    document.execCommand('formatBlock',false,'<h6>');
}

function alignRight(){
    document.execCommand('justifyRight',false,null);
}

function alignLeft(){
    document.execCommand('justifyLeft',false,null);
}

function alignCenter(){
    document.execCommand('justifyCenter',false,null);
}

function alignRight(){
    document.execCommand('justifyRight',false,null);
}

function justifyText(){
    document.execCommand('justifyFull',false,null);
}

function makeIndent(){
    document.execCommand('indent',false,null);
}

function makeQuote(){
    document.execCommand('formatBlock',false,'<blockquote>');
}

function clearFormatting(){
    document.execCommand('removeFormat',false,null);
}

function makeDefaultText(){
    document.execCommand('formatBlock',false,'<p>');
}

function unlinkText(){
    document.execCommand('unlink',false,null);
}

function makeTextLink(){
    var linkaddress = $("#createLinkText").val();
    document.execCommand('CreateLink',false,linkaddress);
}

function insertSubPageLink(){
    var linkaddress = $(".insertSubPageLink").val();
    document.execCommand('CreateLink',false,linkaddress);
}

function insertImageURL(){
    var imageAddress = $("#imageLinkAddress").val();
    if (imageAddress != null){
        var imageWidth = $("#insertImageURLWidth").val();
        var imageHeight = $("#insertImageURLHeight").val();
        var html = "<img src='"+imageAddress+"' width='"+imageWidth+"' height='"+imageHeight+"' />";
        pasteHtmlAtCaret(html);
    }
}

function insertImage(){
    var imageAddress = $(".images").val();
    if (imageAddress != null){
        var imageWidth = $("#insertImageLibraryWidth").val();
        var imageHeight = $("#insertImageLibraryHeight").val();
        var html = "<img src='"+imageAddress+"' width='"+imageWidth+"' height='"+imageHeight+"' />";
        pasteHtmlAtCaret(html);
    }
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
