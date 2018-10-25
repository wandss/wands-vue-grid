<template>
    <tr :style="{'background-color':rowColor}">
        <td v-for="(item, key) in row " :key="key"
            @click="$emit('rowClick')">
            <div v-if="key === 'Ações' ">
                <grid-icon v-for="btn in item" id="icon"
                 :key="btn.name"
                 :icon="btn.icon" :title="btn.title"
                  @click="$emit('click', btn.event)"
                />
            </div>
            <input v-else-if="canEdit"
             @blur="canEdit=false"
             ref="input"
             type="text" :value="item"/>

            <div v-else v-html="formatItem(item)" :style="regularContent"
                @click="editItem">
            </div>
        </td>
    </tr>
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
            inlineEdition:{
                type:Boolean,
                default:true,
            }
        },
        data(){
            return{
                rowColor:'',
                canEdit:false,
                inputStyle:'',
                regularContent:{'cursor':'default'},
            }
        },
        methods:{
            formatItem(item){
                let newItem = item;
                if(Array.isArray(item)){
                    newItem = newItem.join(', ');
                }
                if(!isNaN(newItem)){
                    newItem = Number(newItem).toLocaleString()
                }
                return newItem;
            },
            toggleRowColor(rowColor){
                this.rowColor = rowColor;
            },
            editItem(){
                if(this.inlineEdition){
                    this.canEdit = true
                }
            }
        },
        computed:{
            row(){
                let row = {}
                let cols = Object.keys(this.rowData)
                const rowColorIndex = cols.indexOf('rowColor')

                if(rowColorIndex !== -1){
                    //Removes rowColor property
                    cols.splice(rowColorIndex, 1)
                    this.toggleRowColor(this.rowData.rowColor)
                }
                else{
                    this.toggleRowColor(this.rowData.rowColor)
                }

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
#icon{
    cursor:pointer;
}
input{
    background:transparent;
    border:none;
    border-bottom:1px solid black;
    width:100%;
    outline:none;
}
</style>
