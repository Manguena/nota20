<template>
    <div class="container">
       <div v-if="flashMessage" class="alert alert-success alert-dismissible fade show mt-4 mb-1" role="alert">
            <span class="center-msg">Utilizador &nbsp;<strong >{{flashMessage.message}}</strong>&nbsp;Actualizado com sucesso</span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div v-if="userLimitError" class="alert alert-danger alert-dismissible fade show mt-4 mb-1" role="alert">
            <span class="center-msg">{{userLimitError}}</span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link href="/user"> Utilizador</inertia-link></li>
            <li class="breadcrumb-item active" aria-current="page">Editar: {{user['0']['surname']}}</li>
        </ol>
        </nav>
        <div class="page-navigation font-weight-bold h3 mb-1"></div>
        <form class="create-user-form">
           
            <div class="form-row ">
                <div class="form-group col-md-4">
                    <label for="apelido">Apelido</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorSurname" id="apelido" v-model="form.surname" >
                    <div class="text-danger" v-if="surnameError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{surnameError}}</small></div>
                </div>
                <div class="form-group col-md-8">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorName" id="name" v-model="form.name">
                     <div class="text-danger" v-if="nameError"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{nameError}}</small></div>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" v-bind:class="inputErrorEmail" id="email" v-model="form.email">
                    <div class="text-danger" v-if="emailError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{emailError}}</small></div>

                </div>
                <div class="form-group col-md-6">
                    <label for="bi">Documento de Identificação</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorDocIdentif" id="bi" v-on:click="changeDisabledInputs" v-model="form.user_id">
                    <div class="text-danger" v-if="idError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{idError}}</small></div>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" v-bind:class="inputErrorPassword" id="password" v-model="form.password" readonly>
                    <div class="text-danger" v-if="pwdError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{pwdError}}</small></div>
                </div>
                <div class="form-group col-md-6">
                    <label for="password_confirmation">Confirmação da password</label>
                    <input type="password" class="form-control" v-bind:class="inputErrorPassConf" id="password_confirmation" v-model="form.password_confirmation" readonly>
                    <div class="text-danger" v-if="pwdConfError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{pwdConfError}}</small></div>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="superadmin" value="superadmin" name="customRadioInline" class="custom-control-input" v-model="form.role">
                    <label class="custom-control-label" for="superadmin">Usuário super administrador</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="admin" value="admin" name="customRadioInline" class="custom-control-input" v-model="form.role">
                    <label class="custom-control-label" for="admin">Usuário administrador</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="standard" value="standard" name="customRadioInline" class="custom-control-input" v-model="form.role">
                    <label class="custom-control-label" for="standard">Usuário Standard</label>
                    </div>
                    <div class="text-danger" v-if="roleError"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{`Escolha o perfil do Usuário`}}</small></div>
                </div>
             </div>
             <button class="btn btn-primary" type="button" v-on:click="update">Actualizar</button>
             <button class="btn btn-danger ml-3" v-if="userRole!=='superadmin'" type="button" v-on:click="showDeleteModal">Excluir</button>
        </form>
        <!---MODAL ASKING THE USER IF HE/SHE REALLY WANTS TO CHANGE THE USER PASSWORD--->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><span class="badge badge badge-danger"> <font-awesome-icon :icon="['fas', 'key']" /> Password</span></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                 Deseja alterar a Password do utilizador?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>
                    <button type="button" v-on:click="changeDisabledInputs" class="btn btn-primary" data-dismiss="modal">Sim</button>
                </div>
                </div>
            </div>
        </div>
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
                 Deseja excluir o usuário?
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>
                    <button type="button" v-on:click="deleteUser" class="btn btn-primary" data-dismiss="modal">Sim</button>
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
    layout:Layout,
    props:['user', 'userRole'],
    data(){
        return{
            flashMessage:null,
            userLimitError:null,
            surnameError:null,
            nameError:null,
            emailError:null,
            idError:null,
            pwdError:null,
            pwdConfError:null,
            roleError:null,
            form: {
                surname:this.user['0']['surname'],
                name:this.user['0']['name'],
                email:this.user['0']['email'],
                password:null,
                password_confirmation:null,
                user_id:this.user['0']['user_id'],
                role:this.userRole
            },
               passwordModal:true
        }
    },

    methods:{
        /**
         * THIS METHOD SUBMITS THE FORM
         * */ 
      update(){
        let that=this;
       // this.$inertia.patch(`/user/${this.user['0']['id']}`,this.form);
       
         NProgress.start();
        axios.patch(`/user/${this.user['0']['id']}`,this.form)
        .then(response=>{
            if(response.hasOwnProperty('data')){
                //Empty the form error variables, before assigning new errors       
                    that.surnameError=null;
                    that.nameError=null;
                    that.emailError=null;
                    that.idError=null;
                    that.pwdError=null;
                    that.pwdConfError=null;
                    that.roleError=null;

                //Deal with the data returned from the server
                let ServerResponse=response['data'];
                if (ServerResponse.hasOwnProperty('message')){
                    that.flashMessage=response['data'];
                }
                else if(ServerResponse.hasOwnProperty('userLimitError')){
                        that.userLimitError= ServerResponse.userLimitError;
                }
                else{
                    if(ServerResponse.hasOwnProperty('surname')){
                        that.surnameError=response['data']['surname'][0];
                    }
                    if(ServerResponse.hasOwnProperty('name')){
                        that.nameError=response['data']['name'][0];
                    }
                    if(ServerResponse.hasOwnProperty('email')){
                        that.emailError=response['data']['email'][0];
                    }
                    if(ServerResponse.hasOwnProperty('user_id')){
                        that.idError=response['data']['user_id'][0];
                    }
                    if(ServerResponse.hasOwnProperty('password')){
                        that.pwdError=response['data']['password'][0];
                    }
                    if(ServerResponse.hasOwnProperty('password_confirmation')){
                        that.newPwdError=response['data']['password_confirmation'][0];
                    //roleError
                    }
                    if(ServerResponse.hasOwnProperty('role')){
                        that.newPwdError=response['data']['role'][0];
                    //roleError
                    }


                }
               }
            
            NProgress.done();
        })
        .catch(error=>{
            NProgress.done();
            location.reload();
        });
      
      },
      /*** THIS METHOD DISPLAY THE MODAL ASKING THE USER IF HE/SHE WANTES TO CHANGE THE USER PASSWORD* */
      showPasswordModal(){
        console.log(`show password`);
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
        inputErrorEmail() {
            return {
            inputError: this.emailError,
            'inputError:focus': this.emailError
            }
        },
        inputErrorDocIdentif() {
            return {
            inputError: this.idError,
            'inputError:focus': this.idError
            }
        },
        inputErrorPassword() {
            return {
            inputError: this.pwdError,
            'inputError:focus': this.pwdError
            }
        },
        inputErrorPassConf() {
            return {
            inputError: this.pwdConfError,
            'inputError:focus': this.pwdConfError
            }
        },
        inputErrorRole(){
            return{
            inputError: this.$page.props.errors.role,
            'inputError:focus': this.$page.props.errors.focus
            }
        }
},
mounted(){

    document.title = "Nota 20 - Editar Utilizador"; 
    this.$nextTick(function () {
            let   disabledPasswordInput=document.getElementById('password');

                    disabledPasswordInput.addEventListener('focus', (event) => {
                        this.showPasswordModal();
                    });
        })

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
.center-msg{
    display: flex;
    align-items: center;
    justify-content: center;
}

.create-user-form{
    background-color: #fdfdfe;
    padding: 1.25rem;
    margin-top: 0;
    border-radius:2px ;
}

.page-navigation{
    margin-top: 2rem;
}
@media screen and (min-width: 992px){
   .create-user-form, .page-navigation{
       margin-right: 10%;
       margin-left: 10%;       
   }
}
</style>