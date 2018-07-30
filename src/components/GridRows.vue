<template>
    <tbody>
        <tr id="row" v-for="(data, index) in gridData" :key="index">
            <td v-for="item in data" :key="item" @click="$emit('click', data)">
                <div v-if="item === 'actionButtons'">
                    <GridIcon icon="fa fa-edit" title="Editar" 
                     @click="$emit('getAction', data,'editbtn' )"
                    />
                    <GridIcon icon="fa fa-th-list" title="Detalhar" 
                     @click="$emit('getAction', data,'detailbtn' )" 
                    />
                    <GridIcon icon="fa fa-trash" title="Apagar" 
                     @click="$emit('getAction', data,'deletebtn' )"
                    />
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
        props:['gridData',],
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
