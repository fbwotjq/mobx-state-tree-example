import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';

import { onSnapshot,  getSnapshot } from 'mobx-state-tree'

import { WishList } from "./models/WishList"
import { Group } from "./models/Group"

let initialState = {
    users: {
        "111": {
            id: "111",
            name: "1112",
            gender: "m"
        },
        "222": {
            id: "222",
            name: "2222",
            gender: "m"
        },
        "333": {
            id: "333",
            name: "3332",
            gender: "f"
        },
        "444": {
            id: "444",
            name: "4442",
            gender: "m"
        },
        "555": {
            id: "555",
            name: "5552",
            gender: "f"
        },
        "666": {
            id: "666",
            name: "6662",
            gender: "m"
        },
        "777": {
            id: "777",
            name: "7772",
            gender: "m"
        },
    }
    /*
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
    */
}

//if(localStorage.getItem("wishlistapp")) {
    //initialState = JSON.parse(localStorage.getItem("wishlistapp"))
//}
//const wishList = WishList.create(initialState)
//console.log(wishList)
//onSnapshot(wishList, snapshot => {
//    localStorage.setItem("wishlistapp", JSON.stringify(snapshot))
//})

let group = (window.group = Group.create(initialState))

function renderApp() {
    ReactDOM.render(<App group={group}/>, document.getElementById('root'));
}
//ReactDOM.render(<App wishList={wishList}/>, document.getElementById('root'));

renderApp()

if(module.hot) {
    module.hot.accept(["./components/App"], () => {
        renderApp()
    })

    /*
    module.hot.accept(["./models/WishList"], () => {
        const snapshot = getSnapshot(wishList)
        wishList = WishList.create(snapshot)
        renderApp()
    })
    */
    
    module.hot.accept(["./models/Group"], () => {
        const snapshot = getSnapshot(group)
        group = Group.create(snapshot)
        renderApp()
    })

}
//setInterval(() => {
//    wishList.items[0].changePrice(wishList.items[0].price + 1)
//}, 1000)
