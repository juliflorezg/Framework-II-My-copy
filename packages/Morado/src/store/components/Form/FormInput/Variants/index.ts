import Phone from "./Phone";
import DefaultTextInput from "./Default";
import ListInput from "./List";
import Material from "./Material";
import OtpCodeInput from "./OtpCode";
import SelectInput from "./SelectInput";

export const InputVariants = {
    default: DefaultTextInput,
    phone: Phone,
    material: Material,
    'otp-code': OtpCodeInput,
    'options-list':  ListInput,
    'select-input':  SelectInput
}

