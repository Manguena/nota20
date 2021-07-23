<template>
    <div class="container">
       <div v-if="$page.props.flash.message" class="alert alert-success alert-dismissible fade show mt-4 mb-1 createdAlert" role="alert">
        <span class="center-msg">Usuário&nbsp;<strong >{{$page.props.flash.message}}</strong>&nbsp;criado com sucesso</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <nav style="breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb page-navigation">
            <li class="breadcrumb-item"><inertia-link href="/"> Painel</inertia-link></li>
            <li class="breadcrumb-item"><inertia-link href="/utilizador"> Utilizador</inertia-link></li>
            <li class="breadcrumb-item active" aria-current="page">Criar: {{form.apelido}} </li>
        </ol>
        </nav>
        <div class="page-navigation font-weight-bold h3 mb-1"></div>  
        <form class="create-user-form"  @submit.prevent="submit">
            <div class="form-row ">
                <div class="form-group col-md-4">
                    <label for="apelido">Apelido</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorApelido" id="apelido" v-model="form.apelido" >
                    <div class="text-danger" v-if="$page.props.errors.apelido"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{$page.props.errors.apelido}}</small></div>
                </div>
                <div class="form-group col-md-8">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorNome" id="name" v-model="form.name">
                    <div class="text-danger" v-if="$page.props.errors.name"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.name}}</small></div>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" v-bind:class="inputErrorEmail" id="email" v-model="form.email">
                    <div class="text-danger" v-if="$page.props.errors.email"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.email}}</small></div>
                </div>
                <div class="form-group col-md-6">
                    <label for="bi">Documento de Identificação</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorDocIdentif" id="bi" v-model="form.bi">
                    <div class="text-danger" v-if="$page.props.errors.bi"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.bi}}</small></div>
                </div>
             </div>
             <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" v-bind:class="inputErrorPassword" id="password" v-model="form.password">
                    <div class="text-danger" v-if="$page.props.errors.password"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.password}}</small></div>
                </div>
                <div class="form-group col-md-6">
                    <label for="password_confirmation">Confirmar a password</label>
                    <input type="password" class="form-control" v-bind:class="inputErrorPassConf" id="password_confirmation" v-model="form.password_confirmation">
                    <div class="text-danger" v-if="$page.props.errors.password_confirmation"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{$page.props.errors.password_confirmation}}</small></div>
                </div>
             </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <div class="custom-control custom-radio custom-control-inline" v-if="roleList.includes('superadmin')">
                    <input type="radio" id="superadmin" value="superadmin" name="customRadioInline" class="custom-control-input" v-model="form.role">
                    <label class="custom-control-label" for="superadmin">Usuário super administrador</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline" v-if="roleList.includes('admin')">
                    <input type="radio" id="admin" value="admin" name="customRadioInline" class="custom-control-input" v-model="form.role">
                    <label class="custom-control-label" for="admin">Usuário administrador</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline" v-if="roleList.includes('standard')">
                    <input type="radio" id="standard" value="standard" name="customRadioInline" class="custom-control-input" v-model="form.role">
                    <label class="custom-control-label" for="standard">Usuário Standard</label>
                    </div>
                <div class="text-danger" v-if="$page.props.errors.role"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{`Escolha o perfil do Usuário`}}</small></div>
                </div>
             </div>
             <button class="btn btn-primary" type="submit">Criar Usuário</button>
        </form>
    </div>
</template>
<script>
import Layout from '../shared/layout';
export default {
    props:['roleList'],
    layout:Layout,
    data(){
        return{
            form: {
                apelido:null,
                name:null,
                email:null,
                password:null,
                password_confirmation:null,
                bi:null,
                role:null
            }
        }

    },

    methods:{
      submit(){
        this.$inertia.post('/utilizador',this.form,{
            onSuccess: () => {
                for(const item in this.form){
                    this.form[item]=null;

                }
            }
        })
      }
    }
    ,
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