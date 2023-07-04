<template>
    <div class="search-input-wrapper">
        <label for="inputSearch">{{label}}</label>
        <input type="text" class="form-control" v-model="searchItem" v-bind:class="inputSearchItemError" id="inputSearch"  autocomplete="off">
        <div class="text-danger" v-if="searchItemError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{searchItemError}}</small></div>  
        <span  v-if="searchItemSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
            <div  class="search-pane" v-if="enableSearchPane"> 
                <ul v-bind:class="searchPaneUlError">
                    <div v-for="item in searchResultArray" :key="item.id">
                        <li v-on:click="getSearchItem(item.name,item.id)" class="clickedItem">
                            <label><font-awesome-icon :icon="['fas', 'search']" class="search-img" />{{item.name}}</label>
                        </li>
                    </div>
                </ul>
            </div>
    </div>
</template>
<script>
import { logicalExpression } from '@babel/types';

export default {
    props:['searchRoute', 'label', 'searchItemError'],
    //inicio
    data(){
        return{
            searchItem:'',
            searchItemSpinner: false,
            enableSearchPane:true,
            searchResultArray:[]
        }

    },
    methods:{
         getSearchItem(itemName,itemId){
            this.searchItemSpinner=true;
            this.searchItem=itemName;
            // emits an event to the parent component
           this.$emit('send-search-item',itemName,itemId);
            // end of the event
            this.enableSearchPane=false;
            this.searchItemSpinner=false;
        },
        //enables and disables the searchPane     
        enableDisableSearchPane(){
           document.querySelector('body').addEventListener('click', event => {
            if(event.target.getAttribute('class')==='clickedItem'){
                this.enableSearchPane=false;
            }else if (event.target.getAttribute('class')!='clickedItem' && event.target.getAttribute('id')==='inputSearch'){
                this.enableSearchPane=true;
            }else{
                this.enableSearchPane=false;
             }
            });
        }
    },
    watch:{
          /**
         * Searches courses in the database and returns to the user
        */
        searchItem(){
            let that=this;
            this.searchItemSpinner=true;
             axios.get(`${that.searchRoute}=${that.searchItem}`)
            .then((response)=>{
               if(response['data'].hasOwnProperty('searchItemData')){
                   that.searchResultArray=[
                       {   id: -1,
                           name:'Pesquisa sem resultados'
                       }
                   ]
               }else{
                   if(response['data'].length===0){
                       that.searchResultArray=[
                       {   id: -1,
                           name:'Pesquisa sem resultados'
                       }
                   ]
                   }else{
                       that.searchResultArray=[...response['data']];
                   }
               }
               that.searchItemSpinner=false;
               
            })
            .catch((error)=>{
                if(error.response.status==401){
                    location.reload();
                }
            })
        }

    },
    //fim
    computed:{
        inputSearchItemError() {
            return {
            inputError: this.searchItemError,
            'inputError:focus': this.searchItemError
            }
        },
        searchPaneUlError(){
        return{
            'search-pane-ul':this.searchResultArray.length>=1
        }
    },
    },
    mounted(){
        this.enableDisableSearchPane();
    }
}
</script>

<style>
.inputError, .inputError:focus {
 border-color: #e3342f;
 box-shadow: 0px 0px 3px 0px #e3342f;
}

.search-input-wrapper{
    position:relative;
    display: flex;
    flex-direction: column;
}
.search-input-wrapper span{
    position: absolute;
    z-index: 100;
    right: 15px;
    top: 42px;
}

.search-pane{
    position: relative;
    display: flex;
}

.search-pane li{
    list-style-type: none;
    margin-left: -40px;
    height: 2rem;
    cursor: pointer;
    padding-top: 0.34rem;

}

.search-pane li:hover{
        background: grey;
}

.search-pane label{
    margin-left: 1.5rem;
    cursor: pointer;
}
.search-pane-ul{
    position: absolute;
    width: 100%;
    z-index: 5;
    border-radius: 5px;
    border-left: 1px solid #cac4bb;
    border-right: 1px solid #cac4bb;
    border-bottom: 1px solid #cac4bb;
    box-shadow: -5px 5px 10px 1px #cac4bb  , 5px 5px 10px 1px #cac4bb;
    background: #f8f9fa;
}
.search-pane a{
    display: block;
}

</style>