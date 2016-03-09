var tools = [
  {
    "name" : "monkeyInline-bold",
    "function_name" : bold,
    "content" : "<i class='fa fa-bold'></i>",
    "description" : "Highlight text you wish to make bold"
  },
  {
    "name" : "monkeyInline-italic",
    "function_name" : italic,
    "content" : "<i class='fa fa-italic'></i>",
    "description" : "Highlight text you wish to make italic"
  },
  {
    "name" : "monkeyInline-underline",
    "function_name" : underline,
    "content" : "<i class='fa fa-underline'></i>",
    "description" : "Highlight text you wish to make underline"
  },
  {
    "name" : "monkeyInline-heading1",
    "function_name" : heading1,
    "content" : "<i class='fa fa-header'></i>1",
    "description" : "Highlight text you wish to make a heading 1"
  },
  {
    "name" : "monkeyInline-heading2",
    "function_name" : heading2,
    "content" : "<i class='fa fa-header'></i>2",
    "description" : "Highlight text you wish to make a heading 2"
  },
  {
    "name" : "monkeyInline-heading3",
    "function_name" : heading3,
    "content" : "<i class='fa fa-header'></i>3",
    "description" : "Highlight text you wish to make a heading 3"
  },
  {
    "name" : "monkeyInline-link",
    "function_name" : createLink,
    "content" : "<i class='fa fa-link'></i>",
    "description" : "Insert link",
    "dialog_box" : {
      "function_name" : dialogLinkContent,
      "title" : "Insert link",
      "message" : "Insert the link below to insert it",
      "width" : "250px",
      "height" : "200px"
    }
  },
  {
    "name" : "monkeyInline-image",
    "function_name" : insertImage,
    "content" : "<i class='fa fa-image'></i>",
    "description" : "Insert Image",
    "dialog_box" : {
      "function_name" : dialogImageContent,
      "title" : "Insert Image",
      "message" : "Insert an image link below to add it into the body.",
      "width" : "300px",
      "height" : "360px"
    }
  },
  {
    "name" : "monkeyInline-clearFormatting",
    "function_name" : clearFormatting,
    "content" : "<i class='fa fa-eraser'></i>",
    "description" : "Clear formatting"
  },
];
