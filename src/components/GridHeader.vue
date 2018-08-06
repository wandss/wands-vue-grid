<template>
    <thead>
        <tr>
            <th v-for="(item, index) in getHeader" :key="index"
             @click="$emit('sort', item)">
                <i class="fa fa-sort">
                {{item}}
                </i >
                <div id="hidecol" @click="$emit('hideColumn', item)">
                    <i class="fa fa-eye-slash"></i>
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
#hidecol{
    float:right;
}
#hidecol:hover{
    opacity:.8;
}
</style>
