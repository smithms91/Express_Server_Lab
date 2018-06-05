"use strict";

const cart = {
    template: `
    <div id="container">
        <section ng-repeat="item in $ctrl.cartList">
            <h1 class="header_text">{{ item.name }}</h1>
            <p class="list_info">Name: {{ item.name }} | Price: {{ item.price }} | Quantity: {{ item.quantity }}</p>
            <div class="buttons">
                <button class="button" ng-click="$ctrl.editItem(item);">Edit</button>
                <button class="button" ng-click="$ctrl.removeItem(item.id)";>Delete</button>
            </div>
            <form ng-show="$ctrl.show" class="edit_form">
                <input type="text" ng-model="item.name">
                <input type="text" ng-model="item.price">
                <input type="text" ng-model="item.quantity">
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
                vm.cartList = response.data;
            })
        }
    }]
}

angular.module("CartApp").component("cart", cart);