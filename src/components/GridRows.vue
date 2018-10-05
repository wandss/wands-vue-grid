<template>
    <tbody>
        <tr>
            <td v-for="(item, key) in row " :key="key"
                @click="$emit('click')">
                <div v-if="item === 'actionButtons'">
                    <GridIcon icon="fa fa-edit" title="Editar"
                     @click="$emit('editItem','edit')"
                    />
                    <GridIcon icon="fa fa-th-list" title="Detalhar"
                     @click="$emit('detailItem','detail')"
                    />
                    <GridIcon icon="fa fa-trash" title="Apagar"
                     @click="$emit('removeItem')"
                    />
                </div>
                <div v-else v-html="formatItem(item)">
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
        props:{
            rowData:{
                type:Object,
                required:true,
            },
            gridConfig:{
                type:Array,
                default:()=>[],
            },
        },
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
        },
        computed:{
            row(){
                let row = {}
                let cols = Object.keys(this.rowData)

                this.gridConfig.forEach(item=>{
                    if(item.hidden){
                        const index = cols.indexOf(item.id)
                        if(index!==-1){
                            cols.splice(index, 1)
                        }
                    }
                })
                cols.forEach(col=>
                    row[col] = this.rowData[[col]]
                )
                return row
            }
        }
    }
</script>
<style scoped>
tr{
    cursor:pointer;
}
</style>
