#**Monkey in line.**
###A simple inline editor designed to be flexible for use in your own projects!

##Try it out yourself [here](http://csmets.github.io/Monkey-Inline/)

##How to use
Grab the files from the `build` folder and insert it into your project.
Include the stylesheet into your header.

    <link rel="stylesheet" href="build/css/monkeyInlineStyle.css">

Optional: Include the font awesome library for the editor icons, you don't have to include this if you want to display your own icons instead.

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

Also include the js file, but like your mother tells you place it at the bottom of your `<body>` tag.

    <script src="build/monkeyInline.min.js"></script>

Lastly, add in the following script to your page.

    <script>
        var Monkey = new MonkeyInline();
        Monkey.run();
    </script>

Now, onto making editable regions!
Set your desired tag with the class `monkey-inline` and your done. However, not all tags are compatible with editable content silly. So make sure you choose a good one, like good old trusty `<div></div>`.

Example usage:

    <div class="monkey-inline">
      <h1>Editable Text</h1>
      <p>Hello, some basic text here</p>
    </div>

#Creating your own tool
Firstly, fork the github project or download it. Make sure you have [Grunt](http://gruntjs.com) installed and working (If you haven't used Grunt before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide). Now you're ready to begin!

Open up the `js` folder. This is where the magic happens!

##Initialize your new tool

Locate and open up `tools.js`. To init your new tool the code setup is shown below:
###Tool without dialog box
    {
      "name" : "New-Tool",
      "function_name" : NewTool,
      "content" : "Icon",
      "description" : "New Tool description."
    },
##Tool with dialog box
    {
      "name" : "New-Tool",
      "function_name" : NewTool,
      "content" : "Icon",
      "description" : "New Tool description.",
      "dialog_box" : {
        "function_name" : NewToolDialogBox,
        "title" : "New Tool",
        "message" : "Dialog box text",
        "width" : "250px",
        "height" : "200px"
      }
    },
`name` - Element identifier.

`function_name` - Function name to execute on load.

`content` - Icon or text to display on the button.

`description` - Tool tip text on roll over.

`dialog_box` - Monkey Inline recognises that tool wants to have a dialog box.

`title` - Dialog box title.

`message` - Text content to display in dialog box.

`width` - Dialog box width

`height` - Dialog box height

##Add functionality to your tool
Open up the `tools` folder and create a new `.js` file. You can name the file whatever you like, but best practice to keep it the same as your tool.

Create a new function using the same name as used in the init. `"function_name" : NewTool,`

    function NewTool(){
      var ele = document.getElementById("New-Tool");
      ele.onclick = function(){
        //Insert your action here.
      };
    }

Above is all you need to get started on a new tool without a dialog box.

###Tool with dialog box
    function NewTool(){
      var ele = document.getElementById("New-Tool");
      ele.onclick = function(){
        openDialogBox(ele);
      };

      dialogButtonSubmit(ele, function(){
        //Grab your values to then insert it into your editable region.
        var html = document.getElementById("new-tool-input").value;
        insertHTMLToEditor(html);
      });

      dialogButtonClose(ele, function(){
        //Do a close event.
      });
    }

    function NewToolDialogBox(){
      var ele = document.getElementById("New-Tool");
      dialogContent(ele, function(){

        //Build your content here. Must return a node type!

        var content = document.createElement("div");
        var text = document.createElement("input");
        text.type = "text";
        text.id = "new-tool-input";
        content.appendChild(text);
        return content;
      });
    }

#Contributing
Monkey Inline is open source. Feel free to fork and contribute.

If an issue is found, don't be shy. Let's try to fix it!

#License
Author: Clyde Smets

Monkey Inline is under the GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
