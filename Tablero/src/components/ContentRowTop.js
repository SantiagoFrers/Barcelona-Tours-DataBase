import React from 'react';
import SmallCard from './SmallCard';


function ContentRowTop(){
    /*  Cada set de datos es un objeto literal */

/* <!-- Products in DB --> */

let productsInDB = {
    title: 'Total de productos',
    color: 'primary', 
    cuantity: 34,
    icon: 'fa-clipboard-list'
}

/* <!-- $$$ of all products in DB --> */

let amountOfProducts = {
    title:'Total de usuarios', 
    color:'success', 
    cuantity: '$546.456',
    icon:'fa-dollar-sign'
}

/* <!-- Amount of users in DB --> */

let amountOfUsers = {
    title:'Total de categorias' ,
    color:'warning',
    cuantity:'3844',
    icon:'fa-user-check'
}

let cartProps = [productsInDB, amountOfProducts, amountOfUsers];

    return (
        <div className="row">
            {cartProps.map( (product, i) => {

                return <SmallCard {...product} key={i}/>
            })}

        </div>
    )
}

export default ContentRowTop;