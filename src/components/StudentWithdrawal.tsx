import { Button, DataGrid } from "devextreme-react";
import { useState } from "react";
import AddWithdrawalPopup from "./AddWithdrawalPopup";
import { Column, Selection } from "devextreme-react/data-grid";

export interface IWithdrawal {
  id: number;
  year: string;
  branch: string;
  date: string;
  semster: string;
  reson: string;
  school: string;
  notes: string;
}

const StudentWithdrawal = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [iWithdrawals, setIWithdrawals] = useState<IWithdrawal[]>([
    {
      id: 1,
      year: "2023",
      branch: "العلوم",
      date: "2023-09-01",
      semster: "الأول",
      reson: "انتقال",
      school: "مدرسة المستقبل",
      notes: "لا توجد ملاحظات",
    },
  ]);
  // const getAllWithdrawals = () => {
  //   setData([])
  // }
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const handleSelectionChanged = (e: any) => {
    setSelectedRowKeys(e.selectedRowKeys);
  };

  const handleDeleteWithdrawal = (id: number) => {
    setIWithdrawals((prevData) => prevData.filter((row) => row.id !== id));
  };

  const handleDeleteSelected = () => {
    const remainingData = iWithdrawals.filter(
      (row) => !selectedRowKeys.includes(row.id)
    );
    setIWithdrawals(remainingData);
  };

  const handleDeleteAll = () => {
    setIWithdrawals([]);
  };

  const handleAddWithdrawal = (newWithdrawal: IWithdrawal) => {
    setIWithdrawals((prevData) => [...prevData, newWithdrawal]);
  };

  return (
    <div className="container">
      <h1>شاشة انسحاب الطالب</h1>
      <Button
        text="إجراء الانسحاب"
        icon="plus"
        onClick={() => setOpenPopup(!openPopup)}
        type="default"
      />
      <h2>بيانات الانسحاب</h2>
      <div style={{ marginBottom: "20px" }}>
        <DataGrid
          dataSource={iWithdrawals}
          keyExpr="id"
          selectedRowKeys={selectedRowKeys}
          onSelectionChanged={handleSelectionChanged}
          showBorders={true}
          showRowLines
          columnAutoWidth
          rtlEnabled
          wordWrapEnabled={true}
          className="iWithdrawals-data-grid"
        >
          <Selection mode="multiple" />
          <Column dataField="year" caption="العام الدراسي" alignment="center" />
          <Column dataField="branch" caption="الفرع" alignment="center" />
          <Column
            dataField="date"
            caption="تاريخ الانسحاب"
            alignment="center"
          />
          <Column
            dataField="semster"
            caption="الفصل الدراسي"
            alignment="center"
            width={150}
          />
          <Column dataField="reson" caption="سبب الانسحاب" alignment="center" />
          <Column
            dataField="school"
            caption="المدرسة المنتقل اليها"
            alignment="center"
          />
          <Column dataField="notes" caption="الملاحظات" alignment="center" />
          <Column
            caption="إجراءات"
            cellRender={(data) => (
              <Button
                icon="trash"
                type="danger"
                onClick={() => handleDeleteWithdrawal(data.data.id)}
              />
            )}
            alignment="center"
          />
        </DataGrid>
      </div>
      <div>
        <Button
          type="danger"
          onClick={handleDeleteSelected}
          disabled={!selectedRowKeys.length}
          style={{ marginLeft: "10px" }}
          icon="trash"
          text=" حذف الصفوف المحددة"
        />
        <Button
          type="danger"
          onClick={handleDeleteAll}
          icon="trash"
          text="حذف الكل"
        />
      </div>

      <AddWithdrawalPopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        handleAddWithdrawal={handleAddWithdrawal}
      />
    </div>
  );
};

export default StudentWithdrawal;
