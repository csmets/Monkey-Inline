![MonkeyInline](http://clydesmets.com/Images/MonkeyInline.png)
#**Monkey in line.**
###A simple inline editor designed to be flexible to be used in your own projects!

##How to use
Grab the files from the `build` folder and insert it into your project.
Include the stylesheet into your header.

    <link rel="stylesheet" href="build/css/monkeyInlineStyle.css">

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
