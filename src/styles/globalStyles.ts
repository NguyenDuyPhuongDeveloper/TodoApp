import { Platform, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { fontFamilies } from "../constants/fontFamilies";

export const globalStyles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        paddingTop: Platform.OS === 'ios' ? 40 : 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontFamily: fontFamilies.regular,
        color: colors.text,
    },
    inputContainer: {
        backgroundColor: colors.gray,
        borderRadius: 12,
        paddingHorizontal: Platform.OS === 'ios' ? 12 : 10,
        paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    },
    section: {
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    tag: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 100,
        backgroundColor: colors.blue,
    },
    card: {

        borderRadius: 12,
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginBottom: 16
    }

} );