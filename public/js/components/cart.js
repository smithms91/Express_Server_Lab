"use strict";

const cart = {
    template: `
    <div id="container">
        <top-container add-item="$ctrl.addItem(newItem)" new-item="$ctrl.newItem"></top-container>
        <div class="section_container">
            <section ng-repeat="item in $ctrl.cartList">
                <div class="item_box">
                    <h1 class="header_text">{{ item.product }}</h1>
                    <p><strong>Name:</strong> {{ item.product }}</p>
                    <p><strong>Price:</strong> {{ item.price }}</p>
                    <p><strong>Quantity:</strong> {{ item.quantity }}
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
        //Get
        CartService.getAllItems().then((response) => {
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
            vm.newItem = {};    
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