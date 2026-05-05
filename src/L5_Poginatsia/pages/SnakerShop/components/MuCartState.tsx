import { useState, useEffect } from "react";



interface ISneaker {
    id: number;
    title: string;
    brand: string;
    price: number;
    image: string;
    category: string;

}

export interface ICart extends ISneaker {
    qty: number
}




function useCaert() {

    const [cart, setCart] = useState<ICart[]>(srtLocal)
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
    const [isFavorit, setIsFavorit] = useState<boolean>(false)
    const [favorite, setFavorite] = useState<ISneaker[]>(getFavorit)
   


    // Cart into LocalStorage
    useEffect(() => {
        localStorage.setItem('Cart', JSON.stringify(cart))

    }, [cart])

    function srtLocal() {
        const saved = localStorage.getItem('Cart')
        return saved ? JSON.parse(saved) : []
    }

    // Favorite into LocalStorage
    useEffect(() => {
        localStorage.setItem('Set_Favo', JSON.stringify(favorite))
    }, [favorite])

    function getFavorit() {
        

        const saved = localStorage.getItem('Set_Favo')

        return saved ? JSON.parse(saved) : []
    }

    // Cart for Add
    const addCart = (pro: ISneaker) => {
        const isExist = cart.find(item => item.id === pro.id);

        if (isExist) {
            alert("Buy")
            setCart(cart.map(item =>
                item.id === pro.id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            ))
        } else {
            setCart([...cart, { ...pro, qty: 1 }])
            alert("Buy")
        }
    }

    // Cart for Delet
    const dellCart = (id: number) => {
        const isExist = cart.find(item => item.id === id)

        if (isExist) {
            if (isExist.qty > 1) {
                setCart(cart.map(item =>
                    item.id === id
                        ? { ...item, qty: item.qty - 1 }
                        : item
                ))
            } else {
                setCart(cart.filter(f => f.id !== id))
            }
        }
    }

    const totalSumCart = cart.reduce((aco, sum) => aco + (sum.price * sum.qty), 0)
    const totalQtyCart = cart.reduce((aco, sum) => aco + sum.qty, 0)

    // Открыт Карзину
    const openCart = () => {
        setIsCartOpen(prev => !prev)
    }

    // Открыт Favorite
    const openFavorite = () => {
        setIsFavorit(prev => !prev)
    }

    const addFavorite = (fav: ISneaker) => {
        const add = favorite.find(f => f.id === fav.id)

        if(add){
            setFavorite(favorite.filter(fil => fil.id !== fav.id))
        }
        else{
            setFavorite([...favorite, fav])
        }
    }

    
    

    return { cart, isCartOpen, favorite, isFavorit, addCart, dellCart, totalSumCart, totalQtyCart, openCart, openFavorite, addFavorite }
}

export default useCaert