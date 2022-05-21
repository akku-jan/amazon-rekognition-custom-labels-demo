import React, {useRef} from "react";
import {Table} from "react-bootstrap";

import LabelsAccordion from "./LabelsAccordion";

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const filterAndSortLabels = (labels) => {
  let newLabels = labels
    .map((label) => ({
      boundingBoxes:
        label.Geometry && label.Geometry.BoundingBox
          ? [label.Geometry.BoundingBox]
          : [],
      confidence: label.Confidence,
      name: label.Name,
    }))
    .filter((x) => x.confidence > 0)
    .sort((a, b) => {
      if (a.confidence > b.confidence) {
        return -1;
      } else if (a.confidence < b.confidence) {
        return 1;
      } else return 0;
    });
  const dedupedLabels = deduplicateLabels(newLabels);
  return dedupedLabels;
};

const deduplicateLabels = (labels) => {
  const newLabels = Object.values(
    labels.reduce((a, item) => {
      const {name} = item;
      if (!a[name] || a[name].confidence < item.confidence) {
        a[name] = item;
      }
      return a;
    }, {})
  );
  return newLabels;
};

const translateLabels = (labels) => {
  return labels.map((label) => {
    label.name = getNameForLabel(label.name);
    return label;
  });
};

const isPartOfSet = (label, setName) => {
  let toolSet = "";
  switch (label.name) {
    case "acc_battery_b12_2_6":
      toolSet = [
        "Set Hilti SF 2H A12",
        "Set Hilti SF4 A22",
        "Set Hilti TE6 A22",
      ];
      break;
    case "acc_battery_b12_5_6":
      toolSet = [
        "Set Hilti SF 2H A12",
        "Set Hilti SF4 A22",
        "Set Hilti TE6 A22",
      ];
      break;
    case "acc_battery_b22_2_6":
      toolSet = [
        "Set Hilti SF 2H A12",
        "Set Hilti SF4 A22",
        "Set Hilti TE6 A22",
      ];
      break;
    case "acc_bit_set":
      toolSet = [
        "Set Hilti SF 2H A12",
        "Set Hilti SF4 A22",
        "Set Hilti TE6 A22",
      ];
      break;
    case "acc_charger_c4_12_50":
      toolSet = [
        "Set Hilti SF 2H A12",
        "Set Hilti SF4 A22",
        "Set Hilti TE6 A22",
      ];
      break;
    case "acc_charger_c4_36_90":
      toolSet = [
        "Set Hilti SF 2H A12",
        "Set Hilti SF4 A22",
        "Set Hilti TE6 A22",
      ];
      break;
    case "acc_drill_set":
      toolSet = [
        "Set Hilti SF 2H A12",
        "Set Hilti SF4 A22",
        "Set Hilti TE6 A22",
      ];
      break;
    case "acc_hilti_case":
      toolSet = [
        "Set Hilti SF 2H A12",
        "Set Hilti SF4 A22",
        "Set Hilti TE6 A22",
      ];
      break;
    case "acc_hilti_case_top":
      toolSet = [
        "Set Hilti SF 2H A12",
        "Set Hilti SF4 A22",
        "Set Hilti TE6 A22",
      ];
      break;
    case "acc_hilti_cleaning_cloth":
      toolSet = [
        "Set Hilti SF 2H A12",
        "Set Hilti SF4 A22",
        "Set Hilti TE6 A22",
      ];
      break;
    case "acc_hilti_manual_red":
      toolSet = [
        "Set Hilti SF 2H A12",
        "Set Hilti SF4 A22",
        "Set Hilti TE6 A22",
      ];
      break;
    case "acc_hilti_manual_white":
      toolSet = [
        "Set Hilti SF 2H A12",
        "Set Hilti SF4 A22",
        "Set Hilti TE6 A22",
      ];
      break;
    case "tool_sf_2h_a12":
      toolSet = ["Set Hilti SF 2H A12"];
      break;
    case "tool_sf_4_a22":
      toolSet = ["Set Hilti SF4 A22"];
      break;
    case "tool_te6_a22":
      toolSet = ["Set Hilti TE6 A22"];
      break;
    default:
      toolSet = [];
      break;
  }
  return toolSet.indexOf(setName) > -1;
};

const isSetComplete = (labels, setName) => {
  if (setName === "Set Hilti SF 2H A12") {
    return checkAllExists(labels, ["tool_sf_2h_a12"]);
  } else if (setName === "Set Hilti SF4 A22") {
    return checkAllExists(labels, ["tool_sf_4_a22"]);
  } else if (setName === "Set Hilti TE6 A22") {
    return checkAllExists(labels, ["tool_te6_a22"]);
  } else {
    return false;
  }
};

const boolToString = function (boolExpr) {
  return boolExpr ? "Yes" : "No";
};

const checkAllExists = (arr, values) => {
  return values.every((value) => {
    return arr.some((el) => el.name === value);
  });
};

const getSetName = (labels) => {
  if (labels.some((el) => el.name === "tool_sf_2h_a12")) {
    return "Set Hilti SF 2H A12";
  } else if (labels.some((el) => el.name === "tool_sf_4_a22")) {
    return "Set Hilti SF4 A22";
  } else if (labels.some((el) => el.name === "tool_te6_a22")) {
    return "Set Hilti TE6 A22";
  } else {
    return "No Set detected";
  }
};

