<template>
    <div class="container">
       <div v-if="$page.props.flash.message" class="alert alert-success alert-dismissible fade show mt-4 mb-1" role="alert">
            <strong class="center-msg" >{{$page.props.flash.message}}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item active" aria-current="page">Configuração </li>
        </ol>
        </nav>
        <div class="page-navigation font-weight-bold h3 mb-1"></div>
        <form class="create-user-form" @submit.prevent="submit">
           <h4>Número de utilizadores</h4>
           <p></p>
            <div class="form-row ">
                <div class="form-group col-md-4">
                    <label for="apelido">Super Admin</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorSuperAdmin" id="superadmin" v-model="form.superadmin">
                    <div class="text-danger" v-if="$page.props.errors.superadmin"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{$page.props.errors.superadmin}}</small></div>
                </div>
                <div class="form-group col-md-4">
                    <label for="name">Admin</label>
                    <input type="text" class="form-control" id="admin" v-bind:class="inputErrorAdmin" v-model="form.admin">
                     <div class="text-danger" v-if="$page.props.errors.admin"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.admin}}</small></div>
                </div>
                <div class="form-group col-md-4">
                    <label for="name">Standard</label>
                    <input type="text" class="form-control" id="standard"  v-bind:class="inputErrorStandard" v-model="form.standard">
                     <div class="text-danger" v-if="$page.props.errors.standard"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.standard}}</small></div>
                </div>
             </div>
             <button class="btn btn-primary" type="submit">Actualizar</button>
        </form>
    </div>
</template>
<script>
import Layout from '../shared/layout';


export default {
    layout:Layout,
    props:['configArray'],
     data(){
        return{
            form: {
                superadmin:this.configArray['superadmin'],
                admin:this.configArray['admin'],
                standard:this.configArray['standard']
            }
        }
    },

    methods:{
        /**
         * THIS METHOD SUBMITS THE FORM
         * */ 
      submit(){
        this.$inertia.patch(`/config/${this.configArray['id']}`,this.form);
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
        inputErrorSuperAdmin() {
            return {
            inputError: this.$page.props.errors.superadmin,
            'inputError:focus': this.$page.props.errors.superadmin
            }
        },
        inputErrorAdmin() {
            return {
            inputError: this.$page.props.errors.admin,
            'inputError:focus': this.$page.props.errors.admin
            }
        },
        inputErrorStandard() {
            return {
            inputError: this.$page.props.errors.standard,
            'inputError:focus': this.$page.props.errors.standard
            }
        }
},
mounted() {  
    document.title = "Nota 20 - Configuração";  
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