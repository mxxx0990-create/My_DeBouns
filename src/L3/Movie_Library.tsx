import React, { useState } from "react";
import useDebouns_L3 from "./debouns_L3";


interface Moves {
    id: number;
    title: string;
    rating: number;
    genre: string
}

interface Cart extends Moves {
    qty: number
}

type Genre = "Action" | "Drama" | "Comedy"

type Viwe = "all" | "favorites" | "cart"

function Movie() {

    const [name, setName] = useState<string>("")
    const [ratings, setRating] = useState<number>(0)
    const [genres, setGenres] = useState<Genre>("Action")
    const [search, setSearch] = useState<string>("")
    const [btn, setBtn] = useState<Moves[]>([])
    // Филтраться
    const [sortRating, setSortRating] = useState<string>("")
    const [filterGenre, setFilterGenre] = useState<string>("")
    // Edit
    const [newName, setNewName] = useState<string>("")
    const [newRating, setNewRating] = useState<number>(0)
    const [newGenre, setNewGenre] = useState<string>("")
    const [getId, setGetId] = useState<number | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    // Карзина
    const [cart, setCart] = useState<Cart[]>([])
    // Избренные
    const [favorites, setFavorites] = useState<Moves[]>([])
    // View
    const [view, setView] = useState<Viwe>("all")




    // Для добавление всне нужние элементи в кнопке добавить чтобы при клике создалься Объект
    const handelMovie = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!name || String(name).trim() === "") {
            alert("Enter your Movie!");
            return
        }
        if (!ratings || String(ratings).trim() === "") {
            alert("Enter your Ratings!");
            return
        }
        if (ratings < 1) {
            alert("You can not put like this reatigs!");
            return
        }
        if (!genres || String(genres).trim() === "") {
            alert("Enter your Geners!");
            return
        }
        setBtn((prev) => [...prev, { id: Date.now(), title: name, rating: ratings, genre: genres }])
        setName("")
        setRating(0)
    }

    // DELL
    const del = (id: number) => {
        setBtn(btn.filter(d => d.id !== id))
        setFavorites(favorites.filter(f => f.id !== id))
    }

    // Eddit
    const edit = (id: number) => {
        const isExist = btn.find(f => f.id === id)

        if (isExist) {
            setNewName(isExist.title)
            setNewRating(isExist.rating)
            setNewGenre(isExist.genre)
            setGetId(id)
            setIsModalOpen(true)

        }
    }

    const saveEdit = () => {
        setBtn(btn.map(item =>
            item.id === getId
                ? { ...item, title: newName, rating: newRating, genre: newGenre }
                : item
        ))
        setIsModalOpen(false)
    }


    // debouns
    const searcher = useDebouns_L3(search, 300)


    // Филтратьсия и сортировка 
    // Барои Филтр Поиск карче барои мапит кардана Таёр мекнем 
    const filtred = [...btn]
        .filter(t => t.title.toLowerCase().includes(searcher.toLowerCase()))
        .filter(item2 => {
            if (filterGenre === "Action") return item2.genre === "Action"
            if (filterGenre === "Drama") return item2.genre === "Drama"
            if (filterGenre === "Comedy") return item2.genre === "Comedy"
            return true
        })

        

    const finalResult = [...filtred].sort((a, b) => {
        if (sortRating === "SortbyRating") {
            return b.rating - a.rating
        }
        if (sortRating === "SortbyName") {
            return a.title.localeCompare(b.title)
        }
        return 0
    })

    // Карзина
    const toCart = (pro: Moves) => {
        const isExost = cart.find(f => f.id === pro.id);

        if (isExost) {
            setCart(cart.map(item =>
                item.id === pro.id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            ))
        }
        else {
            setCart([...cart, { ...pro, qty: 1 }])
        }
    }

    const dellCart = (id: number) => {
        const del = cart.find(item => item.id === id);

        if (del) {
            if (del.qty > 1) {
                setCart(cart.map(item => (
                    item.id === id
                        ? { ...item, qty: item.qty - 1 }
                        : item
                )))
            }
            else {
                setCart(cart.filter(item => item.id !== id))
            }
        }
    }

    const totalMove = cart.reduce((ako, sum) => ako + sum.qty, 0)

    // Избренные
    const toggleFavorite = (movi: Moves) => {
        const move = favorites.find(item => item.id === movi.id)

        if (move) {
            setFavorites(favorites.filter(item => (
                item.id !== movi.id
            )))
        }
        else {
            setFavorites([...favorites, movi])
        }
    }




    return (
        <>


            {/* Search */}
            <div>
                <input
                    type="search"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
            </div>


            <div>
                <button onClick={() => setView("all")}>All</button>
                <button onClick={() => setView('cart')}>Cart</button>
                <button onClick={() => setView('favorites')}>Favorit</button>
            </div>

            <div>
                
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ margin: '20px' }} />

                <input
                    type="number"
                    placeholder="Enter rating"
                    value={ratings}
                    onChange={(e) => setRating(Number(e.target.value))}
                    style={{ margin: '20px' }} />

                <label>Enter by Gener
                    <select value={genres} onChange={(e) => setGenres(e.target.value as Genre)}>
                        <option value={"Action"}>Action</option>
                        <option value={"Drama"}>Drama</option>
                        <option value={"Comedy"}>Comedy</option>
                    </select>
                </label>

                <button onClick={handelMovie} style={{ margin: '20px' }}>Add Movie</button>
            </div>

            {/* Секция Сортировки */}
            <div>
                <button onClick={() => setSortRating("SortbyRating")} style={{ margin: '20px' }}>Sort by Rating</button>
                <button onClick={() => setSortRating("SortbyName")} style={{ margin: '20px' }}>Sort by Name</button>

                <label>Select by Gener
                    <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
                        <option value={"All"}>All</option>
                        <option value={"Action"}>Action</option>
                        <option value={"Drama"}>Drama</option>
                        <option value={"Comedy"}>Comedy</option>
                    </select>
                </label>
            </div>


            {/* MAP */}
            <div>
                {view === 'all' && (
                    finalResult.map(item => {
                        const isAdded = favorites.some(f => f.id === item.id)
                        return (
                            <div key={item.id}
                                style={{
                                    margin: '10px',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    transition: '0.3s',


                                    // Условие 1: Если рейтинг 8+, то золотая рамка, иначе обычная
                                    border: item.rating >= 8 ? '2px solid gold' : '1px solid gray',

                                    // Условие 2: Если рейтинг меньше 5, то прозрачность 0.5, иначе 1
                                    opacity: item.rating < 5 ? 0.5 : 1,

                                    // Условия 3: Если рейтинг 10
                                    color: item.rating === 10 ? 'red' : 'black',

                                    background: isAdded ? '#fff0f0' : '#f9f9f9'
                                }}>

                                <h3>{item.title}
                                    <span>
                                        {item.rating}
                                    </span>
                                </h3>
                                <p>{item.genre}</p>
                                <button onClick={() => del(item.id)}>Delet</button>
                                <button onClick={() => edit(item.id)}>Edit</button>
                                <button onClick={() => toCart(item)}>Add to Cart</button>
                                {/* Favorite */}
                                <button onClick={() => toggleFavorite(item)}
                                >
                                    {isAdded ? "❤️" : "🤍"}
                                </button>

                            </div>
                        )
                    })
                )}
            </div>

            {/* MOdalka */}
            <div>
                {
                    isModalOpen && (
                        <div style={{ position: 'relative', background: 'rgba(255, 255, 255, 0.5);' }}>
                            <div style={{ background: 'rgb(255, 255, 255)', position: 'fixed', top: '50%', left: '30%', transform: 'translate(-50% -50%)', padding: '20px', border: '1px solid black' }}>
                                <h2>Eddit  Move</h2>

                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)} />

                                <input
                                    type="number"
                                    value={newRating}
                                    onChange={(e) => setNewRating(Number(e.target.value))} />

                                <label>Edit Gener
                                    <select value={newGenre} onChange={(e) => setNewGenre(e.target.value)}>
                                        <option value={"Action"}>Action</option>
                                        <option value={"Drama"}>Drama</option>
                                        <option value={"Comedy"}>Comedy</option>
                                    </select>
                                </label>

                                <button onClick={saveEdit}>Save</button>
                                <button onClick={() => setIsModalOpen(false)}>Cancel</button>

                            </div>
                        </div>
                    )
                }
            </div>

            {/* Карзина */}
            <div>
                <h2>{totalMove}</h2>
                {view === 'cart' && (
                    cart.map(item => (
                        <div key={item.id}>
                            <h3>{item.title} <span>{item.rating}</span></h3>
                            <p>{item.genre}</p>
                            <p>{item.qty}</p>
                            <button onClick={() => toCart(item)}>+</button>
                            <button onClick={() => dellCart(item.id)}>-</button>
                        </div>
                    ))
                )}
            </div>

            {/* Favorit */}
            <div>
                {view === 'favorites' && (
                    favorites.map(item => (
                        <div key={item.id}>
                             <h3>{item.title} <span>{item.rating}</span></h3>
                            <p>{item.genre}</p>
                        </div>
                    ))
                )}
            </div>

        </>
    )



}


export default Movie




// const sorted = [...movies].sort((a, b) => b.rating - a.rating)
// localeCompare(). барои ай руи харфои номуш сартировка кардан

// b - a — сортировка от большего к меньшему (сначала 10, потом 1).
// a - b — сортировка от меньшего к большему (сначала 1, потом 10).

// localeCompare(). барои ай руи харфои номуш сартировка кардан
// Метод localeCompare() сравнивает две строки и возвращает число,
// которое говорит, какая строка должна идти раньше при сортировке.

// const sortTasks = () => {
//     const sorted = [...btn].sort((a, b) => {
//         // Сравниваем заголовки задач
//         return a.title.localeCompare(b.title);
//     });
//     setBtn(sorted);
// };


// .some(). Он возвращает true, если хотя бы один элемент в массиве подходит под условие.

// slice 
// У тебя есть длинный батон (массив), и тебе нужно отрезать 3-й и 4-й кусочки.
// Именно этот метод будет показывать только 5 или 10 задач на одной странице.
// 
// tasks.slice(start, end)
// 