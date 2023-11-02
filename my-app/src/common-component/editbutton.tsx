import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { folderIcon } from "@progress/kendo-svg-icons";

export const EditButton = (props: any) => {
  const {
    dataItem: { fdcId },
    viewReport
  } = props;
  // const logEvent = (event) => {
  //   let newLogs = logs.slice();
  //   newLogs.unshift(event.type);
  //   setLogs(newLogs);
  // };

  const handleClick = (event: any) => {
    viewReport(fdcId);
  };

  return <>
    <Button themeColor={"primary"}
      onClick={handleClick}>
      View
    </Button>
  </>
}; 