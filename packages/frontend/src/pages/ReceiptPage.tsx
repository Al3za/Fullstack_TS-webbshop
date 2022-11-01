import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/style.css'

export default function RecieptPage() {

  
  // REPLACE WITH DATA FROM DATABASE 
  let order: any = [
    {
      products: [
        {
          name: "Kiwi"
        },
        {
          name: "Kiwi"
        },
        {
          name: "Lemon"
        }
      ],
      shippingPrice: 25,
      totalPrice: 85,
      address: "Norwayroad 3",
      status: "Delivered"
    },
    {
      products: [
        {
          name: "Apple"
        },
        {
          name: "Melon"
        }
      ],
      shippingPrice: 25,
      totalPrice: 35,
      address: "Swedenroad 5",
      status: "Handling"
    }
  ]


  return (
    <>
    <div id="navBar">
      <Link to="/products">Product Page</Link>
      <Link to="/cart">Shopping Cart</Link> 
      <h1>Receipts</h1>
      <button>Log out</button>
    </div>


      {order ? (
      <>
        <div id="products">
          {order.map((item: any, index: number) => {
            const occurrences = item.products.reduce(function (acc: any, curr: any) {
              return acc[curr.name] ? ++acc[curr.name] : acc[curr.name] = 1, acc
            }, {})
            return (
            <div key={index} className="productDiv"> 
              <div className="productInfo">
                
              {
                Object.keys(occurrences).map((currKey) => {
                    return <div>{occurrences[currKey]}x {currKey}</div>
                })
              }

                <p>Shipping price: {item.shippingPrice}</p>
                <p>Total price: {item.totalPrice}</p>
                <p>Leveransaddress: {item.address}</p>
                <p>Status: {item.status}</p>
              </div>
            </div>
            )
          })}
        </div>
      </>
):(
        <div>Seems like you got no products added yet</div>
      )}
  </>
  )
}
