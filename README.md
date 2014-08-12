# Angular-For

Simple Angular directive to allow For-Loop style functionality.

This directive follows the same patterns as angular-repeat. Each iteration gets it's own scope with $index, $first, $last, $middle, and $even variables.

## Dependencies

Angular version 1.2.1 or later.  

Tested on Angular 1.2.21 and spot-checked all versions back to 1.2.1.

## Usage

1. Include angular-for.js or angular-for.min.js
2. Add ng-for as a dependency for your app
3. Use the ng-for directive with either an intiger or a scope variable (see examples).

## Examples

Using an intiger stored as a $scope variable.  

The example below will iterate a number of times equal to the value of $scope.loopCount. If $scope.loopCount is changed the loop will update itself automatically.

```html
<table width="100%" border="1">
	<tr data-ng-for="loopCount">
		<th>{{$index}} of {{loopCount}}:</th>
		<td>First: {{$first}}</td>
		<td>Last: {{$last}}</td>
		<td>Middle: {{$middle}}</td>
		<td>Even: {{$even}}</td>
	</tr>
</table>
```

Passing an intiger directly.  The example below will loop 5 times.

```html
<table width="100%" border="1">
	<tr data-ng-for="5">
		<th>{{$index}} of {{loopCount}}:</th>
		<td>First: {{$first}}</td>
		<td>Last: {{$last}}</td>
		<td>Middle: {{$middle}}</td>
		<td>Even: {{$even}}</td>
	</tr>
</table>
```