"use strict";

function HeaderController($state) {
	var ctrl = this;
}

angular.module('header')
	.component('header',{
		templateUrl: 'header/header.template.html',
		controller: ['$state', HeaderController]
	});