<template>
    <div>
        <h1>{{title}}</h1>
        <h1>{{description}}</h1>
    </div>
</template>
<script>
export default{
    props:{
        status:Number
    },
    computed:{
        title(){
            return {

            }[this.status]
        },
        description(){
            return{

            }[this.status]
        }
    }
}
</script>
