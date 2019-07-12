/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { SliderInput, Slider, Select, Input, NumberInput } from "@chakra/ui";

const StyledField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;

  .Field__Right {
    width: 200px;
    display: flex;
    align-items: center;
  }

  .Field__Left {
    display: block;
    margin: 4px 0;
  }
`;

const Label = styled.label`
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.5px;
  font-family: inherit;
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(52, 73, 94, 0.7);
  width: 20%;
`;

export const SliderField = ({ label, value, step = 2, onChange, min, max }) => {
  return (
    <StyledField>
      <Label className="Field__Left">{label}</Label>
      <SliderInput {...{ value, step, onChange, min, max }}>
        <Slider />
        <NumberInput wrapperProps={{ ml: 4, flex: "0 0 auto", minWidth: 80 }} />
      </SliderInput>
    </StyledField>
  );
};

// const ColorField = ({ label, color, onChange }) => (
//   <StyledField>
//     <Label className="Field__Left">{label}</Label>
//     <div className="Field__Right">
//       <ColorPicker color={color} onChange={onChange} />
//     </div>
//   </StyledField>
// );

export const SelectField = ({ label, value, options, onChange }) => (
  <StyledField>
    <Label className="Field__Left">{label}</Label>
    <Select value={value} onChange={onChange}>
      {options.map(opt => (
        <option value={opt.value}>{opt.label}</option>
      ))}
    </Select>
  </StyledField>
);

export const InputField = ({ type, label, value, placeholder, onChange }) => (
  <StyledField>
    <Label className="Field__Left">{label}</Label>
    <Input
      value={value}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
    />
  </StyledField>
);
