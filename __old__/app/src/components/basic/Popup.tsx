import React from 'react';
import { Modal, View, ViewProps, SafeAreaView, StyleSheet } from 'react-native';

import Overlay, { EOverlayType } from './Overlay';

// -----------------------------------------------------------------------------

interface PopupProps extends ViewProps {
    // children can always be passed, this declaration is just there to satisfy
    // typescript ;-)
    children?: any;
}

/** This component renders a classical popup. So all the other components are
 * rendered, but then a dark overlay is layed over the whole screen. None of the
 * elements below can be clicked anymore. In the center of this overlay, content
 * can be displayed (usually some kind of box with e.g. a text message and some
 * action buttons). Pass, what you want to be displayed in the center of the
 * popup as child components to this popup component. 
 * 
 * **Be careful!** There is no standard option to exit the popup. So make sure
 * to provide a way out!
 * 
 * Also, you can pass the usual react-native View properties to the Popup
 * component to style the content box in the center.
 * 
 * Example for usage:
 * ```tsx
 * <Popup style={{ width: '50%', alignItems: 'center' }}>
 *     <Text onPress={goSomewhere}>X close X</Text>
 *     <Text>Popup content goes here!</Text>
 * </Popup>
 * ```
 */
const Popup = (props: PopupProps) => {
    return <Modal transparent={true}>
        <Overlay type={EOverlayType.DARKEN}>
            <SafeAreaView style={STYLES.wrapper}>
                <View {...props}/>
            </SafeAreaView>
        </Overlay>
    </Modal>;
}

export default Popup;

// -----------------------------------------------------------------------------

const STYLES = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
});