const getNameForLabel = (label) => {
  switch (label) {
    case "acc_battery_b12_2_6":
      return "Battery B12 2 6";
    case "acc_battery_b12_5_6":
      return "Battery B12 5 6";
    case "acc_battery_b22_2_6":
      return "Battery B22 2 6";
    case "acc_bit_set":
      return "Bit Set";
    case "acc_charger_c4_12_50":
      return "Charger C4 12 50";
    case "acc_charger_c4_36_90":
      return "Charger C4 36 90";
    case "acc_drill_set":
      return "Drill Set";
    case "acc_hilti_case":
      return "Hilti Case";
    case "acc_hilti_case_top":
      return "Hilti Case";
    case "acc_hilti_cleaning_cloth":
      return "Hilti Cleaning Cloth";
    case "acc_hilti_manual_red":
      return "Hilti Manual";
    case "acc_hilti_manual_white":
      return "Hilti Manual";
    case "tool_sf_2h_a12":
      return "Hilti SF 2H A12";
    case "tool_sf_4_a22":
      return "Hilti SF4 A22";
    case "tool_te6_a22":
      return "Hilti TE6 A22";
    default:
      return label;
  }
};

const percentageToString = (percentage) => Math.round(percentage * 10) / 10;

const LabelsSummary = ({
  apiResponse,
  containerCoordinates,
  detectedLabels,
  image,
  projectVersionArn,
  showLabelBoundingBoxes,
}) => {
  const colors = useRef({});

  const getColor = (labelName) => {
    colors.current[labelName] =
      colors.current[labelName] || generateRandomColor();
    return colors.current[labelName];
  };

  const highlight = (index, color) => {
    const boxes = document.getElementsByClassName(`bb-${index}`);
    Array.from(boxes).forEach((box) => {
      box.style.opacity = 0.5;
      box.style.filter = "alpha(opacity=50)";
      box.style.backgroundColor = color;
    });
  };

  const removeHighlight = (index) => {
    const boxes = document.getElementsByClassName(`bb-${index}`);
    Array.from(boxes).forEach((box) => {
      box.style.opacity = 1;
      box.style.filter = "alpha(opacity=100)";
      box.style.backgroundColor = null;
    });
  };

  return (
    <div>
      {detectedLabels && (
        <>
          <LabelsAccordion labelName="Set Information">
            {detectedLabels.length === 0 && (
              <span>No custom labels detected for the given image.</span>
            )}
            {detectedLabels.length > 0 && (
              <Table responsive>
                <tbody>
                  {detectedLabels.length > 0 && (
                    <tr key={getSetName(filterAndSortLabels(detectedLabels))}>
                      <td>
                        <b>Set name:</b>
                      </td>
                      <td>{getSetName(filterAndSortLabels(detectedLabels))}</td>
                    </tr>
                  )}
                  {detectedLabels.length > 0 && (
                    <tr key="setCompleteness">
                      <td>
                        <b>Set complete:</b>
                      </td>
                      <td>
                        {boolToString(
                          isSetComplete(
                            filterAndSortLabels(detectedLabels),
                            getSetName(filterAndSortLabels(detectedLabels))
                          )
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </LabelsAccordion>
          <LabelsAccordion labelName="Tool Information">
            {detectedLabels.length === 0 && (
              <span>No custom labels detected for the given image.</span>
            )}
            {detectedLabels.length > 0 && (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    {/* <th>Confidence</th> */}
                    <th>Part of Set</th>
                  </tr>
                </thead>
                <tbody>
                  {detectedLabels &&
                    filterAndSortLabels(detectedLabels).map((label, index) => {
                      const color = getColor(label.name);
                      const setName = getSetName(
                        filterAndSortLabels(detectedLabels)
                      );
                      const labelName = getNameForLabel(label.name);
                      return (
                        <tr
                          key={index}
                          onMouseOver={() => highlight(index, color)}
                          onMouseOut={() => removeHighlight(index)}
                        >
                          <td>
                            {labelName}
                            {showLabelBoundingBoxes &&
                              label.boundingBoxes.map(
                                (boundingBox, bbIndex) => (
                                  <div
                                    key={`bb-${bbIndex}`}
                                    className={`bb-${index} custom-label-box`}
                                    style={{
                                      border: `1px solid ${color}`,
                                      color: "#fff",
                                      fontWeight: "bold",
                                      position: "fixed",
                                      height:
                                        containerCoordinates.height *
                                        boundingBox.Height,
                                      left:
                                        containerCoordinates.left +
                                        boundingBox.Left *
                                          containerCoordinates.width,
                                      top:
                                        containerCoordinates.top +
                                        boundingBox.Top *
                                          containerCoordinates.height,
                                      width:
                                        containerCoordinates.width *
                                        boundingBox.Width,
                                    }}
                                  >
                                    {labelName}
                                  </div>
                                )
                              )}
                          </td>
                          {/* <td>{percentageToString(label.confidence)}%</td> */}
                          <td>{boolToString(isPartOfSet(label, setName))}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            )}
          </LabelsAccordion>
        </>
      )}
    </div>
  );
};

export default LabelsSummary;
