import React, { FC, useEffect, useState } from 'react';
import { OtpCode } from '@my-app/ui';

const OtpCodeInput: FC<any> = ({ styles, value, onChangeText }) => {
    const [otpCode, setOTPCode] = useState("");
    const [isPinReady, setIsPinReady] = useState(false);

    useEffect(()=> {
        if(isPinReady && otpCode.length){
            onChangeText(otpCode)
        }
    }, [isPinReady])
    
    return <OtpCode
        styles={styles}
        code={otpCode}
        setCode={setOTPCode}
        maximumLength={6}
        setIsPinReady={setIsPinReady}
    />
}

export default OtpCodeInput