import { useEffect, useState } from "react";



interface ISneaker {
    id: number;
    title: string;
    brand: string;
    price: number;
    image: string;
    category: string;

}

interface IFavorit {
    items: ISneaker[];

}

const FavoritCart = ({items}: IFavorit) => {


    return (
        <>
            <div style={{ position: 'fixed', top: '0', left: '0', width: '300px', height: '100%', backgroundColor: 'white', boxShadow: '-10px 0px 30px rgba(0,0,0,0.5)', zIndex: '1000', overflowY: 'auto', color: 'black' }}>

                {
                    items.length === 0 ? (
                        <p style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>Ваша избренные пуста...</p>
                    ) : (
                        items.map(item =>
                            <div key={item.id}>
                                <img src={item.image} alt="..." />
                                <h3>{item.title}</h3>
                                <p>{item.brand} | {item.category}</p>
                                <p>{item.price}</p>
                            </div>
                        )
                    )
                }

            </div>

        </>
    )
}

export default FavoritCart