# iTimeHelper

*iTimeHelper* is a JavaScript class which will assist the user to complet time 
field with colon or other char defined by the developers.


## Summary

[](MakeSummary)



## Get Started

*iTimeHelper* fields are automatically converted in valide HTML5 input of type ``text``.
They are converted on ``document.readyState complete`` when script is used.

The *iTimeHelper* engine convert all inputs with type : ``iTime`` :

````html
<input type="iTime" />
````

If you need to convert dynamically generated inputs, simply execute the following
instruction :

````js
new iTimeHelper().compile();
````



## iTimeHelper configuration options


### Define time separator : ``data-clock-sep``



### Enable / Disable separator autocompletion : ``data-sep-auto``



### HTML Pattern automatically generated : ``data-pattern-auto``



### Flush field on context menu : ``data-octm-flush``



### Field input autocorrection : ``data-never-wrong``
