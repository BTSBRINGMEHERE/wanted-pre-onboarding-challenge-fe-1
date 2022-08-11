import React, { useEffect, useState } from "react";

interface IuseModalContorlProps<IFunctionParameter, TFuntionReturnValue> {
  func?: (param?: IFunctionParameter) => TFuntionReturnValue;
  funcionVariable?: IFunctionParameter;
}

const useModalContorl = <
  IFunctionParameter,
  TFuntionReturnValue extends unknown
>({
  func,
  funcionVariable
}: IuseModalContorlProps<IFunctionParameter, TFuntionReturnValue>) => {
  const [isModal, setIsModal] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    if (isConfirm) {
      func && func(funcionVariable ? funcionVariable : undefined);
    }
  }, [isConfirm]);

  return { id, setId, isModal, setIsModal, isConfirm, setIsConfirm };
};

export default useModalContorl;
