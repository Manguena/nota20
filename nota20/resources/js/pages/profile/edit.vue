<template>
    <div class="container">
       <div v-if="flashMessage" class="alert alert-success alert-dismissible fade show mt-4 mb-1" role="alert">
            <span class="center-msg">Utilizador &nbsp;<strong >{{flashMessage.message}}</strong>&nbsp;Actualizado com sucesso</span>
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
                    <input type="text" class="form-control" id="apelido" v-model="form.surname" >
                    <div class="text-danger" v-if="surnameError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{surnameError}}</small></div>
                </div>
                <div class="form-group col-md-8">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" id="name" v-model="form.name">
                     <div class="text-danger" v-if="nameError"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{nameError}}</small></div>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" v-model="form.email">
                    <div class="text-danger" v-if="emailError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{emailError}}</small></div>

                </div>
                <div class="form-group col-md-6">
                    <label for="id">Documento de Identificação</label>
                    <input type="text" class="form-control" id="id" v-model="form.user_id">
                    <div class="text-danger" v-if="idError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{idError}}</small></div>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="password">Password actual</label>
                    <input type="password" class="form-control" id="password" v-model="form.password" readonly>
                    <div class="text-danger" v-if="pwdError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{pwdError}}</small></div>
                </div>
                <div class="form-group col-md-6">
                    <label for="new_password">Nova password</label>
                    <input type="password" class="form-control" id="new_password" v-model="form.new_password" readonly>
                    <div class="text-danger" v-if="newPwdError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{newPwdError}}</small></div>
                </div>
             </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="role" value="" name="customRadioInline" class="custom-control-input" checked>
                    <label class="custom-control-label" for="role">Usuário {{userRole}}</label>
                    </div>
                </div>
            </div>
             <button class="btn btn-primary" type="button" v-on:click="update">Actualizar</button>
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
            surnameError:null,
            nameError:null,
            emailError:null,
            idError:null,
            pwdError:null,
            newPwdError:null,
            roleError:null,
            form: {
                surname:this.user['0']['surname'],
                name:this.user['0']['name'],
                email:this.user['0']['email'],
                password:null,
                new_password:null,
                user_id:this.user['0']['user_id']
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
            NProgress.start();//start the progressbar
            
            axios.patch(`/profile/${this.user['0']['id']}`,this.form)
            .then(response=>{
                console.log(response);
               if(response.hasOwnProperty('data')){
                //Empty the form error variables, before assigning new errors       
                    that.surnameError=null;
                    that.nameError=null;
                    that.emailError=null;
                    that.idError=null;
                    that.pwdError=null;
                    that.newPwdError=null;
                    that.roleError=null;

                //Deal with the data returned from the server
                let ServerResponse=response['data'];
                if (ServerResponse.hasOwnProperty('message')){
                    that.flashMessage=response['data'];
                }else{
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
                        console.log(that.idError);
                    }
                    if(ServerResponse.hasOwnProperty('password')){
                        that.pwdError=response['data']['password'][0];
                    }
                    if(ServerResponse.hasOwnProperty('new_password')){
                        that.newPwdError=response['data']['new_password'][0];
                    }
                }
               }

                NProgress.done();
            })
            .catch(error=>{
                console.log(error)
                NProgress.done();
            });

        },
        /*
      submit(){
        this.$inertia.patch(`/profile/${this.user['0']['id']}`,this.form);
      },***/
      /*** THIS METHOD DISPLAY THE MODAL ASKING THE USER IF HE/SHE WANTES TO CHANGE THE USER PASSWORD* */
      showPasswordModal(){
          this.passwordModal;
          if(this.passwordModal){
            $('#exampleModal').modal('show');
          }

          this.passwordModal=false;
        },
    /***
    * THIS METHOD ENABLES THE USER INPUT
    */
      changeDisabledInputs(){
      let disabledPasswordInput=document.getElementById('password');
        disabledPasswordInput.removeAttribute('readonly');

        let disabledPasswordConfirmInput=document.getElementById('new_password');
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
        inputErrorNewPass() {
            return {
            inputError: this.newPwdError,
            'inputError:focus': this.newPwdError
            }
        },
        inputErrorRole(){
            return{
            inputError: this.roleError,
            'inputError:focus': this.roleError
            }
        }
},
mounted(){
    document.title = "Nota 20 - Perfil do Utilizador";  

    this.$nextTick(function () {
        let   disabledPasswordInput=document.getElementById('password');

                disabledPasswordInput.addEventListener('focus', (event) => {
                    this.showPasswordModal();
                });
    });
  
   
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