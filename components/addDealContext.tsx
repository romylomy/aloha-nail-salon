import {NewDeal} from "@/libs/validation"


const defaultDeal: NewDealInitalValuesType = {
    name:'',
    link:'',
    coupoun:'',
    discount: undefined,
    contactName:'',
    contactEmail:''
}

type AddDealContextType = {
    newDealData: NewDeal;
    updateBewDealDetails:(dealDetails: Partial<NewDeal>) => void; 
    dataLoaded: boolean;
    resetLocalStorage: () => void
}

export const AddDealContext = createContext<AddDealContectType| null>(null); 

export const AdddealContextProvider =({children}:{children: React.ReactNode} ) => {

    const [newDealData, setNewDealData] = useState<NewDeal>(defaultData )


    return <AddDealContext.Provider value={}>  
       { chidldren}
        </AddDealContext.Provider> 
    
}