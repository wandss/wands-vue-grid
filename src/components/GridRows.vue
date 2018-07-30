<template>
    <tbody>
        <tr id="row" v-for="(data, index) in gridData" :key="index">
            <td v-for="item in data" :key="item" @click="$emit('click', data)">
                <div v-if="item === 'actionButtons'">
                    <GridIcon icon="fa fa-edit" title="Editar" />
                    <GridIcon icon="fa fa-th-list" title="Detalhar" />
                    <GridIcon icon="fa fa-trash" title="Apagar" />
                </div>
                <div v-else>
                    {{item}}
                </div>    
            </td>
        </tr>
    </tbody>
</template>
<script>
    import GridIcon from './GridIcon';

    export default{
        components:{GridIcon,},
        name:'GridRows',
        props:['gridData'],
        data(){
            return{
                testingGrid:this.gridData,
            }
        },
    }
</script>
<style>
#row{
    cursor:pointer;
}
</style>
