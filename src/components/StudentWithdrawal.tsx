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
  const [data, setData] = useState<IWithdrawal[]>([
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
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const handleSelectionChanged = (e: any) => {
    setSelectedRowKeys(e.selectedRowKeys);
  };

  const handleDeleteSelected = () => {
    const remainingData = data.filter(
      (row) => !selectedRowKeys.includes(row.year)
    );
    setData(remainingData);
  };

  const handleDeleteAll = () => {
    setData([]);
  };

  return (
    <>
      <h2>شاشة انسحاب الطالب</h2>
      <Button
        text="إجراء الانسحاب"
        icon="plus"
        onClick={() => setOpenPopup(!openPopup)}
        type="success"
      />
      <div>
        <DataGrid
          dataSource={data}
          keyExpr="id"
          selectedRowKeys={selectedRowKeys}
          onSelectionChanged={handleSelectionChanged}
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
          />
          <Column dataField="reson" caption="سبب الانسحاب" alignment="center" />
          <Column
            dataField="school"
            caption="المدرسة المنتقل اليها"
            alignment="center"
          />
          <Column dataField="notes" caption="الملاحظات" alignment="center" />
        </DataGrid>
      </div>
      <Button type="danger" onClick={handleDeleteSelected}>
        حذف الصفوف المحددة
      </Button>
      <Button type="danger" onClick={handleDeleteAll}>
        حذف الكل
      </Button>

      <AddWithdrawalPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </>
  );
};

export default StudentWithdrawal;
