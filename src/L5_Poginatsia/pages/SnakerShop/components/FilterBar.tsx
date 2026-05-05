


interface Filter {
    title: string
    onPut: (cheng: string) => void
}

const brands = ["All", "Nike", "Adidas", "Jordan", "New Balance"]

export const FilterBar = ({ title, onPut }: Filter) => {

    return (
        <>
            <div>
                {brands.map(items => (
                    <button
                        key={items}
                        onClick={() => onPut(items)}>{items}</button>
                ))}
            </div >

        </>
    )
}

export default FilterBar