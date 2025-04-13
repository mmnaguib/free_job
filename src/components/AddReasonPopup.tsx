import React, { useState } from "react";
import { Popup } from "devextreme-react/popup";
import { List } from "devextreme-react/list";
import { Button } from "devextreme-react/button";
import { TextBox } from "devextreme-react";
import "devextreme/dist/css/dx.light.css";
import { IObjProps } from "./AddWithdrawalPopup";

export interface IProps {
  openAddReasonPopup: boolean;
  setOpenAddReasonPopup: (val: boolean) => void;
  reasonsList: IObjProps[];
  setReasonsList: any;
}

const AddReasonPopup = ({
  openAddReasonPopup,
  setOpenAddReasonPopup,
  reasonsList,
  setReasonsList,
}: IProps) => {
  const [newReason, setNewReason] = useState("");
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const saveEdit = (id: number) => {
    if (editText.trim()) {
      setReasonsList((prevItems: IObjProps[]) =>
        prevItems.map((item) =>
          item.ID === id ? { ...item, name: editText } : item
        )
      );
      setEditItemId(null);
      setEditText("");
    }
  };

  const renderListItem = (item: IObjProps) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {editItemId === item.ID ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextBox
              value={editText}
              onValueChanged={(e) => setEditText(e.value)}
            />
            <div>
              <Button
                text="حفظ"
                type="default"
                stylingMode="contained"
                onClick={() => saveEdit(item.ID)}
              />
              <Button
                text="إلغاء"
                type="default"
                stylingMode="contained"
                onClick={() => setEditItemId(null)}
              />
            </div>
          </div>
        ) : (
          <>
            <span>{item.name}</span>
            <div style={{ display: "flex", gap: "5px" }}>
              <Button
                text="حذف"
                type="danger"
                stylingMode="contained"
                onClick={() => {
                  setReasonsList((prevItems: IObjProps[]) =>
                    prevItems.filter((i) => i.ID !== item.ID)
                  );
                }}
              />
              <Button
                text="تعديل"
                type="default"
                stylingMode="contained"
                onClick={() => {
                  setEditItemId(item.ID);
                  setEditText(item.name);
                }}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  const addReason = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newReason.trim()) {
      setReasonsList([
        ...reasonsList,
        { ID: reasonsList.length + 1, name: newReason },
      ]);
      setNewReason("");
    }
  };

  return (
    <Popup
      visible={openAddReasonPopup}
      onHiding={() => setOpenAddReasonPopup(!openAddReasonPopup)}
      height={375}
      width={500}
      showCloseButton
      showTitle={true}
      title="إدراة اسباب الانسحاب"
      rtlEnabled
    >
      <div>
        <List
          dataSource={reasonsList}
          itemRender={renderListItem}
          style={{ maxHeight: "180px", overflowY: "auto" }}
        />

        <form onSubmit={addReason}>
          <label style={{ marginBottom: "10px" }}>سبب جديد : </label>
          <TextBox
            value={newReason}
            onValueChanged={(e) => setNewReason(e.value)}
            placeholder="أضف رأي جديد"
          />
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Button
              text="إضافة"
              type="success"
              stylingMode="contained"
              useSubmitBehavior
            />
            <Button
              text="إلغاء"
              type="default"
              stylingMode="contained"
              onClick={() => setOpenAddReasonPopup(false)}
            />
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default AddReasonPopup;
