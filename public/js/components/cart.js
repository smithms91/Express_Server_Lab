"use strict";

const cart = {
    template: `
    
    <div id="container">
    <div class="top_section">
        <form class="add_form" ng-submit="$ctrl.addItem($ctrl.newItem)">
            <input type="text" placeholder="Product" ng-model="$ctrl.newItem.product">
            <input type="number" placeholder="Price" ng-model="$ctrl.newItem.price">
            <input type="number" placeholder="Quantity" ng-model="$ctrl.newItem.quantity">
            <button class="button">Add</button>
        </form>
        <h2>Shopping List</h1>
        <p>Add, Edit or Remove</p>
    </div>
        <div class="section_container">
            <section ng-repeat="item in $ctrl.cartList">
                <div class="item_box">
                    <h1 class="header_text">{{ item.product }}</h1>
                    <p>Name: {{ item.product }}</p>
                    <p>Price: {{ item.price }}</p>
                    <p>Quantity: {{ item.quantity }}
                    <button class="increment_button" ng-click="$ctrl.incrementUp(item);">+</button>
                    <button class="increment_button" ng-click="$ctrl.incrementDown(item);">-</button>
                    </p>
                </div>
                <div class="buttons">
                    <button class="button" ng-click="$ctrl.editItem(item);">Edit</button>
                    <button class="button" ng-click="$ctrl.removeItem(item.id);">Delete</button>
                </div>
            </section>
            <form class="edit_form" ng-submit="$ctrl.editItem($ctrl.currentItem);" ng-show="$ctrl.show">
                <h1 class="edit_header">Edit Info</h1>
                <label>Product</label>
                <input class="edit_input" type="text" ng-model="$ctrl.currentItem.product">
                <label>Price</label>
                <input class="edit_input" type="number" ng-model="$ctrl.currentItem.price">
                <label>Quantity</label>
                <input class="edit_input" type="number" ng-model="$ctrl.currentItem.quantity">
                <button class="button">Submit</button>
                <p class="close" ng-click="$ctrl.close();">X</p>
            </form>
        </div>
    </div>
    `,
    controller: ["CartService", function(CartService) {
        const vm = this;
        vm.show = false;
        vm.currentItem;
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
            vm.currentItem = item;
            if (vm.show == true) {
                vm.show = false;
            } else {
                vm.show = true;
            }
            CartService.editItem(item).then((response) => {
                vm.editCart = response.data;
                
            })
        }

        vm.incrementUp = (item) => {
            item.quantity++;
            CartService.editItem(item).then((response) => {
                vm.editCart = response.data;
            })
        }

        vm.incrementDown = (item) => {
            item.quantity--;
            CartService.editItem(item).then((response) => {
                vm.editCart = response.data;
            })
        }

        vm.close = () => {
            vm.show = false;
        }
    }]
}

angular.module("CartApp").component("cart", cart);