<template>
        <div class="container main">
            <div v-if="$page.props.flash.message" class="session alert alert-warning alert-dismissible fade show" role="alert">
                 Sessao expirou &nbsp; <button type="button" class="btn btn-link" v-on:click="pageReload">Clique Aqui</button>
                <button type="button" class="close"  data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="login">
                <div class="main-center">
                    <h1>Nota20</h1>
                    <p>Sistema de Gestão Academica</p>
                </div> 
                <div class="main-formgroup"> 
                    <form @submit.prevent="submit">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input id="email" v-model="form.email" class="form-control" v-bind:class="inputErrorEmail" name="email" autocomplete="email" autofocus>
                            <div class="text-danger" v-if="$page.props.errors.email"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{$page.props.errors.email}}</small></div>  
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" id="password" v-model="form.password" class="form-control main-input" v-bind:class="inputErrorPassword" name="password" autocomplete="current-password">
                            <div class="text-danger" v-if="$page.props.errors.password"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{$page.props.errors.password}}</small></div>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
            </div>
            
        <div class="main-buttom">
          <small>Jordao Manguena</small> 
        </div>
        </div>
        
    </div>
</template>
<script>
export default{
    data(){
        return{
            form:{
                email:null,
                password:null
            }
        }
    },
    methods:{
        submit(){
            //console.log(`${this.form.email}---- ${this.form.password}`);
           // console.log(this.$page);
            this.$inertia.post('/login',this.form,{
                onFinish:()=>{

                   /**   if(this.$page.props.flash.message==='419'){
                        console.log(`---request expired`);
                        location.reload();
                    }****/
                }
            });
        },
        pageReload(){
           location.reload();
        }
        
    },
    computed: {
        inputErrorEmail() {
            return {
            inputError: this.$page.props.errors.email,
            'inputError:focus': this.$page.props.errors.email
            }
        },
        inputErrorPassword() {
            return {
            inputError: this.$page.props.errors.password,
            'inputError:focus': this.$page.props.errors.password
            }
        }
    },
    mounted() {  
    document.title = "Nota 20 - Gestão Academica";  
  }
};
</script>

