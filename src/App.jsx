/*

Milestone 1: Mostrare la lista dei prodotti
1. Parti dall’array products fornito:

Crea un componente che mostra la lista dei prodotti.
Per ogni prodotto, mostra:
Nome
Prezzo

Obiettivo: Vedere un elenco leggibile di tutti i prodotti con nome e prezzo.

----

📌 Milestone 2: Aggiungere prodotti al carrello
Aggiungi uno stato locale addedProducts (inizialmente un array vuoto) per rappresentare i prodotti nel carrello.
Per ogni prodotto della lista, aggiungi un bottone "Aggiungi al carrello":
Al click del bottone, usa una funzione addToCart per:
Aggiungere il prodotto al carrello se non è già presente, con una proprietà quantity = 1.
Se il prodotto è già nel carrello, ignora l’azione.
Sotto alla lista dei prodotti, mostra una lista dei prodotti nel carrello se addedProducts contiene almeno un elemento.
Per ogni prodotto nel carrello, mostra:
Nome
Prezzo
Quantità

Obiettivo: L’utente può aggiungere prodotti al carrello e vedere una lista dei prodotti aggiunti.

📌 Milestone 3: Modificare il carrello
Al click successivo del bottone "Aggiungi al carrello", se il prodotto è già presente:
Usa una funzione updateProductQuantity per incrementare la proprietà quantity del prodotto esistente.
Per ogni prodotto nel carrello, aggiungi un bottone "Rimuovi dal carrello":
Al click, usa una funzione removeFromCart per rimuovere il prodotto dal carrello.
Sotto alla lista del carrello, mostra il totale da pagare:
Calcola il totale moltiplicando il prezzo per la quantità di ogni prodotto e somma tutti i risultati.
Obiettivo: Gestire l’aggiunta, la rimozione e il calcolo del totale del carrello in modo dinamico.

*/

import { useState } from "react";

function App() {

  const [addedProducts, setAddedProducts] = useState([])

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const addToCart = product => {
    const isProductAlreadyAdded = addedProducts.some(p => p.name === product.name)
    if (isProductAlreadyAdded) {
      updateProductQuantity(product.name)
      return
    }

    const productToAdd = {
      ...product,
      quantity: 1

    }

    setAddedProducts(curr => [...curr, productToAdd])

  }

  const updateProductQuantity = (productName) => {
    setAddedProducts(curr => {
      return curr.map(p => {
        if (p.name === productName) {
          return {
            ...p,
            quantity: p.quantity + 1
          }
        } else {
          return p
        }

      })


    })
  }

  const removeFromCart = (productName) => {
    setAddedProducts(curr => curr.filter(p => p.name !== productName))
  }

  const totalToPay = addedProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0)


  return (
    <>


      <h1>lista della spesa</h1>

      <ul>
        {products.map((product, index) => (

          <li key={index} className="product-list-container">
            <div className="product-list">
              {product.name}: {product.price} €

              <button onClick={() => addToCart(product)} className="add-to-cart-button">
                aggiungi al carrello
              </button>
            </div>
          </li>

        ))}

      </ul>

      <h2>il tuo carrello acquisti</h2>

      <ul>
        {addedProducts.map((p, index) => (

          <li key={index} className="cart-list">

            {p.name}: {p.price} €, quantità: {p.quantity}
            <button onClick={() => updateProductQuantity(p.name)} className="increase-quantity-btn">
              incrementa quantità
            </button>

            <button onClick={() => removeFromCart(p.name)} className="increase-quantity-btn">
              rimuovi dal carrello
            </button>

          </li>

        ))}
      </ul>

      <h3>totale da pagare: {totalToPay.toFixed(2)}€</h3>

    </>
  )
}

export default App 
