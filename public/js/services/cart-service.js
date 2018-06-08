"use strict";

function CartService($http) {
    let newProduct = {};

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
        return $http({
            method: "PUT",
            url: "/list/cart/" + item.id,
            data: item
        });
    };

    const sendData = (newItem) => {
        newProduct = newItem;
    }

    const getData = () => {
        console.log(newProduct);
        return newProduct;
    }

    return {
        getAllItems,
        removeItem,
        addItem,
        editItem,
        sendData,
        getData
    };
}

angular.module("CartApp").factory("CartService", CartService);