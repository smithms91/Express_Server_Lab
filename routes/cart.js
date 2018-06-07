"use strict";

const express = require("express");
const cartRouter = express.Router();
const pg = require("pg");
const pool = require("../pg-connection-pool");

cartRouter.get("/cart", (req, res) => {
    pool.query("SELECT * FROM shoppingcart").then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    })
});

cartRouter.delete("/cart/:id", (req, res) => {
    pool.query("DELETE FROM shoppingcart WHERE id=$1::int", [req.params.id]).then(() => {
        pool.query("SELECT * FROM shoppingcart").then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        })
    })
});

cartRouter.post("/cart", (req, res) => {
    pool.query("INSERT INTO shoppingcart(product, price, quantity) VALUES($1::text, $2::text, $3::int)", [req.body.product, req.body.price, req.body.quantity]).then(() => {
        pool.query("SELECT * FROM shoppingcart").then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        })
    })
})

cartRouter.put("/cart/:id", (req, res) => {
    pool.query("UPDATE shoppingcart SET product=$1::text, price=$2::text, quantity=$3::int WHERE id=$4::int", [req.body.product, req.body.price, req.body.quantity, req.params.id]).then(() => {
        pool.query("SELECT * FROM shoppingcart").then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        })
    })
});


module.exports = cartRouter;