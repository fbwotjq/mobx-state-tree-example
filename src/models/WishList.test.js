import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree"
import { WishList, WishListItem } from "./WishList"
import { reaction } from 'mobx'
it("can create a instance of a model", () => {
    const item = WishListItem.create({
        "name": "초급 개발자 jaco.ryu",
        "price" : 300
    })

    expect(item.price).toBe(300)
    expect(item.image).toBe("")
    item.changeName("류재섭")
    expect(item.name).toBe("류재섭")
})

it("can create a wishList", () => {
    const list = WishList.create({
        items: [
            {
                "name": "초급 개발자 jaco.ryu",
                "price" : 300
            }
        ]
    })

    expect(list.items.length).toBe(1)
    expect(list.items[0].price).toBe(300)
})

it("can add new items", () => {
    const list = WishList.create()
    const states = []
    onSnapshot(list, snapshot => {
        states.push(snapshot)
    })

    list.add(WishListItem.create({
        name: "fbwotjq",
        price: 10
    }))
    expect(list.items.length).toBe(1)
    expect(list.items[0].name).toBe('fbwotjq')
    list.items[0].changeName('류재섭')
    expect(list.items[0].name).toBe('류재섭')

    expect(getSnapshot(list)).toMatchSnapshot()
    expect(states).toMatchSnapshot()
})

it("can add new items - 2", () => {
    const list = WishList.create()
    const patches = []
    onPatch(list, snapshot => {
        patches.push(snapshot)
    })

    list.add(WishListItem.create({
        name: "fbwotjq",
        price: 10
    }))
    
    list.items[0].changeName('류재섭')
    
    expect(patches).toMatchSnapshot()
})

it("can calculate the total price of a wishlist", () => {
    const list = WishList.create({
        items: [
            {
                "name": "초급 개발자 jaco.ryu",
                "price" : 300,
                "image" : "https://upload.wikimedia.org/wikipedia/ko/thumb/8/87/Kakaofriends.png/300px-Kakaofriends.png"
            },
            {
                "name": "중급 개발자 jaco.ryu",
                "price" : 400,
                "image" : "https://i.ytimg.com/vi/Cm_qva8i8Q4/maxresdefault.jpg"
            }
        ]
    })

    expect(list.totalPrice).toBe(700)

    let changed = 0
    reaction(() => list.totalPrice, () => changed++)

    expect(changed).toBe(0)
    console.log(list.totalPrice)
    list.items[0].changeName("test")
    expect(changed).toBe(0)
    list.items[0].changePrice(11)
    expect(changed).toBe(1)
})