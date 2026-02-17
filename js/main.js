let eventBus = new Vue()
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
            <p v-else :class="{ outOfStock: !inStock || variants[selectedVariant].variantQuantity <= 0}">Out of Stock</p>
            <product-details></product-details>
            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            >
            </div>
            <ul>
                <li v-for="(varian"></li>
            </ul>
            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>
            <p>
                <a :href="link">More products like this</a>
            </p>
            <button
                    v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock || variants[selectedVariant].variantQuantity <= 0}"
            >
                Add to cart</button>
            <button v-on:click="deleteFromCart">Delete from cart</button>
        <product-tabs :reviews="reviews"></product-tabs>
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
                    variantQuantity: 10,
                    variantSizes: [
                        {
                            sizeId: 1134,
                            sizeMeasure: 'S',
                            sizeQuantity: 2
                        },
                        {
                            sizeId: 1135,
                            sizeMeasure: 'M',
                            sizeQuantity: 1
                        },
                        {
                            sizeId: 1136,
                            sizeMeasure: 'L',
                            sizeQuantity: 7
                        },
                        {
                            sizeId: 1137,
                            sizeMeasure: 'XL',
                            sizeQuantity: 0
                        }
                    ]
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0,
                    variantSizes: [
                        {
                            sizeId: 1138,
                            sizeMeasure: 'S',
                            sizeQuantity: 1
                        },
                        {
                            sizeId: 1139,
                            sizeMeasure: 'M',
                            sizeQuantity: 0
                        },
                        {
                            sizeId: 1140,
                            sizeMeasure: 'L',
                            sizeQuantity: 3
                        },
                        {
                            sizeId: 1141,
                            sizeMeasure: 'XL',
                            sizeQuantity: 6
                        }
                    ]
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',
            this.variants[this.selectedVariant].variantId);
        },
        deleteFromCart() {
            this.$emit('delete-from-cart',
            this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        },
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
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

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
Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        },
        shipping: {
            type: String, Number,
            required: true
        },
        details: {
            type: Array,
            required: true
        },
        positiveCount: {
            type: Number,
            required: false
        }
    },
    template: `
    <div>
        <ul>
            <span class="tab"
            :class="{ activeTab: selectedTab === tab }" 
            v-for="(tab, index) in tabs"
             @click="selectedTab = tab"
             >{{ tab }}</span>
        </ul>
        <p>{{positiveCount}}</p>
        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                <p>{{review.name}}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                <p>Would recommend: {{review.recommend}}</p>
                </li>
            </ul>
        </div>
        <div v-show="selectedTab === 'Make a Review'">
         <product-review></product-review>
        </div>
        <div v-show="selectedTab === 'Shipping'">
            <p>Shipping: {{ shipping }}</p>
        </div>
        <div v-show="selectedTab === 'Details'">
            <product-details></product-details>
        </div>
    </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
            selectedTab: 'Reviews'
        }
    },
    computed: {
        shipping() {
            if (this.premium) {
                return "Free";
            }
            else {
                return 2.99;
            }
        },
    }
})
Vue.component('product-review',{
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <p>Would you recommend this product?</p>
        <label for="yes">Yes</label>
        <input type="radio" value="Yes" id="yes" name="recommend" v-model.number="recommend">
        <label for="no">No</label>
        <input type="radio" value="No" id="no" name="recommend" v-model.number="recommend">
        <p>
            <input type="submit" value="Submit">
        </p>
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend,
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recommendation required.")
            }
        },
    },
    computed: {
        positiveCount() {
            let count = 0;
            if(this.recommend === "Yes") {
                return count++;
            }
        }
    }
})
let app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        deleteProduct(id) {
            const index = this.cart.indexOf(id);
            if (index > -1) {
                this.cart.splice(index, 1);
            }
        }
    }
})