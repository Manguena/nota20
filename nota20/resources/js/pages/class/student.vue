<template>
    <div class="container">
         <div v-if="$page.props.flash.message" class="alert alert-success alert-dismissible fade show mt-4 mb-1 createdAlert" role="alert">
            <span class="center-msg">Estudante&nbsp;<strong >{{$page.props.flash.message}}</strong>&nbsp;Removido com Sucesso</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <br/>
         <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
            <ol class="breadcrumb page-navigation">
                <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
                <li class="breadcrumb-item"><inertia-link href="/class/course">Estudante</inertia-link></li>
                <li class="breadcrumb-item" aria-current="page">Inscrição</li>
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
                    <th scope="col">Inscrição</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="studentData in studentConfigArray" :key="studentData.id">
                    <td><inertia-link  v-bind:href="'/student/edit/'+studentData.id" class="text-dark" >{{studentData.surname}}</inertia-link></td>
                    <td><inertia-link v-bind:href="'/student/edit/'+studentData.id" class="text-dark" >{{studentData.name}}</inertia-link></td>
                    <td><inertia-link v-bind:href="'/student/edit/'+studentData.id" class="text-dark">{{studentData.year}}</inertia-link></td>
                    <td><inertia-link v-bind:href="'/student/edit/'+studentData.id" class="text-dark">{{studentData.id_number}}</inertia-link></td>
                    <td><button class="table-button" v-on:click="enroll(studentData.id, classId)"  type="button"><font-awesome-icon class="table-edit" :icon="['fas', 'list']"/></button></td>
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
    props:['classId','className','studentConfigArray','urlParameter1','urlParameter2', 'lastPage','currentPage','route','isSearchable','queryString' ],
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
            this.$inertia.get(`/class/studentsearch/${this.classId}/${this.className}`, this.search)
            }, 
        enroll(id, classId){
            this.$inertia.post(`/class/enroll`, {
                id:id,
                classId:classId 
            })
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
    //console.log(this.className);
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
/*
.center-msg{
    display: flex;
    align-items: center;
    justify-content: center;
}
***/
.breadcrumb{
    background-color: #e2e2eb;
    font-size:large;
    padding-left:0;
    padding-bottom:0;
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

@media screen and (min-width: 992px){
   .create-user-form, .page-navigatio{
       margin-right: 10%;
       margin-left: 10%;       
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