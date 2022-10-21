

export const initialState ={
    basket:[],
    user:null
};

//selecter 
 export const getBasketTotal=(basket) =>
    basket?.reduce((amount,item)=>item.price+amount,0)
 
 //reduce iterates through the basket and tallies up the result 
const reducer = (state,action) =>{
    switch(action.type){
        case "SET_USER":
            return{
                ...state,
                user:action.user
            }
        case 'ADD_TO_BASKET':
            return{
                ...state,
                basket:[...state.basket,action.item],
            }
        case 'REMOVE_FROM_BASKET': 
                
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id===action.id
            );
            let newBasket=[...state.basket];
            if(index>=0){
                    newBasket.splice(index,1);
            }
            else{
                console.warm("Can't remove the product")
            }
            return{
                ...state,
                basket:newBasket
            }


        
            default:
                return state;
    }
}

export default reducer;