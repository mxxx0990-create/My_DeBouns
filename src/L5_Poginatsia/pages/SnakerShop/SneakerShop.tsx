import { useEffect, useState } from "react";
import { SNEAKERS } from "../../data";
import Pagination from "./components/Pagination";
import SneakerCard from "./components/SneakerCard";
import useDebounce from "../../../L1/debouns";
import FilterBar from "./components/FilterBar";
import CartDrawer from "./components/CartDrawer";
import useCaert from "./components/MuCartState";
import FavoritCart from "./components/FavoriteCart";
import type { Props } from "../../lib/types/snakeshop.type";
import { sorgterFunc } from "../../lib/utils";



export interface ISneaker {
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


type SelectBar = "All" | "Nike" | "Adidas" | "Jordan" | "New Balance"




function SneakerShop<T>() {

    const [produc, setProduct] = useState<ISneaker[]>(SNEAKERS)
    const [search, setSearch] = useState<string>("")
    // Filtred
    const [selectedBrand, setSelectedBrand] = useState<SelectBar>("All")
    // Пагинаться
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 6
    const lastIndex = currentPage * itemsPerPage
    const firstIndex = lastIndex - itemsPerPage
    // Сартировка
    const [sortOrder, setSortOrder] = useState<string>("")


    // debouns
    const timer = useDebounce(search, 300)

    // Вес Филтратьсия
    const filtred = produc.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(timer.toLowerCase());

        // филтратьсяи методи нав ай руи брендуш
        const matchesBrand = selectedBrand === 'All' || item.brand === selectedBrand

        return matchesBrand && matchesSearch 
    })

    const sorted = sorgterFunc(filtred, selectedBrand)


    // Пагинаться
    const totalPages = Math.ceil(filtred.length / itemsPerPage)
    const allItem = sorted.slice(firstIndex, lastIndex)

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1)
        }
    }, [filtred.length, totalPages])

    //  Все функсионаллы тип CRUD
    const { cart, isCartOpen, favorite, isFavorit, addCart,
        dellCart, totalSumCart, totalQtyCart, openCart,
        openFavorite, addFavorite } = useCaert()



    return (
        <>

            {/* Cart */}
            <div>
                <h2>Корзина 🛒</h2>
                <p>Товаров: {totalQtyCart}</p>
                <p>Общая сумма: $<b>{totalSumCart}</b></p>
                <button onClick={openCart}>{isCartOpen ? 'Close Cart' : 'Open Cart'}</button>
                <button onClick={openFavorite}>Favorite</button>
            </div>

            {/* Search */}
            <div>
                <input
                    type="search"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }} />
            </div>

            {/* Filtred */}
            <FilterBar
                title={selectedBrand}
                onPut={(cheng) => { setSelectedBrand(cheng as SelectBar); setCurrentPage(1) }} />

            {/* Selector */}
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value={"All"}>All</option>
                <option value={"expensive"}>Expensive</option>
                <option value={"cheap"}>Cheap</option>
            </select>

            {/* Мапит карда Бровардан */}
            <div>
                {
                    allItem.map(item => (
                        <SneakerCard key={item.id} item={item} onAdd={addCart} onFavorite={addFavorite} isFav={favorite.some(f => f.id === item.id)} />
                    ))
                }
            </div>

            {/* Пагинатстя */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)} />

            {/* Карзина */}
            <CartDrawer
                isOpen={isCartOpen}
                items={cart}
                totalSum={totalSumCart}
                totalQty={totalQtyCart}
                onClose={openCart}
                onAdd={addCart}
                onDell={dellCart} />

            {/* Favorite */}
            {isFavorit && <FavoritCart items={favorite} />}





        </>
    )
}

export default SneakerShop