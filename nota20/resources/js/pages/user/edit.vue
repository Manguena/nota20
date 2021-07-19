<template>
    <div class="container">
       <div v-if="$page.props.flash.message" class="alert alert-success alert-dismissible fade show mt-4 mb-1" role="alert">
            Utilizador <strong>{{$page.props.flash.message}}</strong> Actualizado com sucesso
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link href="/utilizador"> Utilizador</inertia-link></li>
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
                    <input type="text" class="form-control" id="bi" v-on:click="changeDisabledInputs" v-model="form.bi">
                    <div class="text-danger" v-if="$page.props.errors.bi"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.bi}}</small></div>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" v-model="form.password" readonly>
                    <div class="text-danger" v-if="$page.props.errors.password"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.password}}</small></div>
                </div>
                <div class="form-group col-md-6">
                    <label for="password_confirmation">Confirmação da password</label>
                    <input type="password" class="form-control" id="password_confirmation" v-model="form.password_confirmation" readonly>
                    <div class="text-danger" v-if="$page.props.errors.password_confirmation"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{$page.props.errors.password_confirmation}}</small></div>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="admin" value="admin" name="customRadioInline" class="custom-control-input" v-model="form.role">
                    <label class="custom-control-label" for="admin">Usuário administrador</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="standard" value="standard" name="customRadioInline" class="custom-control-input" v-model="form.role">
                    <label class="custom-control-label" for="standard">Usuário Standard</label>
                    </div>
                    <div class="text-danger" v-if="$page.props.errors.role"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{`Escolha o perfil do Usuário`}}</small></div>
                </div>
             </div>
             <button class="btn btn-primary" type="submit">Actualizar</button>
             <button class="btn btn-danger ml-3" type="button" v-on:click="showDeleteModal">Excluir</button>
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
                password_confirmation:null,
                bi:this.user['0']['bi'],
                role:this.userRole,
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
        this.$inertia.patch(`/utilizador/${this.user['0']['id']}`,this.form);
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
            this.$inertia.delete(`/utilizador/${this.user['0']['id']}`);
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
        inputErrorPassConf() {
            return {
            inputError: this.$page.props.errors.password_confirmation,
            'inputError:focus': this.$page.props.errors.password_confirmation
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