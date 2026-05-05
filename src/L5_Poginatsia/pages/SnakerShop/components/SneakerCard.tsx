import useCaert from "./MuCartState";


interface ISneaker {
    id: number;
    title: string;
    brand: string;
    price: number;
    image: string;
    category: string;

}

interface Sneakers{
    item: ISneaker
    onAdd: (product: ISneaker) => void
    onFavorite: (product: ISneaker) => void
    isFav: boolean;
}

const SneakerCard = ({item, onAdd, onFavorite, isFav}: Sneakers) => {

   

    return(
        <>
        <div>
            <img src={item.image} alt="..." />
            <h3>{item.title}</h3>
            <p>{item.brand} | {item.category}</p>
            <p>{item.price}</p>
            <button onClick={() => onAdd(item)}>Buy 🛒</button>
            <button onClick={() => onFavorite(item)}>{isFav  ? '❤️' : '🤍'}</button>
        </div>
        
        
        </>
    )
}

export default SneakerCard