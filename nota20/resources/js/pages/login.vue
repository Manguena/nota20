<template>
    <div class="container main">
        <!--div v-if="$page.props.flash.message">
            <div>FUCK</div>
        </div-->
        <div class="main-center">
            <h1>Nota20</h1>
            <p>Sistema de Gestão Academica</p>
        </div>
        <div class="main-formgroup"> 
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" id="email" v-model="form.email" class="form-control" name="email" value="" autocomplete="email" autofocus>  
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" id="password" v-model="form.password" class="form-control main-input" name="password" required autocomplete="current-password">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
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
                    if(this.$page.props.flash.message==='419'){
                        console.log(`---request expired`);
                        location.reload();
                    }
                }
            });
        }
        
    }
};
</script>

