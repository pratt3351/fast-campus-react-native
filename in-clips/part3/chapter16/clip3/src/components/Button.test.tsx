import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native'

import { Button } from "./Button"
import { Typography } from "./Typography"

test('Button Test', async () => {
    const expectedButtonName  = 'TEST BUTTON'
    const onPressed = jest.fn();

    render(
        <Button onPress={onPressed}>
            <Typography>{expectedButtonName}</Typography>
        </Button>
    )
  
    expect(screen.toJSON()).toMatchSnapshot()

    fireEvent.press(screen.getByText(expectedButtonName));

    expect(onPressed).toHaveBeenCalled();
    

  })
  
  