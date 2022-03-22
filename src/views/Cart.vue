<template>
  <div class="cart">
    <h1>Cart</h1>
    <div
      v-if="cart.length"
      class="item-container">
      <div
        v-for="item in cart"
        :key="item.id"
        class="item-box">
        <p>{{ item.name }}</p>
        <img
          :src="item.imageUrl"
          :alt="item.name" />
        <input
          v-model.number="item.amount"
          class="text-box"
          type="number">
        <button
          class="update-btn"
          @click="updateCart(item.id)">
          Update
        </button>
        <button
          class="remove-btn"
          @click="removeFromCart(item.id)">
          Remove
        </button>
      </div>
    </div>
    <div v-else>
      <h2>No items</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {
      cart: []
    }
  },
  mounted () {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart'))
    }
  },
  methods: {
    updateCart (itemId) {
      const item = this.cart.find((item) => item.id === itemId)

      if (item.amount <= 0) {
        return this.removeFromCart(itemId)
      }

      const cartItems = JSON.parse(localStorage.getItem('cart'))
      const itemInCart = cartItems.findIndex((cartItem) => cartItem.id === item.id)

      cartItems[itemInCart].amount = item.amount
      
      localStorage.setItem('cart', JSON.stringify(cartItems))
      this.cart = JSON.parse(localStorage.getItem('cart'))
    },
    removeFromCart (itemId) {
      const cartItems = JSON.parse(localStorage.getItem('cart'))
      const itemIndex = cartItems.findIndex((item) => item.id === itemId)

      cartItems.splice(itemIndex, 1)
      localStorage.setItem('cart', JSON.stringify(cartItems))
      this.cart = JSON.parse(localStorage.getItem('cart'))
    }
  }
}
</script>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.item-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.item-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 300px;
  height: 500px;
  border-radius: 10px;
  transition-duration: .3s;
  margin: 5px;
  padding: 1rem;
}
.item-box:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.item-box img {
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
}
.item-box .remove-btn {
  color: white;
  background-color: rgba(255, 99, 77, 0.7);
  width: 100%;
  padding: 1rem 0;
  border: none;
  border-radius: 7px;
  font-size: 16px;
  cursor: pointer;
  transition-duration: .3s;
}
.item-box .remove-btn:hover {
  background-color: rgba(255, 99, 77, 1);
}
.item-box .update-btn {
  color: white;
  background-color: rgba(39, 174, 96, 0.7);
  width: 100%;
  padding: 1rem 0;
  border: none;
  border-radius: 7px;
  font-size: 16px;
  cursor: pointer;
  transition-duration: .3s;
  margin: 0.5rem 0;
}
.item-box .update-btn:hover {
  background-color: rgba(39, 174, 96, 1);
}
.text-box {
  border: 1px solid black;
  border-radius: 5px;
  font-size: 18px;
  width: 93%;
  padding: 0.5rem 0.5rem;
  margin: 0 1rem;
}
</style>