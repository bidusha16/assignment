import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFood } from '../services/food';
import foodListMockData from '../mock-data/food-list.json';
import { Label } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";

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
            <h2>Food View list</h2>
            <Label editorId='number'>Number:&nbsp;</Label>
            <Input id='number' value={foodView.number}></Input>

            <Label editorId='name'>Name:&nbsp;</Label>
            <Input id='name' value={foodView.name}></Input>

            <Label editorId='number'>Amount:&nbsp;</Label>
            <Input id='amount' value={foodView.amount}></Input>

            <Label editorId='unitName'>Unit Name:&nbsp;</Label>
            <Input id='unitName' value={foodView.unitName}></Input>

            <Label editorId='derivationCode'>Derivation Code:&nbsp;</Label>
            <Input id='derivationCode' value={foodView.derivationCode}></Input>

            <Label editorId='derivationDescription'>Derivation Description:&nbsp;</Label>
            <Input id='derivationDescription' value={foodView.derivationDescription}></Input>

        </>
    )
}