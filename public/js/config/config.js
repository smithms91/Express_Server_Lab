"use strict";

angular
  .module("CartApp")
  .config(($routeProvider) => {
    $routeProvider
      .when("/cart", {
        template: `
        <cart></cart>
        `
      })
      .otherwise({ redirectTo: "/cart"});
  });