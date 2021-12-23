<template>
    <div class="container">
        
        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item active" aria-current="page">Curso</li>
        </ol>
        </nav>
        <!---COURSE FORM--->
        <form class="create-user-form" >
           <h4 id="">Cursos</h4>
        <p></p>
         <div class="form-row">
                <div class="form-group col-md-12">
                    <Searchpane
                        v-bind:searchRoute="searchRoute" 
                        v-bind:label="label"
                        v-bind:searchItemError="searchItemError"
                        v-on:send-search-item="getSentSearchItem"
                    >
                    </Searchpane>
                </div>

         </div>
        <div class="table-responsive-sm">
            <table class="table table-hover table-light user-table">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in courseArray" :key="item.id"> 
                        <td>
                            <inertia-link v-bind:href="'/class/'+item.name+'/'+item.id">{{item.name}}</inertia-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> 
        
        </form>
            <!--Link for the searched course to be clicked programmatically-->
            <inertia-link id="subjectLink" v-bind:href="'/class/'+searchItemName+'/'+searchItemId"></inertia-link> 
            
        <div class="course-pagination">
            <Pagination 
                v-bind:lastPage="lastPage"
                v-bind:currentPage="currentPage"
                v-bind:route="route"
                v-bind:isSearchable="isSearchable"
                v-bind:queryString="queryString"
            >
            </Pagination>
        </div>


    </div>
</template>
<script>
import Layout from '../shared/layout';
import Pagination from '../shared/pagination';
import Searchpane from '../shared/searchpane';



export default {
    components:{
        Pagination,
        Searchpane
    },
    layout:Layout,
    props:[
        //Pagination props
        'courseArray', 
        'lastPage',
        'currentPage',
        'route',
        'isSearchable',
        'queryString',
        // searchPane props
        ],
     data(){
        return{
          //variables to send to searchpane component
          searchRoute:'/class/search?searchItemData',
          label:'Pesquisar curso',
          searchItemError:'',
          searchItemName:'',
          searchItemId:'',
          subjectListRoute:''
        }
    },
    methods:{
        /**
         * receives data from the child event
         * */ 
        getSentSearchItem(itemName,itemId){
            if(itemName=='Pesquisa sem resultados'){
                this.searchItemError=itemName;
            }
            else{
                this.searchItemError='';
                this.searchItemName=itemName;
                this.searchItemId=itemId;

                // wait for 3 (give enough time for the dom t) milliseconds before clicking the link
                setTimeout(() => {  
                     document.getElementById("subjectLink").click();
                }, 3);
                
            }

        }
    
    }
}
</script>

<style scoped>
.breadcrumb{
    background-color: #e2e2eb;
    font-size:large;
    padding-left:0;
    padding-bottom:0;
}
.create-user-form{
    background-color: #fdfdfe;
    padding: 1.25rem;
    margin-top: 0;
    border-radius:2px ;
}

.course-name{
    margin-bottom: 1rem;
    margin-top: 1.5rem;
}

.inputError, .inputError:focus {
 border-color: #e3342f;
 box-shadow: 0px 0px 3px 0px #e3342f;
}

.page-navigation{
    margin-top: 2rem;
}

.center-msg{
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn-group, .btn-group-vertical {
    position: relative;
    display: flex;
    vertical-align: middle;
}

form h4{
    font-weight: 700;
}

.table-light, .table-light > th, .table-light > td {
    background-color: #e2e2eb;
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

.table-delete{
    color: #dc2020;
}

.table-edit{
    color: #6b6316;
}

.table-button{
    background-color: #e2e2eb;
}
.course-pagination{
    margin-top: 1rem;
}
@media screen and (min-width: 992px){
   .create-user-form, .page-navigation, .course-name, .course-pagination {
       margin-right: 10%;
       margin-left: 10%;       
   }

}

@media screen and (max-width: 767px){
   .remove_label{
      display: none;       
   }
}
</style>