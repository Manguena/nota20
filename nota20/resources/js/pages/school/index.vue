<template>
    <div class="container">
            <div v-if="$page.props.flash.message" class="alert alert-success alert-dismissible fade show mt-4 mb-1" role="alert">
                    <span class="center-msg">Escola &nbsp;<strong >{{$page.props.flash.message}}</strong>&nbsp; {{schoolAction}} com sucesso</span>                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
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
                    <input type="text" class="form-control" v-bind:class="inputErrorSchoolName" id="school_name" v-model="schoolForm.name">
                    <div class="text-danger" v-if="$page.props.errors.name"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{$page.props.errors.name}}</small></div>
                </div>
                <div class="form-group col-md-4">
                    <label for="name">Abreviatura</label>
                    <input type="text" class="form-control" id="school_abbreviation" v-bind:class="inputErrorAbbreviation" v-model="schoolForm.abbreviation">
                     <div class="text-danger" v-if="$page.props.errors.abbreviation"><small><font-awesome-icon :icon="['fas', 'exclamation-circle']" /> {{$page.props.errors.abbreviation}}</small></div>
                </div>
             </div>
             <button class="btn btn-primary" v-if="createSchool" type="submit">Criar</button>
             <button class="btn btn-primary" v-on:click="updateSchool" v-if="createSchool===false" type="button">Actualizar</button>
        </form>
        <div>
            <br>
            <br>
        </div>
        <!--- COURSES FORM--->
        <div v-if="$page.props.flash.courseCreatedMessage" class="alert alert-success alert-dismissible fade show mt-4 mb-1" role="alert">
                    <span class="center-msg">Curso &nbsp;<strong >{{$page.props.flash.courseCreatedMessage}}</strong>&nbsp; Criado com sucesso</span>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
         </div>
        <form class="create-user-form" >
           <h4>Cursos</h4>
           <p></p>
            <div class="form-row ">
                <div class="form-group col-md-9">
                    <label for="apelido">Nome</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorCourse" v-model="courseForm.courseName"  id="superadmin">
                    <div class="text-danger" v-if="courseError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{courseError}}</small></div>
                </div>
                <div class="form-group col-md-3">
                    <label for="name" class="remove_label">&nbsp;</label>
                        <button class="btn btn-primary form-control" v-on:click="storeCourse" type="button">
                            <span v-if="storeCourseSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
                            Introduzir
                        </button>
                </div>
             </div>
             <div class="form-row ">
                <div class="form-group col-md-9">
                    <label for="apelido">Editar</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorCourse" v-model="courseForm.courseName"  id="superadmin">
                    <div class="text-danger" v-if="courseError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{courseError}}</small></div>
                </div>
                <div class="form-group col-md-3">
                    <label for="name" class="remove_label">&nbsp;</label>
                        <button class="btn btn-warning form-control" v-on:click="storeCourse" type="button">
                            <span v-if="storeCourseSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
                            Actualizar
                        </button>
                </div>
             </div>
              <div class="table-responsive-sm">
            <table class="table table-hover table-light user-table">
                <thead>
                    <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in courseConfigArray" :key="item.id">
                    <td>{{item.name}}</td>
                    <td><button class="table-button"  type="button"><font-awesome-icon class="table-edit" :icon="['fas', 'edit']"/></button></td>
                    <td><button class="table-button" v-on:click="removeCourse(item.id)" type="button">
                            <span v-if="deleteCourseSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
                            <font-awesome-icon class="table-delete" :icon="['fas', 'trash']"/>
                        </button>
                    </td>
                    </tr>
                 
                </tbody>
            </table>
        </div>
                
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
    props:['schoolConfigArray', 'createSchool'],
     data(){
        return{
            courseError:null,
            storeCourseSpinner:false,
            deleteCourseSpinner:false,
            schoolAction:this.createSchool ? 'criada':'actualizada',
            courseConfigArray:[],
            schoolForm: {
                name:this.schoolConfigArray['name'],
                abbreviation:this.schoolConfigArray['abbreviation'],
                id:this.schoolConfigArray['id']
            },
            courseForm:{
                courseName:'',
                schoolName:''
            }
        }
    },

    methods:{
        /**
         * THIS METHOD SUBMITS THE FORM
         * */ 
    listCourse(){
        //this.$inertia.get(`/course`); 
        let that=this; 
        axios.get(`/course`)
            .then((response)=>{
                that.courseConfigArray=response['data'];
                //console.log(that.courseConfigArray);
            })
            .catch((error)=>{
                console.log(error);
            }) 
         },
      submit(){
        this.$inertia.post(`/school`, this.schoolForm);
      },
      updateSchool(){
        this.$inertia.patch(`/school/${this.schoolForm.id}`,this.schoolForm)
      },
      storeCourse(){
          
          let that=this;
          that.storeCourseSpinner=true;
          this.courseForm.schoolId=this.schoolConfigArray['id'];
          
        // this.$inertia.post(`/course`,this.courseForm);->used for testing
 
          axios.post('/course',this.courseForm)
            .then(function (response) {
                    if (response['data'].hasOwnProperty('schoolName')&& response['data'].hasOwnProperty('courseName')){
                        that.courseError=response['data']['schoolName'][0];
                        
                    }else if (response['data'].hasOwnProperty('schoolName')){
                        that.courseError=response['data']['schoolName'][0];
                    }
                    else if(response['data'].hasOwnProperty('courseName')){
                        that.courseError=response['data']['courseName'][0];
                    }else{
                    that.courseConfigArray.push(response['data'])
                    that.courseForm.courseName='';
                    that.storeCourseSpinner=false;
                    that.courseError=null;
                    }

                    that.storeCourseSpinner=false
            })
            .catch(function (error) {
                //console.log(error);
            });
      },
      removeCourse(item){
          //this.$inertia.delete(`/course/${item}`);
          let that=this; 
          this.deleteCourseSpinner=true;
        axios.delete(`/course/${item}`)
            .then((response)=>{
                that.courseConfigArray=response['data'];
                that.deleteCourseSpinner=false;
                //console.log(that.courseConfigArray);
            })
            .catch((error)=>{
                console.log(error);
            }) 

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
        inputErrorCourse() {
            return {
            inputError: this.courseError,
            'inputError:focus': this.courseError
            }
        }
},
mounted(){
    this.listCourse();   
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

.table-light, .table-light > th, .table-light > td {
    background-color: #e2e2eb;
}

.table-delete{
    color: #dc2020;
}

.table-edit{
    color: #6b6316;
}

.table-button{
    background-color: #e2e2eb;
}
@media screen and (min-width: 992px){
   .create-user-form, .page-navigation{
       margin-right: 10%;
       margin-left: 10%;       
   }

}

@media screen and (max-width: 767px){
   .remove_label{
      display: none;       
   }
}
</style>