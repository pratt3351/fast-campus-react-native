import {fireEvent, render, screen} from "@testing-library/react-native";
import {Button} from "./Button";
import {Typography} from "./Typography";
import React from "react";
import {FeedListItem} from "./FeedListItem";
jest.mock('@expo/vector-icons/build/vendor/react-native-vector-icons/lib/create-icon-set.js', () => {
    return () => '';
});
test('FeedListItem Test', async () => {
    const onPressFeed = jest.fn();
    const onPressFavorite = jest.fn();


    render(
        <FeedListItem
            image={''}
            onPressFeed={onPressFeed}
            onPressFavorite={onPressFavorite}
            comment={'TEST_COMMENT'}
            isLiked={false}
            likeCount={10}
            writer={'TEST_NAME'}
        />
    )



   fireEvent.press(screen.getByTestId('HeartIcon'));


    expect(screen.toJSON()).toMatchSnapshot()
    expect(onPressFavorite).toHaveBeenCalled()
})
