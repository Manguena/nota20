<template>
    <div class="container">
        <div v-if="$page.props.flash.message" class="alert alert-success alert-dismissible fade show mt-4 mb-1" role="alert">
            <span class="center-msg">Utilizador&nbsp;<strong >{{$page.props.flash.message}}</strong>&nbsp;Excluido com sucesso</span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        
        <nav style="breadcrumb-divider: '';" class="nav-margin-top" aria-label="breadcrumb">
            <ol class="breadcrumb page-navigation">
                <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
                <li class="breadcrumb-item"><inertia-link href="/report">Estudante</inertia-link></li>
                <li class="breadcrumb-item active" aria-current="page">Pauta</li>
            </ol>
        </nav>

       <div id="example-1">
            <div >
            </div>
      </div>

        <div class="list-user-form">
            <div class="table-responsive-sm">
                <div class="student-id">
                    <div>
                        <p> <span class="font-weight-bold">Apelido: </span>{{studentConfigArray.surname}}</p>
                        <p> <span class="font-weight-bold">Nome: </span>{{studentConfigArray.name}}</p>

                    </div>
                    <!--font-awesome-icon icon="fas fa-" /--->
                    <a v-bind:href="'/report/export/'+studentConfigArray['id']"><font-awesome-icon :icon="['fas', 'file-excel']" size="2x" class="excel-icon"/></a>
                    
                </div>

                <table class="table table-hover table-light user-table">
                    <thead>
                        <tr>
                        <th scope="col">Curso</th>
                        <th scope="col">Nivel</th>
                        <th scope="col">Turma</th>
                        <th scope="col">Disciplina</th>
                        <th scope="col">Nota</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="gradeData in gradeConfigArray" :key="gradeData.id">
                            <td><inertia-link  v-bind:href="'/student/edit/'" class="text-dark" >{{gradeData.course}}</inertia-link></td>
                            <td><inertia-link v-bind:href="'/student/edit/'" class="text-dark" >{{gradeData.level}}</inertia-link></td>
                            <td><inertia-link v-bind:href="'/student/edit/'" class="text-dark">{{gradeData.class}}</inertia-link></td>
                            <td><inertia-link v-bind:href="'/student/edit/'" class="text-dark">{{gradeData.subject}}</inertia-link></td>
                            <td><inertia-link href="/report/create" class="text-dark">{{gradeData.grade}}</inertia-link></td>   
                        </tr>
                    </tbody>
                </table>
            </div>
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
    props:['studentConfigArray','gradeConfigArray','urlParameter1','urlParameter2', 'lastPage','currentPage','route','isSearchable','queryString' ],
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
            this.$inertia.get(`/report/search`, this.search)
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
    console.log(this.studentConfigArray['id']);
},
mounted() {  
    document.title = "Nota 20 - Gerar Pauta";  
  }
    }
</script>


<style scoped>
.excel-icon{
color: #6b6316;
}

.student-id{
    display: flex;
    justify-content: space-between;
}

.list-user-form{
    background-color: #fdfdfe;
    padding: 1.25rem;
    margin-top: 0;
    border-radius:2px;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
}

.user-table{
    background-color: #e2e2eb;
}

.inputError, .inputError:focus {
 border-color: #e3342f;
 box-shadow: 0px 0px 3px 0px #e3342f;

}
.search-create{
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
}

.pen-icon{
    color: #6b6316;
    font-size: 1.2rem;

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