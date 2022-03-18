import React, { useState } from 'react';
import { View, ViewStyle } from 'react-native';

import { getTexts, playAudio } from '../assets';
import { getBaseFontSize } from '../helper';

import Button from './basic/Button';
import Picker from './basic/Picker';
import Popup from './basic/Popup';
import Spacer from './basic/Spacer';
import Switch from './basic/Switch';
import Text from './basic/Text';

import { getLanguageDescriptions, ELanguage } from '../models/language';
import { ISettings, IChangeSettings } from '../models/settings';

// -----------------------------------------------------------------------------

interface SettingsProps {
    /** The current settings. */
    settings: ISettings;
    /** Functions to alter the settings. */
    changeSettings: IChangeSettings;
}

/** The root component for the home view. This is the start screen of the app. */
const Settings = ({settings, changeSettings}: SettingsProps) => {
    const [showLangPicker, setShowLangPicker] = useState(false);
    function toggleLanguagePicker() {
        playAudio.click();
        setShowLangPicker(!showLangPicker);
    }

    const texts = getTexts().settings;

    return <View style={wrapperStyle}>
        <Text invert={true} scale={2.5}>{texts.heading}</Text>
        <Spacer />
        <View style={displayInLine}>
            <Text invert={true} scale={1.5}>{texts.sounds}</Text>
            <Switch value={settings.soundOn} onValueChange={changeSettings.toggleSoundOn} />
        </View>
        <Spacer />
        <View style={displayInLine}>
            <Text invert={true} scale={1.5}>{texts.music}</Text>
            <Switch value={settings.musicOn} onValueChange={changeSettings.toggleMusicOn} />
        </View>
        <Spacer />
        <View style={displayInLine}>
            <Text invert={true} scale={1.5}>{texts.language}</Text>
            <View>
                <Button
                    text={getLanguageDescriptions()[settings.language]}
                    onPress={toggleLanguagePicker}
                />
            </View>
        </View>
        {showLangPicker && getLanguagePopup(toggleLanguagePicker, settings, changeSettings)}
    </View>;
};

export default Settings;

// -----------------------------------------------------------------------------

const wrapperStyle: ViewStyle = {
    alignItems: 'center',
    maxWidth: '100%',
    width: getBaseFontSize() * 20,
};

const displayInLine: ViewStyle = {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
};

function getLanguagePopup(togglePopup: () => void, settings: ISettings, changeSettings: IChangeSettings) {
    return <Popup style={{width: getBaseFontSize() * 10, maxWidth: '90%'}}>
        <Text
            children={'x'} invert={true} scale={1.5} onPress={togglePopup}
            style={{fontWeight: 'bold'}}
        />
        <Spacer scale={.5} />
        <Picker
            onValueChange={(lang) => {changeSettings.setLanguage(lang)}}
            selectedValue={settings.language}
            mode={'dropdown'}
            items={getLanguageItems()}
        />
    </Popup>;
}

function getLanguageItems() {
    const langDescriptions = getLanguageDescriptions();
    const keys = Object.keys(langDescriptions);
    return keys.map(key => ({label: langDescriptions[key as ELanguage], value: key }));
}