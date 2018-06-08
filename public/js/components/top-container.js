"use strict";


const topContainer = {
    bindings: {
        newItem: "<",
        addItem: "&"
    },
    template: `
    <div class="top_section">
        <form class="add_form" ng-submit="$ctrl.addItem({newItem: $ctrl.newItem})">
            <input type="text" placeholder="Product" ng-model="$ctrl.newItem.product">
            <input type="number" placeholder="Price" ng-model="$ctrl.newItem.price">
            <input type="number" placeholder="Quantity" ng-model="$ctrl.newItem.quantity">
            <button class="button">Add</button>
        </form>
        <h2>Shopping List</h1>
        <p>Add, Edit or Remove</p>
    </div>
    `
}


angular.module("CartApp").component("topContainer", topContainer);