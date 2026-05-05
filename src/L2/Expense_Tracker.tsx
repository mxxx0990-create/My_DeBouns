import React, { useState } from "react";
import useDebouns_L2 from "./debouns_L2";


interface Expense {
    id: number;
    title: string;
    amount: number;
    category: string;
}

interface CartItem extends Expense {
    qty: number
}

type Category = "All" | "Food" | "Transport" | "Entertainment"

function Tracker<T>() {

    const [buy, setBuy] = useState<string>("")
    const [mony, setMony] = useState<number>(0)
    const [category, setCategory] = useState<Category>("All")
    const [search, setSearch] = useState<string>("")
    const [filterStatus, setFilterStatus] = useState<string>("All")
    const [btn, setBtn] = useState<Expense[]>([])
    // для eddit
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>("")
    const [newPrice, setNewPrice] = useState<number>(0)
    const [curentId, setCurentId] = useState<number | null>(null)
    // Сart
    const [cart, setCart] = useState<CartItem[]>([])
    // Favorit
    const [favorites, setFavorites] = useState<Expense[]>([])



    // Category = "All" | "Food" | "Transport" | "Entertainment"
    const handleCategogy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value as Category)
    }

    // Хамаи данихои инпутора кати селекторо да стйти btn гирифтан
    // Для добавление всне нужние элементи в кнопке добавить чтобы при клике создалься Объект
    const handelBTN = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buy || String(buy).trim() === "") {
            alert("Enter your Expense!");
            return
        }
        if (!mony || String(mony).trim() === "") {
            alert("Enter your Sum! ")
            return
        }
        if (!category || String(category).trim() === "") {
            alert("Enter your Category! ")
            return
        }
        setBtn((prev) => [...prev, { id: Date.now(), title: buy, amount: mony, category: category }])
        setBuy("")
        setMony(0)
        setCategory("All")
    }

    // Барои алиш кардани Категория через кнопки
    const handelAll = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilterStatus("All")
    }

    const handelFood = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilterStatus("Food")
    }

    const handelTransport = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilterStatus("Transport")
    }

    const handelEntertainment = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilterStatus("Entertainment")
    }


    // Dell
    const dell = (id: number) => {
        setBtn(btn.filter(d => d.id !== id))
    }

    // Eddit
    const eddit = (id: number) => {
        const ToEdit = btn.find(item => item.id === id);

        if (ToEdit) {
            setNewTitle(ToEdit.title)
            setNewPrice(ToEdit.amount)
            setCurentId(id)
            setIsModalOpen(true)
        }
    }

    // Save_BTN
    const saveBtn = () => {
        setBtn(btn.map(item =>
            item.id === curentId
                ? { ...item, title: newTitle, amount: newPrice }
                : item
        ))

        setIsModalOpen(false)
        setCurentId(null)
    }





    // Mu debouns
    const debounser = useDebouns_L2(search, 300)

    // Барои Филтр Поиск карче барои мапит кардана Таёр мекнем 
    const filtred = btn
        .filter(t => t.title.toLowerCase().includes(debounser.toLowerCase()))
        .filter(item => {
            if (filterStatus === "Food") return item.category === "Food"
            if (filterStatus === "Transport") return item.category === "Transport"
            if (filterStatus === "Entertainment") return item.category === "Entertainment"
            return true
        })

    // Барои Обшый суммара хисоб кардан
    const AmoutTotal = filtred.reduce((sum, item) =>
        sum + item.amount, 0)


    // Карзинка
    const addToCart = (product: Expense) => {
        const isExist = cart.find(item => item.id === product.id)

        if (isExist) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            ))
        }
        else {
            setCart([...cart, { ...product, qty: 1 }])
        }
    }

    // Yдалит кардани товар ай карзинка  
    const removeFromCart = (id: number) => {
        setCart(cart.filter(item => item.id !== id))
    }

    // Удалить кардани товар ай хаму хди дри карзинка
    const decreaseQty = (id: number) => {

        const mius = cart.find(item => item.id === id)

        if (mius) {
            if (mius.qty > 1) {
                setCart(cart.map(item =>
                    item.id === id
                        ? { ...item, qty: item.qty - 1 }
                        : item
                ))
            }
            else {
                setCart(cart.filter(d => d.id !== id))
            }

        }
    }

    // Ошиый Суммаи Карзинка
    const CartTotal = cart.reduce((sum, item) => sum + item.amount * item.qty, 0)

    // Favorit
    const toggel = (pro: Expense) => {
        const moll = favorites.find(item => item.id === pro.id)

        if (moll) {
            setFavorites(favorites.filter(f => f.id !== pro.id))
        }
        else {
            setFavorites([...favorites, pro])
        }
    }



    return (
        <>
            <div>
                <h2>Total Expenses: ${AmoutTotal}</h2>
            </div>
            {/* Search */}
            <input
                type="search"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ margin: '20px' }} />


            {/* All input */}
            <div>

                <input
                    type="text"
                    placeholder="Enter your Expense"
                    value={buy}
                    onChange={(e) => setBuy(e.target.value)}
                    style={{ margin: '20px' }} />

                <input
                    type="number"
                    placeholder="Enter sum your Expense"
                    value={mony}
                    onChange={(e) => setMony(Number(e.target.value))}
                    style={{ margin: '20px' }} />

                {/* Барои кнопкохои вобаста ба категория */}
                <div>
                    <button onClick={handelAll} style={{ marginLeft: '20px' }}>All</button>
                    <button onClick={handelFood} style={{ marginLeft: '20px' }}>Food</button>
                    <button onClick={handelTransport} style={{ marginLeft: '20px' }}>Transport</button>
                    <button onClick={handelEntertainment} style={{ marginLeft: '20px' }}>Entertainment</button>
                </div>

                <select value={category} onChange={handleCategogy}>
                    <option value={"All"}>All</option>
                    <option value={"Food"}>Food</option>
                    <option value={"Transport"}>Transport</option>
                    <option value={"Entertainment"}>Entertainment</option>
                </select>

                <button onClick={handelBTN} style={{ marginTop: '20px' }}>Add Expense</button>


            </div>

            <div>
                {
                    filtred.map(item => {
                        const isAdded = favorites.some(s => s.id === item.id)
                        return (
                            <div key={item.id}>
                                <h3>{item.title} <span>${item.amount}</span></h3>
                                <p>{item.category}</p>

                                <div>
                                    <button onClick={() => dell(item.id)}>Delet</button>
                                    <button onClick={() => eddit(item.id)}>Edit</button>
                                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                                    <button onClick={() => removeFromCart(item.id)}>Dell on Cart</button>
                                    <button onClick={() => toggel(item)}>
                                        {isAdded ? "❤️" : "🤍"}
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* Modalka */}
            <div>
                {
                    isModalOpen && (
                        <div style={{ position: 'fixed', top: '50%', left: '40%', padding: '20px', transform: 'translate(-50% -50%)', background: '#fff', border: '1px solid black' }}>
                            <h2>Edit your Expense</h2>

                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)} />

                            <input
                                type="number"
                                value={newPrice}
                                onChange={(e) => setNewPrice(Number(e.target.value))} />

                            <button onClick={saveBtn}>Save</button>
                            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button >Add to Cart</button>

                        </div>
                    )
                }
            </div>

            {/* Cart */}
            <div>
                <div>
                    <h2>Total Cart: ${CartTotal}</h2>
                </div>
                {
                    cart.map(item => (
                        <div key={item.id}>
                            <h3>{item.title}: ${item.qty * item.amount}</h3>
                            <p>{item.qty}</p>

                            <button onClick={() => addToCart(item)}>+</button>
                            <button onClick={() => decreaseQty(item.id)}>-</button>
                        </div>
                    ))
                }
            </div>




        </>
    )
}

export default Tracker