"use strict";

function CartService($http) {
    
    const getAllItems = () => {
        return $http({
            method: "GET",
            url: "/list/cart"
        });
    };

    const removeItem = (id) => {
        return $http({
            method: "DELETE",
            url: "/list/cart/" + id
        });
    };

    const addItem = (newItem) => {
        return $http({
            method: "POST",
            url: "/list/cart",
            data: newItem
        });
    };

    const editItem = (item) => {
        console.log(item);
        return $http({
            method: "PUT",
            url: "/list/cart/" + item.id,
            data: item
        });
    };

    return {
        getAllItems,
        removeItem,
        addItem,
        editItem
    };
}

angular.module("CartApp").factory("CartService", CartService);