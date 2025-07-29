# pseudo codice esercizio

##  Checklist passaggi

1. ✅ Crea `useState([])` per `addedProducts`

2. 🧩 Array di oggetti `products`

3. ➕ `addToCart`:

   * Usa `some()` per controllo
   * Se non c’è, aggiungi con `quantity: 1`
   * Se c’è, chiama `updateProductQuantity`


4. 🔁 `updateProductQuantity(productName)`

   * Usa `map()` per trovare oggetto da modificare
   * Aggiungi `+1` a `quantity`


5. ❌ `removeFromCart(productName)`

   * `filter(p => p.name !== productName)`


6. 💰 Totale carrello

   * `reduce((acc, p) => acc + (p.price * p.quantity), 0)`

---

    live-demo:[react-grocery-shopping-list](https://react-grocery-shopping-list.netlify.app/)