unit
====

## unit - a responsive css grid framework
## version 0.9 — almost ready

### Why Unit? Unit has been created in response to a collision of:

1. Responsive layouts.
2. SMACSS (see www.smacss.com)
3. Drupal 7

The heart of Unit is the decoupling of padding and width, combined with responsive breakpoints.

A grid layout may comprise a set of Columns and Blocks (of content or functionality) which are placed into the columns.  Unit wraps a set of Columns in a .units class, gives each Column a class to set it’s width to a number of units, and gives each Block a .u-inner class that sets the gutter between classes.

This example has two columns, the first has class .u-8 to set it to 8 units wide, and the second has .u-4 setting it to 4 units wide.  Each block inside a column has class .u-inner.

	<div class="units">
		<div class="u-8">
			<div class="u-inner"> Block Module A </div>
			<div class="u-inner"> Block Of Content </div>
		</div>
		<div class="u-4">
			<div class="u-inner"> Block Module B </div>
			<div class="u-inner"> Block Module C </div>
		</div>
	</div>

#### Nesting
Columns may be nested: e.g.

	<div class="units">
		<div class="u-9">
			<div class="u-inner"> Block of stuff </div>
			<div class="u-6">
				<div class="u-inner"> Block of stuff </div>
				<div class="u-2"></div>
				<div class="u-4"></div>
			</div>
			<div class="u-3"></div>
		</div>
		<div class="u-3"></div>
	</div>

#### Fractions
In the examples above the grid units use pixels described as grid, but they may also use percentages fractions.  For example, a column that is one third wide would be given the class .u-1-3 and a column two thirds wide would have .u-2-3.  The format is 'u' - 'fraction numerator' - 'fraction denominator'.

Sixteenths, Twelfths, Eighths, Sixths, Fifths, Fourths, Thirds and Halves are ready for use.

#### Breakpoints

Unit contributes useful naming conventions for responsive design.  The easily remembered format is to take the desired unit class, add a double dash --, and then the breakpoints at which the class should operate.  For example:
.u-5--480-700 would set the width to 5 units wide when the media queries return a minimum of 480px and a maximum of 700px.
.u-2-3--700-1000 would set the width to two thirds when the media queries return a minimum of 700px and a maximum of 1000px.

The minimum and maximum widths are easily inferred, but for breakpoints which only set a minimum or a maximum width then 'min' or 'max' should be used. e.g.
.u-2-5--min1000
.u-3-5--max320

Breakpoints may be combined: e.g.

	<div class="units">
		<div class="u-2-2 u-1-4--481-900 u-1-3--480">
			<div class="u-inner"> some content </div>
		</div>
		<div class="u-2-2 u-3-4--481-900 u-2-3--480">
			<div class="u-inner"> some content </div>
		</div>
	</div>

.u-auto-- & breakpoint can be used to set to full width at the required breakpoint. This might well be used on a narrow screen to give its content full width. e.g. .u-auto--max480

The convention of using the double dash -- to extend a class with a breakpoint is ideal for use elsewhere, with SMACSS style module classes.


### What’s so wrong with coupling?

CSS grid systems frequently (invariably?) define a class for a 'grid column' or 'grid unit' that defines (for the element the class is applied to) both the column width, and (using either padding or margin) the gutter between columns.

Coupling width and padding to a single dom element makes life harder:

1. It makes nesting grid units trickier.  Nesting often requires a '.row' class to undo the effects of the padding.  This can be particularly tricky if backend code that is dynamically generating mark-up is thus required to figure out if it needs to insert a .row type class.
2. It can make fluid width CSS trickier, requiring approaches such as css box-sizing (http://caniuse.com/#search=box-sizing).
3. Can get funky when aligning modules with display: inline-block

Defenders of coupled solutions might be tempted to criticise Unit for adding an extra div (or other element) with the .u-inner class in order to add gutter spacing between columns. In practice however (not least within Drupal) the items (often Modules to use SMACSS terminology) placed within columns almost always contain at least one Div (or appropriate HTML 5 element) to wrap their contents with module classes.  One may simply add .u-inner to the existing classes on this wrapping Div, and need not add a any extra mark-up.  Within in Drupal 7 there is one possible exception to this, a very stripped down theme might not wrap a Node’s content, so should this be the case then you may have to suffer a single extra div in order to use Unit.

### How to use this Github project
1. open generator/generator.html within a browser
2. copy and paste the CSS

or

* copy the .less file

### To Do
* test this Read Me for comprehensibility
* improve documentation

#### css
* add inline block css
* fold in max/width
* fold in percentages
	* <strike>add eighths</strike>
* <strike>add</strike> finish Less output

#### javascript
* ui for column width & gutters - catch fields on reload
* ui for adding breakpoints
* add sliding panels
* show mockup of panel widths
* remove .v-
* hide or make font micro-styles optional

#### questions
* rename .u-inner to .u-module ?
* move font micro-styles into another project?

### Compatibility
Unit has been road tested and is being developed with Drupal sites, however please don’t hesitate to evaluate Unit for a non-Drupal based solution.

IE6 and IE7 do not support media queries — likewise Unit is not intended to provide a fluid responsive layout within them.  Unit is however intended to support IE6 & IE7 with a fixed width design.

### Notes
Unit is nearly at v1.0 — experiments with width & max-width, and experiments with percentages still need to folded into the code.

See more about experiments with percentages at: https://github.com/paulhhowells/percentage-width-sub-pixel-rounding-error-test-page

Read more about SMACSS at http://www.smacss.com

