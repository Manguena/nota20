<template>
    <div class="container">

        <div v-if="$page.props.flash.message" class="alert alert-danger alert-dismissible fade show mt-4 mb-1" role="alert">
            
            <span v-if="$page.props.flash.message.indexOf('estudante')!=-1" class="center-msg">{{$page.props.flash.message}}</span>
            <span v-else class="center-msg">Estudante&nbsp;<strong >{{$page.props.flash.message}}</strong>&nbsp;Removido com sucesso</span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <nav style="breadcrumb-divider: '';" class="nav-margin-top" aria-label="breadcrumb">
            <ol class="breadcrumb page-navigation">
                <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
                <li class="breadcrumb-item active" aria-current="page">Estudante</li>
            </ol>
        </nav>
            <div class="search-create">
                <form>
                    <div class="form-row">
                        <div class="col">
                        <input type="text" id="input1" class="form-control" v-bind:class="inputErrorSurname" v-model="search.surname" placeholder="apelido">
                        <div class="text-danger" v-if="$page.props.errors.surname"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.surname}}</small></div>
                        </div>
                        <div class="col">
                        <input type="text" id="input2" class="form-control" v-bind:class=" inputErrorYear" v-model="search.year" placeholder="ano de matricula">
                        <div class="text-danger" v-if="$page.props.errors.year"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.year}}</small></div>
                        </div>
                        <div class="col">
                             <button type="button" v-on:click="searchBar" class="btn btn-primary search-group-btn">
                                <span>Pesquisar</span><font-awesome-icon :icon="['fas', 'search']" class="search-img" />
                             </button>
                        </div>
                    </div>
                </form>
                 <inertia-link href="/student/create" class="btn btn-primary search-create-btn">Criar <label>Estudante</label></inertia-link>  
        </div>

       <div id="example-1">
            <div >
            </div>
      </div>


        <div class="table-responsive-sm">
            <table class="table table-hover table-light user-table">
                <thead>
                    <tr>
                    <th scope="col">Apelido</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Ano de matricula</th>
                    <th scope="col">Documento de Identificacao</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="studentData in studentConfigArray" :key="studentData.id">
                    <td><inertia-link  v-bind:href="'/student/edit/'+studentData.id" class="text-dark" >{{studentData.surname}}</inertia-link></td>
                    <td><inertia-link v-bind:href="'/student/edit/'+studentData.id" class="text-dark" >{{studentData.name}}</inertia-link></td>
                    <td><inertia-link v-bind:href="'/student/edit/'+studentData.id" class="text-dark">{{studentData.year}}</inertia-link></td>
                    <td><inertia-link v-bind:href="'/student/edit/'+studentData.id" class="text-dark">{{studentData.id_number}}</inertia-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination 
        v-bind:lastPage="lastPage"
        v-bind:currentPage="currentPage"
        v-bind:route="route"
        v-bind:isSearchable="isSearchable"
        v-bind:queryString="queryString"
        v-bind:urlParameter1="urlParameter1"
        v-bind:urlParameter2="urlParameter2"

        >
        </Pagination>

    </div>
</template>
<script>
import Layout from '../shared/layout';
import Pagination from '../shared/pagination';

export default {
    components:{
        Pagination
    },
    layout:Layout,
    props:['studentConfigArray','urlParameter1','urlParameter2', 'lastPage','currentPage','route','isSearchable','queryString' ],
    data: function(){
        return{
            search:{
               surname:null,
               year:null 
            }
            
        }
    },
    methods:{
        searchBar(){
            this.$inertia.get(`/student/search`, this.search)
            }
        },
    computed: {
        inputErrorSurname() {
            return {
            inputError: this.$page.props.errors.surname,
            'inputError:focus': this.$page.props.errors.surname
            }
        },
        inputErrorYear() {
            return {
            inputError: this.$page.props.errors.year,
            'inputError:focus': this.$page.props.errors.year
            }
        }
},
created(){
    console.log(this.route);
},
mounted() {  
    document.title = "Nota 20 - Estudante";  
  }
    }
</script>


<style scoped>
.inputError, .inputError:focus {
 border-color: #e3342f;
 box-shadow: 0px 0px 3px 0px #e3342f;

}
.search-create{
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
}

.center-msg{
    display: flex;
    align-items: center;
    justify-content: center;
}

.data-table-input{
    max-width: 350px;
    min-width: 150px;
}

.search-create-btn{
    margin-left: auto;
}

.search-create-btn label, .search-group-btn span{ 
    display: inline;
    margin: 0;
}

.table-light thead th{
        border-bottom-color: #818d99;
}

.table-light th, .table-light td, .table-light tbody + tbody {
    border-color:#818d99;;
}

@media screen and (max-width: 576px){
    .data-table-input{
        margin-right: 1rem;
    }
.search-create-btn{
margin-left:auto;

}

   .search-group-btn span{ 
    width: 0;
    height: 0;
    display: none;
}

}

@media screen and (max-width:800px){
    .search-create-btn label{ 
    width: 0;
    height: 0;
    display: none;
}
}

@media screen and (min-width: 577px){
   .search-img{
       display: none;
   }
}
</style>