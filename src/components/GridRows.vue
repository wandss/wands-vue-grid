<template>
    <tbody>
        <tr>
            <td v-for="(item, key) in rowData " :key="key"
                @click="$emit('click')">
                <div v-if="item === 'actionButtons'">
                    <GridIcon icon="fa fa-edit" title="Editar"
                    />
                    <GridIcon icon="fa fa-th-list" title="Detalhar"
                    />
                    <GridIcon icon="fa fa-trash" title="Apagar"
                     @click="$emit('removeItem')"
                    />
                </div>
                <div v-else>
                    {{formatItem(item)}}
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
        props:['rowData',],
        methods:{
            formatItem(item){
                var newItem = item;
                if(Array.isArray(item)){
                    newItem = newItem.join(', ');
                }
                if(!isNaN(newItem)){
                    newItem = Number(newItem).toLocaleString()
                }
                return newItem;
            }
        }
    }
</script>
<style scoped>
tr{
    cursor:pointer;
}
</style>
