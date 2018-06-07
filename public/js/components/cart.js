"use strict";

const cart = {
    template: `
    <form class="add_form" ng-submit="$ctrl.addItem($ctrl.newItem)">
        <input type="text" placeholder="Product" ng-model="$ctrl.newItem.product">
        <input type="number" placeholder="Price" ng-model="$ctrl.newItem.price">
        <input type="number" placeholder="Quantity" ng-model="$ctrl.newItem.quantity">
        <button>Add</button>
    </form>
    <div id="container">
        <h2>Shopping List</h1>
        <p>Edit or Remove</p>
        <section ng-repeat="item in $ctrl.cartList">
            <h1 class="header_text">{{ item.product }}</h1>
            <p class="list_info">Name: {{ item.product }} | Price: {{ item.price }} | Quantity: {{ item.quantity }}</p>
            <div class="buttons">
                <button class="button" ng-click="$ctrl.editItem(item);">Edit</button>
                <button class="button" ng-click="$ctrl.removeItem(item.id)";>Delete</button>
            </div>
            <form ng-show="$ctrl.show" ng-blur="vm.show = false;" class="edit_form">
                <input type="text" ng-model="$ctrl.editCart.product">
                <input type="text" ng-model="$ctrl.editCart.price">
                <input type="text" ng-model="$ctrl.editCart.quantity">
            </form>
        </section>
    </div>
    `,
    controller: ["CartService", function(CartService) {
        const vm = this;
        vm.show = false;
        //Get
        CartService.getAllItems().then((response) => {
            console.log(response);
            vm.cartList = response.data;
        });
        //Remove
        vm.removeItem = (id) => {
            CartService.removeItem(id).then((response) => {
                vm.cartList = response.data;
            });
        };
        //Add
        vm.addItem = (newItem) => {
            CartService.addItem(newItem).then((response) => {
                vm.cartList = response.data;
            });
        };
        //Edit
        vm.editItem = (item) => {
            if (vm.show == true) {
                vm.show = false;
            } else {
                vm.show = true;
            }
            CartService.editItem(item).then((response) => {
                vm.editCart = item;
            })
        }

    }]
}

angular.module("CartApp").component("cart", cart);