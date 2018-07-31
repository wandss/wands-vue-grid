<template>
    <thead>
        <tr>
            <th v-for="(item, index) in getHeader" :key="index"
             @click="$emit('click', item)">
                {{item}}
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
</style>
