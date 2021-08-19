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
        <!--- LEVEL FORM--->
        <form class="create-user-form" >
           <h4>Nívels</h4>
           <p></p>
            <div class="form-row" v-if="createLevel">
                <div class="form-group col-md-9" >
                    <label for="apelido">Nome</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorLevel" v-model="levelForm.levelName"  id="superadmin">
                    <div class="text-danger" v-if="levelError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{levelError}}</small></div>
                </div>
                <div class="form-group col-md-3">
                    <label for="name" class="remove_label">&nbsp;</label>
                        <button class="btn btn-primary form-control" v-on:click="storeLevel" type="button">
                            <span v-if="storeLevelSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
                            Introduzir
                        </button>
                </div>
             </div>
             <div class="form-row" v-if="!createLevel">
                <div class="form-group col-md-8">
                    <label for="apelido">Editar</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorUpdateLevel" v-model="levelForm.levelName"  id="superadmin">
                    <div class="text-danger" v-if="updateLevelError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{updateLevelError}}</small></div>
                </div>
                <div class="form-group col-md-4">
                    <label for="name" class="remove_label">&nbsp;</label>
                    <div class="btn-group">
                        <button class="btn btn-success form-control" v-on:click="updateLevel()" type="button">
                            <span v-if="updateLevelSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
                            Actualizar
                        </button>
                        <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" v-on:click="cancelLevelUpdate()">Cancelar</a>
                        </div>
                    </div>
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
                    <tr v-for="item in levelConfigArray" :key="item.id">
                    <td> {{item.name}}</td>
                    <td><button class="table-button" v-on:click="editLevel(item.id,item.name)" type="button"><font-awesome-icon class="table-edit" :icon="['fas', 'edit']"/></button></td>
                    <td><button class="table-button" v-on:click="deleteLevel(item.id)" type="button">
                            <span v-if="deleteLevelSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
                            <font-awesome-icon class="table-delete" :icon="['fas', 'trash']"/>
                        </button>
                    </td>
                    </tr>
                 
                </tbody>
            </table>
        </div>  
        </form>
        <!--- COURSES FORM--->
        <div>
            <br>
            <br>
        </div>
        <form class="create-user-form" >
           <h4>Cursos</h4>
           <p></p>
            <div class="form-row" v-if="createCourse">
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
             <div class="form-row" v-if="!createCourse">
                <div class="form-group col-md-8">
                    <label for="apelido">Editar</label>
                    <input type="text" class="form-control" v-bind:class="inputErrorUpdateCourse" v-model="courseForm.courseName"  id="superadmin">
                    <div class="text-danger" v-if="updateCourseError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{updateCourseError}}</small></div>
                </div>
                <div class="form-group col-md-4">
                    <label for="name" class="remove_label">&nbsp;</label>
                    <div class="btn-group">
                        <button class="btn btn-success form-control" v-on:click="updateCourse()" type="button">
                            <span v-if="updateCourseSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
                            Actualizar
                        </button>
                        <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" v-on:click="cancelCourseUpdate()">Cancelar</a>
                        </div>
                    </div>
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
                    <td> <inertia-link href="/subject">{{item.name}}</inertia-link></td>
                    <td><button class="table-button" v-on:click="editCourse(item.id,item.name)" type="button"><font-awesome-icon class="table-edit" :icon="['fas', 'edit']"/></button></td>
                    <td><button class="table-button" v-on:click="deleteCourse(item.id)" type="button">
                            <span v-if="deleteCourseSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
                            <font-awesome-icon class="table-delete" :icon="['fas', 'trash']"/>
                        </button>
                    </td>
                    </tr>
                 
                </tbody>
            </table>
        </div>  
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
            //level variables
            levelError:null,
            createLevel:true,
            storeLevelSpinner:false,
            levelId:null,
            updateLevelError:null,
            updateLevelSpinner:false,
            deleteLevelSpinner:false,
            levelConfigArray:[],
            levelForm:{
                levelName:''
            },
            //course variables
            couseId:null,//veriable to store the id for update purpose
            createCourse: true,
            courseError:null,
            updateCourseError:null,
            storeCourseSpinner:false,
            deleteCourseSpinner:false,
            updateCourseSpinner:false,
            courseConfigArray:[],
              courseForm:{
                courseName:'',
                schoolId:''
            },
            //school varibles
            schoolAction:this.createSchool ? 'criada':'actualizada',
            schoolForm: {
                name:this.schoolConfigArray['name'],
                abbreviation:this.schoolConfigArray['abbreviation'],
                id:this.schoolConfigArray['id']
            }
        }
    },

    methods:{
        /**
         * school methods
         * */  
        submit(){
        this.$inertia.post(`/school`, this.schoolForm);
        },
      updateSchool(){
        this.$inertia.patch(`/school/${this.schoolForm.id}`,this.schoolForm)
      },
      /*
      Level methods
      */ 
      storeLevel(){
          console.log(this.levelForm.levelName);
          let that=this;
          this.storeLevelSpinner=true;
        // this.$inertia.post(`/course`,this.courseForm);->used for testing
 
          axios.post('/level',this.levelForm)
            .then(function (response) {
                     if(response['data'].hasOwnProperty('levelName')){
                        that.levelError=response['data']['levelName'][0];
                    }else{
                    that.levelConfigArray.unshift(response['data'])
                    that.levelForm.levelName='';
                    that.storeLevelSpinner=false;
                    that.levelError=null;
                    }

                    that.storeLevelSpinner=false
            })
            .catch(function (error) {
                console.log(error);
            });
      },
      listLevel(){
        //this.$inertia.get(`/course`); 
        let that=this; 
        axios.get(`/level`)
            .then((response)=>{
                that.levelConfigArray=response['data'];
                //console.log(that.courseConfigArray);
            })
            .catch((error)=>{
                console.log(error);
            }) 
         },
         editLevel(id, name){
            this.createLevel=false;
            this.levelForm.levelName=name;
            this.levelId=id;
            this.levelError=null;
            this.updateLevelError=null;
        },
        updateLevel(){
            let that=this;
            this.updateLevelSpinner=true;
            //this.$inertia.patch(`/level/${this.levelId}`, this.levelForm);

            axios.patch(`/level/${this.levelId}`, this.levelForm)
            .then((response)=>{
                if(response['data'].hasOwnProperty('levelName')){
                    this.updateLevelError=response['data']['levelName'][0];
                }else{ 
                for(let i=0; i<that.levelConfigArray.length; i++){
                    if (that.levelConfigArray[i]['id']==response['data']['id']){
                        that.levelConfigArray[i]['name']=response['data']['name']
                    }
                }
                    }
                that.updateLevelSpinner=false;
            })
            .catch((error)=>{
                console.log(error);
            })

        },
        cancelLevelUpdate(){
            this.createLevel=true;
        },
         deleteLevel(item){
          //this.$inertia.delete(`/level/${item}`);
          let that=this; 
          this.deleteLevelSpinner=true;
        axios.delete(`/level/${item}`)
            .then((response)=>{
                this.levelError=null;
                this.updateLevelError=null;
                that.levelConfigArray=response['data'];
                that.deleteLevelSpinner=false;
                //console.log(that.courseConfigArray);
            })
            .catch((error)=>{
                console.log(error);
            }) 

      },
      /**
       * course methods
      */
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
     
      storeCourse(){
          
          let that=this;
          that.storeCourseSpinner=true;
          this.courseForm.schoolId=this.schoolConfigArray['id'];
          
        // this.$inertia.post(`/course`,this.courseForm);->used for testing
 
          axios.post('/course',this.courseForm)
            .then(function (response) {
                    if (response['data'].hasOwnProperty('schoolId')&& response['data'].hasOwnProperty('courseName')){
                        that.courseError=response['data']['schoolId'][0];
                        
                    }else if (response['data'].hasOwnProperty('schoolId')){
                        that.courseError=response['data']['schoolId'][0];
                    }
                    else if(response['data'].hasOwnProperty('courseName')){
                        that.courseError=response['data']['courseName'][0];
                    }else{
                    that.courseConfigArray.unshift(response['data'])
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
        editCourse(id, name){
            this.createCourse=false;
            this.courseForm.courseName=name;
            this.couseId=id;
            this.courseError=null;
            this.updateCourseError=null;
        },
        updateCourse(){
            let that=this;
            this.updateCourseSpinner=true;
            axios.patch(`/course/${this.couseId}`, this.courseForm)
            .then((response)=>{

                if(response['data'].hasOwnProperty('courseName')){
                    this.updateCourseError=response['data']['courseName'][0];
                }else{ 
                for(let i=0; i<that.courseConfigArray.length; i++){
                    if (that.courseConfigArray[i]['id']==response['data']['id']){
                        that.courseConfigArray[i]['name']=response['data']['name']
                    }
                }
                    }
                that.updateCourseSpinner=false;
            })
            .catch((error)=>{
                console.log(error);
            })

        },
        cancelCourseUpdate(){
            this.createCourse=true;
        },
      deleteCourse(item){
          //this.$inertia.delete(`/course/${item}`);
          let that=this; 
          this.deleteCourseSpinner=true;
        axios.delete(`/course/${item}`)
            .then((response)=>{
                this.courseError=null;
                this.updateCourseError=null;
                that.courseConfigArray=response['data'];
                that.deleteCourseSpinner=false;
                //console.log(that.courseConfigArray);
            })
            .catch((error)=>{
                console.log(error);
            }) 

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
        },
        inputErrorUpdateCourse() {
            return {
            inputError: this.updateCourseError,
            'inputError:focus': this.updateCourseError
            }
        },
    inputErrorLevel(){
         return {
            inputError: this.levelError,
            'inputError:focus': this.levelError
        }
    }, 
    inputErrorUpdateLevel(){
        return {
            inputError: this.updateLevelError,
            'inputError:focus': this.updateLevelError
        }
    }
},
mounted(){
    this.listLevel();
    this.listCourse();   
}
} 
</script>

<style scoped>
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
.btn-group, .btn-group-vertical {
    position: relative;
    display: flex;
    vertical-align: middle;
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