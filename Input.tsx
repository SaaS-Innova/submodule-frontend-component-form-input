import { InputText } from "primereact/inputtext";
import { useFormContext } from "react-hook-form";
import { IFormFieldType, IFormProps } from "../forms.model";
import { FormFieldError } from "../../FormFieldError/FormFieldError";
import { inputValidator } from '../../../library/utilities/helperFunction';
import { useEffect } from "react";

export const Input = (props: IFormProps) => {
  const { attribute, form, fieldType } = props;
  const { initialValue, label } = form[attribute];
  const { required, maxLength, type } = form[attribute].rules;
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  let labelClassName = "";
  let fieldClassName = "";
  let divClassName = "";

  switch (fieldType) {
    case IFormFieldType.NO_LABEL:
      labelClassName = ""; 
      fieldClassName = "field p-fluid";
      divClassName = "";
      break;
    case IFormFieldType.TOP_LABEL:
      labelClassName = "";
      fieldClassName = "field p-fluid";
      divClassName = "";
      break;
    default:
      labelClassName = "col-12 mb-3 md:col-3 md:mb-0";
      fieldClassName = "field grid";
      divClassName = "col-12 md:col-9 relative";
      break;
  }
  const labelElement = (
    <label htmlFor={attribute} className={labelClassName}>
      {label} {required && "*"}
    </label>
  );
  useEffect(() => {
    setValue(attribute, initialValue);
  }, [initialValue]);
  return (
    <div className={fieldClassName}>
      {fieldType !== "no-label" && labelElement}
      <div className={divClassName}>
        <div className="p-inputgroup">
          <InputText
            style={{ width: "100%" }}
            type={type ?? "text"}
            id={attribute}
            {...register(attribute, {
              ...inputValidator(form[attribute].rules, label),
              value: initialValue,
            })}
            maxLength={maxLength}
            placeholder={form[attribute].placeholder}
          />
        </div>
        <div className="pb-2 pt-1">
          <FormFieldError
            data={{ errors, name: attribute,className: 'absolute' }}
          />
        </div>
      </div>
    </div>
  );
};
