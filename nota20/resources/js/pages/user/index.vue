<template>
    <div class="container">
        <div v-if="$page.props.flash.message" class="alert alert-success alert-dismissible fade show mt-4 mb-1" role="alert">
            <span class="center-msg">Utilizador&nbsp;<strong >{{$page.props.flash.message}}</strong>&nbsp;Excluido com sucesso</span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
            <ol class="breadcrumb page-navigation">
                <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
                <li class="breadcrumb-item active" aria-current="page">Utilizador </li>
            </ol>
        </nav>

        <div class="search-create">   
            <form @submit.prevent="submit" class="input-group data-table-input">
                <input type="text" id="searchbar"
                 v-on:keyup.enter="submit"
                 v-model="form.searchbar" 
                 class="form-control" 
                 placeholder="Pesquise o utilizador" 
                 aria-label="Text input with segmented dropdown button">
                <div class="input-group-append">
                    <button type="submit" class="btn btn-primary search-group-btn">
                        <span>Pesquisar</span><font-awesome-icon :icon="['fas', 'search']" class="search-img" />
                    </button>
                </div>
            </form>
                 <inertia-link href="/user/create" class="btn btn-primary search-create-btn">Criar <label>utilizador</label></inertia-link>  
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
                    <th scope="col">Email</th>
                    <th scope="col">Perfil</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="userdata in useraArray" :key="userdata.id">
                    <td><inertia-link class="text-dark" :href="userdata.editUri">{{userdata.surname}}</inertia-link></td>
                    <td><inertia-link class="text-dark" :href="userdata.editUri">{{userdata.nome}}</inertia-link></td>
                    <td><inertia-link class="text-dark" :href="userdata.editUri">{{userdata.email}}</inertia-link></td>
                    <td><inertia-link class="text-dark" :href="userdata.editUri">{{userdata.role}}</inertia-link></td>
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
    props:['useraArray', 'lastPage','currentPage','route','isSearchable','queryString' ],
    data: function(){
        return{
            form:{
               searchbar:null 
            }
            
        }
    },
    methods:{
        submit(){
            this.$inertia.get('/user', this.form)}
        },
        mounted() {  
         document.title = "Nota 20 - Utilizador";  
  }
    }
    
 
</script>

<style>

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

.page-navigation{
    margin-top: 2rem;
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

.search-create-btn label, .search-group-btn span{ 
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