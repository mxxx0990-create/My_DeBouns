import React, { useState, useEffect } from "react";
import useDebouns_L4 from "./debouns_L4";

interface Task {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status // Вот это самое важное!
    deadline: string; // Новое: Дата
    createdAt: number; // Для истории
}

type Priority = "All" | "Low" | "Medium" | "High";

type Status = "todo" | "doing" | "done";

function TaskManager() {

    // Хамаи даннихомон
    const [tasks, setTasks] = useState<Task[]>(Get)

    const [titleValue, setTitleValue] = useState<string>("")
    const [descriptions, setDescriptions] = useState<string>("")
    const [priority, setPriority] = useState<Priority>("All")
    const [date, setDate] = useState<string>("")
    const [statuss, setStatuss] = useState<Status>("todo")
    const [search, setSearch] = useState<string>("")
    // eddit
    const [newTitle, setNewTitle] = useState<string>("")
    const [newDescription, setNewDescription] = useState<string>("")
    const [newPriority, setNewPriority] = useState<Priority>("Low")
    const [newDate, setNewDate] = useState<string>("")
    const [curetId, setCuretId] = useState<number | null>(null)
    // MOdalka
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    // Favorite
    const [favorites, setFavorites] = useState<Task[]>(Fav)
    // Сартировка
    const [sorting, setSorting] = useState<string>("")
    // Карзинка
    const [cart, setCart] = useState<Task[]>([])
    // Пагинатьсия
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 3


    // Local Storage
    useEffect(() => {
        localStorage.setItem("SUPER_TASK_APP", JSON.stringify(tasks))
        

    }, [tasks])


    function Get() {
        const saved = localStorage.getItem("SUPER_TASK_APP")
        return saved ? JSON.parse(saved) : []
    }
    // LocalStorage for FAVORITE
    useEffect(() => {
        localStorage.setItem("Set_Favorite", JSON.stringify(favorites))

    }, [favorites])

    function Fav() {
        const saved = localStorage.getItem("Set_Favorite")
        return saved ? JSON.parse(saved) : []
    }
    // удалить кардани весь даннихои  LocalStorage
    function cleanALL() {
        if(window.confirm("Are you shur to clean all infomation"))
            localStorage.clear();
        setTasks([])
        setFavorites([])
    }


    // Для добавление всне нужние элементи в кнопке добавить чтобы при клике создалься Объект
    const handelTask = (e: React.MouseEvent<HTMLButtonElement>) => {

        if (!titleValue.trim()) {
            alert("Pleace Title")
            return
        }
        if (!descriptions || String(descriptions).trim() === "") {
            alert("Pleace description")
            return
        }
        if (!priority || String(priority).trim() === "") {
            alert("Pleace priority")
            return
        }
        if (!date || String(date).trim() === "") {
            alert("Pleace date")
            return
        }
        const newTask: Task = {
            id: Date.now(),
            title: titleValue,
            description: descriptions,
            priority: priority,
            status: statuss,
            deadline: date,
            createdAt: Date.now()

        }
        setTasks(prev => [...prev, newTask])
        setTitleValue("")
        setDate("")
        setDescriptions("")
        setPriority("Low")
        setStatuss("todo")
        setPriority("All")
    }

    // Обнавления Статус короче агар todo боша doing мекнемуш
    const changeStatus = (id: number, newStatus: Status) => {
        setTasks(item =>
            item.map(t =>
                t.id === id
                    ? { ...t, status: newStatus }
                    : t
            )
        )
    }

    // Send back
    const sendBeck = (id: number, oldStatus: Status) => {
        setTasks(item =>
            item.map(items =>
                items.id === id
                    ? { ...items, status: oldStatus }
                    : items
            )
        )
    }

    // Dell for done
    const delStatus = (id: number) => {
        setTasks(prev => prev.filter(f => f.id !== id))
    }


    // debouns
    const timer = useDebouns_L4(search, 300)

    // Dell
    const dell = (id: number) => {
        setTasks(prev => prev.filter(d => d.id !== id))

    }

    // Eddit
    const edit = (id: number) => {
        const isExist = tasks.find(t => t.id === id)

        if (isExist) {
            setNewTitle(isExist.title)
            setNewDescription(isExist.description)
            setNewDate(isExist.deadline)
            setNewPriority(isExist.priority)
            setIsModalOpen(true)
            setCuretId(id)
        }
    }
    // SaveEdit
    const saveEdit = () => {
        setTasks(tasks.map(item =>
            item.id === curetId
                ? { ...item, title: newTitle, description: newDescription, deadline: newDate, priority: newPriority }
                : item
        ))
        setIsModalOpen(false)
        setCuretId(null)
    }

    // Для Филтратсия
    const filtred = [...tasks]
        .filter(s => s.title.toLowerCase().includes(timer.toLowerCase()))
        .filter(item => {
            if (priority === "Low") return item.priority === "Low"
            if (priority === "Medium") return item.priority === "Medium"
            if (priority === "High") return item.priority === "High"
            if (priority === "All") return item.priority
        }
        )

        // короче да тор мо хамаи даннихои tasks гирифта да filtred додем барои филтратсиятоист дига чи изменения кардани бошем через хами filtred кор мекнем


    // Пагинатьсия
    const lastIndex = currentPage * itemsPerPage
    const firstIndex = lastIndex - itemsPerPage
    const totalPages = Math.ceil(filtred.length / itemsPerPage)
    // filtred.length - сабаби ира исти бурдан так как хамаи данихои tasks да дри filtred мебошад
    

    const currentTasks = filtred.slice(firstIndex, lastIndex)

        useEffect(() => {
            if(currentPage > totalPages && totalPages > 0) {
                setCurrentPage(1)
            }
        }, [filtred.length, totalPages])



    // Favotit
    const addFavorite = (pro: Task) => {
        const add = favorites.find(item => item.id === pro.id)

        if (add) {
            setFavorites(favorites.filter(item => item.id !== pro.id))
        }
        else {
            setFavorites([...favorites, pro])
        }
    }

    // Карзинка



    return (
        <>

            {/* Serach */}
            <div>
                <input
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
            </div>

            {/* Clean Local Storage */}
            <button onClick={cleanALL}>Delet All</button>

            {/* Для добавление Title и discrtation */}
            <div>
                <input
                    type="text"
                    placeholder="Enter the title"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}

                />

                <input
                    type="text"
                    placeholder="Enter the description"
                    value={descriptions}
                    onChange={(e) => setDescriptions(e.target.value)} />

                <label>Enter Priority
                    <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                        <option value={"All"}>All</option>
                        <option value={"Low"}>Low</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"High"}>High</option>
                    </select>
                </label>

                <input
                    type="date"
                    placeholder="Enter date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} />

                <button onClick={handelTask}>Add Task</button>

            </div>

            {/* Fiter */}
            <div>
                <button onClick={() => setPriority("All")}>All</button>
                <button onClick={() => setPriority("Low")}>Low</button>
                <button onClick={() => setPriority("Medium")}>Medium</button>
                <button onClick={() => setPriority("High")}>High</button>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                {/* todo */}
                <div>
                    {filtred
                        .filter(item => item.status === "todo")
                        .map(items => {
                            const isAdded = favorites.some(s => s.id === items.id)
                            return (
                                <div key={items.id}>
                                    <p>{new Date(items.createdAt).toLocaleString()}</p>
                                    <h3>{items.title}</h3>
                                    <p>{items.description}</p>
                                    <p>{items.status} <span>{items.deadline}</span></p>
                                    <small>{items.priority}</small>
                                    <button onClick={() => dell(items.id)}>Delet</button>
                                    <button onClick={() => edit(items.id)}>Edit</button>
                                    <button onClick={() => addFavorite(items)}> {isAdded ? "❤️" : "🤍"}</button>
                                    <button onClick={() => changeStatus(items.id, "doing")}>Doing ➡️</button>
                                </div>
                            )
                        }
                        )}
                </div>

                {/* doing */}
                <div>
                    {filtred
                        .filter(item => item.status === "doing")
                        .map(items => {
                            const isAdded = favorites.some(s => s.id === items.id)
                            return (
                                <div key={items.id}>
                                    <p>{new Date(items.createdAt).toLocaleString()}</p>
                                    <h3>{items.title}</h3>
                                    <p>{items.description}</p>
                                    <p>{items.status} <span>{items.deadline}</span></p>
                                    <small>{items.priority}</small>
                                    <button onClick={() => dell(items.id)}>Delet</button>
                                    <button onClick={() => edit(items.id)}>Edit</button>
                                    <button onClick={() => changeStatus(items.id, "done")}>Done ➡️</button>
                                    <button onClick={() => sendBeck(items.id, "todo")}>Todo ⬅️</button>
                                    <button onClick={() => addFavorite(items)}> {isAdded ? "❤️" : "🤍"}</button>
                                </div>
                            )
                        })
                    }
                </div>

                {/* doing */}
                <div>
                    {filtred
                        .filter(item => item.status === "done")
                        .map(items => {
                            const isAdded = favorites.some(s => s.id === items.id)
                            return (
                                <div key={items.id}>
                                    <p>{new Date(items.createdAt).toLocaleString()}</p>
                                    <h3>{items.title}</h3>
                                    <p>{items.description}</p>
                                    <p>{items.status} <span>{items.deadline}</span></p>
                                    <small>{items.priority}</small>
                                    <button onClick={() => dell(items.id)}>Delet</button>
                                    <button onClick={() => edit(items.id)}>Edit</button>
                                    <button onClick={() => sendBeck(items.id, "todo")}>Todo ⬅️</button>
                                    <button onClick={() => delStatus(items.id)}>Finish</button>
                                    <button onClick={() => addFavorite(items)}> {isAdded ? "❤️" : "🤍"}</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>


            {/* Modalka */}
            <div>
                {isModalOpen && (
                    <div style={{ position: 'fixed', top: '50%', left: '30%', padding: '20px', background: '#fff', border: '1px solid black' }}>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)} />

                        <input
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)} />

                        <label>Edit Priority
                            <select value={newPriority} onChange={(e) => setNewPriority(e.target.value as Priority)}>
                                <option value={"Low"}>Low</option>
                                <option value={"Medium"}>Medium</option>
                                <option value={"High"}>High</option>
                            </select>
                        </label>

                        <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)} />

                        <button onClick={saveEdit}>Save</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>

                    </div>
                )}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '5px' }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        style={{
                            padding: '8px 15px',
                            backgroundColor: currentPage === pageNumber ? '#007bff' : '#eee',
                            color: currentPage === pageNumber ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>


        </>
    )
}

export default TaskManager

