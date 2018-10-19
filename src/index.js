import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';

import { onSnapshot,  getSnapshot } from 'mobx-state-tree'

import { WishList } from "./models/WishList"

let initialState = {
    items: [
        {
            "name": "초급 개발자 jaco.ryu",
            "price" : 300,
            "image" : "https://upload.wikimedia.org/wikipedia/ko/thumb/8/87/Kakaofriends.png/300px-Kakaofriends.png"
        },
        {
            "name": "중급 개발자 jaco.ryu",
            "price" : 350,
            "image" : "https://upload.wikimedia.org/wikipedia/ko/thumb/8/87/Kakaofriends.png/300px-Kakaofriends.png"
        }
    ]
}

if(localStorage.getItem("wishlistapp")) {
    initialState = JSON.parse(localStorage.getItem("wishlistapp"))
}
const wishList = WishList.create(initialState)

//onSnapshot(wishList, snapshot => {
//    localStorage.setItem("wishlistapp", JSON.stringify(snapshot))
//})
function renderApp() {
    ReactDOM.render(<App wishList={wishList}/>, document.getElementById('root'));
}
//ReactDOM.render(<App wishList={wishList}/>, document.getElementById('root'));

renderApp()

if(module.hot) {
    module.hot.accept(["./components/App"], () => {
        renderApp()
    })

    module.hot.accept(["./models/WishList"], () => {
        const snapshot = getSnapshot(wishList)
        wishList = WishList.create(snapshot)
        renderApp()
    })

}
//setInterval(() => {
//    wishList.items[0].changePrice(wishList.items[0].price + 1)
//}, 1000)
