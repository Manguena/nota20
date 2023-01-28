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
            <li class="breadcrumb-item" aria-current="page"><inertia-link href="/school/create">Escola</inertia-link></li>
            <li class="breadcrumb-item active" aria-current="page">Curso: {{courseName}}</li>
        </ol>
        </nav>
        <!--- SUBJECT FORM--->
        <form class="create-user-form" >
           <h4>Disciplina</h4>
            <p></p>
         <div class="form-row">
               <div class="form-group col-md-6">
                    <label for="apelido">Nome</label>
                    <input type="text" class="form-control" v-model="subjectName" v-bind:class="inputSubjectNameError"  id="superadmin">
                    <div class="text-danger" v-if="subjectError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{subjectError}}</small></div>
                </div>
                <div class="form-group col-md-6">
                    <Searchpane
                        v-bind:searchRoute="searchRoute" 
                        v-bind:label="label"
                        v-bind:searchItemError="searchItemError"
                        v-on:send-search-item="getSentSearchItem"
                    >
                    </Searchpane>
                </div>
               
             </div>
             <button class="btn btn-primary" v-on:click="submit" type="button">
                <span v-if="subjectFeedbackSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Introduzir
             </button>
        <p></p>
        <div class="table-responsive-sm" v-if="userFeedBack.length>0">
            <table class="table table-hover table-light user-table">
                <thead>
                    <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Nível</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in userFeedBack" :key="item.id">
                    <td>{{item.subject}}</td>
                    <td>{{item.level}}</td>
                    </tr>
                </tbody>
            </table>
        </div> 
        </form>

        <!---TEST SEARCH COMPONENT-->
       
        <!------>
    <br/>
        <div id="viewEditForm"></div>
        <form class="create-user-form" >
           <h4 id="">Curso de: {{courseName}} </h4>
            <p></p>
         <div class="form-row" v-if="enableSubjetUpdateForm">
               <div class="form-group col-md-8" >
                    <label for="apelido">Nome</label>
                    <input type="text" class="form-control" v-model="subjectUpdateForm.subjectName" v-bind:class="updateSubjectnameError"  id="superadmin">
                    <div class="text-danger" v-if="subjectUpdateError"> <small><font-awesome-icon :icon="['fas', 'exclamation-circle']"/> {{subjectUpdateError}}</small></div>
                </div>

                <div class="form-group col-md-4">
                        <label for="name" class="remove_label">&nbsp;</label>                    
                        <div class="btn-group"> 
                            <button class="btn btn-success form-control" v-on:click="updateSubject()" type="button">
                                <span v-if="subjectUpdateSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Actualizar
                            </button>
                             <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" v-on:click="cancelSubjectUpdate()">Cancelar</a>
                        </div>
                        </div>
                </div>
        </div>
            
        <p></p>
        <div class="table-responsive-sm">
            <table class="table table-hover table-light user-table">
                <thead>
                    <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Nível</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in subjectConfigArray" :key="item.id"> 
                    <td>{{item.subject}}</td>
                    <td>{{item.level}}</td>
                    <td><button class="table-button" v-on:click="editSubject(item.id, item.subject)" type="button"><font-awesome-icon class="table-edit" :icon="['fas', 'edit']"/></button></td>
                      <td><button class="table-button" v-on:click="deleteSubject(item.id, courseId)" type="button">
                            <span v-if="deleteSubjectSpinner" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>                            
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
import Searchpane from '../shared/searchpane';


