var recentstate = []
const storedRecent = localStorage.getItem('recent');
if (storedRecent) {
    const obj = JSON.parse(storedRecent);
    recentstate = obj;
}
export const initialState = recentstate

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            let newRecent_0 = [...state];
            const index_0 = state.findIndex((item)=>item.id === action.item.id)
            if(index_0 >= 0){
                newRecent_0.splice(index_0,1)
            }
            localStorage.setItem('recent', JSON.stringify([action.item,...newRecent_0]));
            return [action.item,...newRecent_0];

        case 'REMOVE':
            let newRecent_1 = [...state];
            const index_1 = state.findIndex((item)=>item.id === action.item.id)
            if(index_1 >= 0){
                newRecent_1.splice(index_1,1)
            }
            localStorage.setItem('recent', JSON.stringify(newRecent_1));
            return newRecent_1;
        default:
            return state;

    }
}


export default reducer