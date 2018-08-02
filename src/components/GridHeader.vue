<template>
    <thead>
        <tr>
            <th v-for="(item, index) in getHeader" :key="index"
             @click.prevent.self="$emit('sort', item)">
                <span class="fa fa-sort">
                {{item}}
                </span>
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
        props:['gridData'],
        data(){
            return{
                headerData:undefined,
            }
        },
        computed:{
            getHeader(){
                return Object.keys(this.gridData[0]);
            },
        },
  }
</script>
<style scoped>
tr{
    cursor:pointer;
}
th{
    text-transform:capitalize;
}
#hideColumn{
    float:right;
    font-size:1.5rem;
}
#hideColumn:hover{
    opacity:.8;
}
</style>
