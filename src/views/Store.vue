<template>
  <div class="store">
    <h1>Store</h1>
    <div class="item-container">
      <div
        v-for="item in items"
        :key="item.id"
        class="item-box">
        <p>{{ item.name }}</p>
        <img
          :src="item.imageUrl"
          :alt="item.name" />
        <button
          class="remove-btn"
          :disabled="!isInCart(item.id)"
          @click="removeFromCart(item.id)">
          Remove from cart
        </button>
        <button
          class="add-btn"
          @click="addToCart(item.id)">
          Add to cart
        </button>
      </div>
    </div>
  </div>
  <button
    class="checkout-btn"
    @click="$router.push({ name: 'Cart' })">
    Check out
  </button>
</template>

<script>
export default {
  name: 'Store',
  data () {
    return {
      items: [
        {
          id: 1,
          imageUrl: 'https://cdn-icons-png.flaticon.com/512/765/765560.png',
          name: 'Grape'
        },
        {
          id: 2,
          imageUrl: 'https://cdn-icons-png.flaticon.com/512/1728/1728729.png',
          name: 'Orange'
        },
        {
          id: 3,
          imageUrl: 'https://cdn-icons-png.flaticon.com/512/415/415733.png',
          name: 'Apple'
        }
      ],
      cart: []
    }
  },
  mounted () {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart'))
    }
  },
  methods: {
    isInCart (itemId) {
      if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]))
      }

      return this.cart.find((item) => item.id === itemId)
    },
    addToCart (itemId) {
      this.isInCart(itemId)

      const item = this.items.find((item) => item.id === itemId)
      const cartItems = JSON.parse(localStorage.getItem('cart'))
      const itemInCart = cartItems.findIndex((cartItem) => cartItem.id === item.id)

      if (itemInCart !== -1) {
        cartItems[itemInCart].amount += 1
      } else {
        cartItems.push({
          ...item,
          amount: 1
        })
      }
      
      localStorage.setItem('cart', JSON.stringify(cartItems))
      this.cart = JSON.parse(localStorage.getItem('cart'))
    },
    removeFromCart (itemId) {
      this.isInCart(itemId)

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
.store {
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
  margin-bottom: 0.5rem;
}
.item-box .remove-btn:hover {
  background-color: rgba(255, 99, 77, 1);
}
.item-box .remove-btn:disabled {
  background-color: lightslategray;
  cursor: not-allowed;
}
.item-box .add-btn {
  color: white;
  background-color: rgba(39, 174, 96, 0.7);
  width: 100%;
  padding: 1rem 0;
  border: none;
  border-radius: 7px;
  font-size: 16px;
  cursor: pointer;
  transition-duration: .3s;
}
.item-box .add-btn:hover {
  background-color: rgba(39, 174, 96, 1);
}
.checkout-btn {
  width: 100%;
  padding: 1rem 0;
  background-color: rgba(41, 128, 185, 0.7);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 22px;
  cursor: pointer;
  transition-duration: .3s;
}
.checkout-btn:hover {
  background-color: rgba(41, 128, 185, 1);
}
</style>