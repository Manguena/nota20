<template>
    <div class="container">
            <div v-if="$page.props.flash.message" class="alert alert-success alert-dismissible fade show mt-4 mb-1" role="alert">
                    <span class="center-msg">Escola &nbsp;<strong >{{$page.props.flash.message}}</strong>&nbsp; {{schoolAction}} com sucesso</span>                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
        
        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item active" aria-current="page">Escola </li>
        </ol>
        </nav>
   
        <!--- COURSES FORM--->
        <div>
            <br>
            <br>
        </div>
        <form class="create-user-form" >
           <h4>Níveis</h4>
            <p></p>
         <div class="form-row">
                <div class="form-group col-md-12 search-input-wrapper">
                    <label for="apelido">Nome</label>
                      <input type="text" class="form-control" id="levelSearch" v-model="searchCourse" autocomplete="off">
                            <span v-if="searchLevelSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
                            <div  class="search-pane" v-if="levelSearchPane"> 
                                <ul v-bind:class="searchPaneUl">
                                    <div v-for="item in searchCourseArray" :key="item.id">
                                        <li v-on:click="getLevel(item.name)" class="levelItem">
                                            <label><font-awesome-icon :icon="['fas', 'search']" class="search-img" />  {{item.name}}</label>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                </div>
             </div>
            <div class="form-row">
                <div class="form-group col-md-9">
                    <label for="apelido">Nome</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorCourse"  id="superadmin">
                    <div class="text-danger" > <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{}}</small></div>
                </div>
                <div class="form-group col-md-3">
                    <label for="name" class="remove_label">&nbsp;</label>
                        <button class="btn btn-primary form-control" type="button">
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
                            Introduzir
                        </button>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-8">
                    <label for="apelido">Editar</label>
                    <input type="text" class="form-control"  id="superadmin">
                    <div class="text-danger"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{}}</small></div>
                </div>
                <div class="form-group col-md-4">
                    <label for="name" class="remove_label">&nbsp;</label>
                    <div class="btn-group">
                        <button class="btn btn-success form-control" v-on:click="updateCourse()" type="button">
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
                            Actualizar
                        </button>
                        <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" v-on:click="cancelCourseUpdate()">Cancelar</a>
                        </div>
                    </div>
                </div>
             </div>  
        </form>
    </div>
</template>
<script>
import Layout from '../shared/layout';


export default {
    layout:Layout,
    props:['schoolConfigArray', 'createSchool'],
     data(){
        return{
            levelSearchPane:true,
            searchCourse:'',
            searchCourseArray:[],
            searchLevelSpinner:false
        }
    },
    methods:{
        getLevel(levelName){
      
            this.searchLevelSpinner=true;
            this.searchCourse=levelName;
            this.levelSearchPane=false;
            this.searchLevelSpinner=false;
        //fim
        },
        /***
        * enabling the searchpane if the input gets focus
         */
  
        enableSearchPane(){
            let levelSearchInput = document.getElementById('levelSearch');
          //  console.log(levelSearchInput);
            levelSearchInput.addEventListener('focus', (event) => {
            this.levelSearchPane=true;
            console.log(`i got focus`);
             });
        
        }
    },
    watch:{
        /**
         * The method searches courses in the database and returns to the user
        */
       test(){
           console.log(`Test has changed`);
       },
        searchCourse(){
            let that=this;
            let a=this.searchCourse;
            //this.$inertia.get('/subject/search', {a});
            this.searchLevelSpinner=true;
             axios.get(`/subject/search?searchLevelData=${that.searchCourse}`)
            .then((response)=>{
               if(response['data'].hasOwnProperty('searchLevelData')){
                   that.searchCourseArray=[
                       {   id: 1001,
                           name:'Pesquisa sem resultados'
                       }
                   ]
               }else{
                   if(response['data'].length===0){
                       that.searchCourseArray=[
                       {   id: 1001,
                           name:'Pesquisa sem resultados'
                       }
                   ]
                   }else{
                       that.searchCourseArray=[...response['data']];
                   }
               
               
               }
               that.searchLevelSpinner=false;

               
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    },
    computed: {
        inputErrorSchoolName() {
            return {
            inputError: this.$page.props.errors.name,
            'inputError:focus': this.$page.props.errors.name
            }
        },
        inputErrorAbbreviation() {
            return {
            inputError: this.$page.props.errors.abbreviation,
            'inputError:focus': this.$page.props.errors.abbreviation
            }
        },
        inputErrorCourse() {
            return {
            inputError: this.courseError,
            'inputError:focus': this.courseError
            }
        },
        inputErrorUpdateCourse() {
            return {
            inputError: this.updateCourseError,
            'inputError:focus': this.updateCourseError
            }
        },
    inputErrorLevel(){
         return {
            inputError: this.levelError,
            'inputError:focus': this.levelError
        }
    }, 
    inputErrorUpdateLevel(){
        return {
            inputError: this.updateLevelError,
            'inputError:focus': this.updateLevelError
        }
    },
    searchPaneUl(){
        return{
            'search-pane-ul':this.searchCourseArray.length>=1
        }
    }
},
mounted(){
    //this.enableSearchPane();

    //this.disableSearchPane();
    document.querySelector('body').addEventListener('click', event => {
  //button.textContent = `Click count: ${event.detail}`;
    if(event.target.getAttribute('class')==='levelItem'){
        console.log(`level selected`);
        this.levelSearchPane=false;
    }else if (event.target.getAttribute('class')!='levelItem' && event.target.getAttribute('id')==='levelSearch'){
        this.levelSearchPane=true;
    }else{
        this.levelSearchPane=false;
    }

});
}, 

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
@media screen and (min-width: 992px){
   .create-user-form, .page-navigation{
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