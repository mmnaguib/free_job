import {
  Button,
  DateBox,
  Popup,
  SelectBox,
  TagBox,
  TextArea,
} from "devextreme-react";
import React, { useState } from "react";

export interface IProps {
  openPopup: boolean;
  setOpenPopup: (val: boolean) => void;
}

const years = [
  { ID: 1, name: "2023" },
  { ID: 2, name: "2024" },
];
const branches = [
  { ID: 1, name: "مكة" },
  { ID: 2, name: "مدينة" },
];
const semsters = [
  { ID: 1, name: "الفصل الدراسي الاول" },
  { ID: 2, name: "الفصل الدراسي الثاني" },
];
const resons = [
  { ID: 1, name: "انقطاع" },
  { ID: 2, name: "صعوبات" },
];
const schools = [
  { ID: 1, name: "مدرسة 1" },
  { ID: 2, name: "مدرسة 2" },
];

const AddWithdrawalPopup = ({ openPopup, setOpenPopup }: IProps) => {
  const [selectionYear, setSelectionYear] = useState(0);
  const [selectionBranch, setSelectionBranch] = useState(0);
  const [selectionDate, setSelectionDate] = useState<Date>(new Date());
  const [selectionSemeters, setSelectionSemsters] = useState<number[]>([]);
  const [selectionReson, setSelectionReson] = useState(0);
  const [selectionSchool, setSelectionSchool] = useState(0);
  const [notes, setNotes] = useState("");
  const addToGrid = () => {
    console.log(
      selectionYear,
      selectionBranch,
      selectionDate,
      selectionSemeters,
      selectionReson,
      selectionSchool
    );
  };
  return (
    <>
      <Popup
        visible={openPopup}
        onHiding={() => setOpenPopup(!openPopup)}
        height={400}
        width={500}
        showCloseButton
        showTitle={true}
        title="اضافة انسحاب"
      >
        <div className="flexDiv">
          <div>
            <label>العام الدراسي</label>
            <SelectBox
              dataSource={years}
              displayExpr="name"
              valueExpr="ID"
              value={selectionYear}
              onValueChanged={(e) => setSelectionYear(e.value)}
              showSelectionControls
            />
          </div>
          <div>
            <label>الفرع</label>
            <SelectBox
              dataSource={branches}
              displayExpr="name"
              valueExpr="ID"
              value={selectionBranch}
              onValueChanged={(e) => setSelectionBranch(e.value)}
              showSelectionControls
            />
          </div>
        </div>
        <div className="flexDiv">
          <div style={{ width: "19%" }}>
            <label>تاريخ الانسحاب</label>
            <DateBox
              value={selectionDate}
              onValueChanged={(e) => setSelectionDate(e.value)}
            />
          </div>
          <div>
            <label>الفصل الدراسي</label>
            <TagBox
              dataSource={semsters}
              displayExpr="name"
              valueExpr="ID"
              value={selectionSemeters}
              onValueChanged={(e) => setSelectionSemsters(e.value)}
              showSelectionControls
            />
          </div>
        </div>
        <div className="flexDiv">
          <div>
            <label>سبب الانسحاب</label>
            <SelectBox
              dataSource={resons}
              displayExpr="name"
              valueExpr="ID"
              value={selectionReson}
              onValueChanged={(e) => setSelectionReson(e.value)}
              showSelectionControls
            />
          </div>
          <div>
            <label>اسم المدرسة</label>
            <SelectBox
              dataSource={schools}
              displayExpr="name"
              valueExpr="ID"
              value={selectionSchool}
              onValueChanged={(e) => setSelectionSchool(e.value)}
              showSelectionControls
            />
          </div>
        </div>
        <div>
          <label>الملاحظات</label>
          <TextArea value={notes} onValueChanged={(e) => setNotes(e.value)} />
        </div>

        <div>
          <Button
            text="close"
            icon="close"
            onClick={() => setOpenPopup(false)}
            type="default"
          />
          <Button text="save" icon="plus" onClick={addToGrid} type="success" />
        </div>
      </Popup>
    </>
  );
};

export default AddWithdrawalPopup;
