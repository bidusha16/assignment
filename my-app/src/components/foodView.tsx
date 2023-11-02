export const FoodView = () => {
    const { id } = useParams<any>();
    const [ foodView, setFoodView ] = useState<any>({});

    useEffect(() => {
        const data  = foodListMockData.filter(foodlist => foodlist.fdcId.toString() == id);
        console.log('xxx data ', data);
        setFoodView(data[0].foodNutrients[0]);
        // NOTE: creating mock json as while calling API number of times i am getting API error as 
        //        429 max time limit error
        // getFood(id)
        // .then(response => {
        //     setFoodView(response.data);
        // })
        // .catch(() => {

        // }).finally(() => {

        // })
    }, []);
    // Note: Purposely used Label and Input Field as Grid has been already used to view all the list of food.
    // We can use grid here as well or also the other kendo-ui component.
    return(
        <>
        <form>
            <h2>Food View list</h2>
            <div>
                <Label editorId='number'>Number: {foodView.number}</Label>
            </div>

            <div>
                <Label editorId='name'>Name: {foodView.name}</Label>
            </div>

            <div>
                <Label editorId='number'>Amount: {foodView.amount}</Label>
            </div>

            <div>       
                <Label editorId='unitName'>Unit Name: {foodView.unitName}</Label>
            </div>

            <div> 
                <Label editorId='derivationCode'>Derivation Code: {foodView.derivationCode}</Label>
            </div>

            <div> 
                <Label editorId='derivationDescription'>Derivation Description: {foodView.derivationDescription}</Label>
            </div>
        </form>
