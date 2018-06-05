"use strict";

const express = require("express");
const cartRouter = express.Router();

let idCount = 6;

let cartList = [
    {name: "Salad", price: 5, quantity: 3, id: 0},
    {name: "Fruit", price: 35, quantity: 7, id: 1},
    {name: "Kale", price: 18, quantity: 9, id: 2},
    {name: "Steak", price: 12, quantity: 4, id: 3},
    {name: "Milk", price: 9, quantity: 14, id: 4},
    {name: "Eggs", price: 45, quantity: 6, id: 5}
];

cartRouter.get("/cart", (req, res) => {
    res.send(cartList);
});

cartRouter.delete("/cart/:id", (req, res) => {
    for (let item of cartList) {
        if (item.id == req.params.id) {
            cartList.splice(cartList.indexOf(item), 1);
        }
    }
    res.send(cartList);
});

cartRouter.post("/cart", (req, res) => {
    cartList.push({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        id: idCount++
    });
    res.send(cartList);
});

cartRouter.put("/cart/:id", (req, res) => {
    for (let item of cartList) {
        if (item.id == req.params.id) {
            cartList.splice(cartList.indexOf(item), 1, {
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity,
                id: item.id
            })
        }
    }
    res.send(cartList);
})

module.exports = cartRouter;