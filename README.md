# iTimeHelper

**iTimeHelper** is a JavaScript class which will assist the user to complet time 
field with colon or other char defined by the developers.


## Summary

[](MakeSummary)



## Get Started

**iTimeHelper** fields are automatically converted in valide HTML5 input of type ``text``.
They are converted on ``document.readyState complete`` when script is used.

The **iTimeHelper** engine convert all inputs with type : ``iTime`` :

````html
<input type="iTime" />
````

If you need to convert dynamically generated inputs, simply execute the following
instruction :

````js
new iTimeHelper().compile();
````



## iTimeHelper configuration options

The main goal of this custom field is to simplify input for the user and the job 
for the developer.


### Enable / Disable separator autocompletion : ``data-sep-auto``

The first and the main feature of the ``iTimeHelper`` engine is to auto complete the
time separator character. The most common char is a colon ``:`` like in ``hh:mm``.

As default, the autocompletion is enabled. The attribute ``data-sep-auto`` can be omit.
If you want to allowed the user to choose the field behavior, you can add it.
If the attribute value is ``true``, the field autocomplete the time separator char.
If the attribute value is ``false``,the user have to write it.
The default separator char is a colon ``:``.

Example :

````html
<input type="iTime" data-sep-auto="true"/>
````



### Define time separator : ``data-clock-sep``

If you need to use a specific separator char, you can custom it by using attribute
``data-clock-sep``. There is no constraints on the value. That can be any char of any lenght. The field has no lenght constraint too, but you can set attribute `maxlenght` to `5` char as it must be normally. If you do it, take care to use a separator of lenght of `1` else you will have no room for minutes value.

Example :

````html
<input type="iTime" data-clock-sep="H">
````



### HTML Pattern automatically generated : ``data-pattern-auto``

An input field is stand to use in a form. 
So, by default ``iTimeHelper`` generate the right HTML pattern to validate 
user input using the chosen char separator (or the default one).
You can disable the pattern generation with attribute ``data-pattern-auto`` to `false`.
If the value is ``true``, the pattern is generated.

At the end, these two following examples...

````html
<input type="iTime" data-clock-sep="H">

<input type="iTime" data-clock-sep="@">
````

will be generated/result as 

````html
<input type="text" data-clock-sep="H" pattern="^([0-1][0-9]|[2][0-3])[H][0-5][0-9]$" >

<input type="text" data-clock-sep="@" pattern="^([0-1][0-9]|[2][0-3])[@][0-5][0-9]$" >
````



### Flush field on context menu : ``data-octm-flush``

To enhance the field ergonomy, by default, the value can be flushed with a right click.
In HTML, the right click is an ``oncontextmenu`` event,
so you can no longer get the menu displayed by the browser.
You can disabled the feature with attribute ``data-octm-flush`` to `false`.
To enable it again, set the attribute value to `true`.



### Field input autocorrection : ``data-never-wrong``
