Vue.component('product-details',{
    template: `
    <ul>
       <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `,
    data() {
        return {
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        }
    }
})
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
    <div class="product-image">
            <img alt="#" :src="image" :alt="altText"/>
        </div>
        <div class="product-info>">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <span>{{ sale }}</span>
            <p v-if="variants[selectedVariant].variantQuantity > 10 && inStock">In Stock</p>
            <p v-else-if="variants[selectedVariant].variantQuantity <= 10 && variants[selectedVariant].variantQuantity > 0 && inStock">Almost sold out!</p>
            <p v-else :class="{ outOfStock: !inStock || variants[selectedVariant].variantQuantity <= 0 }">Out of Stock</p>
            <product-details></product-details>
            <p>Shipping: {{ shipping }}</p>
            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            >
            </div>
            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>
            <p>
                <a :href="link">More products like this</a>
            </p>
            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>
            <button
                    v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock || variants[selectedVariant].variantQuantity <= 0}"
            >
                Add to cart</button>
            <button v-if="cart > 0" v-on:click="deleteFromCart">Delete from cart</button>
        </div>
    </div>
    `,
    data() {
        return {
            product: "Socks",
            brand: "Vue Mastery",
            description: "A pair of warm, fuzzy socks.",
            selectedVariant: 0,
            altText: "A pair of socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            onSale: true,
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './assets/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        deleteFromCart() {
            this.cart -= 1;
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale && this.inStock) {
                return this.brand + ' ' + this.product + ' are on sale!';
            }
            else {
                return this.brand + ' ' + this.product + ' are not on sale.';
            }
        },
        shipping() {
            if (this.premium) {
                return "Free";
            }
            else {
                return 2.99;
            }
        }
    }
})
let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})