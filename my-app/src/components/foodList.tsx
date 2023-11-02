import React, { useState, useEffect } from 'react';
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { process } from "@progress/kendo-data-query";
import { getFoodList } from '../services/food';
import foodListMockData from '../mock-data/food-list.json';

import { EditButton } from '../common-component/editbutton'

export const FoodList = () => {
  const [foodList, setFoodList] = useState<any>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState();
  const [filteredSampleProducts, setFilteredSampleProducts] = useState(foodList);
  const [dataState, setDataState] = useState({
    skip: 0,
    take: 10,
  });
  const [dataResult, setDataResult] = useState(
    process(filteredSampleProducts, dataState)
  );
  const dataStateChange = (event: any) => {
    setDataResult(process(filteredSampleProducts, event.dataState));
    setDataState(event.dataState);
  };

  const CommandCell = (props: any) => <EditButton
    {...props}
    viewReport={viewReport}
  />;

  useEffect(() => {
    setIsLoading(true);
    // NOTE: creating mock json as while calling API number of times i am getting API error as 
    //        429 max time limit error
    setFoodList(foodListMockData);
    // Note: the fetch item from the API will get stored in the local storage.
    localStorage. setItem('foodList', JSON. stringify(foodListMockData));
    // getFoodList()
    //     .then(response => {
    // Note: the fetch item from the API will get stored in the local storage.
    //       localStorage. setItem('foodList', JSON. stringify(response.data));
    //       setFoodList(response.data);
    //       setError(false);
    //     })
    //     .catch(() => {
    //       setError(true);

    //     }).finally(() => {
    //       setIsLoading(false);
    //   })
  }, []);

  const viewReport = (fdcId: number) => {
    window.open(`/food/${fdcId}/view`, '_blank');
  };

  // Note: As asked in the case summary to implement the local storage thing. 
  // We can store the search item in the local storage. Idea here is when we search the
  // item from the search box the initial fetch list item we can store in the local storage 
  // And when user clear the search box instead of calling API again we can get list of all food 
  // from the local storage.
  const onFilterChange = (ev: any) => {
    let val = ev.value;
    setFilterValue(ev.value);
    let newData = foodList.filter((item: any) => {
      let match = false;

      const valueExists = (obj: any, value: any) => Object.keys(obj).some((key) => obj[key] === value);
      if (valueExists(item, val)) {
        match = true;
      } else {
        match = false;
      }
      return match;
    });
    setFilteredSampleProducts(newData);
    let clearedPagerDataState = {
      ...dataState,
      take: 10,
      skip: 0,
    };
    let processedData = process(newData, clearedPagerDataState);
    setDataResult(processedData);
    setDataState(clearedPagerDataState);
  };

  const expandChange = (event: any) => {
    const isExpanded =
      event.dataItem.expanded === undefined
        ? event.dataItem.aggregates
        : event.dataItem.expanded;
    event.dataItem.expanded = !isExpanded;
    setDataResult({
      ...dataResult,
    });
  };


  return (
    <>
      <h3>Food Data Fetching</h3>
      {error && <b id={"error"}>Error!</b>}
      {isLoading && <div id={"loading"}>Loading...</div>}

      {/* Note: As we have large number of data we can also apply paging and sorting functionality here. */}
      <Grid
        style={{
          height: "620px",
        }}
        resizable={true}
        reorderable={true}
        data={foodList}
        {...dataState}
        onDataStateChange={dataStateChange}
        onExpandChange={expandChange}
      >
        <GridToolbar>
          <div>
            <span
              style={{
                padding: "5px",
              }}
            >
              Search:{" "}
            </span>
            <span>
              <Input
                value={filterValue}
                onChange={onFilterChange}
                style={{
                  border: "2px solid #ccc",
                  boxShadow: "inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)",
                }}
              />
            </span>
          </div>
        </GridToolbar>
        <Column field="fdcId" title="Food CID" width={90} resizable={false} />
        <Column field="description" title="Description" width={400} resizable={false} />
        <Column field="dataType" title="Data Type" width={120} resizable={false} />
        <Column field="publicationDate" title="Publication Date" width={150} resizable={false} />
        <Column field="foodCode" title="Food Code" width={100} resizable={false} />
        <Column field="ndbNumber" title="NDB Number" width={100} resizable={false} />
        <Column cell={CommandCell} width="240px" />
      </Grid>
    </>
  );
};
