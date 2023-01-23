import React, { FC } from 'react';
import { TextInputProps, OptionsListComponent, OptionsListProps } from '@my-app/ui';


const ListInput: FC<OptionsListProps & TextInputProps> = (props) => {
    console.log(props)
    return <OptionsListComponent {...props} />
}

export default ListInput