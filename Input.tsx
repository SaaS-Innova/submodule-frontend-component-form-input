import { InputText } from "primereact/inputtext";
import { Controller, useFormContext } from "react-hook-form";
import { inputValidator } from "../../../../library/utilities/helperFunction";
import { IFormFieldType } from "../../../../library/utilities/constant";
import { IFormProps } from "../formInterface/forms.model";
import { FormFieldError } from "../formFieldError/FormFieldError";
import { useMemo } from "react";

export const Input = (props: IFormProps) => {
  const { attribute, form, fieldType, handleBlurEvent } = props;
  const { label, placeholder } = form[attribute];
  const { required, maxLength, type, disabled } = form[attribute].rules;
  const { icon, handleClick } = props.suffixIcon || {};
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { labelClassName, fieldClassName, divClassName } = useMemo(() => {
    switch (fieldType) {
      case IFormFieldType.NO_LABEL:
      case IFormFieldType.TOP_LABEL:
        return {
          labelClassName: "",
          fieldClassName: "field p-fluid",
          divClassName: "",
        };
      default:
        return {
          labelClassName: "col-12 mb-3 md:col-3 md:mb-0",
          fieldClassName: "field grid",
          divClassName: "col-12 md:col-9 relative",
        };
    }
  }, [fieldType]);

  const labelElement = (
    <label htmlFor={attribute} className={labelClassName}>
      <span className="capitalize-first">
        {label} {required && "*"}
      </span>
    </label>
  );

  return (
    <div className={fieldClassName}>
      {fieldType !== IFormFieldType.NO_LABEL && labelElement}
      <div className={divClassName}>
        <div className="p-inputgroup">
          <Controller
            control={control}
            name={attribute}
            rules={inputValidator(form[attribute].rules, label)}
            render={({ field }) => {
              return (
                <InputText
                  id={field.name}
                  value={field.value ?? ""}
                  type={type ?? "text"}
                  className={errors[attribute] ? "p-invalid" : ""}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  disabled={disabled}
                  onChange={(e) => field.onChange(e)}
                  onBlur={(e) => {
                    if (handleBlurEvent) {
                      handleBlurEvent(e);
                    }
                  }}
                />
              );
            }}
          />
          {props.suffixIcon && icon && handleClick && (
            <span className="p-inputgroup-addon bg-white cursor-pointer">
              <i className={icon} onClick={handleClick}></i>
            </span>
          )}
        </div>
        <FormFieldError data={{ errors, name: attribute }} />
      </div>
    </div>
  );
};
