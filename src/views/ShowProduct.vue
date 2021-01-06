<template>
  <div class="Container">
		<div class="header">
			<h1>{{name}}</h1>
			<h4>Id del producto: {{id}}</h4>
		</div>
		<div class="stats-container">
			<div class="info-container">
				<h2>Cantidad Total Vendida:</h2> 
				<div class="show-number"> 
					{{quantity}}
				</div>
			</div>
			<div class="info-container">
				<h2>Ingreso por Ventas de producto:</h2> 
				<div class="show-number"> 
					{{income}}
				</div>
			</div>
			<div class="info-container">
				<h2>Precio de venta Promedio:</h2> 
				<div class="show-number"> 
					{{price}}
				</div>
			</div>
			<h1>Desglose de ventas por día:</h1>
			<div class="content-grid">
				<div class="date-container" v-for="(date, key) in dates" :key="key">
					{{key}} : {{date}}
				</div>
			</div>
		</div>

  </div>

</template>

<script>


import { mapState } from "vuex";

  export default {
    data(){
			return{
				id: this.$route.params.id,
				name: null,
				income: 0,
				quantity: 0,
				extra: null,
				dates: {}
			}	
		},
		created(){
			this.getAllId()
		},
		computed: {
			...mapState(['info', 'filteredInfo']),
			price(){
        return parseInt(this.income/this.quantity)
			},
		},
		methods: {
			getAllId(){
				if(this.filteredInfo){
					let date = null
					this.filteredinfo.forEach(element => {
						element['dl'].forEach(el => {
							if( el['ip'] === parseInt(this.id)){
								if(this.name === null){
									this.name = el['np']
								}
								if(this.extra === null){
									this.extra = el['ex']
								}
								this.income += el['pr']
								this.quantity += el['ca']
								date = element['fc'].split('T')
								date = date[0].split('-')
								date = date[2] + '-' + date[1] + '-' + date[0]
								console.log(date)
								if(Object.keys(this.dates).includes(date)){
									this.dates[date] += el['ca']
								}
								else{
									this.dates[date] = el['ca']
								}
							}
						})
						
					})
				}
				else if(this.info){
					let date = null
					this.info.forEach(element => {
						element['dl'].forEach(el => {
							if( el['ip'] === parseInt(this.id)){
								if(this.name === null){
									this.name = el['np']
								}
								if(this.extra === null){
									this.extra = el['ex']
								}
								this.income += el['pr']
								this.quantity += el['ca']
								date = element['fc'].split('T')
								date = date[0].split('-')
								date = date[2] + '-' + date[1] + '-' + date[0]
								console.log(date)
								if(Object.keys(this.dates).includes(date)){
									this.dates[date] += el['ca']
								}
								else{
									this.dates[date] = el['ca']
								}
							}
						})
						
					})
				}
			}
		}
  }
</script>

<style lang="scss" scoped>

.show-number{
	margin-left: 15px;
	align-self: center;
	text-align: center;
	width: max-content;
	height: fit-content + 15px;
	align-content: center;
	font-size: 30px;
	border-radius: 80%;
	border: 1px solid #d6d9db;
}
.date-container{
	width: 20%;
}
.info-container{
	display: flex;
	flex-direction: row;
}
.stats-container{
	margin-left: 20%;
}
</style>