export default {
  components: { Searchpane },
    layout:Layout,
    props:['courseName','courseId','subjectConfigArray'],
     data(){
        return{
            //varibles to send to searchpane component
            searchRoute:'/subject/search?searchItemData',
            label:'Nível',
            //subjcet variables
            subjectUpdateForm:{
                subjectName:'',
                subjectId:''
            },

            subjectName:null,
            enableSubjetUpdateForm:false,
            levelSearchPane:true,
            searchItemId:'',
            searchCourseArray:[],
            subjectError:null,
            subjectUpdateError:null,
            searchItemError:null,
            userFeedBack:[], //user feedback array after creating subjects

            subjectUpdateSpinner:false,
            subjectFeedbackSpinner:false,
            deleteSubjectSpinner:false,

            //level variables
            searchLevelSpinner:false,// spiner for the level search input field
            searchItemName:null,
        }
    },
    methods:{
        
        //takes the text from the input and assigns to the variable that sends it the to the 
         //search engine
         getSentSearchItem(itemName,itemId){
             this.searchItemName=itemName;
             this.searchItemId=itemId;
         },
 
    // Submits the form
        submit(){
        /* this.$inertia.post('/subject',
          {
                subjectName:this.subjectName,
                searchLevel:this.searchLevel,
                levelId:this.levelId,
                courseId:this.courseId
            } 
          );***/
           
            let that=this;
            that.subjectFeedbackSpinner=true;
            axios.post('/subject', {
                subjectName:that.subjectName,
                levelName:that.searchItemName,
                levelId:that.searchItemId,
                courseId:that.courseId
            })
            .then(function (response) {
                
                //CHECK FOR ERROR MESSAGES
                console.log(response);

                if(response['data'].hasOwnProperty('subjectName') && response['data'].hasOwnProperty('levelName')){
                   
                   that.subjectError=response['data']['subjectName']['0'];
                   that.searchItemError=response['data']['levelName']['0'];
                   that.subjectFeedbackSpinner=false;
                }
                else if(response['data'].hasOwnProperty('subjectName')){
                   that.subjectError=response['data']['subjectName']['0'];
                    that.searchItemError=null;
                   that.subjectFeedbackSpinner=false;
                }
                else if (response['data'].hasOwnProperty('levelName')){
                    that.searchItemError=response['data']['levelName']['0'];
                    that.subjectError=null;
                    that.subjectFeedbackSpinner=false;

                }
                else{
                    that.subjectError=null;
                    that.searchItemError=null;
                }

                
                //GET THE CREATED COURSE  AND LEVEL FOR USER FEEDBACK
                
               if(response['data'].hasOwnProperty('subject') && response['data'].hasOwnProperty('level')){
                   that.userFeedBack.push(
                       {
                           id:response['data']['id'],
                           subject:response['data']['subject'],
                           level:response['data']['level']
                       }
                   );
                that.subjectFeedbackSpinner=false
                   

               }

            })
            .catch(function (error) {
                //location.reload();
                 if (error.response.status===401 ||error.response.status===419){
                    location.reload();
                }
            })
            .then( (error) =>{
               that.searchItemName=null;
            }); 
        },

    //edit the selected subject
    editSubject(id, subject){
        this.enableSubjetUpdateForm=true;
        document.getElementById('viewEditForm').scrollIntoView();

        this.subjectUpdateForm.subjectId=id;
        this.subjectUpdateForm.subjectName=subject;
    },
    //disable the subjcet update form
    cancelSubjectUpdate(){
        this.enableSubjetUpdateForm=false;
    },

    //Update the subject name
    updateSubject(){
        let that=this;
        this.subjectUpdateSpinner=true;
        axios.patch(`/subject/${that.subjectUpdateForm.subjectId}`,that.subjectUpdateForm)
            .then((response)=>{
              if(response['data'].hasOwnProperty('subjectName')){
                  that.subjectUpdateError=response['data']['subjectName'][0];
              }
              else{
                that.subjectConfigArray.forEach(function(item, index, array) {

                if(item['id']==response['data']['id']){
                    item['subject']=response['data']['name'];
                }
                });
              }

              that.subjectUpdateSpinner=false
            })
            .catch((error)=>{
                location.reload();
            }) 
    },

    // delete the selected subject
    deleteSubject(id, courseId){
        let that=this;
        
        this.deleteSubjectSpinner=true;
        //this.$inertia.delete(`/subject/${id}/${courseId}`);//for testing

        axios.delete(`/subject/${id}/${courseId}`)
            .then((response)=>{
              that.subjectConfigArray=response['data'];
              this.deleteSubjectSpinner=false;
            })
            .catch((error)=>{
                location.reload();
               // console.log(error);
            })
    }
    },
    computed: {
        inputSubjectNameError() {
            return {
            inputError: this.subjectError,
            'inputError:focus': this.subjectError
            }
        },
        updateSubjectnameError(){
            return{
                inputError: this.subjectUpdateError,
                'inputError:focus': this.subjectUpdateError
            }
        }

},
mounted() {  
    document.title = "Nota 20 - Disciplina";  
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

.course-name{
    margin-bottom: 1rem;
    margin-top: 1.5rem;
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
   .create-user-form, .page-navigation, .course-name {
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