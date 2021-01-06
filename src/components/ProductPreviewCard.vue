<template>
	<div>
			<button
			class="button is-primary is-medium"
			@click="isCardModalActive = true">
				<h3 id='title'> {{product['name']}}</h3>
			</button>
			<b-modal v-model="isImageModalActive">
				<div class='base-component'> 
					<h5> ID producto: {{id}}</h5>
					<router-link class="event-link" :to="{name: 'product-show', params: { id: this.id }}">
							<div class='content-block-up'>
								<h3> Producto es extra: {{product['extra']}}</h3>
								<h3 id='second'> Cantidad Vendida: {{product['quantity']}}</h3> 
							</div>
							<div class='content-block-down'>
								<h2> Ingreso: ${{product['income']}}</h2>
								<h2> Descuentos por producto: {{product['discounts']}}</h2>
								<h2> Precio de venta promedio: ${{price}} </h2>
							</div>
					</router-link>
				</div>
			</b-modal>
	</div>
</template>

<script>
  const modalShow = {
      props: ['id', 'product'],
      template: `
        <div> Hello </div>
      `
        //<div class="Container">
        //  <div class="header">
        //    <h1>{{product['name']}}</h1>
        //    <h4>Id del producto: {{id}}</h4>
        //  </div>
        //  <div class="stats-container">
        //    <div class="info-container">
        //      <h2>Cantidad Total Vendida:</h2> 
        //      <div class="show-number"> 
        //        {{quantity}}
        //      </div>
        //    </div>
        //    <div class="info-container">
        //      <h2>Ingreso por Ventas de producto:</h2> 
        //      <div class="show-number"> 
        //        {{income}}
        //      </div>
        //    </div>
        //    <div class="info-container">
        //      <h2>Precio de venta Promedio:</h2> 
        //      <div class="show-number"> 
        //        {{price}}
        //      </div>
        //    </div>
        //    <h1>Desglose de ventas por día:</h1>
        //    <div class="content-grid">
        //      <div class="date-container" v-for="(date, key) in dates" :key="key">
        //        {{key}} : {{date}}
        //      </div>
        //    </div>
        //  </div>
        //</div>
    }


export default {
	props: ['id', 'product'],
	data(){
		return{
			isModalActive: false
		}
	},
  computed:{
      price(){
          return parseInt(this.product['income']/this.product['quantity'])
      }
	},
	methods: {
		//routeTo(){
		//	this.$router.push()
		//},
    cardModal(){
      this.$buefy.modal.open({
        parent: this,
        component: modalShow,
        hasModelCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        props: [this.id, this.product]
      })
    }
	}
}
</script>

<style lang="scss" scoped>
.base-component{
  width: 450px;
  border: 2px rgba($color: #d6d9db, $alpha: 1.0) solid;
  border-radius: 5px;
}
.content-block-up{
  display: flex;
  flex-direction: row;
  margin: 4%;
}
.content-block-down{
  text-align: start;
  margin-left: 4%;
  margin-right: auto;
}
.event-link {
	color: #2c3e50;
  text-decoration: none;
  font-weight: 100;
}
#second{
    margin-left: auto;
}

#ID {
  margin-top: -40px;
  margin-bottom: -15px;
}
button{
	display: flex;
	flex-wrap: display-inside;
	text-overflow: ellipsis;
	white-space: normal;
	height: 80px;
	width: 450px;
}
</style>