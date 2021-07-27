<template>
    <div class="container">
       <div v-if="$page.props.flash.message" class="alert alert-success alert-dismissible fade show mt-4 mb-1" role="alert">
            <span class="center-msg">Escola &nbsp;<strong >{{$page.props.flash.message}}</strong>&nbsp; Criada com sucesso</span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item active" aria-current="page">Escola </li>
        </ol>
        </nav>
        <div class="page-navigation font-weight-bold h3 mb-1"></div>
        <form class="create-user-form" @submit.prevent="submit">
           <h4>Escola</h4>
           <p></p>
            <div class="form-row ">
                <div class="form-group col-md-8">
                    <label for="apelido">Nome</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorAbbreviation" id="school_name" v-model="schoolForm.name">
                    <div class="text-danger" v-if="$page.props.errors.name"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{$page.props.errors.name}}</small></div>
                </div>
                <div class="form-group col-md-4">
                    <label for="name">Abreviatura</label>
                    <input type="text" class="form-control" id="school_abbreviation" v-bind:class="inputErrorAbbreviation" v-model="schoolForm.abbreviation">
                     <div class="text-danger" v-if="$page.props.errors.abbreviation"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.abbreviation}}</small></div>
                </div>
             </div>
             <button class="btn btn-primary" v-if="editUser===false" type="submit">Criar</button>
             <button class="btn btn-primary" v-if="editUser===true" type="button">Actualizar</button>
        </form>
        <div>
            <br>
            <br>
        </div>
        <form class="create-user-form">
           <h4>Cursos</h4>
           <p></p>
            <div class="form-row ">
                <div class="form-group col-md-8">
                    <label for="apelido">Nome</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorSchoolName" id="superadmin">
                    <div class="text-danger" v-if="$page.props.errors.superadmin"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{$page.props.errors.superadmin}}</small></div>
                </div>
                <div class="form-group col-md-4">
                    <label for="name">Abreviatura</label>
                    <input type="text" class="form-control" id="admin" v-bind:class="inputErrorSchoolName">
                     <div class="text-danger" v-if="$page.props.errors.admin"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.admin}}</small></div>
                </div>
             </div>
             <button class="btn btn-primary" type="button">Criar</button>
        </form>
        <div>
            <br>
            <br>
        </div>
        <form class="create-user-form">
           <h4>Níveis</h4>
           <p></p>
            <div class="form-row ">
                <div class="form-group col-md-8">
                    <label for="apelido">Nome</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorSchoolName" id="superadmin">
                    <div class="text-danger" v-if="$page.props.errors.superadmin"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{$page.props.errors.superadmin}}</small></div>
                </div>
                <div class="form-group col-md-4">
                    <label for="name">Abreviatura</label>
                    <input type="text" class="form-control" id="admin" v-bind:class="inputErrorSchoolName">
                     <div class="text-danger" v-if="$page.props.errors.admin"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.admin}}</small></div>
                </div>
             </div>
             <button class="btn btn-primary" type="button">Criar</button>
        </form>
    </div>
</template>
<script>
import Layout from '../shared/layout';


export default {
    layout:Layout,
    props:['configArray', 'editUser'],
     data(){
        return{
            schoolForm: {
                name:this.configArray['name'],
                abbreviation:this.configArray['abbreviation'],
                id:this.configArray['id']
            }
        }
    },

    methods:{
        /**
         * THIS METHOD SUBMITS THE FORM
         * */ 
      submit(){
        this.$inertia.post(`/school`, this.schoolForm);
      },
      /*** THIS METHOD DISPLAY THE MODAL ASKING THE USER IF HE/SHE WANTES TO CHANGE THE USER PASSWORD* */
      showPasswordModal(){
          this.passwordModal;
          if(this.passwordModal){
            $('#exampleModal').modal('show');

          }

          this.passwordModal=false;
        },
        showDeleteModal(){
             $('#showdeletemodal').modal('show');
        },
        deleteUser(){
            this.$inertia.delete(`/user/${this.user['0']['id']}`);
        },

    /***
    * THIS METHOD ENABLES THE USER INPUT
    */
      changeDisabledInputs(){
      let disabledPasswordInput=document.getElementById('password');
        disabledPasswordInput.removeAttribute('readonly');

        let disabledPasswordConfirmInput=document.getElementById('password_confirmation');
        disabledPasswordConfirmInput.removeAttribute('readonly');

        this.form.passwordctr=true;
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
        inputErrorStandard() {
            return {
            inputError: this.$page.props.errors.standard,
            'inputError:focus': this.$page.props.errors.standard
            }
        }
}
}


 
</script>

<style>
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

form h4{
    font-weight: 700;
}
@media screen and (min-width: 992px){
   .create-user-form, .page-navigation{
       margin-right: 10%;
       margin-left: 10%;       
   }
}
</style>