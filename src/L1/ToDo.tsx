import React, { useState } from "react"
import useDebounce from "./debouns";



type Category = "Low" | "Medium" | "High";

interface Btn {
    id: number;
    title: string;
    category: string;
    isComplated: boolean
}


function Todo() {

    const [search, setSearch] = useState<string>("")
    const [inputValue, setInputValue] = useState<string | number>()
    const [category, setCategory] = useState<Category>("Low")
    const [complated, setComplated] = useState<boolean>(false)
    const [btn, setBtn] = useState<Btn[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>("All");
    // Для модалка
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [editId, setEditId] = useState<number | null>(null)
    const [tempTitle, setTempTitle] = useState("")
   


    // "Low" | "Medium" | "High";
    const handleCategogy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value as Category)
    }


    // Для того чтобы брать False & True 
    const handelFals = (id: number) => {
        setBtn(prev => prev.map(p => p.id === id ? { ...p, isComplated: !p.isComplated } : p))
    }

    // Для добавление всне нужние элементи в кнопке добавить чтобы при клике создалься Объект
    const handelBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        // 1. Проверяем: если значения нет или там только пробелы — выходим из функции
        if (!inputValue || String(inputValue).trim() === "") {
            alert("Напишите что-нибудь!"); // Или просто return
            return;
        }
        setBtn((prev) => [...prev, { id: Date.now(), title: String(inputValue), category: category, isComplated: complated }])
        setInputValue("")

    }

    // Filtred
    // ALL
    const all = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilterStatus("All")
    }

    // Completed
    const completed = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilterStatus("Completed")
    }

    // progress
    const progress = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFilterStatus("Progress")
    }

    // Dell
    const dell = (id: number) => {
        setBtn(btn.filter(d => d.id !== id))
    }

    // Eddit
    const edditor = (id: number) => {

        const todoToEdit = btn.find(item => item.id === id);

        if (todoToEdit) {
            setTempTitle(todoToEdit.title)
            setEditId(id)
            setIsModalOpen(true)
        }
    }
    // saveEdit
    const saveEdit = () => {
        setBtn(prev => prev.map(item =>
            item.id === editId
                ? { ...item, title: tempTitle }
                : item
        ))

        setIsModalOpen(false)
        setEditId(null)
    }

    // debouns
    const debouncedSearch = useDebounce<string>(search, 300)



    // All Filter
    const filtred = btn
        // Sercher
        .filter(b => b.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
        // Барои вобаста ба жанруш бровардан
        .filter(item => {
            if (filterStatus === "Completed") return item.isComplated === true
            if (filterStatus === "Progress") return item.isComplated === false
            return true
        })



    return (
        <>
            {/* Serch */}
            <input
                type="search"
                placeholder="Serch..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} />



            {/* Add */}
            <div>
                <input
                    type="search"
                    placeholder="Add Task   "
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} />

                {/* Filter */}

                <div>
                    <button onClick={all}>All</button>
                    <button onClick={completed}>Completed</button>
                    <button onClick={progress}>In progress</button>
                </div>



                <div>
                    <p>{category}</p>
                    <select value={category} onChange={handleCategogy}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <button onClick={handelBtn}>Add</button>
            </div>

            <div>
                {
                    filtred.map(item => (
                        <div key={item.id}>
                            <h3>{item.title}</h3>
                            <p>{item.category}</p>
                            <p>{item.isComplated}</p>
                            <button onClick={() => dell(item.id)}>Delet</button>
                            <button onClick={() => edditor(item.id)}>Edit</button>
                            <button onClick={() => handelFals(item.id)}>Complated</button>

                        </div>
                    ))
                }
            </div>


            {isModalOpen && (
                <div style={{ position: 'fixed', top: '50%', left: '40%', transform: 'translate(-50% -50%)', background: '#fff', padding: '20px', border: '1px solid black' }}>
                    <h2>Edit Task</h2>

                    <input
                        type="text"
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)} />

                    <button onClick={saveEdit}>Saved</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
            )}





        </>
    )
}

export default Todo