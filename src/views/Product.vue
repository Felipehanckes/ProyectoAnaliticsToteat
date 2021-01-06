<template>
  <div>
    <div v-if="realInfo != null" class="content">
      <div v-if="Object.keys(products).length > 0" class="content-grid">  
        <product-preview-card 
        v-for="(product,key) in products"
        :key=key
        :product=product 
        :id=key
        ></product-preview-card>
      </div>
    </div>  
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductPreviewCard from '@/components/ProductPreviewCard.vue'


  
  
  export default {
  components: { ProductPreviewCard },
    data() {
      return {
        formated: false,
        products: {}
      }
    },

    computed: {
      ...mapState(['name', 'info', 'filteredInfo']),
      realInfo(){
        console.log('debería actualizarse')
        if(this.filteredInfo === null && this.info){
          this.getNames(this.info)
          return this.info
        }
        else if(this.filteredInfo !== null){
          this.getNames(this.filteredInfo)
          return this.filteredInfo
        }
        return null
      },
      keys(){
          return Object.keys(this.products)
      }
    },
    methods: {
      getNames(data){
        let pool = []
        data.forEach(element => {
          element['dl'].forEach(el =>{
            if(pool.includes(el['ip']) === false){
              pool.push(el['ip'])
              this.products[el['ip']] = {
                'name':el['np'],
                'extra': el['ex'],
                'quantity': parseInt(el['ca']),
                'income': parseInt(el['pr']),
                'discounts': 0,
              }
              el['d'].forEach(disc => {
                  if(disc.length){
                      this.products[el['ip']['discounts']] += parseInt(disc[0])
                  }
              })
            }
            else{
              this.products[el['ip']]['quantity'] += parseInt(el['ca'])
              this.products[el['ip']]['income'] += parseInt(el['pr'])
              el['d'].forEach(disc => {
                  if(disc.length){
                      this.products[el['ip']['discounts']] += parseInt(disc[0])
                  }
              })
            }
          })
        }) 
        //pool.forEach(element => {
        //})
      }
    }
  }
</script>

<style lang="scss" scoped>

.content{
margin-left: 15%;
}

.button-filtro{
  margin: auto;
  width: 100px;
}



</style>