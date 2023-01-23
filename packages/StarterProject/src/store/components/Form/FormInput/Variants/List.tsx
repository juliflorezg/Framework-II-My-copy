import React, { FC } from 'react';
import { TextInputProps, OptionsListComponent, OptionsListProps } from '@my-app/ui';


const ListInput: FC<OptionsListProps & TextInputProps> = (props) => {

    return <OptionsListComponent {...props} />
}

export default ListInput