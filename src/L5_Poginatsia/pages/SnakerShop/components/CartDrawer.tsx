


interface ICart {
    id: number;
    title: string;
    brand: string;
    price: number;
    image: string;
    category: string;
    qty: number
}

interface CartDrawerProps {
    isOpen: boolean;
    items: ICart[]
    totalSum: number;
    totalQty: number;
    onClose: () => void;
    onAdd: (item: ICart) => void;
    onDell: (id: number) => void;

}

const CartDrawer = ({ isOpen, items, totalSum, totalQty, onClose, onAdd, onDell }: CartDrawerProps) => {

    if (!isOpen) return null
    

    return (

        <>

            <div style={{ position: 'fixed', right: '0', top: '0', width: '300px', height: '100%', backgroundColor: 'white', boxShadow: '-10px 0px 30px rgba(0,0,0,0.5)', zIndex: '1000', color: 'black', overflowY: 'auto' }}>
                <div>
                    <p>Товаров: {totalQty}</p>
                    <p>Общая сумма: $<b>{totalSum}</b></p>
                    <button onClick={onClose}>Close Catr</button>
                </div>

                {
                   items.length === 0 ? (
                    <p style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>Ваша корзина пуста...</p>
                   ) : items.map(item =>
                        <div key={item.id}>
                            <img src={item.image} alt="..." />
                            <h3>{item.title}</h3>
                            <p>{item.brand} | {item.category}</p>
                            <p>{item.price}</p>
                            <p>{item.qty}</p>
                            <button onClick={() => onAdd(item)}>+</button>
                            <button onClick={() => onDell(item.id)}>{item.qty > 1 ? '-' : '🪣'}</button>

                        </div>
                    )
                }
            </div>



        </>
    )
}

export default CartDrawer