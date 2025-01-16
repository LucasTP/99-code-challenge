import { Form, FormItemProps, InputNumber, InputNumberProps } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

interface InputNumberFieldProps extends InputNumberProps {
  name: string;
  formItemProps?: FormItemProps;
}

export const InputNumberField = ({
  name,
  formItemProps,
  ...inputProps
}: InputNumberFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Form.Item
          style={{ marginBottom: 0 }}
          htmlFor={name}
          validateStatus={error ? 'error' : ''}
          //help={error?.message}
          {...formItemProps}
        >
          <InputNumber
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            {...inputProps}
          />
        </Form.Item>
      )}
    />
  );
};
