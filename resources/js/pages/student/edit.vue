<template>
    <div class="container">
       <div v-if="flashMessage" class="alert alert-success alert-dismissible fade show mt-4 mb-1 createdAlert" role="alert">
        <span class="center-msg">Estudante&nbsp;<strong >{{flashMessage.message}}</strong>&nbsp;Actualizado com sucesso</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link href="/student"> Estudante</inertia-link></li>
            <li class="breadcrumb-item active" aria-current="page">Criar: {{form.surname}} </li>
        </ol>
        </nav>
        <div class="page-navigation font-weight-bold h3 mb-1"></div>  
        <form class="create-user-form">
            <div class="form-row ">
                <div class="form-group col-md-4">
                    <label for="apelido">Apelido</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorSurname" id="surname" v-model="form.surname" >
                    <div class="text-danger" v-if="surnameError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{surnameError}}</small></div>
                </div>
                <div class="form-group col-md-8">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorName" id="name" v-model="form.name">
                    <div class="text-danger" v-if="nameError"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{nameError}}</small></div>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-8">
                    <label for="email">Documento de Identificação</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorIdNumber" id="id_number" v-model="form.id_number">
                    <div class="text-danger" v-if="id_numberError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{id_numberError}}</small></div>
                </div>
                <div class="form-group col-md-4">
                    <label for="id_number">Ano da matrícula</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorYear" id="year" v-model="form.year">
                    <div class="text-danger" v-if="yearError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{yearError}}</small></div>
                </div>
             </div>
             
             <button class="btn btn-primary" type="button" v-on:click="update">Actualizar</button>
             <button class="btn btn-danger" type="button" v-on:click="showDeleteModal">Delete</button>

        </form>
        <!---MODAL ASKING THE USER IF HE/SHE REALLY WANTS TO CHANGE THE USER PASSWORD--->
        <!----MODAL ASKING USER IF HE/SHE REALLY WANT TO MAKE A DELETE -->
        <div class="modal fade" id="showdeletemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><span class="badge badge badge-danger"> <font-awesome-icon :icon="['fas', 'user-minus']" /> Excluir</span></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                 Deseja excluir o estudante?
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>
                    <button type="button" v-on:click="deleteStudent" class="btn btn-primary" data-dismiss="modal">Sim</button>
                </div>
                </div>
            </div>
        </div>
        <!---MODAL ASKING USER IF HE/SHE REALLY WANT TO MAKE A DELETE---->
    </div>
</template>
<script>
import Layout from '../shared/layout';
import NProgress from 'nprogress';

export default {
    props:['student'],
    layout:Layout,
    data(){
        return{
            flashMessage:null,
            surnameError:null,
            nameError:null,
            id_numberError:null,
            yearError:null,
            form: {
                surname:this.student[0]['surname'],
                name:this.student[0]['name'],
                id_number:this.student[0]['id_number'],
                year:this.student[0]['year']
            }
        }

    },

    methods:{
      update(){
        let that=this;
        NProgress.start();
        //this.$inertia.patch(`/student/${this.student[0]['id']}`,this.form)
        axios.patch(`/student/${this.student[0]['id']}`,this.form)
        .then(response=>{ 
            //console.log(response);
            that.surnameError=null;
            that.nameError=null;
            that.id_numberError=null;
            that.yearError=null;

            if(response.hasOwnProperty('data')){
                //Deal with the data returned from the server
                let ServerResponse=response['data'];
                if (ServerResponse.hasOwnProperty('message')){
                    that.flashMessage=response['data'];
                }else{
                if(ServerResponse.hasOwnProperty('surname')){
                        that.surnameError=response['data']['surname'][0];
                        console.log(response);
                    }
                    if(ServerResponse.hasOwnProperty('name')){
                        that.nameError=response['data']['name'][0];
                    }
                    if(ServerResponse.hasOwnProperty('id_number')){
                        that.id_numberError=response['data']['id_number'][0];
                    }
                    if(ServerResponse.hasOwnProperty('year')){
                        that.yearError=response['data']['year'][0];
                    }
            }

                NProgress.done();
            }
           
        })
        .catch(error=>{
            NProgress.done();
            location.reload();
            //console.log(error);
        })
      }, 
      deleteStudent(){
        //console.log(this.student[0]['id']);
        this.$inertia.delete(`/student/${this.student[0]['id']}`);
      },
      showDeleteModal(){
             $('#showdeletemodal').modal('show');
        }
    },
    computed: {
        inputErrorSurname() {
            return {
            inputError: this.surnameError,
            'inputError:focus': this.surnameError
            }
        },
        inputErrorName() {
            return {
            inputError: this.nameError,
            'inputError:focus': this.nameError
            }
        },
        inputErrorIdNumber() {
            return {
            inputError: this.id_numberError,
            'inputError:focus': this.id_numberError
            }
        },
        inputErrorYear() {
            return {
            inputError: this.yearError,
            'inputError:focus': this.yearError
            }
        }
        
},
mounted() {  
    document.title = "Nota 20 - Editar Estudante";  
  }
}

</script>

<style>
.create-user-form{
    background-color: #fdfdfe;
    padding: 1.25rem;
    margin-top: 3rem;
    border-radius:2px ;
}

.center-msg{
    display: flex;
    align-items: center;
    justify-content: center;
}

.inputError, .inputError:focus {
 border-color: #e3342f;
 box-shadow: 0px 0px 3px 0px #e3342f;

}

.breadcrumb{
    background-color: #e2e2eb;
    font-size:large;
    padding-left:0;
    padding-bottom:0;
}

.page-navigation{
    margin-top: 2rem;
}

@media screen and (min-width: 992px){
   .create-user-form, .createdAlert, .page-navigation{
       margin-right: 10%;
       margin-left: 10%;       
   }
}
</style>