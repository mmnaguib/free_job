import {
  Button,
  DateBox,
  Popup,
  SelectBox,
  TagBox,
  TextArea,
} from "devextreme-react";
import React, { useState } from "react";
import AddReasonPopup from "./AddReasonPopup";

export interface IProps {
  openPopup: boolean;
  setOpenPopup: (val: boolean) => void;
  handleAddWithdrawal: (withdrawal: any) => void;
}
export interface IObjProps {
  ID: number;
  name: string;
}
const AddWithdrawalPopup = ({
  openPopup,
  setOpenPopup,
  handleAddWithdrawal,
}: IProps) => {
  const [selectionYear, setSelectionYear] = useState(0);
  const [selectionBranch, setSelectionBranch] = useState(0);
  const [selectionDate, setSelectionDate] = useState<Date | null>(null);
  const [selectionSemeters, setSelectionSemsters] = useState<number[]>([]);
  const [selectionReason, setSelectionReason] = useState(0);
  const [selectionSchool, setSelectionSchool] = useState(0);
  const [notes, setNotes] = useState("");
  const [openAddReasonPopup, setOpenAddReasonPopup] = useState(false);

  const [reasonsList, setReasonsList] = useState<IObjProps[]>([
    { ID: 1, name: "انقطاع" },
    { ID: 2, name: "صعوبات" },
    { ID: 3, name: "آخري" },
  ]);

  const [years, setYears] = useState<IObjProps[]>([
    { ID: 1, name: "2023" },
    { ID: 2, name: "2024" },
  ]);

  const [branches, setBranches] = useState<IObjProps[]>([
    { ID: 1, name: "مكة" },
    { ID: 2, name: "مدينة" },
  ]);

  const [semsters, setSemsters] = useState<IObjProps[]>([
    { ID: 1, name: "الفصل الدراسي الاول" },
    { ID: 2, name: "الفصل الدراسي الثاني" },
  ]);

  const [schools, setSchools] = useState<IObjProps[]>([
    { ID: 1, name: "مدرسة المستقبل" },
    { ID: 2, name: "مدرسة النجاح" },
  ]);

  // const getAllYears = () => {
  //   // setYears(fetchedYears);
  // }
  // const getAllBranches = () => {
  //   // setBranches(fetchedYears);
  // }
  // const getAllSemsters = () => {
  //   // setSemsters(fetchedYears);
  // }
  // const getAllSchools = () => {
  //   // setSchools(fetchedYears);
  // }
  // const getAllReasons = () => {
  //   // setReasonsList(fetchedYears);
  // }
  const [errors, setErrors] = useState({
    year: "",
    branch: "",
    date: "",
    semester: "",
    reason: "",
    school: "",
    // notes: "",
  });

  const validateFields = () => {
    const newErrors = {
      year: selectionYear ? "" : "العام الدراسي مطلوب",
      branch: selectionBranch ? "" : "الفرع مطلوب",
      date: selectionDate ? "" : "تاريخ الانسحاب مطلوب",
      semester: selectionSemeters.length > 0 ? "" : "الفصل الدراسي مطلوب",
      reason: selectionReason ? "" : "سبب الانسحاب مطلوب",
      school: selectionSchool ? "" : "اسم المدرسة مطلوب",
      //notes: notes.trim() ? "" : "الملاحظات مطلوبة",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const addToGrid = () => {
    if (!validateFields()) {
      return;
    }

    const newWithdrawal = {
      id: Math.random(),
      year: years.find((y) => y.ID === selectionYear)?.name || "",
      branch: branches.find((b) => b.ID === selectionBranch)?.name || "",
      date: selectionDate ? selectionDate.toISOString().split("T")[0] : "",
      semster: selectionSemeters
        .map((id) => semsters.find((s) => s.ID === id)?.name)
        .join(", "),
      reson: reasonsList.find((r) => r.ID === selectionReason)?.name || "",
      school: schools.find((s) => s.ID === selectionSchool)?.name || "",
      notes,
    };

    handleAddWithdrawal(newWithdrawal);
    setOpenPopup(false);
    setSelectionYear(0);
    setSelectionBranch(0);
    setSelectionDate(null);
    setSelectionSemsters([]);
    setSelectionReason(0);
    setSelectionSchool(0);
    setNotes("");
    setErrors({
      year: "",
      branch: "",
      date: "",
      semester: "",
      reason: "",
      school: "",
      // notes: "",
    });
  };

  return (
    <>
      <Popup
        visible={openPopup}
        onHiding={() => setOpenPopup(!openPopup)}
        height={430}
        width={600}
        showCloseButton
        showTitle={true}
        title="اضافة انسحاب"
        rtlEnabled
      >
        <div className="flexDiv">
          <div>
            <label>العام الدراسي</label>
            <SelectBox
              dataSource={years}
              displayExpr="name"
              valueExpr="ID"
              value={selectionYear}
              onValueChanged={(e) => {
                setSelectionYear(e.value);
                setErrors({
                  ...errors,
                  year: e.value ? "" : "العام الدراسي مطلوب",
                });
              }}
              showSelectionControls
              rtlEnabled
              placeholder="اختر العام الدراسي"
              showClearButton
              width="100%"
            />
            {errors.year && <span className="errorMessage">{errors.year}</span>}
          </div>
          <div>
            <label>الفرع</label>
            <SelectBox
              dataSource={branches}
              displayExpr="name"
              valueExpr="ID"
              value={selectionBranch}
              onValueChanged={(e) => {
                setSelectionBranch(e.value);
                setErrors({ ...errors, branch: e.value ? "" : "الفرع مطلوب" });
              }}
              showSelectionControls
              rtlEnabled
              placeholder="اختر الفرع"
              showClearButton
              width="100%"
            />
            {errors.branch && (
              <span className="errorMessage">{errors.branch}</span>
            )}
          </div>
        </div>
        <div className="flexDiv">
          <div>
            <label>تاريخ الانسحاب</label>
            <DateBox
              value={selectionDate || undefined}
              onValueChanged={(e) => {
                setSelectionDate(e.value);
                setErrors({
                  ...errors,
                  date: e.value ? "" : "تاريخ الانسحاب مطلوب",
                });
              }}
              rtlEnabled={true}
              placeholder="اختر تاريخ الانسحاب"
              showClearButton
              width="100%"
            />
            {errors.date && <span className="errorMessage">{errors.date}</span>}
          </div>
          <div>
            <label>الفصل الدراسي</label>
            <TagBox
              dataSource={semsters}
              displayExpr="name"
              valueExpr="ID"
              value={selectionSemeters}
              onValueChanged={(e) => {
                setSelectionSemsters(e.value);
                setErrors({
                  ...errors,
                  semester: e.value.length > 0 ? "" : "الفصل الدراسي مطلوب",
                });
              }}
              showSelectionControls
              rtlEnabled={true}
              placeholder="اختر الفصل الدراسي"
              showClearButton
              width="100%"
            />
            {errors.semester && (
              <span className="errorMessage">{errors.semester}</span>
            )}
          </div>
        </div>
        <div className="flexDiv">
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <div style={{ width: "100%" }}>
              <label>سبب الانسحاب</label>
              <SelectBox
                dataSource={reasonsList}
                displayExpr="name"
                valueExpr="ID"
                value={selectionReason}
                onValueChanged={(e) => {
                  setSelectionReason(e.value);
                  setErrors({
                    ...errors,
                    reason: e.value ? "" : "سبب الانسحاب مطلوب",
                  });
                }}
                showSelectionControls
                rtlEnabled={true}
                placeholder="اختر سبب الانسحاب"
                showClearButton
                width="100%"
              />
              {errors.reason && (
                <span className="errorMessage">{errors.reason}</span>
              )}
            </div>
            <div>
              <Button
                onClick={() => setOpenAddReasonPopup(!openAddReasonPopup)}
                icon="plus"
                type="success"
                style={{ marginTop: "20px" }}
              />
            </div>
          </div>
          <div>
            <label>اسم المدرسة</label>
            <SelectBox
              dataSource={schools}
              displayExpr="name"
              valueExpr="ID"
              value={selectionSchool}
              onValueChanged={(e) => {
                setSelectionSchool(e.value);
                setErrors({
                  ...errors,
                  school: e.value ? "" : "اسم المدرسة مطلوب",
                });
              }}
              showSelectionControls
              rtlEnabled={true}
              placeholder="اختر اسم المدرسة"
              showClearButton
              width="100%"
            />
            {errors.school && (
              <span className="errorMessage">{errors.school}</span>
            )}
          </div>
        </div>
        <div>
          <label>الملاحظات</label>
          <TextArea
            value={notes}
            onValueChanged={(e) => {
              setNotes(e.value);
              // setErrors({
              //   ...errors,
              //   notes: e.value.trim() ? "" : "الملاحظات مطلوبة",
              // });
            }}
          />
          {/* {errors.notes && <span className="errorMessage">{errors.notes}</span>} */}
        </div>

        <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
          <Button text="حفظ" icon="plus" onClick={addToGrid} type="success" />
          <Button
            text="الغاء"
            icon="close"
            onClick={() => {
              setOpenPopup(false);
              setErrors({
                year: "",
                branch: "",
                date: "",
                semester: "",
                reason: "",
                school: "",
                // notes: "",
              });
            }}
            type="default"
          />
        </div>
      </Popup>

      <AddReasonPopup
        openAddReasonPopup={openAddReasonPopup}
        setOpenAddReasonPopup={setOpenAddReasonPopup}
        reasonsList={reasonsList}
        setReasonsList={setReasonsList}
      />
    </>
  );
};

export default AddWithdrawalPopup;
