<template>
    <div class="container">
       <div v-if="$page.props.flash.message" class="alert alert-success alert-dismissible fade show mt-4 mb-1" role="alert">
            <span class="center-msg">Utilizador &nbsp;<strong >{{$page.props.flash.message}}</strong>&nbsp;Actualizado com sucesso</span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link href="/user"> Utilizador</inertia-link></li>
            <li class="breadcrumb-item active" aria-current="page">Editar: {{user['0']['apelido']}}</li>
        </ol>
        </nav>
        <div class="page-navigation font-weight-bold h3 mb-1"></div>
        <form class="create-user-form"  @submit.prevent="submit">
           
            <div class="form-row ">
                <div class="form-group col-md-4">
                    <label for="apelido">Apelido</label>
                    <input type="text" class="form-control" id="apelido" v-model="form.apelido" >
                    <div class="text-danger" v-if="$page.props.errors.apelido"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{$page.props.errors.apelido}}</small></div>
                </div>
                <div class="form-group col-md-8">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" id="name" v-model="form.name">
                     <div class="text-danger" v-if="$page.props.errors.name"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.name}}</small></div>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" v-model="form.email">
                    <div class="text-danger" v-if="$page.props.errors.email"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.email}}</small></div>

                </div>
                <div class="form-group col-md-6">
                    <label for="bi">Documento de Identificação</label>
                    <input type="text" class="form-control" id="bi" v-model="form.bi">
                    <div class="text-danger" v-if="$page.props.errors.bi"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.bi}}</small></div>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="password">Password actual</label>
                    <input type="password" class="form-control" id="password" v-model="form.password" readonly>
                    <div class="text-danger" v-if="$page.props.errors.password"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.password}}</small></div>
                </div>
                <div class="form-group col-md-6">
                    <label for="new_password">Nova password</label>
                    <input type="password" class="form-control" id="new_password" v-model="form.new_password" readonly>
                    <div class="text-danger" v-if="$page.props.errors.new_password"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{$page.props.errors.new_password}}</small></div>
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
             <button class="btn btn-primary" type="submit">Actualizar</button>
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


export default {
    layout:Layout,
    props:['user', 'userRole'],
    data(){
        return{
            form: {
                apelido:this.user['0']['apelido'],
                name:this.user['0']['name'],
                email:this.user['0']['email'],
                password:null,
                new_password:null,
                bi:this.user['0']['bi'],
                passwordctr:false
            },
               passwordModal:true
        }
    },

    methods:{
        /**
         * THIS METHOD SUBMITS THE FORM
         * */ 
      submit(){
        this.$inertia.patch(`/profile/${this.user['0']['id']}`,this.form);
      },
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

        this.form.passwordctr=true;
      }
    },
    computed: {
        inputErrorApelido() {
            return {
            inputError: this.$page.props.errors.apelido,
            'inputError:focus': this.$page.props.errors.apelido
            }
        },
        inputErrorNome() {
            return {
            inputError: this.$page.props.errors.name,
            'inputError:focus': this.$page.props.errors.name
            }
        },
        inputErrorEmail() {
            return {
            inputError: this.$page.props.errors.email,
            'inputError:focus': this.$page.props.errors.email
            }
        },
        inputErrorDocIdentif() {
            return {
            inputError: this.$page.props.errors.bi,
            'inputError:focus': this.$page.props.errors.bi
            }
        },
        inputErrorPassword() {
            return {
            inputError: this.$page.props.errors.password,
            'inputError:focus': this.$page.props.errors.password
            }
        },
        inputErrorNewPass() {
            return {
            inputError: this.$page.props.errors.new_password,
            'inputError:focus': this.$page.props.errors.new_password
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