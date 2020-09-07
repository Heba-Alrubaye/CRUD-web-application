const itemOperations = {
    items:[],
    add(itemObject){
        /* adds an item into the array items*/
        this.items.push(itemObject);
    },
    remove(){
         /* removes the item which has the "isMarked" field set to true*/
         this.items = this.items.filter((itemObject)=>{
            return !itemObject.isMarked;
         });
         return this.items;
   },
    search(id){
            /* searches the item with a given argument id */
            return this.items.find((itemObject)=>{
                return itemObject.id == id;
            });
    },
    markUnMark(id){
        /* toggle the isMarked field of the item with the given argument id*/
       this.search(id).toggle();
},
   countTotalMarked(){
       /* counts the total number of marked items */
       let marked = this.items.filter((itemObject)=>{
        return itemObject.isMarked;
        });
        return marked.length; 
    },
   
}