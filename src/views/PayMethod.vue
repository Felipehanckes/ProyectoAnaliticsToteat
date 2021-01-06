<template>
  <div>
		<div class="container">
			<div class='pay-methods' v-for="method in payMethod" :key="method.nombre">
					<div v-show="method.monto > 0">
							<div class="pay-over-0">
								<h1 id='title'>{{method.nombre}}</h1> 
								<div class="method-summary">
									<h2>Total transado: ${{method.monto}}</h2>
									<h2>Total de transaciones realizadas: {{method.transacciones}}</h2>
								</div>
							</div>
					</div>
			</div>
			<h1>No presentan pagos con las siguientes plataformas:</h1>
			<div class="grid-container">
				<div class="pay-methods-0" v-for="method in payMethod" :key="method.nombre">
					<div class="pay-equal-0" v-if="method.monto === 0">
						<div class="equal-content">
							<h1 id='title'>{{method.nombre}}</h1> 
						</div>	
					</div>
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
			payMethod: {
				1000: {'nombre': 'Efectivo', 'monto': 0, 'transacciones': 0},
				1001: {'nombre': 'Efectivo Moneda Extranjera', 'monto': 0, 'transacciones': 0},
				2000: {'nombre': 'Tarjeta Crédito', 'monto': 0, 'transacciones': 0},
				3000: {'nombre': 'Tarjeta Débito', 'monto': 0, 'transacciones': 0},
				4000: {'nombre': 'Convenio', 'monto': 0, 'transacciones': 0},
				4500: {'nombre': 'OtroMedioPago', 'monto': 0, 'transacciones': 0},
				5000: {'nombre': 'Web Pay', 'monto': 0, 'transacciones': 0},
				5001: {'nombre': 'PayPal', 'monto': 0, 'transacciones': 0},
				5005: {'nombre': 'Zeleri', 'monto': 0, 'transacciones': 0},
				5010: {'nombre': 'MercadoPago QR', 'monto': 0, 'transacciones': 0},
				5011: {'nombre': 'MercadoPago Checkout', 'monto': 0, 'transacciones': 0},
				5012: {'nombre': 'PedidosYa', 'monto': 0, 'transacciones': 0},
				5013: {'nombre': 'PedidosYa Vouchers', 'monto': 0, 'transacciones': 0},
				5014: {'nombre': 'PedidosYa Cash Collection', 'monto': 0, 'transacciones': 0},
				5015: {'nombre': 'Rappi', 'monto': 0, 'transacciones': 0},
				5016: {'nombre': 'Rappi Pay', 'monto': 0, 'transacciones': 0},
				5020: {'nombre': 'Servipag', 'monto': 0, 'transacciones': 0},
				5022: {'nombre': 'Sodexo', 'monto': 0, 'transacciones': 0},
				5024: {'nombre': 'Amipass', 'monto': 0, 'transacciones': 0},
				5030: {'nombre': 'Passline', 'monto': 0, 'transacciones': 0},
				5031: {'nombre': 'Hambriento', 'monto': 0, 'transacciones': 0},
				5040: {'nombre': 'Cover Manager', 'monto': 0, 'transacciones': 0},
				5045: {'nombre': 'Redsys', 'monto': 0, 'transacciones': 0},
				5050: {'nombre': 'MACH', 'monto': 0, 'transacciones': 0},
				5079: {'nombre': 'Dejavoo', 'monto': 0, 'transacciones': 0},
				5080: {'nombre': 'TranCloud', 'monto': 0, 'transacciones': 0},
				5081: {'nombre': 'Square', 'monto': 0, 'transacciones': 0},
				5082: {'nombre': 'Stripe', 'monto': 0, 'transacciones': 0},
				5083: {'nombre': 'SumUp', 'monto': 0, 'transacciones': 0},
				5090: {'nombre': 'FactoryPay Transbank', 'monto': 0, 'transacciones': 0}
			}
		}	
	},
	computed: {
		...mapState(['info','filteredInfo']),
		realInfo(){
			console.log('debería actualizarse')
			if(this.filteredInfo === null && this.info){
				return this.info
			}
			else if(this.filteredInfo !== null){
				return this.filteredInfo
			}
			return null	
		}
	},
	created(){
		this.getAllId()
	},
	updated(){
		this.getAllId()
	},
	methods: {
		getAllId(){
			let count = 0
			if(this.realInfo !== null){
				this.realInfo.forEach(element => {
					if(element['dp']){
						element['dp'].forEach(pay => {
							if(pay['fp']){
								count += 1
								console.log(count)
							}
							else{
								console.log(pay['fp'])
							}
							pay['fp'].forEach(transaction =>{
								//console.log(transaction)
								if(this.payMethod[parseInt(transaction[0])] !== undefined){
									this.payMethod[parseInt(transaction[0])]['monto'] += transaction[1]
									this.payMethod[parseInt(transaction[0])]['transacciones'] += 1
								}
								else{
									this.payMethod[4500]['transacciones'] += 1
									this.payMethod[4500]['monto'] += transaction[1]
								}
							})
						})
					}
				})
			}
			else{
				if(this.info){
					this.info.forEach(element => {
						if(element['dp']){
							element['dp'].forEach(pay => {
								if(pay['fp']){
									count += 1
									console.log(count)
								}
								else{
									console.log(pay['fp'])
								}
								pay['fp'].forEach(transaction =>{
									//console.log(transaction)
									if(this.payMethod[parseInt(transaction[0])] !== undefined){
										this.payMethod[parseInt(transaction[0])]['monto'] += transaction[1]
										this.payMethod[parseInt(transaction[0])]['transacciones'] += 1
									}
									else{
										this.payMethod[4500]['transacciones'] += 1
										this.payMethod[4500]['monto'] += transaction[1]
									}
								})
							})
						}
					})
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.container{
	margin-left: 19%;
	max-width: 75%;
	
}
.pay-methods{
	display: flex;
	flex-direction: column;
	-ms-flex-align: start;
	border-radius: 5px;
}

.grid-container{
	display: flex;
  flex-wrap: wrap;
  width: 90%;
  grid-template-columns: repeat(3, 3fr);
  grid-gap: 15px;
  margin: 4%;
	columns: 3;
}
.pay-methods-0{
	max: 300px;
	margin: auto;
}
#title{
	background: rgba($color: #d6d9db, $alpha: 1.0);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding-bottom: 10px;
	padding-top: 10px;
}
.method-summary{
	margin-left: 0%;
	margin-right: auto;
	text-align: start;
}
.pay-over-0{
	max-height: 300px;
	border-bottom: 2px solid  #d6d9db;
	border-left:  2px solid  #d6d9db;
	border-right:  2px solid  #d6d9db;
	border-radius: 10px;
}

.pay-equal-0{
	width: 300px;
}
.equal-content{
  display: flex;
  flex-direction: column;
  width: 1fr;
}
</style>