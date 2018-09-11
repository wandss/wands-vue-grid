<template>
    <thead>
        <tr>
            <th v-for="(item, index) in getHeader" :key="index"
             @click.prevent.self="$emit('sort', item)">
                <i class="fa fa-sort"></i>
                {{item}}
                <div id="hideColumn" @click="$emit('hideColumn', item)">
                    <i class='fa fa-eye-slash'></i>
                </div>
            </th>
        </tr>
        </thead>
    </template>
<script>
    export default{
        name:'GridHeader',
        props:{
            gridData:{
                type:Array,
                required:true
            },
        },
        data(){
            return{
                originalHeader:null,
            }
        },
        computed:{
            getHeader(){
                return this.gridData.length!==0?
                    Object.keys(this.gridData[0]):
                    this.originalHeader;
            },
        },
        mounted(){
            if(this.gridData.length>0){
                this.originalHeader = Object.keys(this.gridData[0])
            }
        },
  }
</script>
<style scoped>
tr{
    cursor:pointer;
}
th{
    text-transform:capitalize;
    text-align:left;
}
#hideColumn{
    float:right;
    font-size:1.5rem;
}
#hideColumn:hover{
    opacity:.8;
}
</style>
