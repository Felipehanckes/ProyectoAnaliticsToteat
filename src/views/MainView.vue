<template>
  <div>
    <div class="content">
      <h1>Resumen General de órdenes cerradas:</h1>
      <div v-if="realInfo != null">
        <div>
          <h3> Ordenes totales cerradas: {{realInfo.length}}</h3>
          <h3> Comensales totales atendidos: {{customers}} </h3>
          <h3> Ventas totales: $ {{totalSold}} </h3>
          <h3> Propina recolectada total: $ {{totalTips}}</h3>
          <h3> Impuestos recaudados Totales: $ {{totalTax}} </h3>
          <h3> Productos diferentes vendidos: {{exclusives['ip']}}</h3>
          <h3> Total Productos vendidos: {{all['ip']}} </h3>
        </div>

      </div>
    </div>  
  </div>
</template>

<script>
import { mapState } from 'vuex'
//import DateFilter from '@/components/DateFilter.vue'
  
  export default {
    data() {
      return {
        name1: 'Tomás Urcelay',
        //filteredInfo: null,
        formated: false,
        totalProducts: null,
        exclusives: {},
        all: {},
      }
    },
//    components: {
//      DateFilter
//    },
    computed: {
      ...mapState(['name', 'info', 'filteredInfo']),
      realInfo(){
        if(this.filteredInfo === null){
          return this.info
        }
        else if(this.filteredInfo !== null){
          return this.filteredInfo
        }
        return null
      },
      customers(){
        if(this.filteredInfo === null){
          this.getExclusive(this.info, 'ip')
          this.getAll(this.info, 'ip')
          return this.info.reduce(function(prev,cur){
            return prev + parseInt(cur['qc'])
          }, 0)
        }
        else if(this.filteredInfo !== null){
          this.getExclusive(this.filteredInfo, 'ip')
          this.getAll(this.filteredInfo, 'ip')
          return this.filteredInfo.reduce(function(prev,cur){
            return prev + parseInt(cur['qc'])
          }, 0)
        }
        return null
      },
      totalSold(){
        if(this.filteredInfo === null){
          return this.info.reduce(function(prev,cur){
            return prev + parseInt(cur['xt'])
          }, 0)
        }
        else if(this.filteredInfo !== null){
          return this.filteredInfo.reduce(function(prev,cur){
            return prev + parseInt(cur['xt'])
          }, 0)
        }
        return null
      },
      totalTips(){
        if(this.filteredInfo === null){
          return this.info.reduce(function(prev,cur){
            return prev + parseInt(cur['xp'])
          }, 0)
        }
        else if(this.filteredInfo !== null){
          return this.filteredInfo.reduce(function(prev,cur){
            return prev + parseInt(cur['xp'])
          }, 0)
        }
        return null
      },
      totalTax(){
        if(this.filteredInfo === null){
          return this.info.reduce(function(prev,cur){
            return prev + cur['dl'].reduce(function(prev2, cur2){
              return prev2 + cur2['t'].reduce(function(prev3, cur3){
                return prev3 + parseInt(cur3[0])
              },0)
            },0)
          }, 0)
        }
        else if(this.filteredInfo !== null){
          return this.filteredInfo.reduce(function(prev,cur){
            return prev + cur['dl'].reduce(function(prev2, cur2){
              return prev2 + cur2['t'].reduce(function(prev3, cur3){
                return prev3 + parseInt(cur3[0])
              },0)
            },0)
          }, 0)
        }
        return null
      },
    },
    methods: {
      getExclusive(data, nemo){
        let pool = []
        data.forEach(element => {
          element['dl'].forEach(el =>{
            if(pool.includes(el[nemo]) === false){
              
              pool.push(el[nemo])
            }
          })
        this.exclusives[nemo] = pool.length
        })
      },
      getAll(data,nemo){
        let pool = []
        data.forEach(element => {
          element['dl'].forEach(el =>{
            pool.push(el[nemo])
            })
        this.all[nemo] = pool.length
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

.field {
  padding: 15px;
  display: flex;
  flex-direction: row;
}

.filter {
  float: inline-start;
  display: flex;
  flex-direction: column;
  float: left;
  margin-left: 5px;
  align-items: baseline;
  position: fixed;
  width: 250px;
}

.button-filtro{
  margin: auto;
  width: 100px;
}

</style>