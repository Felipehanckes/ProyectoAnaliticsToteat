<template>
    <form @submit.prevent="filterCloseDate">
      <div class="filter">
        <div class="field">
          <b-field label="Fechas"></b-field>
          <datepicker clear-button :selected="changeLower" :format="dateFormat" v-model="lowerDate" placeholder="Filtrar desde" />
        </div>
        <div class="field">
          <datepicker 
            clear-button 
            :selected="changeUpper" :format="dateFormat" v-model="upperDate" placeholder="Filtrar hasta" />
        </div>
        <b-field class="button-filtro" :label-position="labelPosition">
            <b-input value="Filtrar" type="submit" class="button-filtro" v-on:click="pushToMain"></b-input>
        </b-field>
      </div>  
    </form>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { mapState } from 'vuex'
  
  export default {
    data() {
      return {
        upperDate: null,
        lowerDate: null,
        filteredInfo: null,
        dateFormat : 'dd-MM-yyyy',
        formated: false
      }
    },
    components: {
      Datepicker
    },
    computed: {
      ...mapState(['name', 'info']),
    },
    methods: {
      changeLower(event){
        if(event < this.lowerDate){
          this.lowerDate = event
        }
        else{
          this.upperDate = this.lowerDate
        }
      },
      changeUpper(event){
        if(event > this.lowerDate){
          this.upperDate = event
        }
      },
      filterCloseDate(){
        let info = this.info  
        if(this.formated === false){
          for(let i = 0; i < Object.keys(this.info).length; i++){
            let dateTime = info[i]['fc'].split('T')
            let date = dateTime[0].split('-')
            date = new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]))
            this.info[i]['fc'] = date
            info = this.info
          this.formated = true
          }
        }
        if(this.lowerDate){
          let a = info.filter( info => {
            return info.fc >= this.lowerDate
          })
          this.filteredInfo = a
        }
        if(this.upperDate && this.filteredInfo === null){
          this.filteredInfo = info.filter( info => info.fc <= this.upperDate)
        }
        else if(this.upperDate && this.filteredInfo != null){
          this.filteredInfo = this.filteredInfo.filter( info => info.fc <= this.upperDate)
        }
        else if(! this.lowerDate && ! this.lowerDate){
          this.filteredInfo = null
        }
        //this.filteredInfo = this.info.filter( info => info['fc'] < this.upperDate && info['fc'] > this.lowerDate) 
        //this.$emit('passFilter', this.filteredInfo)
        this.$store.dispatch('getFiltered', this.filteredInfo)
      },
      pushToMain(){
        if(this.$router.currentRoute['fullPath'] !== '/'){
          this.$router.push({ path : '/' })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

.field {
  padding: 15px;
  display: flex;
  flex-direction: column;
  max-width: 15%;
}

.filter {
  float: inline-start;
  display: flex;
  flex-direction: column;
  float: left;
  margin-left: 5px;
  align-items: baseline;
  position: fixed;
  width: 15%;
}

.content{
margin-left: 250px;
}

.button-filtro{
  margin: auto;
  width: 100px;
}

label{
    padding-right: 15px;
    margin-left: -5px;
}

</style>