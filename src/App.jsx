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

  // Stato locale che rappresenta i prodotti aggiunti al carrello
  const [addedProducts, setAddedProducts] = useState([])

  // Array dei prodotti disponibili
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  // Funzione per aggiungere un prodotto al carrello
  const addToCart = product => {

    // Verifica se il prodotto è già stato aggiunto
    const isProductAlreadyAdded = addedProducts.some(p => p.name === product.name) // `p` è ogni **prodotto nel carrello** (viene da `.some()) - product è il `product` è un **oggetto prodotto** appena cliccato, da aggiungere al carrello

    if (isProductAlreadyAdded) {
      // Se già presente, incrementa la quantità
      updateProductQuantity(product.name)
      return
    }

    // Se non presente, aggiungi il prodotto con quantità 1
    const productToAdd = {
      ...product,
      quantity: 1
    }

    // Aggiorna lo stato aggiungendo il nuovo prodotto al carrello
    // Usa lo spread operator per creare un nuovo array con i prodotti esistenti + quello nuovo
    setAddedProducts(curr => [...curr, productToAdd])

    /*
     È importante perché:
      Immutabilità: crea un nuovo array, non modifica quello originale
      Reattività: fa scattare il re-render del componente
      Pulizia: mantiene il pattern prev => new standard di useState
    */
  }




  // Funzione per incrementare la quantità di un prodotto nel carrello
  const updateProductQuantity = (cartProduct) => {  // cartProduct rappresenta il nome del prodotto già nel carrello, di cui vogliamo aumentare la quantità, ed è solo una **stringa** (es: "Mela"), usata per confronti

    setAddedProducts(curr => {

      return curr.map(p => {  // uso .map per scorrere ogni prodotto nel carrello, di cui p è ogni singolo prodotto

        if (p.name === cartProduct) { // qui vedo se il prodotto nel carrello che sto scorrendo ha lo stesso nome del prodotto selezionato, se true, aggiungo + 1 alla quantità
          return {
            ...p,
            quantity: p.quantity + 1
          }
        }

        else {
          return p // altrimenti se non è il prodotto che voglio aggiornare, lo lascio invariato
        }

      })

    })
  }

  // Funzione per rimuovere un prodotto dal carrello
  const removeFromCart = (cartProduct) => {
    setAddedProducts(curr => curr.filter(p => p.name !== cartProduct))
  }

  // Calcolo del totale da pagare sommando prezzo * quantità per ogni prodotto
  const totalToPay = addedProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0)

  return (
    <>

      <h1>lista della spesa</h1>

      {/* Lista dei prodotti disponibili */}
      <ul>

        {products.map((product, index) => (

          <li key={index} className="product-list-container">

            <div className="product-list">

              {product.name}: {product.price} €

              <button onClick={() => addToCart(product)} className="add-to-cart-button"> {/* qui passo l'intero oggetto product dato che devo aggiungerlo interamente al carrello. */}
                aggiungi al carrello
              </button>

            </div>

          </li>

        ))} {/* chiusura di products.map */}

      </ul>


      <h2>il tuo carrello acquisti</h2>


      {/* Lista dei prodotti selezionati e messi nel carrello */}

      <ul>

        {addedProducts.map((p, index) => (

          <li key={index} className="cart-list">

            {p.name}: {p.price} €, quantità: {p.quantity}


            <button onClick={() => updateProductQuantity(p.name)} className="increase-quantity-btn"> {/*qui passo solo la proprietà '.name' (cioè il valore stringa "mela" ad esempio) perchè mi basta il nome per identificare quale prodotto aggiornare. */}
              incrementa quantità
            </button>

            <button onClick={() => removeFromCart(p.name)} className="increase-quantity-btn"> {/* stessa cosa anche per filter */}
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
